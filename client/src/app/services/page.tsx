import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ContentImage } from "@/components/ui/ContentImage";
import { img } from "@/content/gallery";
import { services } from "@/content/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "PVC works, aluminium works, kitchen furniture, and decorated furniture services from ELITE WORKSHOP LTD.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Four categories"
        title="Services"
        description="Four service categories offered by ELITE WORKSHOP LTD. Select a category to read more and submit a quotation inquiry."
      />

      <div className="shell py-16 md:py-24">
        <div className="space-y-20 md:space-y-28 lg:space-y-32">
          {services.map((service, index) => {
            const flipped = index % 2 === 1;
            return (
              <article
                key={service.slug}
                className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10"
              >
                <Reveal
                  className={
                    flipped ? "lg:order-2 lg:col-span-6 lg:col-start-7" : "lg:col-span-6"
                  }
                >
                  <ContentImage
                    src={service.coverImage.src}
                    alt={service.coverImage.alt}
                    framed
                    aspectClass="aspect-[5/4]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </Reveal>
                <Reveal
                  delay={100}
                  offsetY={18}
                  className={
                    flipped ? "lg:order-1 lg:col-span-5" : "lg:col-span-5 lg:col-start-8"
                  }
                >
                  <p className="text-overline text-accent-text" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </p>
                  <h2 className="mt-5 text-h2 text-primary">{service.name}</h2>
                  <p className="mt-5 text-body-lg text-muted">{service.summary}</p>
                  <ul className="mt-7 border-t border-border">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="border-b border-border py-3 text-[0.9375rem] text-foreground"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={`/services/${service.slug}`}
                    variant="secondary"
                    arrow
                    className="mt-8"
                    aria-label={`View service: ${service.name}`}
                  >
                    View service
                  </ButtonLink>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>

      <CtaBand
        title="Not sure which category fits your project?"
        body="Contact the workshop and we will help route your inquiry."
        imageSrc={img("p10").src}
      >
        <ButtonLink href="/contact" arrow>
          Contact Us
        </ButtonLink>
        <ButtonLink href="/quote" variant="secondary">
          Request a Quote
        </ButtonLink>
      </CtaBand>
    </>
  );
}
