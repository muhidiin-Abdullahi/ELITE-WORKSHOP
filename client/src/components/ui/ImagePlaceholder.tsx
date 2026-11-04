type ImagePlaceholderProps = {
  label: string;
  aspectClass?: string;
  className?: string;
};

export function ImagePlaceholder({
  label,
  aspectClass = "aspect-[4/3]",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex items-end overflow-hidden border border-border bg-surface-alt ${aspectClass} ${className}`}
      aria-hidden="true"
    >
      <p className="relative z-10 p-4 text-overline text-muted">{label}</p>
    </div>
  );
}
