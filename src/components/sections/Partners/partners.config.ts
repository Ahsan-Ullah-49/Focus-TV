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

/**
 * Single source of truth for the homepage partner loop. Keep intrinsic dimensions
 * in sync with each file; use theme variants for alternate artwork of the same brand.
 */
export const PARTNER_LOGOS: PartnerLogo[] = [
  {
    filename: "apple.png",
    name: "Apple",
    width: 408,
    height: 500,
    lowContrast: "light",
  },
  {
    filename: "arise-racing.png",
    name: "Arise Racing",
    width: 295,
    height: 63,
    outlineOnLight: true,
  },
  {
    filename: "atari.png",
    name: "Atari",
    width: 972,
    height: 972,
  },
  {
    filename: "atlus.webp",
    name: "Atlus",
    width: 480,
    height: 137,
  },
  {
    filename: "bandai-namco.png",
    name: "Bandai Namco",
    width: 1954,
    height: 1334,
  },
  {
    filename: "beast-philanthropy.png",
    name: "Beast Philanthropy",
    width: 1224,
    height: 296,
    outlineOnLight: true,
  },
  {
    filename: "bmw.png",
    name: "BMW",
    width: 1200,
    height: 1200,
  },
  {
    filename: "bugatti.png",
    name: "Bugatti",
    width: 2189,
    height: 1116,
  },
  {
    filename: "campos-racing.png",
    name: "Campos Racing",
    width: 2560,
    height: 596,
    darkVariant: {
      filename: "campos-racing-dark.png",
      width: 2048,
      height: 476,
    },
    outlineOnDark: true,
  },
  {
    filename: "cec.png",
    name: "CEC",
    width: 1197,
    height: 451,
    darkVariant: {
      filename: "cec-dark.png",
      width: 1197,
      height: 451,
    },
    outlineOnDark: true,
  },
  {
    filename: "danube-group.png",
    name: "Danube Group",
    width: 987,
    height: 83,
    darkVariant: {
      filename: "danube-group-dark.png",
      width: 987,
      height: 83,
    },
    outlineOnDark: true,
  },
  {
    filename: "darpa.png",
    name: "DARPA",
    width: 602,
    height: 305,
    lowContrast: "dark",
  },
  {
    filename: "dice.webp",
    name: "DICE",
    width: 1191,
    height: 332,
    darkVariant: {
      filename: "dice-dark.png",
      width: 553,
      height: 160,
    },
    darkBlend: "screen",
  },
  {
    filename: "extreme-makeover.webp",
    name: "Extreme Makeover",
    width: 1015,
    height: 330,
    darkVariant: {
      filename: "extreme-makeover-dark.webp",
      width: 2162,
      height: 703,
    },
  },
  {
    filename: "gameloft.png",
    name: "Gameloft",
    width: 1810,
    height: 1261,
    lowContrast: "light",
  },
  {
    filename: "gracie.png",
    name: "Gracie",
    width: 925,
    height: 922,
    lowContrast: "dark",
  },
  {
    filename: "gtr.png",
    name: "GTR",
    width: 807,
    height: 564,
    outlineOnDark: true,
  },
  {
    filename: "hagerty.png",
    name: "Hagerty",
    width: 2803,
    height: 526,
    lowContrast: "light",
  },
  {
    filename: "hasbro.png",
    name: "Hasbro",
    width: 1477,
    height: 1615,
  },
  {
    filename: "identity-v.webp",
    name: "Identity V",
    width: 1041,
    height: 316,
    lightVariant: {
      filename: "identity-v-light.webp",
      width: 1041,
      height: 316,
    },
  },
  {
    filename: "io-interactive.png",
    name: "IO Interactive",
    width: 1106,
    height: 614,
    lowContrast: "dark",
  },
  {
    filename: "joe-films.webp",
    name: "JOE Films",
    width: 1600,
    height: 1282,
    lightVariant: {
      filename: "joe-films-light.webp",
      width: 1402,
      height: 1122,
    },
  },
  {
    filename: "john-hughes.webp",
    name: "John Hughes",
    width: 835,
    height: 595,
  },
  {
    filename: "jurassic-world.png",
    name: "Jurassic World",
    width: 841,
    height: 766,
    darkVariant: {
      filename: "jurassic-world-dark.png",
      width: 1250,
      height: 1079,
    },
  },
  {
    filename: "king.webp",
    name: "King",
    width: 1153,
    height: 780,
  },
  {
    filename: "koenigsegg.png",
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
    filename: "lamborghini.png",
    name: "Lamborghini",
    width: 1836,
    height: 2065,
    outlineOnDark: true,
  },
  {
    filename: "leap.webp",
    name: "LEAP",
    width: 346,
    height: 150,
    darkVariant: {
      filename: "leap-dark.webp",
      width: 1891,
      height: 797,
    },
  },
  {
    filename: "lifeafter.webp",
    name: "LifeAfter",
    width: 550,
    height: 188,
  },
  {
    filename: "mario-party.webp",
    name: "Mario Party",
    width: 1103,
    height: 218,
  },
  {
    filename: "metal-gear-solid.webp",
    name: "Metal Gear Solid",
    width: 1600,
    height: 321,
  },
  {
    filename: "monopoly.png",
    name: "Monopoly",
    width: 2190,
    height: 408,
  },
  {
    filename: "moon-express.png",
    name: "Moon Express",
    width: 1274,
    height: 789,
    lowContrast: "dark",
  },
  {
    filename: "nerf.png",
    name: "Nerf",
    width: 2560,
    height: 1172,
  },
  {
    filename: "netease-games.png",
    name: "NetEase Games",
    width: 695,
    height: 287,
    displayScale: 1.2,
    slotWidth: 190,
    lightVariant: {
      filename: "netease-games-light.png",
      width: 1433,
      height: 606,
    },
  },
  {
    filename: "nilu.png",
    name: "NILU",
    width: 1069,
    height: 444,
    lowContrast: "dark",
  },
  {
    filename: "nissan.png",
    name: "Nissan",
    width: 257,
    height: 220,
    displayScale: 1.2,
    slotWidth: 96,
    darkVariant: {
      filename: "nissan-dark.png",
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
    filename: "pbd-podcast.png",
    name: "PBD Podcast",
    width: 1111,
    height: 661,
    displayScale: 1.2,
    slotWidth: 150,
    darkVariant: {
      filename: "pbd-podcast-dark.png",
      width: 1576,
      height: 845,
    },
  },
  {
    filename: "pong.png",
    name: "Pong",
    width: 1127,
    height: 288,
    darkVariant: {
      filename: "pong-dark.png",
      width: 2156,
      height: 551,
    },
    darkBlend: "screen",
  },
  {
    filename: "rentals.png",
    name: "Rentals",
    width: 1718,
    height: 847,
  },
  {
    filename: "rolls-royce.png",
    name: "Rolls Royce",
    width: 1101,
    height: 1798,
  },
  {
    filename: "silent-hill-2.webp",
    name: "Silent Hill 2",
    width: 1600,
    height: 160,
    darkVariant: {
      filename: "silent-hill-2-dark.webp",
      width: 621,
      height: 82,
      scale: 0.75,
    },
    slotWidth: 288,
  },
  {
    filename: "spore.webp",
    name: "Spore",
    width: 784,
    height: 785,
  },
  {
    filename: "tekken-8.png",
    name: "Tekken 8",
    width: 1371,
    height: 189,
    darkVariant: {
      filename: "tekken-8-dark.png",
      width: 2153,
      height: 303,
    },
  },
  {
    filename: "tesla.png",
    name: "Tesla",
    width: 1032,
    height: 1335,
  },
  {
    filename: "the-doctors.webp",
    name: "The Doctors",
    width: 1337,
    height: 396,
  },
  {
    filename: "the-sims.png",
    name: "The Sims",
    width: 2189,
    height: 1292,
  },
  {
    filename: "tonka.png",
    name: "Tonka",
    width: 1439,
    height: 420,
  },
  {
    filename: "ubisoft.png",
    name: "Ubisoft",
    width: 2560,
    height: 826,
    lowContrast: "dark",
  },
  {
    filename: "ufc.png",
    name: "UFC",
    width: 2367,
    height: 824,
  },
  {
    filename: "universal-music-group.webp",
    name: "Universal Music Group",
    width: 1000,
    height: 371,
    slotWidth: 180,
    darkVariant: {
      filename: "universal-music-group-dark.webp",
      width: 993,
      height: 530,
    },
  },
  {
    filename: "valuetainment.png",
    name: "Valuetainment",
    width: 600,
    height: 132,
  },
  {
    filename: "viome.png",
    name: "Viome",
    width: 2047,
    height: 274,
    darkVariant: {
      filename: "viome-dark.png",
      width: 2070,
      height: 339,
      // Keeps the supplied wordmark visually aligned with its normalized version.
      scale: 0.82,
    },
    outlineOnDark: true,
  },
];
