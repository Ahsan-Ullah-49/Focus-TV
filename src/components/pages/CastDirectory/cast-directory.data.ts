import { CAST, type CastMember } from "@/components/sections/Cast/cast.config";

export const CAST_CATEGORIES = [
  "All",
  "Innovation",
  "Business",
  "Automotive",
  "Gaming",
  "Sport & impact",
] as const;
export type CastCategory = (typeof CAST_CATEGORIES)[number];
export type DirectoryMember = CastMember & { category: Exclude<CastCategory, "All">; bio: string };

// Owner-approved homepage data takes precedence over the legacy site's titles.
// Additional profiles and photographs: https://focustv.tv/meet-the-cast/ (23 October 2026).
const details: Record<string, { category: DirectoryMember["category"]; bio: string }> = {
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
  category: DirectoryMember["category"];
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
  {
    id: "adel-sajan",
    name: "Adel Sajan",
    title: "Group Managing Director, Danube",
    category: "Business",
    bio: "A business leader whose work includes the development and expansion of Danube Home.",
  },
  {
    id: "ahmed-mansour",
    name: "Ahmed Mansour",
    title: "Founder, Luxury Supercar Rentals Dubai",
    category: "Automotive",
    bio: "An Australian entrepreneur who founded Luxury Supercar Rentals Dubai, building a business around exclusive automobiles.",
  },
  {
    id: "hubert-krzysztofik",
    name: "Hubert Krzysztofik",
    title: "Technology & Immersive Media",
    category: "Innovation",
    bio: "A technology leader working across immersive entertainment and virtual reality, with credits including Jurassic World VR Expedition.",
  },
  {
    id: "yoshiro-nakamatsu",
    name: "Dr. Yoshiro Nakamatsu",
    title: "Inventor",
    category: "Innovation",
    bio: "A Japanese inventor, also known as Dr. NakaMats, whose work and curiosity span a wide range of disciplines.",
  },
  {
    id: "rorion-gracie",
    name: "Rorion Gracie",
    title: "Co-Founder, UFC",
    category: "Sport & impact",
    bio: "A Gracie Jiu-Jitsu practitioner and educator, and a co-founder of the Ultimate Fighting Championship.",
  },
  {
    id: "beast-philanthropy",
    name: "Beast Philanthropy",
    title: "Philanthropic Organisation",
    category: "Sport & impact",
    bio: "An organisation exploring how digital communities can support humanitarian work and bring help to people in need.",
    isOrg: true,
  },
  {
    id: "arise-racing",
    name: "Arise Racing",
    title: "Motorsport & Driver Development",
    category: "Automotive",
    bio: "An Australian motorsport organisation working in racing, driver development and track experiences.",
    isOrg: true,
  },
  {
    id: "campos-racing",
    name: "Campos Racing",
    title: "Motorsport Team",
    category: "Automotive",
    bio: "Founded by Adrián Campos, the racing team has a history in international motorsport and developing driving talent.",
    isOrg: true,
  },
  {
    id: "io-interactive",
    name: "IO Interactive",
    title: "Game Development Studio · Hitman",
    category: "Gaming",
    bio: "The game development studio behind Hitman, known for intricate environments, stealth and interactive storytelling.",
    isOrg: true,
  },
];

export const DIRECTORY_CAST: DirectoryMember[] = [
  ...CAST.map((member) => ({
    ...member,
    ...details[member.id],
    imageAlt: member.id === "netease-games" ? "Li Wei of NetEase Games" : member.imageAlt,
  })),
  ...additional.map((member) => ({
    ...member,
    imageSrc: `/media/cast-extra/${member.id}.webp`,
    imageAlt: member.isOrg ? member.name : `Portrait of ${member.name}`,
  })),
];
