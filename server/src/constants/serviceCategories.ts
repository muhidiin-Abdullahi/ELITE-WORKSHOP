/** Canonical service slugs — must match frontend `SERVICE_SLUGS`. */
export const SERVICE_CATEGORY_SLUGS = [
  "pvc-works",
  "aluminium-works",
  "kitchen-furniture",
  "decorated-furniture",
] as const;

export type ServiceCategorySlug = (typeof SERVICE_CATEGORY_SLUGS)[number];
