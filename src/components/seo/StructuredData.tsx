import logo from "@/Assets/Logos/Focus TV/focus-tv-gold.webp";
import { CONTACT_EMAIL } from "@/components/pages/Contact/contact.config";
import { galleryPhotos } from "@/components/pages/Gallery/gallery.data";
import { absoluteUrl, seoPages, type SeoPath } from "@/config/seo";
import { siteConfig } from "@/config/site";

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function SiteStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": organizationId,
            name: siteConfig.name,
            alternateName: ["Focus TV", "Focus TV Studios"],
            url: absoluteUrl("/"),
            description: siteConfig.description,
            email: CONTACT_EMAIL,
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl(logo.src),
              width: logo.width,
              height: logo.height,
            },
            founder: { "@type": "Person", name: "Hammad Chaudhry", url: absoluteUrl("/crew") },
          },
          {
            "@type": "WebSite",
            "@id": websiteId,
            name: siteConfig.name,
            alternateName: ["Focus TV", "Focus TV Studios"],
            url: absoluteUrl("/"),
            inLanguage: "en-AU",
            publisher: { "@id": organizationId },
          },
        ],
      }}
    />
  );
}

export function PageStructuredData({ path }: { path: SeoPath }) {
  const page = seoPages[path];
  const url = absoluteUrl(path);
  const graph: Record<string, unknown>[] = [
    {
      "@type": page.schemaType,
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: "en-AU",
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
      ...(path === "/gallery"
        ? {
            image: galleryPhotos.map((photo) => ({
              "@type": "ImageObject",
              contentUrl: absoluteUrl(photo.src),
              name: photo.title,
              caption: photo.alt,
            })),
          }
        : {}),
    },
  ];
  if (path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: page.label, item: url },
      ],
    });
  }
  if (path === "/production-services") {
    graph.push(
      ...["Cinematic brand films", "Corporate films", "Commercial content"].map((name) => ({
        "@type": "Service",
        name,
        url,
        provider: { "@id": organizationId },
      }))
    );
  }
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
