import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetaOptions = {
  title: string;
  description: string;
  path?: string;
  /** Uses the title as written, without the "| ELITE WORKSHOP LTD" suffix. */
  absoluteTitle?: boolean;
};

/* Pages that set openGraph lose the file-based image, so it is listed here too. */
const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: `${siteConfig.companyName}: PVC, aluminium, kitchens and decorated furniture`,
};

export function createPageMetadata({
  title,
  description,
  path = "",
  absoluteTitle = false,
}: PageMetaOptions): Metadata {
  const url = new URL(path.replace(/^\//, ""), siteConfig.siteUrl).toString();
  const shareTitle = absoluteTitle
    ? title
    : `${title} | ${siteConfig.companyName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path ? url : siteConfig.siteUrl,
    },
    openGraph: {
      title: shareTitle,
      description,
      url: path ? url : siteConfig.siteUrl,
      siteName: siteConfig.companyName,
      type: "website",
      locale: "en_GB",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [shareImage],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.companyName,
  title: {
    default: siteConfig.companyName,
    template: `%s | ${siteConfig.companyName}`,
  },
  description:
    "ELITE WORKSHOP LTD: PVC works, aluminium works, fitted kitchens, and decorated furniture, measured, built, and installed.",
};
