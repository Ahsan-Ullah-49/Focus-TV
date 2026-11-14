import type { MetadataRoute } from "next";
import { absoluteUrl, seoPages } from "@/config/seo";
import { galleryPhotos } from "@/components/pages/Gallery/gallery.data";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(seoPages).map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
    ...(path === "/gallery"
      ? { images: galleryPhotos.map((photo) => absoluteUrl(photo.src)) }
      : {}),
  }));
}
