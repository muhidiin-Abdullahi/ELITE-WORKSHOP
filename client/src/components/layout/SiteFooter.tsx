import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { ContactDetails } from "./ContactDetails";
import { SiteLogo } from "./SiteLogo";

const footerLink =
  "text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export function SiteFooter() {
  const year = 2026;
  const socialEntries = Object.entries(siteConfig.social).filter(
    ([, url]) => url,
  );

  return (
    <footer className="surface-dark mt-auto">
      <div className="shell">
        <div className="grid gap-10 border-b border-border pb-14 lg:grid-cols-12 lg:items-start">
          {/* Maker's plate: mounts the white-backed logo flush to the page edge above. */}
          <div className="lg:col-span-4">
            <div className="inline-block bg-white px-5 pb-5 pt-7">
              <SiteLogo variant="footer" />
            </div>
          </div>
          <p className="max-w-3xl pt-2 text-h3 text-white lg:col-span-8 lg:pt-14">
            Workshop services for building and furniture-related projects.
          </p>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3 lg:col-start-5">
            <p className="text-overline text-muted">Pages</p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {[
                ["/about", "About Us"],
                ["/services", "Services"],
                ["/projects", "Projects"],
                ["/contact", "Contact Us"],
                ["/quote", "Request a Quote"],
                ["/privacy", "Privacy Policy"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className={footerLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-overline text-muted">Services</p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={footerLink}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="text-overline text-muted">Contact</p>
            <div className="mt-5">
              <ContactDetails />
            </div>
            {socialEntries.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-4 text-[0.9375rem]">
                {socialEntries.map(([network, url]) => (
                  <li key={network}>
                    <a
                      href={url}
                      className={footerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {network.charAt(0).toUpperCase() + network.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="shell py-6 text-sm text-muted">
          © {year} {siteConfig.companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
