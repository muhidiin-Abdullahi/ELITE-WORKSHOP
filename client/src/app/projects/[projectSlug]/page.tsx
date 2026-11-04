import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ContentImage } from "@/components/ui/ContentImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TitleBlock } from "@/components/ui/TitleBlock";
import { homeContent } from "@/content/pages";
import {
  getProjectBySlug,
  getProjectsByService,
  getPublishedProjects,
} from "@/content/projects";
import { getServiceLabel } from "@/content/services";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ projectSlug: string }>;
};

const BUILD_PLACEHOLDER_SLUG = "__build_placeholder__";

export function generateStaticParams() {
  const published = getPublishedProjects();
  if (published.length === 0) {
    return [{ projectSlug: BUILD_PLACEHOLDER_SLUG }];
  }
  return published.map((project) => ({
    projectSlug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);
  if (!project) return {};
  return createPageMetadata({
    title: project.title,
    description: project.description.slice(0, 160),
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);
  if (!project) {
    notFound();
  }

  const [leadImage, ...moreImages] = project.images;
  const primaryService = project.services[0];
  const relatedProjects = primaryService
    ? getProjectsByService(primaryService)
        .filter((item) => item.slug !== project.slug)
        .slice(0, 3)
    : [];

  const facts = [
    {
      label: project.services.length > 1 ? "Services" : "Service",
      value: project.services.map(getServiceLabel).join(", "),
    },
    ...(project.location ? [{ label: "Location", value: project.location }] : []),
    ...(project.completedDate
      ? [{ label: "Completed", value: project.completedDate }]
      : []),
  ];

  return (
    <>
      <PageHeader
        title={project.title}
        description={project.description}
        image={leadImage}
        dimensionLabel="Measured · Built · Installed"
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/projects", label: "Projects" },
          { href: `/projects/${project.slug}`, label: project.title },
        ]}
      />

      <section className="section-y">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <Reveal offsetY={16} className="lg:col-span-5">
              <TitleBlock heading="Project record" rows={facts} />
            </Reveal>
            <Reveal delay={100} offsetY={16} className="lg:col-span-6 lg:col-start-7">
              <h2 className="text-h2 text-primary">{homeContent.conversionTitle}</h2>
              <p className="mt-5 text-body-lg text-muted">
                {homeContent.conversionBody}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/quote" arrow>
                  Request a Quote
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Contact Us
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {project.images.length === 0 ? (
            <p className="mt-10 text-sm text-muted">
              Project images are not available for this entry.
            </p>
          ) : null}

          {moreImages.length > 0 ? (
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {moreImages.map((image, index) => (
                <Reveal key={image.src} delay={index * 90}>
                  <ContentImage
                    src={image.src}
                    alt={image.alt}
                    aspectClass="aspect-[4/3]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {relatedProjects.length > 0 && primaryService ? (
        <section className="section-y bg-surface-alt">
          <div className="shell">
            <Reveal offsetY={18}>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow>{getServiceLabel(primaryService)}</Eyebrow>
                  <h2 className="mt-6 text-h2 text-primary">Related projects</h2>
                </div>
                <Link
                  href={`/services/${primaryService}`}
                  className="text-sm font-medium text-primary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent-text"
                >
                  View service
                </Link>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((item, index) => (
                <Reveal key={item.slug} delay={index * 80}>
                  <ProjectCard project={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
