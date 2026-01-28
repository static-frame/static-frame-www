#!/usr/bin/env node

/**
 * StaticFrame MCP Server - stdio transport
 *
 * This server provides MCP tools for searching the StaticFrame API.
 * It uses stdio transport which is the standard for Claude Code.
 *
 * Usage:
 *   claude mcp add staticframe-api npx tsx mcp-server.ts
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Import from the lib directory
import { searchSignatures } from "./src/lib/search.js";
import { sigToDoc, sigToEx } from "./src/lib/apiData.js";

// Create MCP server
const server = new McpServer({
  name: "staticframe-api",
  version: "1.0.0",
});

// Register search tool
server.registerTool(
  "search",
  {
    description: "Search StaticFrame API signatures by method name or pattern",
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

// Register get_doc tool
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

// Register get_example tool
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

// Start the server with stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("StaticFrame MCP server running on stdio");
