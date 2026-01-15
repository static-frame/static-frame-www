export interface LinkProps {
  label: string;
  url: string;
}

export function Link({ label, url }: LinkProps) {
  return (
    <div>
      <a
        className="text-xs font-sans text-slate-400/60 "
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    </div>
  );
}
