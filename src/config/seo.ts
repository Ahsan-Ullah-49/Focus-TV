import type { Metadata } from "next";
import { siteConfig } from "./site";

export const seoPages = {
  "/": {
    title: "FocusTV | Film & Media Production Company Australia",
    description:
      "FocusTV is an Australian film and media production company creating original documentaries, commercial films and brand stories. Explore our work and team.",
    label: "Home",
    schemaType: "CollectionPage",
  },
  "/production-services": {
    title: "Commercial Film Production Australia | FocusTV",
    description:
      "Explore FocusTV's commercial productions, cinematic brand films and corporate storytelling for brands and businesses, from Atlas Fuel to Danube Group.",
    label: "Production Services",
    schemaType: "CollectionPage",
  },
  "/about": {
    title: "About FocusTV | Australian Film Production Company",
    description:
      "Discover FocusTV's story, from founder Hammad Chaudhry's vision to an Australian film production company creating original documentaries and commercial films.",
    label: "About Us",
    schemaType: "AboutPage",
  },
  "/crew": {
    title: "Our Film Production Team | FocusTV Australia",
    description:
      "Meet founder Hammad Chaudhry and the FocusTV production team. Explore the filmmakers, producers and creative professionals behind our work and their credits.",
    label: "Team",
    schemaType: "AboutPage",
  },
  "/gallery": {
    title: "Interview & Behind-the-Scenes Gallery | FocusTV",
    description:
      "Explore FocusTV interview stills and behind-the-scenes photographs from our documentary productions, featuring the people and moments behind the films.",
    label: "Gallery",
    schemaType: "ImageGallery",
  },
  "/contact": {
    title: "Contact FocusTV | Film Production Enquiries Australia",
    description:
      "Contact FocusTV about film production, brand films, documentary projects, partnerships or guest enquiries. Share your brief or request a meeting with the team.",
    label: "Contact",
    schemaType: "ContactPage",
  },
} as const;

export type SeoPath = keyof typeof seoPages;

// Set SITE_INDEXABLE=false before building a non-production staging site.
export const isIndexable =
  process.env.SITE_INDEXABLE !== "false" &&
  (process.env.VERCEL_ENV === "production" ||
    (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV));

export const absoluteUrl = (path: string) => new URL(path, siteConfig.productionUrl).toString();

export function pageMetadata(path: SeoPath): Metadata {
  const page = seoPages[path];
  const image = {
    url: absoluteUrl("/opengraph-image"),
    width: 1200,
    height: 630,
    alt: "FocusTV — Film Production & Entertainment Company",
  };
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: siteConfig.name,
      url: absoluteUrl(path),
      title: page.title,
      description: page.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}
