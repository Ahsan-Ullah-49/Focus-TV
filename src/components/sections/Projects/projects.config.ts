import { FEATURED_VOICES, type FeaturedVoice } from "./featured-voices.data";
import { PARTNER_LOGOS, type PartnerLogo } from "@/components/sections/Partners/partners.config";
import { heroConfig } from "@/components/sections/Hero/hero.config";

export type ProjectVideo = { kind: "vimeo"; id: string; hash?: string };

export type StudioProject = {
  id: string;
  title: string;
  subject: string;
  poster?: string;
  video?: ProjectVideo;
};

export type HomepageProject = StudioProject & {
  showOnHomepage?: boolean;
  subtitle?: string;
  lead?: string;
  description: readonly string[];
  poster: string;
  video: ProjectVideo;
  cast: (Pick<FeaturedVoice, "id" | "name" | "title"> & { imageSrc?: string })[];
  logos: PartnerLogo[];
};

const castById = (ids: string[]) =>
  ids.flatMap((id) => FEATURED_VOICES.filter((person) => person.id === id));
const logosByName = (names: string[]) =>
  names.flatMap((name) => PARTNER_LOGOS.filter((logo) => logo.name === name));

// Cast and brand groups follow the legacy FocusTV project pages.
// Descriptions refer to the supplied Vimeo cuts.
export const STUDIO_PROJECTS: HomepageProject[] = [
  {
    id: "the-answer",
    title: "The Answer",
    subject: "The Answer",
    subtitle: "An Original Focus TV Documentary",
    lead: "Behind one man's impossible vision stood a woman whose love helped make it real.",
    description: [
      "After a life-changing vision deep in the Amazon, host Hammad Chaudhry embarks on a decade-long quest to uncover the secrets of manifestation, gaining access to the minds behind Apple, Tesla, Bugatti and global empires representing over $6.68 trillion in brand value.",
      "But as he gets closer to understanding how imagination becomes reality, his own world begins to collapse. Ambition, fatherhood and personal tragedy push him to the brink of losing everything — including his mind.",
      "Through the unwavering love and strength of his partner, Hammad discovers a force far greater than success, challenging everything he believed about creation, masculinity and reality itself.",
      "A powerful journey revealing the unseen influence of women, the true cost of ambition and the extraordinary forces that shape our reality.",
    ],
    poster: "/media/posters/the-answer.webp",
    video: {
      kind: "vimeo",
      id: "1075036022",
      hash: "417f274a07",
    },
    cast: castById([
      "steve-wozniak",
      "patrick-bet-david",
      "naveen-jain",
      "rizwan-sajan",
      "mohamed-hadid",
      "aubrey-marcus",
    ]),
    logos: logosByName(["Tesla", "Bugatti", "UFC", "Beast Philanthropy"]),
  },
  {
    id: "automotive",
    title: "Automotive Legends",
    subject: "Automotive Legends",
    subtitle: "An Original Focus TV Documentary",
    description: [
      "As the automotive world enters a new era, Automotive Legends pays tribute to the combustion engine and the visionary minds who pushed the boundaries of engineering, performance and design.",
      "Featuring the pioneers behind some of the world's most iconic cars and automotive brands, this documentary explores how extraordinary imagination, ambition and bold ideas were manifested into reality shaping the machines and industry we know today.",
    ],
    poster: "/media/posters/automotive-legends.webp",
    video: { kind: "vimeo", id: heroConfig.videoId, hash: heroConfig.hash },
    cast: [
      ...castById([
        "franz-von-holzhausen",
        "achim-anscheidt",
        "frank-heyl",
        "chris-bangle",
        "shiro-nakamura",
        "jason-cammisa",
      ]),
      {
        id: "mate-rimac",
        name: "Mate Rimac",
        title: "Founder & CEO, Rimac Group",
        imageSrc: "/media/interviews/automotive-legends/07-mate-rimac.webp",
      },
      ...castById(["sasha-selipanov"]),
      {
        id: "ahmed-amwell",
        name: "Ahmed Amwell",
        title: "Founder & CEO, Luxury Supercars Dubai",
        imageSrc: "/media/interviews/automotive-legends/09-ahmed-amwell.webp",
      },
    ],
    logos: logosByName([
      "Tesla",
      "Bugatti",
      "Nissan",
      "GTR",
      "Hagerty",
      "NILU",
      "Rolls Royce",
      "Arise Racing",
      "Campos Racing",
      "Rentals",
    ]),
  },
  {
    id: "gaming",
    title: "Gaming Legends",
    subject: "Gaming Legends",
    subtitle: "An Original Focus TV Documentary",
    lead: "The minds that manifested a multibillion-dollar industry.",
    description: [
      "Gaming Legends takes us inside the minds of the pioneers who broke the boundaries of imagination, revolutionised gaming and built some of the world's most iconic games and gaming empires.",
      "Through their extraordinary journeys, we uncover the risks, sacrifices and relentless determination it took to turn seemingly impossible ideas into reality creating digital worlds that would change entertainment forever.",
    ],
    poster: "/media/posters/gaming-legends.webp",
    video: { kind: "vimeo", id: "1090472083", hash: "f7de1ad21b" },
    cast: castById([
      "nolan-bushnell",
      "will-wright",
      "katsuhiro-harada",
      "tom-dusenberry",
      "fawzi-mesmar",
      "netease-games",
    ]).map((member) => ({
      ...member,
      title:
        member.id === "katsuhiro-harada"
          ? "Game Director & Producer · Tekken 8"
          : member.id === "netease-games"
            ? "Vice President, NetEase Games"
            : member.title,
    })),
    logos: [
      ...logosByName(["Atari", "Pong", "The Sims", "Spore", "Bandai Namco", "Tekken 8"]),
      {
        filename: "hasbro-interactive.webp",
        name: "Hasbro Interactive",
        width: 250,
        height: 348,
        darkBlend: "screen",
      },
      ...logosByName(["Monopoly", "NetEase Games"]),
    ],
  },
  {
    id: "wa-police",
    title: "WA Police: Tech Reloaded",
    subject: "WA Police: Tech Reloaded",
    subtitle: "An Original Focus TV Documentary",
    lead: "Inside the technology and minds protecting Australia's largest policing jurisdiction.",
    description: [
      "Host Hammad Chaudhry goes behind the scenes of Western Australia Police to uncover the cutting-edge technology, specialised units and extraordinary people keeping our communities safe.",
      "From tactical operations and aerial policing to advanced surveillance and innovation, discover how technology and human ingenuity are transforming the future of policing.",
    ],
    poster: "/media/posters/wa-police.webp",
    video: { kind: "vimeo", id: "1205405287", hash: "89f0d3a4ac" },
    cast: [],
    logos: [],
  },
];
