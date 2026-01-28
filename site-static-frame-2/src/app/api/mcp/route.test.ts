import { describe, it, expect, beforeAll } from "vitest";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMcpServer } from "./route";

interface Tool {
  name: string;
  description: string;
  inputSchema?: unknown;
}

// Result types for different MCP responses
interface ToolsListResult {
  tools: Tool[];
}

interface ContentItem {
  type: "text";
  text: string;
}

interface ToolCallResult {
  content: ContentItem[];
}

// Helper type for JSON-RPC responses (which include result or error)
interface JSONRPCResponse<T = unknown> {
  jsonrpc: "2.0";
  id: string | number;
  result?: T;
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

  async function sendMessage<T = unknown>(
    message: JSONRPCMessage,
  ): Promise<JSONRPCResponse<T>> {
    return new Promise((resolve) => {
      const originalHandler = clientTransport.onmessage;
      clientTransport.onmessage = (response: JSONRPCMessage) => {
        clientTransport.onmessage = originalHandler;
        // Cast to JSONRPCResponse since we know responses have result or error
        resolve(response as JSONRPCResponse<T>);
      };
      clientTransport.send(message);
    });
  }

  // Counter for unique message IDs
  let messageId = 0;

  // Typed helper for tools/list
  async function listTools(): Promise<JSONRPCResponse<ToolsListResult>> {
    return sendMessage<ToolsListResult>({
      jsonrpc: "2.0",
      id: ++messageId,
      method: "tools/list",
      params: {},
    });
  }

  // Typed helper for tools/call
  async function callTool(
    name: string,
    args: Record<string, unknown>,
  ): Promise<JSONRPCResponse<ToolCallResult>> {
    return sendMessage<ToolCallResult>({
      jsonrpc: "2.0",
      id: ++messageId,
      method: "tools/call",
      params: { name, arguments: args },
    });
  }

  beforeAll(async () => {
    server = createMcpServer();
    // registerSearchTool(server);
    // registerGetDocTool(server);
    // registerGetExampleTool(server);

    // linked transports for testing
    const [client, server_transport] = InMemoryTransport.createLinkedPair();
    clientTransport = client;
    serverTransport = server_transport;
    await server.connect(serverTransport);
  });

  describe("Tool Registration", () => {
    it("should register the search tool", async () => {
      const response = await listTools();

      expect(response.result).toBeDefined();
      expect(response.result!.tools).toBeInstanceOf(Array);
      const searchTool = response.result!.tools.find(
        (tool) => tool.name === "search",
      );

      expect(searchTool).toBeDefined();
      expect(searchTool!.description).toBe(
        "Search StaticFrame API signatures by method name or pattern",
      );
    });
  });

  describe("Search Functionality", () => {
    it("should search for a basic query", async () => {
      const response = await callTool("search", { query: "Frame.from_dict" });

      expect(response.result!.content).toBeInstanceOf(Array);
      expect(response.result!.content[0].type).toBe("text");

      const data = JSON.parse(response.result!.content[0].text);
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
      const response = await callTool("search", {
        query: "NonExistentMethod12345",
      });

      const data = JSON.parse(response.result!.content[0].text);
      expect(data.count).toBe(0);
      expect(data.signatures).toEqual([]);
    });

    it("should support fullSigSearch parameter", async () => {
      const response = await callTool("search", {
        query: "own_data",
        fullSigSearch: true,
      });

      const data = JSON.parse(response.result!.content[0].text);
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
      const response = await callTool("search", {
        query: "^Frame\\.",
        reSearch: true,
      });

      const data = JSON.parse(response.result!.content[0].text);
      expect(data.count).toBeGreaterThan(0);
      expect(data.signatures).toBeInstanceOf(Array);

      data.signatures.forEach((sig: string) => {
        expect(sig).toMatch(/^Frame\./);
      });
    });

    it("should handle both fullSigSearch and reSearch together", async () => {
      const response = await callTool("search", {
        query: "drop",
        fullSigSearch: true,
        reSearch: false,
      });

      const data = JSON.parse(response.result!.content[0].text);
      expect(data).toHaveProperty("count");
      expect(data).toHaveProperty("signatures");
      expect(data.count).toBeGreaterThan(450);
    });
  });

  describe("Input Validation", () => {
    it("should handle missing query parameter", async () => {
      const response = await callTool("search", {});
      // The MCP server should either return an error or handle gracefully
      // If it returns a result, the search should return no results
      if (response.error) {
        expect(response.error).toBeDefined();
      } else {
        expect(response.result).toBeDefined();
      }
    });

    it("should handle empty query string", async () => {
      const response = await callTool("search", { query: "" });
      const data = JSON.parse(response.result!.content[0].text);
      expect(data.count).toBe(0);
      expect(data.signatures).toEqual([]);
    });
  });

