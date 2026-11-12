import type { LogoItem } from "./LogoLoop";

export interface PartnerLogo {
  filename: string;
  name: string;
  /** Intrinsic dimensions of the default image, used when no theme-specific file is supplied. */
  width: number;
  height: number;
  darkVariant?: PartnerLogoVariant;
  lightVariant?: PartnerLogoVariant;
  /** Blends an opaque black image background into the dark surface. */
  darkBlend?: "screen";
  /** Enlarges compact artwork relative to the shared loop height. */
  displayScale?: number;
  /** Holds a constant item width when theme files have different proportions. */
  slotWidth?: number;
  lowContrast?: "light" | "dark";
  outlineOnLight?: boolean;
  outlineOnDark?: boolean;
}

interface PartnerLogoVariant {
  filename: string;
  /** Intrinsic dimensions of this theme-specific file. */
  width: number;
  height: number;
  /** Per-file visual correction that preserves the asset's aspect ratio. */
  scale?: number;
}

/** Preserve each supplied logo's theme artwork and sizing in every logo loop. */
export function toLogoItem(logo: PartnerLogo): Extract<LogoItem, { src: string }> {
  const asset = (filename: string) => `/media/Logos/LOGOS/${encodeURIComponent(filename)}`;
  return {
    src: asset(logo.filename),
    darkSrc: logo.darkVariant ? asset(logo.darkVariant.filename) : undefined,
    darkWidth: logo.darkVariant?.width,
    darkHeight: logo.darkVariant?.height,
    darkScale: logo.darkVariant?.scale,
    lightSrc: logo.lightVariant ? asset(logo.lightVariant.filename) : undefined,
    lightWidth: logo.lightVariant?.width,
    lightHeight: logo.lightVariant?.height,
    lightScale: logo.lightVariant?.scale,
    displayScale: logo.displayScale,
    slotWidth: logo.slotWidth,
    darkBlend: logo.darkBlend,
    alt: logo.name,
    title: logo.name,
    width: logo.width,
    height: logo.height,
    lowContrast: logo.lowContrast,
    outlineOnLight: logo.outlineOnLight,
    outlineOnDark: logo.outlineOnDark,
  };
}

/**
 * Single source of truth for the homepage partner loop. Keep intrinsic dimensions
 * in sync with each file; use theme variants for alternate artwork of the same brand.
 */
export const PARTNER_LOGOS: PartnerLogo[] = [
  {
    filename: "arise-racing.webp",
    name: "Arise Racing",
    width: 295,
    height: 63,
    outlineOnLight: true,
  },
  {
    filename: "atari.webp",
    name: "Atari",
    width: 972,
    height: 972,
  },
  {
    filename: "bandai-namco.webp",
    name: "Bandai Namco",
    width: 1954,
    height: 1334,
  },
  {
    filename: "beast-philanthropy.webp",
    name: "Beast Philanthropy",
    width: 1224,
    height: 296,
    outlineOnLight: true,
  },
  {
    filename: "bmw.webp",
    name: "BMW",
    width: 1200,
    height: 1200,
  },
  {
    filename: "bugatti.webp",
    name: "Bugatti",
    width: 2189,
    height: 1116,
  },
  {
    filename: "campos-racing.webp",
    name: "Campos Racing",
    width: 2560,
    height: 596,
    darkVariant: {
      filename: "campos-racing-dark.webp",
      width: 2048,
      height: 476,
    },
    outlineOnDark: true,
  },
  {
    filename: "gtr.webp",
    name: "GTR",
    width: 807,
    height: 564,
    outlineOnDark: true,
  },
  {
    filename: "hagerty.webp",
    name: "Hagerty",
    width: 2803,
    height: 526,
    lowContrast: "light",
  },
  {
    filename: "io-interactive.webp",
    name: "IO Interactive",
    width: 1106,
    height: 614,
    lowContrast: "dark",
  },
  {
    filename: "john-hughes.webp",
    name: "John Hughes",
    width: 835,
    height: 595,
  },
  {
    filename: "koenigsegg.webp",
    name: "Koenigsegg",
    width: 1830,
    height: 2560,
  },
  {
    filename: "konami.webp",
    name: "Konami",
    width: 1600,
    height: 270,
  },
  {
    filename: "lamborghini.webp",
    name: "Lamborghini",
    width: 1836,
    height: 2065,
    outlineOnDark: true,
  },
  {
    filename: "monopoly.webp",
    name: "Monopoly",
    width: 2190,
    height: 408,
  },
  {
    filename: "netease-games.webp",
    name: "NetEase Games",
    width: 695,
    height: 287,
    displayScale: 1.2,
    slotWidth: 190,
    lightVariant: {
      filename: "netease-games-light.webp",
      width: 1433,
      height: 606,
    },
  },
  {
    filename: "nilu.webp",
    name: "NILU",
    width: 1069,
    height: 444,
    lowContrast: "dark",
  },
  {
    filename: "nissan.webp",
    name: "Nissan",
    width: 257,
    height: 220,
    displayScale: 1.2,
    slotWidth: 96,
    darkVariant: {
      filename: "nissan-dark.webp",
      width: 1220,
      height: 1032,
    },
  },
  {
    filename: "onmyoji.webp",
    name: "Onmyoji",
    width: 1600,
    height: 1002,
  },
  {
    filename: "pong.webp",
    name: "Pong",
    width: 1127,
    height: 288,
    darkVariant: {
      filename: "pong-dark.webp",
      width: 2156,
      height: 551,
    },
    darkBlend: "screen",
  },
  {
    filename: "rentals.webp",
    name: "Rentals",
    width: 1718,
    height: 847,
  },
  {
    filename: "rolls-royce.webp",
    name: "Rolls Royce",
    width: 1101,
    height: 1798,
  },
  {
    filename: "spore.webp",
    name: "Spore",
    width: 784,
    height: 785,
  },
  {
    filename: "tekken-8.webp",
    name: "Tekken 8",
    width: 1371,
    height: 189,
    darkVariant: {
      filename: "tekken-8-dark.webp",
      width: 2153,
      height: 303,
    },
  },
  {
    filename: "tesla.webp",
    name: "Tesla",
    width: 1032,
    height: 1335,
  },
  {
    filename: "the-sims.webp",
    name: "The Sims",
    width: 2189,
    height: 1292,
  },
  {
    filename: "ufc.webp",
    name: "UFC",
    width: 2367,
    height: 824,
  },
];
