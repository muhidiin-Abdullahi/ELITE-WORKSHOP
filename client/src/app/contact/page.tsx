import { ContactDetails } from "@/components/layout/ContactDetails";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui/Button";
import { ContentImage } from "@/components/ui/ContentImage";
import { aluminiumImg } from "@/content/gallery";
import { contactIntro } from "@/content/pages";
import { ContactForm } from "@/features/contact/ContactForm";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description: "Contact ELITE WORKSHOP LTD or send a message through the website.",
  path: "/contact",
});

export default function ContactPage() {
  const photo = aluminiumImg("alum03");

  return (
    <>
      <PageHeader
        eyebrow="Elite Workshop Ltd"
        title="Contact Us"
        description={contactIntro}
      />
      <div className="shell section-y">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <section
              aria-labelledby="contact-details-heading"
              className="surface-dark p-7 md:p-10"
            >
              <h2 id="contact-details-heading" className="text-h3 text-primary">
                Contact details
              </h2>
              <div className="mt-6 border-t border-border pt-6">
                <ContactDetails />
              </div>
              <Link
                href="/quote"
                className="group mt-8 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm font-medium text-primary transition-colors hover:text-accent-text"
              >
                Request a Quote
                <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </section>
            <ContentImage
              src={photo.src}
              alt={photo.alt}
              aspectClass="aspect-[4/3]"
              className="mt-10 hidden lg:block"
              sizes="40vw"
              priority
            />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <section
              aria-labelledby="contact-form-heading"
              className="border border-border bg-surface-raised p-6 md:p-10 lg:p-12"
            >
              <h2 id="contact-form-heading" className="text-h2 text-primary">
                Send a message
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </>
  );
}
