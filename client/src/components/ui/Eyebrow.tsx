/** Red bar + technical label used above headings across the site. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-overline text-muted ${className}`.trim()}
    >
      <span className="eyebrow-bar" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
