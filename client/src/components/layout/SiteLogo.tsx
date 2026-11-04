import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type SiteLogoProps = {
  variant?: "header" | "footer" | "hero";
  linked?: boolean;
  className?: string;
};

/*
 * The logo file has an opaque white background. On light surfaces multiply
 * drops the white so it sits directly on the plaster; on dark surfaces it is
 * mounted on a white maker's plate (see SiteFooter).
 */
const variantClass: Record<NonNullable<SiteLogoProps["variant"]>, string> = {
  header: "h-10 w-auto mix-blend-multiply sm:h-11",
  footer: "h-14 w-auto",
  hero: "h-11 w-auto mix-blend-multiply",
};

export function SiteLogo({
  variant = "header",
  linked = true,
  className = "",
}: SiteLogoProps) {
  const eager = variant === "header" || variant === "hero";
  const image = (
    <Image
      src={siteConfig.logoSrc}
      alt={siteConfig.logoAlt}
      width={547}
      height={222}
      className={`object-contain object-left ${variantClass[variant]} ${className}`.trim()}
      loading={eager ? "eager" : undefined}
    />
  );

  if (!linked) {
    return image;
  }

  return (
    <Link
      href="/"
      className="inline-flex shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
    >
      {image}
    </Link>
  );
}
