import { SFBanner } from "../../components/SFBanner";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  cnColFieldGradient,
  cnMaxWidthCentered,
  cnCol1FlexCol,
} from "../../components/Common";
import { CodeBlock } from "../../components/CodeBlock";

export default function MCPPage() {
  return (
    <div>
      <Header />
      <div className="h-screen overflow-x-auto">
        <div className="h-6"></div>
        <div className={cnMaxWidthCentered}>
          <div className="px-2 py-2 my-4 bg-black rounded-sm">
            <div className={cnCol1FlexCol}>
              <div className={cnColFieldGradient}>
                <SFBanner />
              </div>
            </div>
          </div>

          <div className="px-2 pb-2 bg-black rounded-sm">
            <div className={cnCol1FlexCol}>
              <span className="my-2 text-2xl text-slate-400 text-bold">
                StaticFrame MCP Server
              </span>
              <p className="text-base text-zinc-500 font-sans">
                The StaticFrame Model Context Protocol (MCP) server provides AI
                assistants with access to the StaticFrame API documentation,
                enabling intelligent code completion and assistance. The MCP
                server is available at:
              </p>

              <div className="bg-zinc-900 p-2 my-2 rounded-sm overflow-x-auto">
                <code className="text-slate-400 font-mono">
                  https://static-frame.dev/api/mcp
                </code>
              </div>

              <span className="my-2 text-xl text-slate-400 text-bold">
                Server Information
              </span>
              <ul className="list-inside text-slate-300 space-y-0 font-sans">
                <li>
                  <strong>Name:</strong> staticframe-api
                </li>
                <li>
                  <strong>Version:</strong> 1.0.0
                </li>
                <li>
                  <strong>Protocol:</strong> Model Context Protocol (MCP)
                </li>
                <li>
                  <strong>Transport:</strong> Server-Sent Events (SSE) with
                  JSON-RPC 2.0
                </li>
              </ul>
            </div>
          </div>

          <div className="px-2 pt-2 mt-4 bg-black rounded-sm">
            <div className={cnCol1FlexCol}>
              <span className="mb-2 text-2xl text-slate-400 text-bold">
                Available Tools
              </span>
              {/* Search Tool */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-400 mb-2">
                  1. search
                </h3>
                <p className="text-slate-300 mb-2 font-sans">
                  Search StaticFrame API signatures by method name or pattern.
                </p>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Parameters
                </h4>
                <ul className="list-disc list-inside text-slate-300 mb-2 space-y-2 font-sans">
                  <li>
                    <code className="text-slate-400 font-mono">query</code>{" "}
                    (string, required): The search query (method name, class
                    name, or pattern)
                  </li>
                  <li>
                    <code className="text-slate-400 font-mono">
                      fullSigSearch
                    </code>{" "}
                    (boolean, optional): Include parameter names in search
                    (default: false)
                  </li>
                  <li>
                    <code className="text-slate-400 font-mono">reSearch</code>{" "}
                    (boolean, optional): Use regular expression matching
                    (default: false)
                  </li>
                </ul>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Example Request
                </h4>
                <div className="overflow-x-auto mb-2">
                  <CodeBlock
                    code={`{
  "name": "search",
  "arguments": {
    "query": "Frame.from_dict"
  }
}`}
                  />
                </div>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Example Response
                </h4>
                <div className="overflow-x-auto">
                  <CodeBlock
                    code={`{
  "count": 4,
  "signatures": [
    "Frame.from_dict()",
    "Frame.from_dict_fields()",
    "Frame.from_dict_records()",
    "Frame.from_dict_records_items()"
  ]
}`}
                  />
                </div>
              </div>

              {/* Get Doc Tool */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-400 mb-2">
                  2. get_doc
                </h3>
                <p className="text-slate-300 mb-2 font-sans">
                  Get documentation for a StaticFrame API signature.
                </p>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Parameters
                </h4>
                <ul className="list-disc list-inside text-slate-300 mb-2 space-y-2 font-sans">
                  <li>
                    <code className="text-slate-400 font-mono">sig</code>{" "}
                    (string, required): The signature to get documentation for
                    (e.g., &apos;Frame.from_dict()&apos;)
                  </li>
                </ul>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Example Request
                </h4>
                <div className="overflow-x-auto mb-2">
                  <CodeBlock
                    code={`{
  "name": "get_doc",
  "arguments": {
    "sig": "Frame.from_dict()"
  }
}`}
                  />
                </div>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Example Response
                </h4>
                <div className="overflow-x-auto">
                  <CodeBlock
                    code={`Create a Frame from a dictionary (or any object that has an items() method) where keys are column labels and values are columns values (either sequence types or Series). Args: mapping: a dictionary or similar mapping interface. index: fill_value: dtypes: Optionally provide an iterable of dtypes, equal in length to the length of each row, or a mapping by column name (where overspecied labels is not an error). If a dtype is given as None, element-wise type determination will be used. name: A hashable object to label the container. index_constructor: columns_constructor: consolidate_blocks: Optionally consolidate adjacent same-typed columns into contiguous arrays.`}
                  />
                </div>
              </div>

              {/* Get Example Tool */}
              <div className="mb-0">
                <h3 className="text-xl font-bold text-slate-400 mb-2">
                  3. get_example
                </h3>
                <p className="text-slate-300 mb-2 font-sans">
                  Get code example for a StaticFrame API signature.
                </p>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Parameters
                </h4>
                <ul className="list-disc list-inside text-slate-300 mb-2 space-y-2 font-sans">
                  <li>
                    <code className="text-slate-400 font-mono">sig</code>{" "}
                    (string, required): The signature to get example for (e.g.,
                    &apos;Frame.from_dict()&apos;)
                  </li>
                </ul>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Example Request
                </h4>
                <div className="overflow-x-auto mb-2">
                  <CodeBlock
                    code={`{
  "name": "get_example",
  "arguments": {
    "sig": "Frame.from_dict()"
  }
}`}
                  />
                </div>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Example Response
                </h4>
                <div className="overflow-x-auto">
                  <CodeBlock
                    code={`>>> import static_frame as sf
>>> sf.Frame.from_dict(dict(a=(1,2), b=(3,4)))
<Frame>
<Index> a       b       <<U1>
<Index>
0       1       3
1       2       4
<int64> <int64> <int64>`}
                  />
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
