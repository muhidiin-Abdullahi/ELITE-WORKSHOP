import { siteConfig } from "@/config/site";

export function OrganizationJsonLd() {
  const data: Record<string, string> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName,
    url: siteConfig.siteUrl,
    logo: new URL(siteConfig.logoSrc, siteConfig.siteUrl).toString(),
  };

  if (siteConfig.email) {
    data.email = siteConfig.email;
  }
  if (siteConfig.phone) {
    data.telephone = siteConfig.phone;
  }
  if (siteConfig.address) {
    data.address = siteConfig.address;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
