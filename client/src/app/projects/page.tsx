import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { img } from "@/content/gallery";
import { homeContent } from "@/content/pages";
import { getPublishedProjects } from "@/content/projects";
import { PortfolioEmptyState } from "@/features/projects/PortfolioEmptyState";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Fitted kitchens, media walls, room dividers, windows, and doors from ELITE WORKSHOP LTD projects.",
  path: "/projects",
});

/* Repeating rhythm: one wide + one medium row, then a row of three. */
const rhythm = [
  {
    cell: "lg:col-span-7",
    aspect: "aspect-[4/5] lg:aspect-[7/5]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw",
  },
  {
    cell: "lg:col-span-5",
    aspect: "aspect-[4/5] lg:aspect-square",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw",
  },
  {
    cell: "lg:col-span-4",
    aspect: "aspect-[4/5]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  {
    cell: "lg:col-span-4",
    aspect: "aspect-[4/5]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  {
    cell: "lg:col-span-4",
    aspect: "aspect-[4/5]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
] as const;

export default function ProjectsPage() {
  const published = getPublishedProjects();

  return (
    <>
      <PageHeader
        eyebrow="Workshop portfolio"
        title="Projects"
        description="Photography from ELITE WORKSHOP LTD projects — kitchens, media walls, dividers, and bespoke fitted furniture."
      />
      <div className="shell section-y">
        {published.length > 0 ? (
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
            {published.map((project, index) => {
              const layout = rhythm[index % rhythm.length];
              return (
                <Reveal
                  key={project.slug}
                  delay={(index % 3) * 70}
                  className={layout.cell}
                >
                  <ProjectCard
                    project={project}
                    aspectClass={layout.aspect}
                    sizes={layout.sizes}
                  />
                </Reveal>
              );
            })}
          </div>
        ) : (
          <PortfolioEmptyState />
        )}
      </div>
      <CtaBand
        title={homeContent.conversionTitle}
        body={homeContent.conversionBody}
        imageSrc={img("p03").src}
      >
        <ButtonLink href="/quote" arrow>
          Request a Quote
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact Us
        </ButtonLink>
      </CtaBand>
    </>
  );
}
