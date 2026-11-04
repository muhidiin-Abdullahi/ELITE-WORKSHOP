import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublishedProjects } from "@/content/projects";
import { SERVICE_SLUGS } from "@/types/service";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/contact",
    "/quote",
    "/privacy",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
  }));

  SERVICE_SLUGS.forEach((slug) => {
    entries.push({
      url: `${base}/services/${slug}`,
    });
  });

  getPublishedProjects().forEach((project) => {
    entries.push({
      url: `${base}/projects/${project.slug}`,
    });
  });

  return entries;
}
