import type { MediaItem } from "@/components/pages/Media/MediaDialog";
import { CAST } from "@/components/sections/Cast/cast.config";

// IDs, access hashes and durations come from focustv.tv embeds and Focus TV's Vimeo oEmbed metadata.
export const galleryFilms: MediaItem[] = [
  {
    id: "turning-thoughts",
    title: "Turning Thoughts Into Reality",
    kind: "film",
    src: "/media/gallery/1075036022.webp",
    alt: "The Answer — Turning Thoughts Into Reality film poster",
    vimeoId: "1075036022",
    vimeoHash: "417f274a07",
    duration: "1:43",
  },
  {
    id: "beast-philanthropy",
    title: "Beast Philanthropy",
    kind: "film",
    src: "/media/gallery/1004315356.webp",
    alt: "Beast Philanthropy film poster",
    vimeoId: "1004315356",
    vimeoHash: "25ad4635a2",
    duration: "2:30",
  },
  {
    id: "rizwan-sajan",
    title: "Rizwan Sajan (Danube Group)",
    kind: "film",
    src: "/media/gallery/1075036381.webp",
    alt: "Rizwan Sajan in The Answer",
    vimeoId: "1075036381",
    vimeoHash: "ba270ecdc4",
    duration: "2:11",
  },
  {
    id: "rorion-gracie",
    title: "Rorion Gracie",
    kind: "film",
    src: "/media/gallery/1075036197.webp",
    alt: "Rorion Gracie in The Answer",
    vimeoId: "1075036197",
    vimeoHash: "df3374554c",
    duration: "2:07",
  },
  {
    id: "ahmed-amwell",
    title: "Ahmed Amwell",
    kind: "film",
    src: "/media/gallery/1075035916.webp",
    alt: "Ahmed Amwell in The Answer",
    vimeoId: "1075035916",
    vimeoHash: "36cd6f698c",
    duration: "1:16",
  },
  {
    id: "dr-nakamatsu",
    title: "Dr. Nakamatsu",
    kind: "film",
    src: "/media/gallery/996154729.webp",
    alt: "Dr. Nakamatsu in The Answer",
    vimeoId: "996154729",
    vimeoHash: "aaeb75791c",
    duration: "1:03",
  },
];

const selectedPortraits = [
  "steve-wozniak",
  "franz-von-holzhausen",
  "achim-anscheidt",
  "jason-cammisa",
  "nolan-bushnell",
  "rizwan-sajan",
];

export const galleryStills: MediaItem[] = selectedPortraits.flatMap((id) => {
  const person = CAST.find((member) => member.id === id);
  return person
    ? [
        {
          id: `still-${person.id}`,
          title: person.name,
          kind: "still" as const,
          src: person.imageSrc,
          alt: person.imageAlt,
        },
      ]
    : [];
});
