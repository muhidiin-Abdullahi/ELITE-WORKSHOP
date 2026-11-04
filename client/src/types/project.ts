import type { ServiceSlug } from "./service";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  services: ServiceSlug[];
  location?: string;
  completedDate?: string;
  images: ProjectImage[];
  published: boolean;
};
