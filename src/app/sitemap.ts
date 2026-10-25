import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/cast", "/crew", "/gallery", "/the-answer-ai", "/contact"].map((path) => ({
    url: `${siteConfig.productionUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
