import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { privacyDraft } from "@/content/privacy";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy information for ELITE WORKSHOP LTD website contact and quotation forms.",
  path: "/privacy",
});

function sectionId(index: number) {
  return `section-${index + 1}`;
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Draft policy for review — not legal advice. Content reflects the contact and quotation forms on this website."
      />
      <div className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal offsetY={16} className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {privacyDraft.lastUpdated ? (
                <p className="text-sm text-muted">
                  Last updated: {privacyDraft.lastUpdated}
                </p>
              ) : (
                <p className="border-l-[5px] border-brand-red bg-surface-alt px-4 py-3 text-sm leading-relaxed text-muted">
                  Legal review pending. Do not treat this page as final compliance
                  documentation.
                </p>
              )}
              <nav aria-label="On this page" className="mt-8 hidden lg:block">
                <ol className="border-t border-border">
                  {privacyDraft.sections.map((section, index) => (
                    <li key={section.title} className="border-b border-border">
                      <a
                        href={`#${sectionId(index)}`}
                        className="flex gap-3 py-3 text-sm text-muted transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      >
                        <span className="text-overline pt-0.5" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </Reveal>
          <Reveal delay={80} offsetY={16} className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-12">
              {privacyDraft.sections.map((section, index) => (
                <section
                  key={section.title}
                  id={sectionId(index)}
                  className="scroll-mt-28"
                >
                  <p className="text-overline text-accent-text" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-h3 text-primary">{section.title}</h2>
                  <p className="mt-4 max-w-[42rem] text-base leading-[1.75] text-muted">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
