import { aluminiumImg, img, pvcImg } from "@/content/gallery";
import type { Project } from "@/types/project";
import type { ServiceSlug } from "@/types/service";

export const projects: Project[] = [
  {
    slug: "two-tone-kitchen-island",
    title: "Two-tone kitchen with island seating",
    description:
      "Fitted kitchen combining wood-grain fronts, matte base units, quartz surfaces, and a suspended lighting feature over the island.",
    services: ["kitchen-furniture"],
    images: [img("p01")],
    published: true,
  },
  {
    slug: "ambient-dark-kitchen",
    title: "Ambient-lit modern kitchen",
    description:
      "Handleless dark kitchen with integrated LED strips, island cooktop, and concealed storage for a streamlined look.",
    services: ["kitchen-furniture"],
    images: [img("p02")],
    published: true,
  },
  {
    slug: "grid-lit-white-kitchen",
    title: "Grid cabinetry with warm lighting",
    description:
      "Bright kitchen layout with wood accents, marble surfaces, and layered ceiling and under-cabinet lighting.",
    services: ["kitchen-furniture"],
    images: [img("p03")],
    published: true,
  },
  {
    slug: "wood-slatted-kitchen",
    title: "Wood-slatted kitchen with marble",
    description:
      "Warm vertical slats, marble worktops, and pendant lighting balanced with practical base storage.",
    services: ["kitchen-furniture", "decorated-furniture"],
    images: [img("p04")],
    published: true,
  },
  {
    slug: "marble-media-feature-wall",
    title: "Marble and wood media feature wall",
    description:
      "Floor-to-ceiling TV wall with book-matched stone, fluted wood, floating console, and accent LED strips.",
    services: ["decorated-furniture"],
    images: [img("p05")],
    published: true,
  },
  {
    slug: "hex-room-divider",
    title: "Hexagonal room divider shelving",
    description:
      "Custom partition combining open hex modules and side shelving to divide living spaces while keeping light flow.",
    services: ["decorated-furniture"],
    images: [img("p06")],
    published: true,
  },
  {
    slug: "slatted-canopy-kitchen",
    title: "Slatted canopy kitchen",
    description:
      "Kitchen wrapped in architectural wood slats with integrated shelving, large glazing, and a two-level island.",
    services: ["kitchen-furniture"],
    images: [img("p07")],
    published: true,
  },
  {
    slug: "slatted-media-divider",
    title: "Slatted media wall and divider",
    description:
      "Light wood screen with integrated TV niche, display shelves, and base drawers for living-area storage.",
    services: ["decorated-furniture"],
    images: [img("p08")],
    published: true,
  },
  {
    slug: "gloss-grey-kitchen",
    title: "Gloss kitchen with lit island",
    description:
      "High-gloss grey cabinetry, illuminated island, and coordinated pendant globes over the prep zone.",
    services: ["kitchen-furniture"],
    images: [img("p09")],
    published: true,
  },
  {
    slug: "waterfall-breakfast-bar",
    title: "Waterfall breakfast bar kitchen",
    description:
      "Minimal layout pairing a wood waterfall counter with black accents, open shelving, and compact bar seating.",
    services: ["kitchen-furniture"],
    images: [img("p10")],
    published: true,
  },
  {
    slug: "white-media-wall",
    title: "White and wood media wall",
    description:
      "Built-in entertainment wall with textured wood panels, glass shelves, and low mobile storage beneath the screen.",
    services: ["decorated-furniture"],
    images: [img("p11")],
    published: true,
  },
  {
    slug: "walnut-entertainment-unit",
    title: "Walnut entertainment unit",
    description:
      "Rich wood media console and back panel with integrated downlighting and concealed media storage.",
    services: ["decorated-furniture"],
    images: [img("p12")],
    published: true,
  },
  {
    slug: "marble-breakfast-bar",
    title: "Marble breakfast bar kitchen",
    description:
      "Open kitchen with marble island tiers, wood shelving, and pendant lights over casual dining space.",
    services: ["kitchen-furniture"],
    images: [img("p13")],
    published: true,
  },
  {
    slug: "sliding-door-timber-cladding",
    title: "Sliding door on timber-clad facade",
    description:
      "Wide sliding PVC door system with slim frames, set into vertical timber cladding for indoor-outdoor flow.",
    services: ["pvc-works"],
    images: [pvcImg("pvc01")],
    published: true,
  },
  {
    slug: "floor-to-ceiling-window-wall",
    title: "Floor-to-ceiling window wall",
    description:
      "White PVC-framed glazing wrapping a living area, paired with built-in shelving and neutral finishes.",
    services: ["pvc-works"],
    images: [pvcImg("pvc02")],
    published: true,
  },
  {
    slug: "pvc-bifold-kitchen-link",
    title: "PVC bi-fold kitchen link",
    description:
      "White bi-fold PVC doors opening a kitchen and dining zone with multi-panel stacking hardware.",
    services: ["pvc-works"],
    images: [pvcImg("pvc03")],
    published: true,
  },
  {
    slug: "french-doors-stone-patio",
    title: "French doors to stone patio",
    description:
      "Double French PVC doors with full-height glass, exterior lighting, and access to a paved patio.",
    services: ["pvc-works"],
    images: [pvcImg("pvc04")],
    published: true,
  },
  {
    slug: "french-doors-garden-view",
    title: "French doors with garden view",
    description:
      "Inward-opening white French PVC doors from a living room to a bright garden patio.",
    services: ["pvc-works"],
    images: [pvcImg("pvc05")],
    published: true,
  },
  {
    slug: "charcoal-casement-windows",
    title: "Charcoal casement window wall",
    description:
      "Four-panel aluminium casement windows with anthracite frames set into a clean white facade.",
    services: ["aluminium-works"],
    images: [aluminiumImg("alum01")],
    published: true,
  },
  {
    slug: "black-grid-entry-doors",
    title: "Black grid entry doors",
    description:
      "Matte black aluminium doors with transom and divided glazing, flanked by exterior wall lights.",
    services: ["aluminium-works"],
    images: [aluminiumImg("alum02")],
    published: true,
  },
  {
    slug: "sliding-door-balcony-view",
    title: "Sliding door to balcony",
    description:
      "Floor-to-ceiling aluminium sliding system linking a living area to a balcony with panoramic views.",
    services: ["aluminium-works"],
    images: [aluminiumImg("alum03")],
    published: true,
  },
  {
    slug: "french-doors-stone-entry",
    title: "French doors with sidelights",
    description:
      "Bronze-finish aluminium French doors and sidelights with a traditional grid pattern in a stone entry.",
    services: ["aluminium-works"],
    images: [aluminiumImg("alum04")],
    published: true,
  },
];

export const portfolioEmptyMessage =
  "Project photography and case studies will be published here once available from ELITE WORKSHOP LTD.";

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && p.published);
}

export function getProjectsByService(serviceSlug: ServiceSlug): Project[] {
  return getPublishedProjects().filter((p) => p.services.includes(serviceSlug));
}
