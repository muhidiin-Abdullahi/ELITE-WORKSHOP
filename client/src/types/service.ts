export const SERVICE_SLUGS = [
  "pvc-works",
  "aluminium-works",
  "kitchen-furniture",
  "decorated-furniture",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceImage = {
  src: string;
  alt: string;
};

export type ServiceCategory = {
  slug: ServiceSlug;
  name: string;
  summary: string;
  introduction: string;
  details: string[];
  scopeNotice?: string;
  coverImage: ServiceImage;
  galleryImages: ServiceImage[];
  seoTitle: string;
  seoDescription: string;
};

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}
