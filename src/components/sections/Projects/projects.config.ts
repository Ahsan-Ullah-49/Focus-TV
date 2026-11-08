import {
  DIRECTORY_CAST,
  type DirectoryMember,
} from "@/components/pages/CastDirectory/cast-directory.data";
import { PARTNER_LOGOS, type PartnerLogo } from "@/components/sections/Partners/partners.config";
import { heroConfig } from "@/components/sections/Hero/hero.config";

export type ProjectVideo =
  | { kind: "vimeo"; id: string; hash?: string }
  | { kind: "file"; src: string; type: "video/mp4" | "video/webm" };

export type StudioProject = {
  id: string;
  title: string;
  subject: string;
  poster?: string;
  video?: ProjectVideo;
};

export type HomepageProject = StudioProject & {
  description: readonly string[];
  poster: string;
  video: Extract<ProjectVideo, { kind: "vimeo" }>;
  cast: DirectoryMember[];
  logos: PartnerLogo[];
};

const castById = (ids: string[]) =>
  ids.flatMap((id) => DIRECTORY_CAST.filter((person) => person.id === id));
const logosByName = (names: string[]) =>
  names.flatMap((name) => PARTNER_LOGOS.filter((logo) => logo.name === name));

// Cast and brand groups follow the legacy FocusTV project pages.
// Descriptions refer to the supplied Vimeo cuts.
export const STUDIO_PROJECTS: HomepageProject[] = [
  {
    id: "automotive",
    title: "Automotive Legends",
    subject: "Automotive Legends",
    description: [
      "Focus TV's automotive chapter of The Answer looks at the decisions that give a car its character. Shiro Nakamura talks about design at Nissan, and Chris Bangle explains the thinking behind the Rolls-Royce Phantom.",
      "The film also goes into motorsport, where drivers and teams explain how preparation and small adjustments make a difference on the track.",
    ],
    poster: "/media/hero/focustv-Intro-poster.webp",
    video: { kind: "vimeo", id: heroConfig.videoId, hash: heroConfig.hash },
    cast: castById([
      "franz-von-holzhausen",
      "achim-anscheidt",
      "chris-bangle",
      "shiro-nakamura",
      "jason-cammisa",
    ]),
    logos: logosByName([
      "Tesla",
      "Bugatti",
      "BMW",
      "Nissan",
      "GTR",
      "Hagerty",
      "Koenigsegg",
      "Lamborghini",
      "NILU",
      "Rolls Royce",
      "Arise Racing",
      "Campos Racing",
      "Rentals",
      "John Hughes",
    ]),
  },
  {
    id: "gaming",
    title: "Gaming Legends",
    subject: "Gaming Legends",
    description: [
      "In this chapter of The Answer, Focus TV talks to the people who helped build the video game industry. Atari founder Nolan Bushnell recalls the early days of Pong, and Tom Dusenberry explains how Hasbro moved from board games into interactive entertainment.",
      "Game designer Fawzi Mesmar talks about how developers make room for original ideas.",
    ],
    poster: "/media/projects/gaming-legends.webp",
    video: { kind: "vimeo", id: "1090472083", hash: "f7de1ad21b" },
    cast: castById([
      "nolan-bushnell",
      "will-wright",
      "katsuhiro-harada",
      "tom-dusenberry",
      "fawzi-mesmar",
    ]),
    logos: logosByName([
      "Atari",
      "Pong",
      "The Sims",
      "Spore",
      "Bandai Namco",
      "Tekken 8",
      "Hasbro",
      "Monopoly",
      "Nerf",
      "Tonka",
      "Ubisoft",
      "DICE",
      "King",
      "Gameloft",
      "Atlus",
      "NetEase Games",
      "Identity V",
      "LifeAfter",
      "Onmyoji",
      "IO Interactive",
      "Konami",
      "Metal Gear Solid",
      "Silent Hill 2",
      "Mario Party",
      "CEC",
    ]),
  },
  {
    id: "wa-police",
    title: "WA Police",
    subject: "WA Police",
    description: [
      "This Focus TV trailer looks at how the Western Australia Police Force works in Perth. Officers explain how they train for high-risk incidents, while the film follows CCTV operators and a specialist drone unit to show how they support teams on the ground.",
    ],
    poster: "/media/projects/wa-police.webp",
    video: { kind: "vimeo", id: "1205405287", hash: "89f0d3a4ac" },
    cast: [],
    logos: [],
  },
  {
    id: "atlas-fuel",
    title: "Atlas Fuel Australia",
    subject: "Atlas Fuel Australia",
    description: [
      "Atlas Fuel is an Australian-owned fuel supplier with a network of service stations. Its own tanker fleet delivers bulk fuel and on-site diesel to industries including mining, marine and agriculture.",
      "Focus TV filmed this commercial for Atlas Fuel Australia.",
    ],
    poster: "/media/Atlas/atlas-fuel-still.webp",
    video: { kind: "vimeo", id: "1244099030", hash: "2ff7fdbc96" },
    cast: [],
    logos: [],
  },
];
