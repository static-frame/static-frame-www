import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import { searchSignatures } from "../../../lib/search";
import { sigToDoc, sigToEx } from "../../../lib/apiData";

function registerSearchTool(server: McpServer) {
  server.registerTool(
    "search",
    {
      description:
        "Search StaticFrame API signatures by method name or pattern",
      inputSchema: {
        // value is a ZodString schema object
        query: z
          .string()
          .describe("The search query (method name, class name, or pattern)"),
        fullSigSearch: z
          .boolean()
          .optional()
          .describe("Include parameter names in search (default: false)"),
        reSearch: z
          .boolean()
          .optional()
          .describe("Use regular expression matching (default: false)"),
      },
    },
    async ({
      query,
      fullSigSearch,
      reSearch,
    }: {
      query: string;
      fullSigSearch?: boolean;
      reSearch?: boolean;
    }) => {
      const result = searchSignatures(query, {
        fullSigSearch: fullSigSearch ?? false,
        reSearch: reSearch ?? false,
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                count: result.count,
                signatures: result.signatures,
              },
              null,
              2, // indentation
            ),
          },
        ],
      };
    },
  );
}

function registerGetDocTool(server: McpServer) {
  server.registerTool(
    "get_doc",
    {
      description: "Get documentation for a StaticFrame API signature",
      inputSchema: {
        sig: z
          .string()
          .describe(
            "The signature to get documentation for (e.g., 'Frame.from_dict()')",
          ),
      },
    },
    async ({ sig }: { sig: string }) => {
      const doc = sigToDoc.get(sig);

      if (!doc) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No documentation found for signature: ${sig}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: doc,
          },
        ],
      };
    },
  );
}

function registerGetExampleTool(server: McpServer) {
  server.registerTool(
    "get_example",
    {
      description: "Get code example for a StaticFrame API signature",
      inputSchema: {
        sig: z
          .string()
          .describe(
            "The signature to get example for (e.g., 'Frame.from_dict()')",
          ),
      },
    },
    async ({ sig }: { sig: string }) => {
      const example = sigToEx.get(sig);

      if (!example) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No example found for signature: ${sig}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: example.join("\n"),
          },
        ],
      };
    },
  );
}

export function createMcpServer(): McpServer {
  let server = new McpServer({
    name: "staticframe-api",
    version: "1.0.0",
  });
  registerSearchTool(server);
  registerGetDocTool(server);
  registerGetExampleTool(server);
  return server;
}

const server = createMcpServer();

interface Session {
  clientTransport: InstanceType<typeof InMemoryTransport>;
  serverTransport: InstanceType<typeof InMemoryTransport>;
  controller: ReadableStreamDefaultController<Uint8Array> | null;
  encoder: TextEncoder;
}

const sessions = new Map<string, Session>();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

//--------------------------------------------------------------
function sendSSE(session: Session, event: string, data: unknown) {
  if (session.controller) {
    const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    session.controller.enqueue(session.encoder.encode(message));
  }
}

//--------------------------------------------------------------
export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId") || crypto.randomUUID();

  // Create linked in-memory transports
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  const session: Session = {
    clientTransport,
    serverTransport,
    controller: null,
    encoder: new TextEncoder(),
  };

  sessions.set(sessionId, session);

  // Create a readable stream for SSE
  const stream = new ReadableStream({
    start(controller) {
      session.controller = controller;

      // Send endpoint info
      sendSSE(session, "endpoint", `/api/mcp?sessionId=${sessionId}`);

      // Listen for responses from MCP server (comes via clientTransport)
      clientTransport.onmessage = (message: JSONRPCMessage) => {
        sendSSE(session, "message", message);
      };

      // Connect the server to its transport
      server.connect(serverTransport).catch((error) => {
        console.error("MCP server connection error:", error);
        controller.close();
      });
    },
    cancel() {
      sessions.delete(sessionId);
      clientTransport.close();
      serverTransport.close();
    },
  });

  // Handle client disconnect via abort signal
  request.signal.addEventListener("abort", () => {
    sessions.delete(sessionId);
    clientTransport.close();
    serverTransport.close();
  });

  // stream instance holds on to session instance created here; ReadableStream creates the controller
  return new Response(stream, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  try {
    const message = (await request.json()) as JSONRPCMessage;

    // HTTP transport mode (no sessionId) - stateless request/response
    if (!sessionId) {
      // Create a temporary server connection for this request
      const tempServer = createMcpServer();
      const [clientTransport, serverTransport] =
        InMemoryTransport.createLinkedPair();

      // Connect server
      await tempServer.connect(serverTransport);

      // Send message and wait for response
      const response = await new Promise<JSONRPCMessage>((resolve) => {
        clientTransport.onmessage = (msg: JSONRPCMessage) => {
          resolve(msg);
        };
        clientTransport.send(message);
      });

      // Clean up
      clientTransport.close();
      serverTransport.close();

      // Return JSON-RPC response directly
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // SSE transport mode (with sessionId) - session-based
    const session = sessions.get(sessionId);
    if (!session) {
      return new Response(JSON.stringify({ error: "Session not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send message to the server via the client transport
    await session.clientTransport.send(message);
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("MCP POST error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process message" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
}
