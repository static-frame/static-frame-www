export interface LinkProps {
  label: string;
  url: string;
  className?: string;
}

export function Link({ label, url, className = "" }: LinkProps) {
  return (
    <a
      className={`py-1 text-xs font-sans text-slate-400/60 hover:text-slate-300 transition-colors block ${className}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
