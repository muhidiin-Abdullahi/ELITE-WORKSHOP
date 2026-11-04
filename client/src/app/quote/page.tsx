import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ContentImage } from "@/components/ui/ContentImage";
import { img } from "@/content/gallery";
import { homeContent, quoteIntro } from "@/content/pages";
import { QuoteForm } from "@/features/quote/QuoteForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Request a Quote",
  description:
    "Submit a quotation inquiry to ELITE WORKSHOP LTD with your project details.",
  path: "/quote",
});

function QuoteFormFallback() {
  return (
    <p className="text-sm text-muted" aria-live="polite">
      Loading quotation form…
    </p>
  );
}

export default function QuotePage() {
  const photo = img("p10");

  return (
    <>
      <PageHeader
        eyebrow="Quotation inquiry"
        title="Request a Quote"
        description={quoteIntro}
      />
      <div className="shell section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <div className="border border-border bg-surface-raised p-6 md:p-10 lg:p-12">
              <Suspense fallback={<QuoteFormFallback />}>
                <QuoteForm />
              </Suspense>
            </div>
          </Reveal>
          <Reveal
            delay={120}
            offsetY={18}
            className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9"
          >
            <aside className="lg:sticky lg:top-28">
              <ContentImage
                src={photo.src}
                alt={photo.alt}
                framed
                aspectClass="aspect-[4/3]"
                className="hidden lg:block"
                sizes="30vw"
                priority
              />
              <h2 className="text-overline text-muted lg:mt-8">How it works</h2>
              <ol className="mt-4 border-t border-primary">
                {homeContent.process.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.5rem_1fr] gap-1 border-b border-border py-4"
                  >
                    <span
                      className="pt-1 text-overline text-accent-text"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </Reveal>
        </div>
      </div>
    </>
  );
}
