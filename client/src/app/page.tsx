import { CtaBand } from "@/components/layout/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ContentImage } from "@/components/ui/ContentImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GalleryImage } from "@/components/ui/GalleryImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { img, type PortfolioImageKey } from "@/content/gallery";
import { heroSlides } from "@/content/heroSlides";
import { homeContent } from "@/content/pages";
import { getPublishedProjects } from "@/content/projects";
import { services } from "@/content/services";
import { HomeHero } from "@/features/home/HomeHero";
import { PortfolioEmptyState } from "@/features/projects/PortfolioEmptyState";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { ServiceCard } from "@/features/services/ServiceCard";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "ELITE WORKSHOP LTD | PVC, Aluminium, Kitchens & Decorated Furniture",
  description:
    "PVC windows and doors, aluminium works, fitted kitchens, and decorated furniture, measured, built, and installed by ELITE WORKSHOP LTD.",
  path: "/",
  absoluteTitle: true,
});

/* Editorial mosaic: each tile's shape is matched to its photo's crop. */
const galleryTiles: Array<{
  key: PortfolioImageKey;
  cell: string;
  sizes: string;
}> = [
  {
    key: "p05",
    cell: "col-span-2 aspect-[4/5] lg:col-span-5 lg:row-span-4 lg:aspect-auto",
    sizes: "(max-width: 1024px) 100vw, 42vw",
  },
  {
    key: "p06",
    cell: "aspect-square lg:col-span-4 lg:row-span-2 lg:aspect-auto",
    sizes: "(max-width: 1024px) 50vw, 33vw",
  },
  {
    key: "p08",
    cell: "aspect-square lg:col-span-3 lg:row-span-2 lg:aspect-auto",
    sizes: "(max-width: 1024px) 50vw, 25vw",
  },
  {
    key: "p04",
    cell: "col-span-2 aspect-[4/3] lg:col-span-7 lg:row-span-2 lg:aspect-auto",
    sizes: "(max-width: 1024px) 100vw, 58vw",
  },
  {
    key: "p02",
    cell: "col-span-2 aspect-[4/3] lg:col-span-7 lg:row-span-3 lg:aspect-auto",
    sizes: "(max-width: 1024px) 100vw, 58vw",
  },
  {
    key: "p13",
    cell: "col-span-2 aspect-[4/5] lg:col-span-5 lg:row-span-3 lg:aspect-auto",
    sizes: "(max-width: 1024px) 100vw, 42vw",
  },
];

export default function HomePage() {
  const featuredProjects = getPublishedProjects().slice(0, 6);

  return (
    <>
      <HomeHero
        description={homeContent.heroDescription}
        slides={heroSlides}
      />

      {/* Services */}
      <section id="services" className="surface-dark section-y scroll-mt-20">
        <div className="shell">
          <SectionHeading
            overline="Services"
            title="Four workshop service categories"
            description="Explore each category to learn more and request a quotation inquiry."
          />
          <div className="service-rail mt-14">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 90} offsetY={22}>
                <ServiceCard service={service} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About and process */}
      <section className="section-y">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <ContentImage
                src={img("p07").src}
                alt={img("p07").alt}
                framed
                aspectClass="aspect-[6/7]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
              <Reveal offsetY={20}>
                <Eyebrow>Workshop</Eyebrow>
                <h2 className="mt-6 text-h2 text-primary">
                  {homeContent.introTitle}
                </h2>
                <p className="mt-6 text-body-lg text-muted">
                  {homeContent.introBody}
                </p>
              </Reveal>
              <ol className="mt-10 border-t border-border">
                {homeContent.process.map((step, index) => (
                  <li key={step.title} className="border-b border-border">
                    <Reveal
                      delay={index * 80}
                      offsetY={14}
                      className="grid gap-2 py-5 sm:grid-cols-[3rem_8rem_1fr] sm:items-baseline sm:gap-4"
                    >
                      <span
                        className="text-overline text-accent-text"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-h3 text-primary">{step.title}</h3>
                      <p className="text-[0.9375rem] leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ol>
              <Reveal delay={120}>
                <ButtonLink
                  href="/about"
                  variant="secondary"
                  arrow
                  className="mt-10"
                >
                  About the workshop
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-y bg-surface-alt">
        <div className="shell">
          <SectionHeading
            overline="Gallery"
            title="Craftsmanship in detail"
            description="Feature joinery, kitchens, and room-defining furniture from recent workshop work."
          />
          <div className="mt-14 grid grid-cols-2 gap-4 lg:auto-rows-[10.5rem] lg:grid-cols-12 lg:gap-6">
            {galleryTiles.map((tile, index) => (
              <Reveal
                key={tile.key}
                delay={(index % 3) * 80}
                offsetY={22}
                className={`relative ${tile.cell}`}
              >
                <GalleryImage
                  src={img(tile.key).src}
                  alt={img(tile.key).alt}
                  sizes={tile.sizes}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-y">
        <div className="shell">
          <SectionHeading
            overline="Projects"
            title="Recent workshop projects"
            description="A selection of fitted kitchens, media walls, and custom joinery from recent workshop projects."
            action={
              <ButtonLink href="/projects" variant="secondary" arrow>
                View Projects
              </ButtonLink>
            }
          />
          <div className="mt-14">
            {featuredProjects.length > 0 ? (
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project, index) => (
                  <Reveal
                    key={project.slug}
                    delay={(index % 3) * 80}
                    className={index % 3 === 1 ? "lg:mt-16" : undefined}
                  >
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <PortfolioEmptyState />
            )}
          </div>
        </div>
      </section>

      <CtaBand
        title={homeContent.conversionTitle}
        body={homeContent.conversionBody}
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
