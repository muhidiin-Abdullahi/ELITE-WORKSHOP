import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ContentImage } from "@/components/ui/ContentImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Crumb = { href: string; label: string };

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  /** Small label above the title; breadcrumbs take its place when present. */
  eyebrow?: string;
  /** With an image the header splits into a copy column and a framed photo. */
  image?: { src: string; alt: string };
  /** Text lettered on the dimension line above the framed photo. */
  dimensionLabel?: string;
};

function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-overline text-muted">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {items.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-3">
            {index > 0 ? (
              <span aria-hidden="true" className="h-px w-4 bg-border-strong" />
            ) : null}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-primary">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="underline-offset-4 transition-colors hover:text-accent-text hover:underline"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  eyebrow,
  image,
  dimensionLabel,
}: PageHeaderProps) {
  const lead =
    breadcrumbs && breadcrumbs.length > 0 ? (
      <Breadcrumbs items={breadcrumbs} />
    ) : eyebrow ? (
      <Eyebrow>{eyebrow}</Eyebrow>
    ) : null;

  if (image) {
    return (
      <div className="border-b border-border">
        <div className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-20">
          <Reveal offsetY={18} className="lg:col-span-7">
            {lead}
            <h1 className="mt-7 text-h1 text-primary">{title}</h1>
            {description ? (
              <p className="mt-7 max-w-[38rem] text-body-lg text-muted">
                {description}
              </p>
            ) : null}
          </Reveal>
          <Reveal delay={120} offsetY={18} className="lg:col-span-5">
            {dimensionLabel ? (
              <p
                className="dimension-line mb-4 text-overline"
                aria-hidden="true"
              >
                {dimensionLabel}
              </p>
            ) : null}
            <ContentImage
              src={image.src}
              alt={image.alt}
              framed
              priority
              aspectClass="aspect-[5/6]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border">
      <div className="shell py-14 md:py-20 lg:py-24">
        <Reveal offsetY={18}>
          {lead}
          <div className="mt-7 grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-10">
            <h1 className="text-h1 text-primary lg:col-span-7">{title}</h1>
            {description ? (
              <p className="text-body-lg text-muted lg:col-span-5 lg:pb-2">
                {description}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
