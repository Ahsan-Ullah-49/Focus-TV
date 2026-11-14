import { CAST, type CastMember } from "@/components/sections/Cast/cast.config";

export type FeaturedVoice = CastMember & {
  category: "Innovation" | "Business" | "Automotive" | "Gaming";
  bio: string;
};

// Owner-approved homepage data takes precedence over the legacy site's titles.
// Additional profiles and photographs: https://focustv.tv/meet-the-cast/ (23 October 2026).
const details: Record<string, { category: FeaturedVoice["category"]; bio: string }> = {
  "steve-wozniak": {
    category: "Innovation",
    bio: "Apple co-founder and engineer behind the Apple I and Apple II, helping bring personal computing to a wider world.",
  },
  "patrick-bet-david": {
    category: "Business",
    bio: "Entrepreneur, author and founder of Valuetainment, sharing conversations about business, leadership and the people behind success.",
  },
  "franz-von-holzhausen": {
    category: "Automotive",
    bio: "The designer behind Tesla’s distinctive visual language, with work spanning the Model S and Cybertruck.",
  },
  "achim-anscheidt": {
    category: "Automotive",
    bio: "Automotive designer whose work helped shape the modern identity of Bugatti, including the Chiron and Divo.",
  },
  "frank-heyl": {
    category: "Automotive",
    bio: "Design Director at Bugatti and one of the automotive voices featured in The Answer.",
  },
  "netease-games": {
    category: "Gaming",
    bio: "Representing NetEase Games and Leihuo Studio in The Answer’s exploration of the people behind interactive worlds.",
  },
  "jason-cammisa": {
    category: "Automotive",
    bio: "An automotive journalist and filmmaker bringing technical knowledge, storytelling and a lifelong interest in cars to the screen.",
  },
  "chris-bangle": {
    category: "Automotive",
    bio: "Former BMW Group chief designer, known for a bold approach that challenged conventions in automotive design.",
  },
  "nolan-bushnell": {
    category: "Gaming",
    bio: "Atari founder and an early pioneer of arcade gaming, whose work helped introduce video games to a global audience.",
  },
  "tom-dusenberry": {
    category: "Gaming",
    bio: "A gaming industry leader whose career includes Hasbro Interactive, Atari and the development of well-known interactive entertainment titles.",
  },
  "rizwan-sajan": {
    category: "Business",
    bio: "Founder of Danube Group, whose entrepreneurial journey spans building materials, retail and property development.",
  },
  "sasha-selipanov": {
    category: "Automotive",
    bio: "An automotive designer with work across Bugatti, Koenigsegg and Lamborghini, and the founder of Nilu27.",
  },
  "mohamed-hadid": {
    category: "Business",
    bio: "Real estate developer and a featured voice in The Answer.",
  },
  "aubrey-marcus": {
    category: "Business",
    bio: "Founder of Onnit and a featured voice in The Answer.",
  },
};

const additional: Array<{
  id: string;
  name: string;
  title: string;
  category: FeaturedVoice["category"];
  bio: string;
  isOrg?: boolean;
}> = [
  {
    id: "naveen-jain",
    name: "Naveen Jain",
    title: "Founder, Viome & Moon Express",
    category: "Innovation",
    bio: "An entrepreneur whose ventures explore health, space and technology, including Viome, Moon Express and InfoSpace.",
  },
  {
    id: "will-wright",
    name: "Will Wright",
    title: "Game Designer · SimCity & The Sims",
    category: "Gaming",
    bio: "Co-founder of Maxis and the designer behind SimCity, The Sims and Spore, opening new possibilities for player-driven worlds.",
  },
  {
    id: "katsuhiro-harada",
    name: "Katsuhiro Harada",
    title: "Game Director & Producer · Tekken",
    category: "Gaming",
    bio: "A game director and producer known for his longstanding contribution to the Tekken series and fighting game culture.",
  },
  {
    id: "shiro-nakamura",
    name: "Shiro Nakamura",
    title: "Former Chief Creative Officer, Nissan",
    category: "Automotive",
    bio: "An automotive designer whose work at Nissan included the GT-R, LEAF and a distinctive generation of Nissan and Infiniti vehicles.",
  },
  {
    id: "fawzi-mesmar",
    name: "Fawzi Mesmar",
    title: "Game Designer & Creative Leader",
    category: "Gaming",
    bio: "A game designer, creative leader and author with experience across studios including Ubisoft, DICE, King, Gameloft and Atlus.",
  },
];

// Owner-confirmed interview stills used by the homepage projects.
const additionalInterviewStills: Record<string, string> = {
  "katsuhiro-harada": "/media/interviews/gaming-legends/03-katsuhiro-harada.webp",
  "fawzi-mesmar": "/media/interviews/gaming-legends/05-fawzi-mesmar.webp",
  "shiro-nakamura": "/media/interviews/automotive-legends/05-shiro-nakamura.webp",
  "will-wright": "/media/interviews/gaming-legends/02-will-wright.webp",
  "naveen-jain": "/media/interviews/the-answer/03-naveen-jain.webp",
};

export const FEATURED_VOICES: FeaturedVoice[] = [
  ...CAST.map((member) => ({
    ...member,
    ...details[member.id],
    imageAlt: member.id === "netease-games" ? "Li Wei of NetEase Games" : member.imageAlt,
  })),
  // Keep profiles without portraits out of the homepage data.
  ...additional.flatMap((member) => {
    const imageSrc = additionalInterviewStills[member.id];
    return imageSrc
      ? [
          {
            ...member,
            imageSrc,
            imageAlt: member.isOrg ? member.name : `Portrait of ${member.name}`,
          },
        ]
      : [];
  }),
];
