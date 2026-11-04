import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import type { ServiceCategory } from "@/types/service";

/** Tall photographic panel; widens on hover inside `.service-rail`. */
export function ServiceCard({
  service,
  index,
}: {
  service: ServiceCategory;
  index: number;
}) {
  return (
    <article className="service-panel group relative h-full min-h-[26rem] overflow-hidden bg-ink lg:min-h-0">
      <Link
        href={`/services/${service.slug}`}
        className="absolute inset-0 flex flex-col justify-between p-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white lg:p-7"
      >
        <Image
          src={service.coverImage.src}
          alt={service.coverImage.alt}
          fill
          className="img-zoom -z-0 object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />
        <span
          className="service-panel-scrim absolute inset-0"
          aria-hidden="true"
        />
        <span
          className="relative self-start bg-ink px-2 py-1 text-overline text-white"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative">
          <h3 className="max-w-[10ch] font-display text-[2.125rem] leading-[1.05] tracking-[-0.018em]">
            {service.name}
          </h3>
          <div className="service-panel-reveal">
            <div>
              <p className="pt-3 text-[0.9375rem] leading-relaxed text-white/85">
                {service.summary}
              </p>
            </div>
          </div>
          <span className="mt-5 flex items-center gap-3 border-t border-white/30 pt-4 text-sm font-medium">
            View service
            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
          </span>
        </div>
      </Link>
    </article>
  );
}
