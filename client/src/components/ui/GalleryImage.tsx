import Image from "next/image";

type GalleryImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
};

/** Fills a positioned parent; the parent decides the tile's shape. */
export function GalleryImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: GalleryImageProps) {
  return (
    <figure className="group absolute inset-0 overflow-hidden bg-surface-alt">
      <Image
        src={src}
        alt={alt}
        fill
        className="img-zoom object-cover"
        sizes={sizes}
        loading={priority ? "eager" : undefined}
      />
      <figcaption
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 px-4 py-3 text-sm leading-snug text-white transition-transform duration-500 ease-out group-hover:translate-y-0 motion-reduce:transition-none"
      >
        {alt}
      </figcaption>
    </figure>
  );
}
