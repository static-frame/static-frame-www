
import {
    versionSite,
  } from "./Common";



export function Footer() {
    return (<div className="flex flex-wrap h-20">
    <div className="mx-4 my-4">
    <p className="text-left text-sm text-zinc-700 leading-4 font-sans">StaticFrame site v{versionSite}. Report issues or feature requests at the <a
    className="text-slate-600 "
    href={"https://github.com/static-frame/static-frame-www/issues"}
    target="_blank"
    rel="noopener noreferrer"
    >static-frame-www</a> GitHub repository.
    </p>
    </div>
    </div>
)}
