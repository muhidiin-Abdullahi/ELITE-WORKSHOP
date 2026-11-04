import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetaOptions = {
  title: string;
  description: string;
  path?: string;
};

export function createPageMetadata({
  title,
  description,
  path = "",
}: PageMetaOptions): Metadata {
  const url = new URL(path.replace(/^\//, ""), siteConfig.siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical: path ? url : siteConfig.siteUrl,
    },
    openGraph: {
      title,
      description,
      url: path ? url : siteConfig.siteUrl,
      siteName: siteConfig.companyName,
      type: "website",
      locale: "en_GB",
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.companyName,
    template: `%s | ${siteConfig.companyName}`,
  },
  description:
    "Professional workshop services including PVC works, aluminium works, kitchen furniture, and decorated furniture.",
};
