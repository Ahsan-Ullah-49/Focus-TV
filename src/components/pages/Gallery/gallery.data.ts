import type { MediaItem } from "@/components/pages/Media/MediaDialog";

export type GalleryPhoto = MediaItem & { layout: "wide" | "portrait" };

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

const portraits: GalleryPhoto[] = stills.map(([id, title, file]) => ({
  id,
  title,
  kind: "still",
  layout: "portrait",
  src: `/media/Stills/${file}`,
  alt: `${title} during a Focus TV interview`,
  unoptimized: true,
}));

export const galleryPhotos: GalleryPhoto[] = portraits;
