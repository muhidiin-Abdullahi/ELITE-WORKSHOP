import { ButtonLink } from "@/components/ui/Button";
import { portfolioEmptyMessage } from "@/content/projects";

export function PortfolioEmptyState() {
  return (
    <div className="border border-dashed border-border-strong px-6 py-16 text-center">
      <p className="mx-auto max-w-xl text-h3 text-primary">
        {portfolioEmptyMessage}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/quote" arrow>
          Request a Quote
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact Us
        </ButtonLink>
      </div>
    </div>
  );
}
