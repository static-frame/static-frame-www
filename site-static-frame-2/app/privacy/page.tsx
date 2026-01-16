import { SFBanner } from "../../components/SFBanner";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { IconArrowLeft } from "../../components/Icons";

import {
  cnCol1FlexCol,
  cnColFieldGradient,
  cnMaxWidthCentered,
} from "../../components/Common";

export default function PrivacyPage() {
  return (
    <div>
      <Header />
      <div className="h-screen overflow-x-auto">
        <div className="h-6"></div>
        <div className={cnMaxWidthCentered}>
          <div className="flex flex-wrap px-2 py-2 my-4 bg-black rounded-sm">
            <div className={cnCol1FlexCol}>
              <div className={cnColFieldGradient}>
                <SFBanner />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap p-4 bg-black rounded-sm">
            <div className={cnCol1FlexCol}>
              <h1 className="text-2xl font-sans text-slate-300 mb-4">
                Privacy Policy
              </h1>

              <div className="space-y-4 font-sans text-slate-400 text-sm">
                <p className="text-slate-300">Last updated: January 16, 2026</p>

                <section>
                  <h2 className="text-lg font-sans text-slate-300 mb-2">
                    Overview
                  </h2>
                  <p>
                    This privacy policy describes how staticframe.dev handles
                    information when you use our API documentation and search
                    services.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-sans text-slate-300 mb-2">
                    Data Collection
                  </h2>
                  <p className="mb-2">
                    We are committed to minimizing data collection:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>We do not use cookies or tracking technologies</li>
                    <li>We do not collect personal information</li>
                    <li>We do not store user accounts or profiles</li>
                    <li>We do not use analytics services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-sans text-slate-300 mb-2">
                    API Usage Logging
                  </h2>
                  <p className="mb-2">
                    When you use our API endpoints (MCP or OpenAPI), standard
                    server logs may temporarily record:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>API endpoint accessed</li>
                    <li>Search queries submitted</li>
                    <li>Timestamp of requests</li>
                    <li>IP addresses (for security and debugging purposes)</li>
                  </ul>
                  <p className="mt-2">
                    These logs are used solely for maintaining service quality,
                    debugging, and security monitoring. They are not shared with
                    third parties and are retained only as long as necessary for
                    operational purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-sans text-slate-300 mb-2">
                    Third-Party Services
                  </h2>
                  <p>
                    If you access our API through third-party services (such as
                    ChatGPT Actions or MCP clients), those services may have
                    their own privacy policies and data handling practices. We
                    recommend reviewing their policies separately.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-sans text-slate-300 mb-2">
                    Data Security
                  </h2>
                  <p>
                    We implement reasonable security measures to protect any
                    data processed through our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-sans text-slate-300 mb-2">
                    Changes to This Policy
                  </h2>
                  <p>
                    We may update this privacy policy from time to time. Any
                    changes will be posted on this page with an updated revision
                    date.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-sans text-slate-300 mb-2">
                    Contact
                  </h2>
                  <p>
                    For questions about this privacy policy, please visit{" "}
                    <a
                      href="https://github.com/static-frame/static-frame-www/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-slate-200 underline transition-colors"
                    >
                      static-frame-www
                    </a>
                    .
                  </p>
                </section>

                <div className="pt-4 border-t border-zinc-800">
                  <a
                    href="/"
                    className="text-zinc-500 hover:text-zinc-400 font-sans text-sm inline-flex items-center gap-1 transition-colors"
                  >
                    <IconArrowLeft fill="currentColor" />
                    Back to search
                  </a>
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
