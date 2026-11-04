import {
  aluminiumImg,
  aluminiumWorksGallery,
  img,
  pvcImg,
  pvcWorksGallery,
} from "@/content/gallery";
import type { ServiceCategory } from "@/types/service";

export const services: ServiceCategory[] = [
  {
    slug: "pvc-works",
    name: "PVC Works",
    summary:
      "PVC windows and doors — sliding, bi-fold, and French systems fitted for durable, low-maintenance openings.",
    introduction:
      "PVC works focus on door and window systems that connect rooms and bring in light while standing up to daily use. We measure openings, supply profiles to specification, and install sliding, bi-fold, and hinged French layouts with clean sight lines.",
    details: [
      "Site survey and opening preparation",
      "Sliding, bi-fold, and French PVC door options",
      "Glazing interfaces coordinated with interior and exterior finishes",
    ],
    coverImage: pvcImg("pvc05"),
    galleryImages: pvcWorksGallery,
    seoTitle: "PVC Works | ELITE WORKSHOP LTD",
    seoDescription:
      "PVC windows and doors from ELITE WORKSHOP LTD — sliding, bi-fold, and French installations.",
  },
  {
    slug: "aluminium-works",
    name: "Aluminium Works",
    summary:
      "Powder-coated aluminium windows and doors — casement, sliding, and French systems with slim profiles.",
    introduction:
      "Aluminium works cover window walls, sliding openings to balconies, and hinged French doors with sidelights. We supply durable powder-coated frames, coordinate glazing, and install for tight sight lines and smooth operation.",
    details: [
      "Casement and fixed-lite window assemblies",
      "Sliding and French door systems with sidelights",
      "Powder-coated finishes and hardware to specification",
    ],
    coverImage: aluminiumImg("alum03"),
    galleryImages: aluminiumWorksGallery,
    seoTitle: "Aluminium Works | ELITE WORKSHOP LTD",
    seoDescription:
      "Aluminium windows and doors from ELITE WORKSHOP LTD — casement, sliding, and French installations.",
  },
  {
    slug: "kitchen-furniture",
    name: "Kitchen Furniture",
    summary:
      "Bespoke fitted kitchens — cabinetry, islands, worktops, and integrated lighting.",
    introduction:
      "Kitchen furniture is designed and built around how you cook, store, and entertain. From handleless runs to statement islands, we combine workshop cabinetry with stone worktops, lighting, and appliance housing.",
    details: [
      "Layout design and material selection",
      "Custom cabinetry, islands, and pantries",
      "Worktop, splashback, and lighting integration",
    ],
    coverImage: img("p01"),
    galleryImages: [
      img("p01"),
      img("p02"),
      img("p04"),
      img("p09"),
      img("p13"),
    ],
    seoTitle: "Kitchen Furniture | ELITE WORKSHOP LTD",
    seoDescription:
      "Kitchen furniture from ELITE WORKSHOP LTD — fitted kitchens, islands, and integrated storage.",
  },
  {
    slug: "decorated-furniture",
    name: "Decorated Furniture",
    summary:
      "Feature joinery, media walls, room dividers, and decorative built-in furniture.",
    introduction:
      "Decorated furniture covers statement pieces that define a room: TV and media walls, slatted partitions, display shelving, and custom storage. Materials, lighting, and proportions are tailored to each space.",
    details: [
      "Media walls and entertainment units",
      "Room dividers and architectural screening",
      "Integrated lighting and display shelving",
    ],
    coverImage: img("p05"),
    galleryImages: [
      img("p05"),
      img("p06"),
      img("p08"),
      img("p11"),
      img("p12"),
    ],
    seoTitle: "Decorated Furniture | ELITE WORKSHOP LTD",
    seoDescription:
      "Decorated furniture from ELITE WORKSHOP LTD — media walls, dividers, and bespoke built-ins.",
  },
];

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceLabel(slug: string): string {
  return getServiceBySlug(slug)?.name ?? slug;
}
