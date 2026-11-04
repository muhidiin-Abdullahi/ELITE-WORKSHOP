import { notFound } from "next/navigation";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageMosaic } from "@/components/ui/ImageMosaic";
import { homeContent } from "@/content/pages";
import { getProjectsByService } from "@/content/projects";
import { getServiceBySlug } from "@/content/services";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { createPageMetadata } from "@/lib/metadata";
import { SERVICE_SLUGS, isServiceSlug } from "@/types/service";

type PageProps = {
  params: Promise<{ serviceSlug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};
  return createPageMetadata({
    title: service.name,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceSlug } = await params;
  if (!isServiceSlug(serviceSlug)) {
    notFound();
  }

  const service = getServiceBySlug(serviceSlug);
  if (!service) {
    notFound();
  }

  const relatedProjects = getProjectsByService(service.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        title={service.name}
        description={service.summary}
        image={service.coverImage}
        dimensionLabel="Measured · Built · Installed"
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.name },
        ]}
      />

      <section className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal offsetY={18} className="lg:col-span-7">
            <p className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.28] tracking-[-0.012em] text-primary">
              {service.introduction}
            </p>
          </Reveal>
          <Reveal delay={100} offsetY={18} className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-overline text-muted">Service details</h2>
            <ol className="mt-5 border-t border-primary">
              {service.details.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] gap-1 border-b border-border py-4 text-[0.9375rem] leading-relaxed text-foreground"
                >
                  <span
                    className="pt-0.5 text-overline text-accent-text"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {service.galleryImages.length > 0 ? (
        <section
          className="section-y bg-surface-alt"
          aria-labelledby="service-gallery-heading"
        >
          <div className="shell">
            <Reveal offsetY={18}>
              <Eyebrow>{service.name}</Eyebrow>
              <h2 id="service-gallery-heading" className="mt-6 text-h2 text-primary">
                Project photography
              </h2>
            </Reveal>
            <div className="mt-12">
              <ImageMosaic images={service.galleryImages} />
            </div>
          </div>
        </section>
      ) : null}

      {relatedProjects.length > 0 ? (
        <section className="section-y">
          <div className="shell">
            <Reveal offsetY={18}>
              <Eyebrow>Projects</Eyebrow>
              <h2 className="mt-6 text-h2 text-primary">Related projects</h2>
            </Reveal>
            <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 80}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="pt-20 md:pt-28" />
      )}

      <CtaBand
        title={homeContent.conversionTitle}
        body={homeContent.conversionBody}
        imageSrc={service.coverImage.src}
      >
        <ButtonLink href={`/quote?service=${service.slug}`} arrow>
          Request a Quote
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact Us
        </ButtonLink>
      </CtaBand>
    </>
  );
}
