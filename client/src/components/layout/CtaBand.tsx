import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { img } from "@/content/gallery";

type CtaBandProps = {
  title: string;
  body: string;
  /** Buttons. */
  children: React.ReactNode;
  /** Decorative photo; defaults to the gloss kitchen. */
  imageSrc?: string;
};

/** Closing call to action: ink panel with a photo set into its right edge. */
export function CtaBand({ title, body, children, imageSrc }: CtaBandProps) {
  return (
    <section className="pb-16 md:pb-24">
      <div className="shell">
        <Reveal>
          <div className="surface-dark grid overflow-hidden lg:grid-cols-12">
            <div className="px-6 py-14 md:px-12 md:py-20 lg:col-span-7 lg:px-16">
              <p className="flex items-center gap-3" aria-hidden="true">
                <span className="eyebrow-bar" />
              </p>
              <h2 className="mt-7 text-h2 text-primary">{title}</h2>
              <p className="mt-6 max-w-xl text-body-lg text-muted">{body}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {children}
              </div>
            </div>
            <div className="relative hidden min-h-full lg:col-span-5 lg:block">
              <Image
                src={imageSrc ?? img("p09").src}
                alt=""
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
