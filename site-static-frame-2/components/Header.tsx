import NextLink from "next/link";
import { cnHeaderButton } from "./Common";
import { Link } from "./Link";

export function Header() {
  return (
    <div className="absolute z-50 left-0 right-0 flex h-10 w-full bg-black/80">
      <div className="max-w-5xl mx-auto pr-5 pl-5 flex-1">
        <div className="pt-2 space-x-1 flex justify-between">
          <div className="space-x-1 flex">
            <NextLink
              href="/"
              className={`${cnHeaderButton} py-1 text-xs font-sans text-slate-400/60 hover:text-slate-300 transition-colors block`}
            >
              Search
            </NextLink>
            <NextLink
              href="/mcp"
              className={`${cnHeaderButton} py-1 text-xs font-sans text-slate-400/60 hover:text-slate-300 transition-colors block`}
            >
              MCP
            </NextLink>
          </div>
          <div className="space-x-1 flex">
            <Link
              label="Code"
              url="https://github.com/InvestmentSystems/static-frame"
              className={cnHeaderButton}
            />
            <Link
              label="Docs"
              url="https://static-frame.readthedocs.io/en/latest/"
              className={cnHeaderButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
