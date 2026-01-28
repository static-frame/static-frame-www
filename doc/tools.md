## types of agent tools

MCP
Open API



## Domains of Tools

Web-based servers
Locally running servers
Statically defined commands


## MCP

The Anthropic API

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

Things it can do:
    Tools
    Resources


### SSE

    GET /api/mcp (SSE connection)
        Establishes server to client event stream
        Generates and returns unique sesion ID
        Client listens to SSE for events
    POST /api/mcp
        Provide session ID, requests parameters
        Server routes messages to the correct session






claude mcp add --transport http staticframe-api https://www.staticframe.dev/api/mcp


http://localhost:3000/api/mcp


Along the way we will see the official JS MCP SDK, it use of `zod`, and some convenient approaches to testing server endpoints with `vitest`.