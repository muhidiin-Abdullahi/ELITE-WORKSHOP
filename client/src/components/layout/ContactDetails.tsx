import { siteConfig } from "@/config/site";

const linkClass =
  "text-primary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent-text hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

const labelClass = "text-overline text-muted";

export function ContactDetails() {
  const { phone, email, address, hours, whatsapp } = siteConfig;
  const hasAny = phone || email || address || hours || whatsapp;

  if (!hasAny) {
    return (
      <p className="text-sm leading-relaxed text-muted">
        Official contact details will be published here when provided by ELITE
        WORKSHOP LTD.
      </p>
    );
  }

  return (
    <dl className="space-y-5 text-[0.9375rem]">
      {phone ? (
        <div>
          <dt className={labelClass}>Phone</dt>
          <dd className="mt-1.5">
            <a className={linkClass} href={`tel:${phone.replace(/\s/g, "")}`}>
              {phone}
            </a>
          </dd>
        </div>
      ) : null}
      {email ? (
        <div>
          <dt className={labelClass}>Email</dt>
          <dd className="mt-1.5">
            <a className={linkClass} href={`mailto:${email}`}>
              {email}
            </a>
          </dd>
        </div>
      ) : null}
      {whatsapp ? (
        <div>
          <dt className={labelClass}>WhatsApp</dt>
          <dd className="mt-1.5">
            <a
              className={linkClass}
              href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp
            </a>
          </dd>
        </div>
      ) : null}
      {address ? (
        <div>
          <dt className={labelClass}>Address</dt>
          <dd className="mt-1.5 text-primary">{address}</dd>
        </div>
      ) : null}
      {hours ? (
        <div>
          <dt className={labelClass}>Hours</dt>
          <dd className="mt-1.5 text-primary">{hours}</dd>
        </div>
      ) : null}
    </dl>
  );
}