  describe("Response Format", () => {
    it("should return properly formatted JSON response", async () => {
      const response = await callTool("search", { query: "Frame" });

      expect(response.result!.content).toBeInstanceOf(Array);
      expect(response.result!.content[0]).toHaveProperty("type");
      expect(response.result!.content[0]).toHaveProperty("text");
      expect(response.result!.content[0].type).toBe("text");

      expect(() => JSON.parse(response.result!.content[0].text)).not.toThrow();
      const data = JSON.parse(response.result!.content[0].text);
      expect(data).toHaveProperty("count");
      expect(data).toHaveProperty("signatures");
      expect(typeof data.count).toBe("number");
      expect(Array.isArray(data.signatures)).toBe(true);
    });
  });

  describe("Get Doc Tool", () => {
    it("should register the get_doc tool", async () => {
      const response = await listTools();

      const getDocTool = response.result!.tools.find(
        (tool) => tool.name === "get_doc",
      );
      expect(getDocTool).toBeDefined();
      expect(getDocTool!.description).toBe(
        "Get documentation for a StaticFrame API signature",
      );
    });

    it("should return documentation for a valid signature", async () => {
      const response = await callTool("get_doc", { sig: "Frame.from_dict()" });

      expect(response.result!.content).toBeInstanceOf(Array);
      expect(response.result!.content[0].type).toBe("text");
      expect(response.result!.content[0].text).toContain("dictionary");
      expect(response.result!.content[0].text).toEqual(
        "Create a Frame from a dictionary (or any object that has an items() method) where keys are column labels and values are columns values (either sequence types or Series). Args: mapping: a dictionary or similar mapping interface. index: fill_value: dtypes: Optionally provide an iterable of dtypes, equal in length to the length of each row, or a mapping by column name (where overspecied labels is not an error). If a dtype is given as None, element-wise type determination will be used. name: A hashable object to label the container. index_constructor: columns_constructor: consolidate_blocks: Optionally consolidate adjacent same-typed columns into contiguous arrays.",
      );
    });

    it("should return not found message for invalid signature", async () => {
      const response = await callTool("get_doc", {
        sig: "NonExistent.method()",
      });

      expect(response.result!.content[0].text).toContain(
        "No documentation found",
      );
      expect(response.result!.content[0].text).toContain(
        "NonExistent.method()",
      );
    });

    it("should handle signature without parentheses", async () => {
      const response = await callTool("get_doc", { sig: "Frame.shape" });

      expect(response.result!.content).toBeInstanceOf(Array);
      expect(response.result!.content[0].type).toBe("text");
      // Shape is a property, should have documentation
      expect(response.result!.content[0].text).toEqual(
        "Return a tuple describing the shape of the underlying NumPy array. Returns: tp.Tuple[int, int]",
      );
    });
  });

  describe("Get Example Tool", () => {
    it("should register the get_example tool", async () => {
      const response = await listTools();

      const getExampleTool = response.result!.tools.find(
        (tool) => tool.name === "get_example",
      );
      expect(getExampleTool).toBeDefined();
      expect(getExampleTool!.description).toBe(
        "Get code example for a StaticFrame API signature",
      );
    });

    it("should return example for a valid signature", async () => {
      const response = await callTool("get_example", {
        sig: "Frame.from_dict()",
      });

      expect(response.result!.content).toBeInstanceOf(Array);
      expect(response.result!.content[0].type).toBe("text");
      // Example should contain Python code with sf.Frame.from_dict
      expect(response.result!.content[0].text).toContain("sf.Frame.from_dict");
      expect(response.result!.content[0].text).toContain(">>>");
    });

    it("should return not found message for signature without example", async () => {
      const response = await callTool("get_example", {
        sig: "NonExistent.method()",
      });

      expect(response.result!.content[0].text).toContain("No example found");
      expect(response.result!.content[0].text).toContain(
        "NonExistent.method()",
      );
    });

    it("should return multiline example output", async () => {
      const response = await callTool("get_example", {
        sig: "Frame.from_dict()",
      });

      const text = response.result!.content[0].text;
      // Example output should contain multiple lines (Frame display)
      expect(text.split("\n").length).toBeGreaterThan(1);
      // Should contain Frame output indicators
      expect(text).toContain("<Frame");
    });

    it("should handle Series example", async () => {
      const response = await callTool("get_example", {
        sig: "Series.from_dict()",
      });

      expect(response.result!.content).toBeInstanceOf(Array);
      expect(response.result!.content[0].type).toBe("text");
      expect(response.result!.content[0].text).toContain("sf.Series.from_dict");
    });
  });
});
