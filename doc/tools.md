
## start:

ChatGPT Actions


## Conversion to NextJS from CRA

Started with CRA because AWS Amplify deployment

Simply migrate components

src/app/page.tsx as landing page

But... support for API endpoints


## types of agent tools

MCP
Open API

## Domains of Tools

Web-based servers
Locally running servers
Statically defined commands


## MCP

The Anthropic API
https://modelcontextprotocol.io/docs/getting-started/intro
https://code.claude.com/docs/en/mcp
https://platform.claude.com/docs/en/agent-sdk/custom-tools
https://blog.christianposta.com/ai/understanding-mcp-recent-change-around-http-sse/

https://code.claude.com/docs/en/mcp


import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

Things it can do:
    https://modelcontextprotocol.io/specification/2025-06-18/server

    Resources: fill like data
    Tools: functions
    Prompts:
        https://modelcontextprotocol.io/specification/2025-06-18/server/prompts


### MCP Examples:

https://github.com/modelcontextprotocol/servers


#### MCP Cybersecurity Examples:

https://github.com/boost-community/boost-mcp
https://github.com/codacy/codacy-mcp-server
https://github.com/safedep/vet/blob/main/docs/mcp.md
https://github.com/Contrast-Security-OSS/mcp-contrast
https://github.com/CrowdStrike/falcon-mcp
https://vibe.mobb.ai/
https://github.com/safedep/vet/blob/main/docs/mcp.md
https://github.com/snyk/studio-mcp

### Open API


Simple GET and POST requests
standard definition of API

http://localhost:3000/api/mcp


### Testing with vitest

npm run test:run

https://vitest.dev/



### Description

The picks and shovels of the AI agent rush are "tools," resources given to an agent to provide (maybe) deterministic, structured ways of executing commands, gathering resources, or running other programs or systems. There are a few standard definitions for cloud-based tools (Model Context Protocol, aka MCP, Open API) as well as number of platform/agent specific tool definitions.

In re-implementing the SF API search site in NextJS, I implemented API endpoints both for MCP (SSE and HTTP, as used by Claude) and Open API (as used by OpenAI GPTs). You can try the MCP in Claude with the following command (the MCP should work in Codex too!).

claude mcp add staticframe-api --transport http https://www.staticframe.dev/api/mcp

In CR today we will look at the landscape of AI agent tools, and dig into the NextJS / typescript implementation of the SF API MCP. Along the way we will learn about Server-Sent Events (SSE), see Anthropic's official JS MCP SDK, the use of `zod`, and some convenient approaches to testing server endpoints with `vitest`.




Can you search for Frame.from_dict in the StaticFrame API?