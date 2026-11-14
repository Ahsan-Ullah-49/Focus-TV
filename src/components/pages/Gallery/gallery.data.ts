import type { MediaItem } from "@/components/pages/Media/MediaDialog";

export type GalleryPhoto = MediaItem & {
  layout: "wide" | "portrait";
  width: number;
  height: number;
};

const stills = [
  ["steve", "Steve Wozniak", "the-answer/01-steve-wozniak.webp"],
  ["tom", "Tom Dusenberry", "gaming-legends/04-tom-dusenberry.webp"],
  ["harada", "Katsuhiro Harada", "gaming-legends/03-katsuhiro-harada.webp"],
  ["will", "Will Wright", "gaming-legends/02-will-wright.webp"],
  ["rizwan", "Rizwan Sajan", "the-answer/04-rizwan-sajan.webp"],
  ["netease", "Li Wei — NetEase Games", "gaming-legends/06-li-wei.webp"],
  ["naveen", "Naveen Jain", "the-answer/03-naveen-jain.webp"],
  ["nolan", "Nolan Bushnell", "gaming-legends/01-nolan-bushnell.webp"],
  ["jason", "Jason Cammisa", "automotive-legends/06-jason-cammisa.webp"],
  ["frank", "Frank Heyl", "automotive-legends/03-frank-heyl.webp"],
  ["achim", "Achim Anscheidt", "automotive-legends/02-achim-anscheidt.webp"],
  ["patrick", "Patrick Bet-David", "the-answer/02-patrick-bet-david.webp"],
  ["aubrey", "Aubrey Marcus", "the-answer/06-aubrey-marcus.webp"],
  ["mohamed", "Mohamed Hadid", "the-answer/05-mohamed-hadid.webp"],
  ["franz", "Franz von Holzhausen", "automotive-legends/01-franz-von-holzhausen.webp"],
  ["shiro", "Shiro Nakamura", "automotive-legends/05-shiro-nakamura.webp"],
  ["chris", "Chris Bangle", "automotive-legends/04-chris-bangle.webp"],
  ["mate", "Mate Rimac", "automotive-legends/07-mate-rimac.webp"],
  ["sasha", "Sasha Selipanov", "automotive-legends/08-sasha-selipanov.webp"],
  ["ahmed", "Ahmed Amwell", "automotive-legends/09-ahmed-amwell.webp"],
  ["fawzi", "Fawzi Mesmar", "gaming-legends/05-fawzi-mesmar.webp"],
] as const;

function btsPhoto(
  id: string,
  title: string,
  file: string,
  width = 1920,
  height = 1080
): GalleryPhoto {
  return {
    id,
    title,
    kind: "still",
    layout: width > height ? "wide" : "portrait",
    width,
    height,
    src: `/media/behind-the-scenes/${file}`,
    alt: `${title} — behind the scenes on a Focus TV production`,
  };
}

export const galleryStills: GalleryPhoto[] = stills.map(([id, title, file]) => ({
  id,
  title,
  kind: "still",
  layout: "portrait",
  width: 1080,
  height: 1080,
  src: `/media/interviews/${file}`,
  alt: `${title} during a Focus TV interview`,
  unoptimized: true,
}));

type BtsRow = {
  layout: "landscapes" | "mixed" | "squares-wide";
  photos: GalleryPhoto[];
};

// The original stills remain first, in their approved order. BTS follows with
// the most recognizable guests first; each authored row preserves source ratios.
export const galleryBtsRows: BtsRow[] = [
  {
    layout: "landscapes",
    photos: [
      btsPhoto("steve-bts", "Steve Wozniak", "steve-wozniak-filming.webp"),
      btsPhoto(
        "steve-woz-bts",
        "Steve Wozniak — interview setup",
        "steve-wozniak-interview-setup.webp"
      ),
    ],
  },
  {
    layout: "landscapes",
    photos: [
      btsPhoto("patrick-bts", "Patrick Bet-David", "patrick-bet-david-filming.webp"),
      btsPhoto("pbd-bts", "Patrick Bet-David — outdoor filming", "patrick-bet-david-outdoors.webp"),
    ],
  },
  {
    layout: "mixed",
    photos: [
      btsPhoto("naveen-bts", "Naveen Jain", "naveen-jain.webp"),
      btsPhoto("hadid-bts", "Mohamed Hadid", "mohamed-hadid.webp", 3840, 3840),
    ],
  },
  {
    layout: "landscapes",
    photos: [
      btsPhoto("aubrey-bts", "Aubrey Marcus", "aubrey-marcus.webp"),
      btsPhoto("franz-bts", "Franz von Holzhausen", "franz-von-holzhausen.webp"),
    ],
  },
  {
    layout: "squares-wide",
    photos: [
      btsPhoto("chris-bts", "Chris Bangle", "chris-bangle.webp", 1080, 1080),
      btsPhoto("jason-bts", "Jason Cammisa", "jason-cammisa.webp", 1080, 1080),
      btsPhoto("sasha-bts", "Sasha Selipanov", "sasha-selipanov.webp"),
    ],
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  ...galleryStills,
  ...galleryBtsRows.flatMap((row) => row.photos),
];
