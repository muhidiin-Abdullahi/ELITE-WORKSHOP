import { Reveal } from "@/components/motion/Reveal";
import { ContentImage } from "@/components/ui/ContentImage";
import type { ProjectImage } from "@/types/project";

const WIDE = {
  cell: "lg:col-span-3",
  aspect: "aspect-[4/5] lg:aspect-square",
  sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw",
};

const NARROW = {
  cell: "lg:col-span-2",
  aspect: "aspect-[4/5]",
  sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw",
};

/** How many leading images run wide so that every row closes evenly. */
function wideCount(total: number) {
  if (total % 3 === 2) return 2;
  if (total % 3 === 1) return 4;
  return 0;
}

/** Project photography laid out with a large row, then a smaller row. */
export function ImageMosaic({ images }: { images: ProjectImage[] }) {
  const wide = wideCount(images.length);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
      {images.map((image, index) => {
        const layout = index < wide ? WIDE : NARROW;
        return (
          <Reveal key={image.src} delay={(index % 3) * 70} className={layout.cell}>
            <ContentImage
              src={image.src}
              alt={image.alt}
              aspectClass={layout.aspect}
              sizes={layout.sizes}
            />
          </Reveal>
        );
      })}
    </div>
  );
}
