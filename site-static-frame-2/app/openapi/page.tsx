import { SFBanner } from "../../components/SFBanner";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  cnColFieldGradient,
  cnMaxWidthCentered,
  cnCol1FlexCol,
} from "../../components/Common";
import { CodeBlock } from "../../components/CodeBlock";

export default function OpenAPIPage() {
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
                StaticFrame OpenAPI
              </span>
              <p className="text-base text-zinc-500 font-sans">
                REST API endpoints for searching and retrieving StaticFrame
                documentation. Compatible with ChatGPT Actions and other OpenAPI
                3.1 clients.
              </p>

              <div className="bg-zinc-900 p-2 my-2 rounded-sm overflow-x-auto">
                <a
                  href="/api/openapi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-300 font-mono transition-colors"
                >
                  https://static-frame.dev/api/openapi
                </a>
              </div>

              <span className="my-2 text-xl text-slate-400 text-bold">
                Schema
              </span>
              <p className="text-base text-zinc-500 font-sans">
                The OpenAPI 3.1 schema is available at the base endpoint. Use
                this URL to configure ChatGPT Actions or other API clients.
              </p>
              <div className="bg-zinc-900 p-2 my-2 rounded-sm overflow-x-auto">
                <a
                  href="/api/openapi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-300 font-mono transition-colors"
                >
                  https://static-frame.dev/api/openapi
                </a>
              </div>

              <span className="my-2 text-xl text-slate-400 text-bold">
                Integration
              </span>
              <p className="text-base text-zinc-500 font-sans">
                To integrate with ChatGPT Actions, use the schema URL above in
                your GPT configuration. The API uses standard JSON
                request/response format over HTTPS.
              </p>
            </div>
          </div>

          <div className="px-2 pt-2 mt-4 bg-black rounded-sm">
            <div className={cnCol1FlexCol}>
              <span className="mb-2 text-2xl text-slate-400 text-bold">
                Available Endpoints
              </span>

              {/* Search Endpoint */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-400 mb-2">
                  POST /api/openapi/search
                </h3>
                <p className="text-slate-300 mb-2 font-sans">
                  Search StaticFrame API signatures by method name or pattern.
                </p>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Request Body
                </h4>
                <div className="overflow-x-auto mb-2">
                  <CodeBlock
                    code={`{
  "query": "Frame.from_dict",
  "fullSigSearch": false,  // optional
  "reSearch": false        // optional
}`}
                  />
                </div>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Response
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

              {/* Get Doc Endpoint */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-400 mb-2">
                  POST /api/openapi/get_doc
                </h3>
                <p className="text-slate-300 mb-2 font-sans">
                  Get documentation for a StaticFrame API signature.
                </p>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Request Body
                </h4>
                <div className="overflow-x-auto mb-2">
                  <CodeBlock
                    code={`{
  "sig": "Frame.from_dict()"
}`}
                  />
                </div>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Response
                </h4>
                <div className="overflow-x-auto">
                  <CodeBlock
                    code={`{
  "signature": "Frame.from_dict()",
  "documentation": "Create a Frame from a dictionary..."
}`}
                  />
                </div>
              </div>

              {/* Get Example Endpoint */}
              <div className="mb-0">
                <h3 className="text-xl font-bold text-slate-400 mb-2">
                  POST /api/openapi/get_example
                </h3>
                <p className="text-slate-300 mb-2 font-sans">
                  Get code example for a StaticFrame API signature.
                </p>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Request Body
                </h4>
                <div className="overflow-x-auto mb-2">
                  <CodeBlock
                    code={`{
  "sig": "Frame.from_dict()"
}`}
                  />
                </div>

                <h4 className="text-lg font-semibold text-slate-300 mb-2">
                  Response
                </h4>
                <div className="overflow-x-auto">
                  <CodeBlock
                    code={`{
  "signature": "Frame.from_dict()",
  "example": ">>> import static_frame as sf\\n>>> sf.Frame.from_dict(dict(a=(1,2), b=(3,4)))\\n<Frame>..."
}`}
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
