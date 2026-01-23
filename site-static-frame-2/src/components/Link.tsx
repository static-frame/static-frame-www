export interface LinkProps {
  label: string;
  url: string;
  className?: string;
}

export function Link({ label, url, className = "" }: LinkProps) {
  return (
    <a
      className={`${className}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
