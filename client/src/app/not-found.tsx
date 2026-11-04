import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ContentImage } from "@/components/ui/ContentImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { img } from "@/content/gallery";

export default function NotFound() {
  const photo = img("p06");

  return (
    <div className="shell section-y">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <Reveal className="lg:col-span-7">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-7 text-h1 text-primary">Page not found</h1>
          <p className="mt-6 max-w-xl text-body-lg text-muted">
            The page you requested is not available. Use the links below to
            continue browsing ELITE WORKSHOP LTD.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/" arrow>
              Home
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Services
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Us
            </ButtonLink>
            <ButtonLink href="/quote" variant="secondary">
              Request a Quote
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-muted">
            Looking for something specific?{" "}
            <Link
              href="/contact"
              className="text-accent-text underline underline-offset-4 hover:no-underline"
            >
              Contact the workshop
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
          <ContentImage
            src={photo.src}
            alt={photo.alt}
            framed
            aspectClass="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </Reveal>
      </div>
    </div>
  );
}
