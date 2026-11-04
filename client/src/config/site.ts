function envOrEmpty(key: string): string {
  const value = process.env[key];
  return value?.trim() ?? "";
}

/**
 * Public site configuration (non-secret).
 */
export const siteConfig = {
  companyName: "ELITE WORKSHOP LTD",
  logoSrc: "/images/elite-workshop-logo.png",
  logoAlt: "Elite Workshop Limited",
  phone: envOrEmpty("NEXT_PUBLIC_COMPANY_PHONE"),
  email: envOrEmpty("NEXT_PUBLIC_COMPANY_EMAIL"),
  address: envOrEmpty("NEXT_PUBLIC_COMPANY_ADDRESS"),
  hours: envOrEmpty("NEXT_PUBLIC_COMPANY_HOURS"),
  whatsapp: envOrEmpty("NEXT_PUBLIC_WHATSAPP_NUMBER"),
  siteUrl: envOrEmpty("NEXT_PUBLIC_SITE_URL") || "http://localhost:3020",
  apiBaseUrl:
    envOrEmpty("NEXT_PUBLIC_API_BASE_URL") || "http://localhost:5010/api/v1",
  social: {
    facebook: envOrEmpty("NEXT_PUBLIC_SOCIAL_FACEBOOK"),
    instagram: envOrEmpty("NEXT_PUBLIC_SOCIAL_INSTAGRAM"),
    linkedin: envOrEmpty("NEXT_PUBLIC_SOCIAL_LINKEDIN"),
  },
} as const;

export function hasContactDetails(): boolean {
  return Boolean(
    siteConfig.phone ||
      siteConfig.email ||
      siteConfig.address ||
      siteConfig.hours,
  );
}
