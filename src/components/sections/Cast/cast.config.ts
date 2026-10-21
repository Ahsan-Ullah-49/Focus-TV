/**
 * FocusTV — Meet the Cast section data
 *
 * Keep portrait paths in the same order as the numbered files in
 * /public/media/Stills/optimized.
 *
 * No other files need editing to add, remove, or reorder entries.
 */

export interface CastMember {
  /** Unique slug used as an element key and aria-label anchor */
  id: string;
  /** Display name — exactly as approved */
  name: string;
  /**
   * Role / title shown beneath the name.
   * Keep concise; longer roles may wrap across multiple lines.
   */
  title: string;
  /** Relative path to the optimized portrait image inside /public. */
  imageSrc: string;
  /** Alt text for the portrait image */
  imageAlt: string;
  /** Marks an organization entry for cast-page treatments. */
  isOrg?: boolean;
}

export const CAST: CastMember[] = [
  {
    id: "steve-wozniak",
    name: "Steve Wozniak",
    title: "Co-Founder, Apple",
    imageSrc: "/media/Stills/optimized/1.webp",
    imageAlt: "Portrait of Steve Wozniak",
  },
  {
    id: "patrick-bet-david",
    name: "Patrick Bet-David",
    title: "Founder & CEO, Valuetainment",
    imageSrc: "/media/Stills/optimized/2.webp",
    imageAlt: "Portrait of Patrick Bet-David",
  },
  {
    id: "franz-von-holzhausen",
    name: "Franz von Holzhausen",
    title: "Chief Designer, Tesla",
    imageSrc: "/media/Stills/optimized/3.webp",
    imageAlt: "Portrait of Franz von Holzhausen",
  },
  {
    id: "achim-anscheidt",
    name: "Achim Anscheidt",
    title: "Former Director of Design, Bugatti",
    imageSrc: "/media/Stills/optimized/4.webp",
    imageAlt: "Portrait of Achim Anscheidt",
  },
  {
    id: "frank-heyl",
    name: "Frank Heyl",
    title: "Design Director, Bugatti",
    imageSrc: "/media/Stills/optimized/5.webp",
    imageAlt: "Portrait of Frank Heyl",
  },
  {
    id: "netease-games",
    name: "Li Wei (李炜)",
    title: "Vice President of NetEase Games / Head of Leihuo Studio",
    imageSrc: "/media/Stills/optimized/6.webp",
    imageAlt: "NetEase Games — global gaming organisation",
    isOrg: true,
  },
  {
    id: "jason-cammisa",
    name: "Jason Cammisa",
    title: "Automotive Journalist & Filmmaker",
    imageSrc: "/media/Stills/optimized/7.webp",
    imageAlt: "Portrait of Jason Cammisa",
  },
  {
    id: "chris-bangle",
    name: "Chris Bangle",
    title: "Former Chief Designer, BMW Group",
    imageSrc: "/media/Stills/optimized/8.webp",
    imageAlt: "Portrait of Chris Bangle",
  },
  {
    id: "nolan-bushnell",
    name: "Nolan Bushnell",
    title: "Founder, Atari",
    imageSrc: "/media/Stills/optimized/9.webp",
    imageAlt: "Portrait of Nolan Bushnell",
  },
  {
    id: "tom-dusenberry",
    name: "Tom Dusenberry",
    title: "Former CEO, Hasbro Interactive",
    imageSrc: "/media/Stills/optimized/10.webp",
    imageAlt: "Portrait of Tom Dusenberry",
  },
  {
    id: "rizwan-sajan",
    name: "Rizwan Sajan",
    title: "Founder & Chairman, Danube Group",
    imageSrc: "/media/Stills/optimized/11.webp",
    imageAlt: "Portrait of Rizwan Sajan",
  },
  {
    id: "sasha-selipanov",
    name: "Sasha Selipanov",
    title: "Founder & CEO, Nilu27",
    imageSrc: "/media/Stills/optimized/12.webp",
    imageAlt: "Portrait of Sasha Selipanov",
  },
  {
    id: "mohamed-hadid",
    name: "Mohamed Hadid",
    title: "Real Estate Developer",
    imageSrc: "/media/Stills/optimized/13.webp",
    imageAlt: "Portrait of Mohamed Hadid",
  },
  {
    id: "aubrey-marcus",
    name: "Aubrey Marcus",
    title: "Founder, Onnit",
    imageSrc: "/media/Stills/optimized/14.webp",
    imageAlt: "Portrait of Aubrey Marcus",
  },
];
