"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact Us" },
] as const;

function navLinkClass(isActive: boolean) {
  return isActive
    ? "text-primary after:scale-x-100"
    : "text-muted hover:text-primary after:scale-x-0 hover:after:scale-x-100";
}

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative py-2 text-nav font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:bg-brand-red after:transition-transform after:duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus motion-reduce:after:transition-none ${navLinkClass(isActive)}`}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
      <ButtonLink href="/quote" size="sm" className="ml-2">
        Request a Quote
      </ButtonLink>
    </nav>
  );
}

export function mobileNavLinks(pathname: string) {
  return links.map((link) => {
    const isActive =
      link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
    return { ...link, isActive };
  });
}
