import Link from "next/link";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { ContentImage } from "@/components/ui/ContentImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { img } from "@/content/gallery";
import { aboutContent, homeContent } from "@/content/pages";
import { services } from "@/content/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "Introduction to ELITE WORKSHOP LTD and its workshop service categories.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title={aboutContent.title}
        description={aboutContent.introduction}
        image={img("p07")}
        dimensionLabel="Measured · Built · Installed"
      />

      <section className="section-y">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-14 lg:col-span-6 lg:self-center">
            <Reveal offsetY={18}>
              <Eyebrow>01</Eyebrow>
              <h2 className="mt-5 text-h2 text-primary">Our approach</h2>
              <p className="mt-5 max-w-xl text-body-lg text-muted">
                {aboutContent.approach}
              </p>
            </Reveal>
            <Reveal offsetY={18}>
              <Eyebrow>02</Eyebrow>
              <h2 className="mt-5 text-h2 text-primary">Capabilities</h2>
              <p className="mt-5 max-w-xl text-body-lg text-muted">
                {aboutContent.capabilities}
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:col-start-8 lg:gap-6">
            <Reveal delay={80} className="col-span-2">
              <ContentImage
                src={img("p04").src}
                alt={img("p04").alt}
                aspectClass="aspect-[5/4]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </Reveal>
            <Reveal delay={140}>
              <ContentImage
                src={img("p11").src}
                alt={img("p11").alt}
                aspectClass="aspect-[4/5]"
                sizes="(max-width: 1024px) 50vw, 21vw"
              />
            </Reveal>
            <Reveal delay={200}>
              <ContentImage
                src={img("p12").src}
                alt={img("p12").alt}
                aspectClass="aspect-[4/5]"
                sizes="(max-width: 1024px) 50vw, 21vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28 lg:pb-32">
        <div className="shell">
          <Reveal offsetY={18}>
            <Eyebrow>Services</Eyebrow>
          </Reveal>
          <ul className="mt-8 border-t border-primary">
            {services.map((service, index) => (
              <li key={service.slug} className="border-b border-border">
                <Reveal delay={index * 60} offsetY={12}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group grid items-baseline gap-2 py-7 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus md:grid-cols-12 md:gap-6"
                  >
                    <span
                      className="text-overline text-muted md:col-span-1"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-h2 text-primary transition-colors duration-300 group-hover:text-accent-text md:col-span-5">
                      {service.name}
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-muted md:col-span-5">
                      {service.summary}
                    </span>
                    <ArrowIcon className="hidden justify-self-end text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-text motion-reduce:transition-none md:col-span-1 md:block" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={homeContent.conversionTitle}
        body={homeContent.conversionBody}
        imageSrc={img("p12").src}
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
