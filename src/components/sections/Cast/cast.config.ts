/**
 * FocusTV — Meet the Cast section data
 *
 * Original interview stills are grouped by production in /public/media/interviews/.
 * Each filename identifies its display order and featured person.
 *
 * Homepage project selections and gallery order are maintained separately.
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
    imageSrc: "/media/interviews/the-answer/01-steve-wozniak.webp",
    imageAlt: "Portrait of Steve Wozniak",
  },
  {
    id: "patrick-bet-david",
    name: "Patrick Bet-David",
    title: "Founder & CEO, Valuetainment",
    imageSrc: "/media/interviews/the-answer/02-patrick-bet-david.webp",
    imageAlt: "Portrait of Patrick Bet-David",
  },
  {
    id: "franz-von-holzhausen",
    name: "Franz von Holzhausen",
    title: "Chief Designer, Tesla",
    imageSrc: "/media/interviews/automotive-legends/01-franz-von-holzhausen.webp",
    imageAlt: "Portrait of Franz von Holzhausen",
  },
  {
    id: "achim-anscheidt",
    name: "Achim Anscheidt",
    title: "Former Director of Design, Bugatti",
    imageSrc: "/media/interviews/automotive-legends/02-achim-anscheidt.webp",
    imageAlt: "Portrait of Achim Anscheidt",
  },
  {
    id: "frank-heyl",
    name: "Frank Heyl",
    title: "Design Director, Bugatti",
    imageSrc: "/media/interviews/automotive-legends/03-frank-heyl.webp",
    imageAlt: "Portrait of Frank Heyl",
  },
  {
    id: "netease-games",
    name: "Li Wei (李炜)",
    title: "Vice President of NetEase Games / Head of Leihuo Studio",
    imageSrc: "/media/interviews/gaming-legends/06-li-wei.webp",
    imageAlt: "NetEase Games — global gaming organisation",
    isOrg: true,
  },
  {
    id: "jason-cammisa",
    name: "Jason Cammisa",
    title: "Automotive Journalist & Filmmaker",
    imageSrc: "/media/interviews/automotive-legends/06-jason-cammisa.webp",
    imageAlt: "Portrait of Jason Cammisa",
  },
  {
    id: "chris-bangle",
    name: "Chris Bangle",
    title: "Former Chief Designer, BMW Group",
    imageSrc: "/media/interviews/automotive-legends/04-chris-bangle.webp",
    imageAlt: "Portrait of Chris Bangle",
  },
  {
    id: "nolan-bushnell",
    name: "Nolan Bushnell",
    title: "Founder, Atari",
    imageSrc: "/media/interviews/gaming-legends/01-nolan-bushnell.webp",
    imageAlt: "Portrait of Nolan Bushnell",
  },
  {
    id: "tom-dusenberry",
    name: "Tom Dusenberry",
    title: "Former CEO, Hasbro Interactive",
    imageSrc: "/media/interviews/gaming-legends/04-tom-dusenberry.webp",
    imageAlt: "Portrait of Tom Dusenberry",
  },
  {
    id: "rizwan-sajan",
    name: "Rizwan Sajan",
    title: "Founder & Chairman, Danube Group",
    imageSrc: "/media/interviews/the-answer/04-rizwan-sajan.webp",
    imageAlt: "Portrait of Rizwan Sajan",
  },
  {
    id: "sasha-selipanov",
    name: "Sasha Selipanov",
    title: "Founder & CEO, Nilu27",
    imageSrc: "/media/interviews/automotive-legends/08-sasha-selipanov.webp",
    imageAlt: "Portrait of Sasha Selipanov",
  },
  {
    id: "mohamed-hadid",
    name: "Mohamed Hadid",
    title: "Real Estate Developer",
    imageSrc: "/media/interviews/the-answer/05-mohamed-hadid.webp",
    imageAlt: "Portrait of Mohamed Hadid",
  },
  {
    id: "aubrey-marcus",
    name: "Aubrey Marcus",
    title: "Founder, Onnit",
    imageSrc: "/media/interviews/the-answer/06-aubrey-marcus.webp",
    imageAlt: "Portrait of Aubrey Marcus",
  },
];
