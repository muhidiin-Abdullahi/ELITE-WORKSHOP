import { img } from "@/content/gallery";
import type { ProjectImage } from "@/types/project";

export type HeroSlideHighlight = {
  label: string;
  detail: string;
};

export type HeroSlide = {
  image: ProjectImage;
  eyebrow: string;
  /** Short label for slide thumbnails */
  title: string;
  subtitle: string;
  /** Bold display headline (one accent word in brand red) */
  headlineWords: string[];
  headlineAccentIndex: number;
  highlights: HeroSlideHighlight[];
};

export const heroSlides: HeroSlide[] = [
  {
    image: img("p01"),
    eyebrow: "Workshop built",
    title: "Island kitchens",
    subtitle: "Kitchen furniture",
    headlineWords: ["Craft", "Island", "Kitchens", "That", "Inspire"],
    headlineAccentIndex: 1,
    highlights: [
      { label: "Cabinetry", detail: "Bespoke" },
      { label: "Worktops", detail: "Quartz" },
      { label: "Lighting", detail: "Integrated" },
      { label: "Seating", detail: "Island bar" },
      { label: "Storage", detail: "Full height" },
      { label: "Install", detail: "On site" },
    ],
  },
  {
    image: img("p02"),
    eyebrow: "Workshop built",
    title: "Ambient kitchens",
    subtitle: "Kitchen furniture",
    headlineWords: ["Ambient", "Kitchen", "Spaces", "That", "Glow"],
    headlineAccentIndex: 2,
    highlights: [
      { label: "Finish", detail: "Matte dark" },
      { label: "LED", detail: "Under-cabinet" },
      { label: "Layout", detail: "Open plan" },
      { label: "Appliances", detail: "Built-in" },
      { label: "Island", detail: "Seating" },
      { label: "Install", detail: "On site" },
    ],
  },
  {
    image: img("p04"),
    eyebrow: "Workshop built",
    title: "Slatted warmth",
    subtitle: "Decorated furniture",
    headlineWords: ["Warm", "Slatted", "Spaces", "That", "Comfort"],
    headlineAccentIndex: 2,
    highlights: [
      { label: "Slats", detail: "Oak feature" },
      { label: "Stone", detail: "Marble tops" },
      { label: "Pendants", detail: "Globe lights" },
      { label: "Storage", detail: "Concealed" },
      { label: "Joinery", detail: "Hand finished" },
      { label: "Install", detail: "On site" },
    ],
  },
  {
    image: img("p05"),
    eyebrow: "Workshop built",
    title: "Media feature walls",
    subtitle: "Decorated furniture",
    headlineWords: ["Media", "Feature", "Walls", "That", "Define"],
    headlineAccentIndex: 1,
    highlights: [
      { label: "Panels", detail: "Marble + wood" },
      { label: "Shelving", detail: "Display" },
      { label: "TV zone", detail: "Flush mount" },
      { label: "Lighting", detail: "Accent LED" },
      { label: "Storage", detail: "Integrated" },
      { label: "Install", detail: "On site" },
    ],
  },
  {
    image: img("p08"),
    eyebrow: "Workshop built",
    title: "Room dividers",
    subtitle: "Decorated furniture",
    headlineWords: ["Open", "Room", "Spaces", "That", "Flow"],
    headlineAccentIndex: 2,
    highlights: [
      { label: "Slats", detail: "Vertical" },
      { label: "Storage", detail: "Low units" },
      { label: "Flow", detail: "Open zones" },
      { label: "Finish", detail: "Natural oak" },
      { label: "Lighting", detail: "Soft glow" },
      { label: "Install", detail: "On site" },
    ],
  },
  {
    image: img("p13"),
    eyebrow: "Workshop built",
    title: "Breakfast bars",
    subtitle: "Kitchen furniture",
    headlineWords: ["Breakfast", "Bar", "Spaces", "That", "Gather"],
    headlineAccentIndex: 2,
    highlights: [
      { label: "Waterfall", detail: "Stone edge" },
      { label: "Seating", detail: "Bar stools" },
      { label: "Cabinetry", detail: "Handleless" },
      { label: "Lighting", detail: "Pendants" },
      { label: "Storage", detail: "Pan drawers" },
      { label: "Install", detail: "On site" },
    ],
  },
];
