import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import { getServiceLabel } from "@/content/services";
import type { Project } from "@/types/project";

export function ProjectCard({
  project,
  aspectClass = "aspect-[4/5]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  project: Project;
  aspectClass?: string;
  sizes?: string;
}) {
  const image = project.images[0];

  return (
    <article className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
      >
        <div className={`relative overflow-hidden bg-surface-alt ${aspectClass}`}>
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="img-zoom object-cover"
              sizes={sizes}
            />
          ) : null}
        </div>
        <div className="mt-4 flex items-start justify-between gap-4 border-t border-border pt-4">
          <div>
            <h3 className="text-h3 text-primary transition-colors duration-300 group-hover:text-accent-text">
              {project.title}
            </h3>
            <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
              {project.services.map((slug) => (
                <li key={slug} className="text-overline text-muted">
                  {getServiceLabel(slug)}
                </li>
              ))}
            </ul>
          </div>
          <ArrowIcon className="mt-2.5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-text motion-reduce:transition-none" />
        </div>
      </Link>
    </article>
  );
}
