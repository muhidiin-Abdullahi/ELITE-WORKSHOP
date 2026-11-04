import Image from "next/image";

type ContentImageProps = {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  /** Marks the image as the page's main visual so it loads first. */
  priority?: boolean;
  sizes?: string;
  /** Sets the photo inside the slim window profile. */
  framed?: boolean;
};

export function ContentImage({
  src,
  alt,
  aspectClass = "aspect-[4/3]",
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  framed = false,
}: ContentImageProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      className="img-zoom object-cover"
      sizes={sizes}
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
    />
  );

  if (framed) {
    return (
      <div className={`window-frame group ${aspectClass} ${className}`.trim()}>
        <div className="window-frame-glass">{image}</div>
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden bg-surface-alt ${aspectClass} ${className}`.trim()}
    >
      {image}
    </div>
  );
}
