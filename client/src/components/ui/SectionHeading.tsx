import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

type SectionHeadingProps = {
  overline?: string;
  title: string;
  description?: string;
  /** Optional link or button set against the description. */
  action?: React.ReactNode;
};

export function SectionHeading({
  overline,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <Reveal offsetY={20}>
      {overline ? <Eyebrow>{overline}</Eyebrow> : null}
      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2 className="text-h2 text-primary lg:col-span-7">{title}</h2>
        {description || action ? (
          <div className="lg:col-span-4 lg:col-start-9">
            {description ? (
              <p className="text-body-lg text-muted">{description}</p>
            ) : null}
            {action ? <div className={description ? "mt-5" : ""}>{action}</div> : null}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
