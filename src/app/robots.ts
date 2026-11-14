import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  if (isIndexable) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: absoluteUrl("/sitemap.xml"),
    };
  }

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
