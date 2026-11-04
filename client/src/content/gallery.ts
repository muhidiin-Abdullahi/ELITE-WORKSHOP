import type { ProjectImage } from "@/types/project";

/** Owner-provided workshop photography (public/static). */
export const portfolioImages = {
  p01: {
    src: "/images/portfolio/portfolio-01.jpg",
    alt: "Contemporary kitchen with wood-grain island, quartz worktops, and pendant lighting",
  },
  p02: {
    src: "/images/portfolio/portfolio-02.jpg",
    alt: "Modern dark-toned kitchen with integrated LED lighting and island seating",
  },
  p03: {
    src: "/images/portfolio/portfolio-03.jpg",
    alt: "Bright handleless kitchen with wood accents and under-cabinet lighting",
  },
  p04: {
    src: "/images/portfolio/portfolio-04.jpg",
    alt: "Warm wood-slatted kitchen with marble surfaces and pendant globes",
  },
  p05: {
    src: "/images/portfolio/portfolio-05.jpg",
    alt: "Custom TV feature wall combining marble panels, wood slats, and display shelving",
  },
  p06: {
    src: "/images/portfolio/portfolio-06.jpg",
    alt: "Geometric hexagonal room divider with integrated open shelving",
  },
  p07: {
    src: "/images/portfolio/portfolio-07.jpg",
    alt: "Kitchen with architectural wood slat ceiling feature and large window frames",
  },
  p08: {
    src: "/images/portfolio/portfolio-08.jpg",
    alt: "Light wood slat media wall and room divider with integrated storage",
  },
  p09: {
    src: "/images/portfolio/portfolio-09.jpg",
    alt: "Gloss grey kitchen cabinetry with illuminated island and bar seating",
  },
  p10: {
    src: "/images/portfolio/portfolio-10.jpg",
    alt: "Minimal kitchen with waterfall wood breakfast bar and matte black accents",
  },
  p11: {
    src: "/images/portfolio/portfolio-11.jpg",
    alt: "Built-in white and wood media wall with floating shelves and concealed storage",
  },
  p12: {
    src: "/images/portfolio/portfolio-12.jpg",
    alt: "Walnut entertainment unit with integrated lighting and media storage",
  },
  p13: {
    src: "/images/portfolio/portfolio-13.jpg",
    alt: "Light wood kitchen with marble breakfast bar and open shelving",
  },
} as const satisfies Record<string, ProjectImage>;

export type PortfolioImageKey = keyof typeof portfolioImages;

export function img(key: PortfolioImageKey): ProjectImage {
  return portfolioImages[key];
}

/** PVC doors and windows — used only on PVC Works pages and related portfolio entries. */
export const pvcWorksImages = {
  pvc01: {
    src: "/images/pvc/pvc-01.jpg",
    alt: "Large sliding door with slim frames opening to a deck beside vertical timber cladding",
  },
  pvc02: {
    src: "/images/pvc/pvc-02.jpg",
    alt: "Floor-to-ceiling white-framed windows in a bright living space with built-in shelving",
  },
  pvc03: {
    src: "/images/pvc/pvc-03.jpg",
    alt: "White PVC bi-fold doors linking an interior kitchen area to adjacent space",
  },
  pvc04: {
    src: "/images/pvc/pvc-04.webp",
    alt: "White French doors with glass panes set in a stone exterior wall with patio lighting",
  },
  pvc05: {
    src: "/images/pvc/pvc-05.png",
    alt: "White French doors opening from a living room to a garden patio with natural light",
  },
} as const satisfies Record<string, ProjectImage>;

export type PvcWorksImageKey = keyof typeof pvcWorksImages;

export function pvcImg(key: PvcWorksImageKey): ProjectImage {
  return pvcWorksImages[key];
}

export const pvcWorksGallery: ProjectImage[] = Object.values(pvcWorksImages);

/** Aluminium windows and doors — used only on Aluminium Works pages and related portfolio entries. */
export const aluminiumWorksImages = {
  alum01: {
    src: "/images/aluminium/alum-01.jpg",
    alt: "Charcoal aluminium casement windows in a white exterior wall with slim frames",
  },
  alum02: {
    src: "/images/aluminium/alum-02.jpg",
    alt: "Black aluminium-framed glass doors with transom and grid glazing on a light facade",
  },
  alum03: {
    src: "/images/aluminium/alum-03.webp",
    alt: "Dark grey aluminium sliding door opening from a living room to a balcony with a valley view",
  },
  alum04: {
    src: "/images/aluminium/alum-04.jpg",
    alt: "Bronze-toned aluminium French doors and sidelights with a classic grid pattern in a stone entry",
  },
} as const satisfies Record<string, ProjectImage>;

export type AluminiumWorksImageKey = keyof typeof aluminiumWorksImages;

export function aluminiumImg(key: AluminiumWorksImageKey): ProjectImage {
  return aluminiumWorksImages[key];
}

export const aluminiumWorksGallery: ProjectImage[] =
  Object.values(aluminiumWorksImages);
