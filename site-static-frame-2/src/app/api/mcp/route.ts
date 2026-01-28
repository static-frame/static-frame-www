import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import { searchSignatures } from "../../../lib/search";
import { sigToDoc, sigToEx } from "../../../lib/apiData";

// CORS headers for Streamable HTTP
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Mcp-Session-Id",
};

function registerSearchTool(server: McpServer) {
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
  const server = new McpServer({
    name: "staticframe-api",
    version: "1.0.0",
  });
  registerSearchTool(server);
  registerGetDocTool(server);
  registerGetExampleTool(server);
  return server;
}

// Session management for Streamable HTTP transport
interface Session {
  id: string;
  server: McpServer;
  clientTransport: InstanceType<typeof InMemoryTransport>;
  serverTransport: InstanceType<typeof InMemoryTransport>;
  createdAt: number;
}

const sessions = new Map<string, Session>();

// Clean up old sessions (older than 1 hour)
function cleanupOldSessions() {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  for (const [id, session] of sessions.entries()) {
    if (now - session.createdAt > oneHour) {
      session.clientTransport.close();
      session.serverTransport.close();
      sessions.delete(id);
    }
  }
}

// Helper to check if a JSON-RPC message is a notification (no id field)
function isNotification(message: JSONRPCMessage): boolean {
  return !("id" in message);
}

// Helper to check if a JSON-RPC message is a request (has id and method)
function isRequest(message: JSONRPCMessage): boolean {
  return "id" in message && "method" in message;
}

//--------------------------------------------------------------
// GET - Health check (no session) or SSE stream (not currently supported)
export async function GET(request: Request) {
  const sessionId = request.headers.get("mcp-session-id");

  // No session ID = health check
  if (!sessionId) {
    return new Response(
      JSON.stringify({
        name: "staticframe-api",
        version: "1.0.0",
        transport: "streamable-http",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // With session ID: we don't currently support server-initiated message streams
  // Per spec, return 405 Method Not Allowed
  return new Response(
    JSON.stringify({
      error: "Server-initiated message streams not supported",
    }),
    {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
}

//--------------------------------------------------------------
// OPTIONS - CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

//--------------------------------------------------------------
// POST - Send messages to server (Streamable HTTP transport)
export async function POST(request: Request) {
  cleanupOldSessions();

  const sessionId = request.headers.get("mcp-session-id");

  try {
    const message = (await request.json()) as JSONRPCMessage;
    const messages = Array.isArray(message) ? message : [message];

    // Check if this is an initialize request (creates new session)
    const hasInitialize = messages.some(
      (msg) => isRequest(msg) && msg.method === "initialize",
    );

    // Get or create session
    let session: Session;

    if (hasInitialize && !sessionId) {
      // Create new session for initialize
      const newSessionId = crypto.randomUUID();
      const server = createMcpServer();
      const [clientTransport, serverTransport] =
        InMemoryTransport.createLinkedPair();

      await server.connect(serverTransport);

      session = {
        id: newSessionId,
        server,
        clientTransport,
        serverTransport,
        createdAt: Date.now(),
      };
      sessions.set(newSessionId, session);
    } else if (sessionId) {
      // Use existing session
      const existingSession = sessions.get(sessionId);
      if (!existingSession) {
        return new Response(JSON.stringify({ error: "Session not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      session = existingSession;
    } else {
      // No session ID and not initialize = stateless mode (for backwards compat)
      // Create temporary session
      const server = createMcpServer();
      const [clientTransport, serverTransport] =
        InMemoryTransport.createLinkedPair();

      await server.connect(serverTransport);

      session = {
        id: "temp",
        server,
        clientTransport,
        serverTransport,
        createdAt: Date.now(),
      };
    }

    // Check if all messages are notifications or responses (no requests)
    const hasRequests = messages.some(isRequest);

    if (!hasRequests) {
      // Only notifications/responses: send and return 202 Accepted per spec
      for (const msg of messages) {
        await session.clientTransport.send(msg);
      }

      // Clean up temp session
      if (session.id === "temp") {
        session.clientTransport.close();
        session.serverTransport.close();
      }

      return new Response(null, {
        status: 202,
        headers: corsHeaders,
      });
    }

    // Has requests: collect all responses
    const responses: JSONRPCMessage[] = [];
    let responseCount = 0;
    const requestCount = messages.filter(isRequest).length;

    // Set up response handler
    const responsePromise = new Promise<void>((resolve) => {
      session.clientTransport.onmessage = (msg: JSONRPCMessage) => {
        responses.push(msg);
        responseCount++;
        if (responseCount >= requestCount) {
          resolve();
        }
      };
    });

    // Send all messages
    for (const msg of messages) {
      await session.clientTransport.send(msg);
    }

    // Wait for all responses
    await responsePromise;

    // Clean up temp session
    if (session.id === "temp") {
      session.clientTransport.close();
      session.serverTransport.close();
    }

    // Return single response or array
    const responseBody = responses.length === 1 ? responses[0] : responses;

    // Add session ID header if this was initialize
    const headers: Record<string, string> = {
      ...corsHeaders,
      "Content-Type": "application/json",
    };
    if (hasInitialize && session.id !== "temp") {
      headers["Mcp-Session-Id"] = session.id;
    }

    return new Response(JSON.stringify(responseBody), { headers });
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

//--------------------------------------------------------------
// DELETE - Terminate session (Streamable HTTP transport)
export async function DELETE(request: Request) {
  const sessionId = request.headers.get("mcp-session-id");

  if (!sessionId) {
    return new Response(
      JSON.stringify({ error: "Missing Mcp-Session-Id header" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const session = sessions.get(sessionId);
  if (!session) {
    return new Response(JSON.stringify({ error: "Session not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Clean up session
  session.clientTransport.close();
  session.serverTransport.close();
  sessions.delete(sessionId);

  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
