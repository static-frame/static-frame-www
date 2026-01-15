import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import { searchSignatures } from "../../../lib/search";

// Exported function to create a configured MCP server
// This allows the same server configuration to be used in tests
export function createMcpServer(): McpServer {
  return new McpServer({
    name: "staticframe-api",
    version: "1.0.0",
  });
}

// Exported function to register tools on an MCP server
// This allows the same registration logic to be used in tests
export function registerSearchTool(server: McpServer) {
  server.registerTool(
    "search",
    {
      description:
        "Search StaticFrame API signatures by method name or pattern",
      inputSchema: {
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
              2,
            ),
          },
        ],
      };
    },
  );
}

// Create the MCP server instance
const server = createMcpServer();

// Register the search tool
registerSearchTool(server);

// Session management
interface Session {
  clientTransport: InstanceType<typeof InMemoryTransport>;
  serverTransport: InstanceType<typeof InMemoryTransport>;
  controller: ReadableStreamDefaultController<Uint8Array> | null;
  encoder: TextEncoder;
}

const sessions = new Map<string, Session>();

function sendSSE(session: Session, event: string, data: unknown) {
  if (session.controller) {
    const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    session.controller.enqueue(session.encoder.encode(message));
  }
}

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
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId) {
    return new Response(JSON.stringify({ error: "Missing sessionId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = sessions.get(sessionId);
  if (!session) {
    return new Response(JSON.stringify({ error: "Session not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const message = (await request.json()) as JSONRPCMessage;
    // Send message to the server via the client transport
    await session.clientTransport.send(message);
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("MCP POST error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
