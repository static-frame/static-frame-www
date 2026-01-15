"use client";

import React, { ReactNode } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-python.min.js";
import "prismjs/themes/prism-tomorrow.css";

export const highlightColors = new Map<string, string>([
  ["", "text-slate-400"], // default text colors
  [",", "text-slate-500"],
  [".", "text-slate-300"],
  ["*", "text-indigo-400"],
  ["/", "text-indigo-500"],
  ["(", "text-slate-300"],
  [")", "text-slate-300"],
  ["[", "text-slate-300"],
  ["]", "text-slate-300"],
]);

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const ref = React.useRef<HTMLPreElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, []);
  return (
    <pre className="language-python" ref={ref} suppressHydrationWarning>
      <code suppressHydrationWarning>{code}</code>
    </pre>
  );
}

interface SigLabelProps {
  sigFull: string | undefined;
  fallbackText?: string;
  textClassName?: string;
}

export function SigLabel({
  sigFull,
  fallbackText,
  textClassName = "",
}: SigLabelProps) {
  if (!sigFull) {
    return <span className="text-slate-400">{fallbackText || ""}</span>;
  }

  const sigSpans: ReactNode[] = [];
  const buffer: string[] = [];
  let key = 0;

  const bufToSpan = () => {
    if (buffer.length) {
      sigSpans.push(
        <span className={highlightColors.get("")} key={key}>
          {buffer.join("")}
        </span>,
      );
      buffer.length = 0;
      key++;
    }
  };
  [...sigFull].forEach((e) => {
    if (highlightColors.has(e)) {
      bufToSpan();
      sigSpans.push(
        <span className={highlightColors.get(e)} key={key}>
          {e}
        </span>,
      );
      key++;
    } else {
      buffer.push(e);
    }
  });
  bufToSpan();

  return (
    <span className="break-words">
      <span className={`font-mono font-bold ${textClassName}`}>{sigSpans}</span>
    </span>
  );
}
