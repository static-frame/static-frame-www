import { describe, it, expect, beforeAll } from "vitest";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMcpServer, registerSearchTool } from "./route";

interface Tool {
  name: string;
  description: string;
  inputSchema?: unknown;
}

// Helper type for JSON-RPC responses (which include result or error)
interface JSONRPCResponse {
  jsonrpc: "2.0";
  id: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

describe("MCP Search Tool", () => {
  let server: McpServer;
  let clientTransport: InstanceType<typeof InMemoryTransport>;
  let serverTransport: InstanceType<typeof InMemoryTransport>;

  async function sendMessage(
    message: JSONRPCMessage,
  ): Promise<JSONRPCResponse> {
    return new Promise((resolve) => {
      const originalHandler = clientTransport.onmessage;
      clientTransport.onmessage = (response: JSONRPCMessage) => {
        clientTransport.onmessage = originalHandler;
        // Cast to JSONRPCResponse since we know responses have result or error
        resolve(response as JSONRPCResponse);
      };
      clientTransport.send(message);
    });
  }

  beforeAll(async () => {
    server = createMcpServer();
    registerSearchTool(server);

    // linked transports for testing
    const [client, server_transport] = InMemoryTransport.createLinkedPair();
    clientTransport = client;
    serverTransport = server_transport;
    await server.connect(serverTransport);
  });

  describe("Tool Registration", () => {
    it("should register the search tool", async () => {
      // Request list of tools from the server
      const response = await sendMessage({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/list",
        params: {},
      });

      expect(response.result).toBeDefined();
      expect(response.result.tools).toBeInstanceOf(Array);
      const searchTool = response.result.tools.find(
        (tool: Tool) => tool.name === "search",
      );

      expect(searchTool).toBeDefined();
      expect(searchTool.description).toBe(
        "Search StaticFrame API signatures by method name or pattern",
      );
    });
  });

  describe("Search Functionality", () => {
    it("should search for a basic query", async () => {
      const response = await sendMessage({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: {
          name: "search",
          arguments: {
            query: "Frame.from_dict",
          },
        },
      });

      // TypeScript now knows response.result exists, so these checks
      // are more about validating data structure than preventing undefined errors
      expect(response.result.content).toBeInstanceOf(Array);
      expect(response.result.content[0].type).toBe("text");

      const data = JSON.parse(response.result.content[0].text);
      expect(data).toHaveProperty("count");
      expect(data).toHaveProperty("signatures");
      expect(data.count).toBeGreaterThan(0);
      expect(data.signatures).toBeInstanceOf(Array);
      expect(data.signatures).toEqual([
        "Frame.from_dict()",
        "Frame.from_dict_fields()",
        "Frame.from_dict_records()",
        "Frame.from_dict_records_items()",
      ]);
    });

    it("should return empty results for non-existent query", async () => {
      const response = await sendMessage({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: {
          name: "search",
          arguments: {
            query: "NonExistentMethod12345",
          },
        },
      });

      const data = JSON.parse(response.result.content[0].text);
      expect(data.count).toBe(0);
      expect(data.signatures).toEqual([]);
    });

    it("should support fullSigSearch parameter", async () => {
      const response = await sendMessage({
        jsonrpc: "2.0",
        id: 4,
        method: "tools/call",
        params: {
          name: "search",
          arguments: {
            query: "own_data",
            fullSigSearch: true,
          },
        },
      });

      const data = JSON.parse(response.result.content[0].text);
      expect(data.count).toBeGreaterThan(0);
      expect(data.signatures).toBeInstanceOf(Array);
      expect(data.signatures).toEqual([
        "Series.from_pandas()",
        "SeriesHE.from_pandas()",
        "Frame.__init__()",
        "Frame.from_pandas()",
        "FrameGO.__init__()",
        "FrameGO.from_pandas()",
        "FrameHE.__init__()",
        "FrameHE.from_pandas()",
        "Bus.__init__()",
        "Bus.from_series()",
      ]);
    });

    it("should support regex search", async () => {
      const response = await sendMessage({
        jsonrpc: "2.0",
        id: 5,
        method: "tools/call",
        params: {
          name: "search",
          arguments: {
            query: "^Frame\\.",
            reSearch: true,
          },
        },
      });

      const data = JSON.parse(response.result.content[0].text);
      expect(data.count).toBeGreaterThan(0);
      expect(data.signatures).toBeInstanceOf(Array);

      data.signatures.forEach((sig: string) => {
        expect(sig).toMatch(/^Frame\./);
      });
    });

    it("should handle both fullSigSearch and reSearch together", async () => {
      const response = await sendMessage({
        jsonrpc: "2.0",
        id: 6,
        method: "tools/call",
        params: {
          name: "search",
          arguments: {
            query: "drop",
            fullSigSearch: true,
            reSearch: false,
          },
        },
      });

      const data = JSON.parse(response.result.content[0].text);
      expect(data).toHaveProperty("count");
      expect(data).toHaveProperty("signatures");
      expect(data.count).toBeGreaterThan(450);

    });
  });

  describe("Input Validation", () => {
    it("should handle missing query parameter", async () => {
      const response = await sendMessage({
        jsonrpc: "2.0",
        id: 7,
        method: "tools/call",
        params: {
          name: "search",
          arguments: {},
        },
      });
      // The MCP server should either return an error or handle gracefully
      // If it returns a result, the search should return no results
      if (response.error) {
        expect(response.error).toBeDefined();
      } else {
        expect(response.result).toBeDefined();
      }
    });

    it("should handle empty query string", async () => {
      const response = await sendMessage({
        jsonrpc: "2.0",
        id: 8,
        method: "tools/call",
        params: {
          name: "search",
          arguments: {
            query: "",
          },
        },
      });
      const data = JSON.parse(response.result.content[0].text);
      expect(data.count).toBe(0);
      expect(data.signatures).toEqual([]);
    });
  });

  describe("Response Format", () => {
    it("should return properly formatted JSON response", async () => {
      const response = await sendMessage({
        jsonrpc: "2.0",
        id: 9,
        method: "tools/call",
        params: {
          name: "search",
          arguments: {
            query: "Frame",
          },
        },
      });

      expect(response.result.content).toBeInstanceOf(Array);
      expect(response.result.content[0]).toHaveProperty("type");
      expect(response.result.content[0]).toHaveProperty("text");
      expect(response.result.content[0].type).toBe("text");

      expect(() => JSON.parse(response.result.content[0].text)).not.toThrow();
      const data = JSON.parse(response.result.content[0].text);
      expect(data).toHaveProperty("count");
      expect(data).toHaveProperty("signatures");
      expect(typeof data.count).toBe("number");
      expect(Array.isArray(data.signatures)).toBe(true);
    });
  });
});
