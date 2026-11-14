import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/config/site";
import { isIndexable, pageMetadata } from "@/config/seo";
import { SiteStructuredData } from "@/components/seo/StructuredData";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header/Header";
import { CustomCursor } from "@/components/ui/CustomCursor/CustomCursor";
import { Footer } from "@/components/layout/Footer/Footer";
import { PageMotion } from "@/components/motion/PageMotion";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-focus-poppins",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  // The current serif token uses system fonts; avoid competing with the hero request.
  preload: false,
});

export const metadata: Metadata = {
  ...pageMetadata("/"),
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.productionUrl),
  robots: {
    index: isIndexable,
    follow: isIndexable,
    googleBot: {
      index: isIndexable,
      follow: isIndexable,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Inline script to prevent theme flash on page load
const themeInitScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('focustv-theme');
      // Default to light theme for new visitors. Explicit saved preference wins.
      var theme = savedTheme || 'light';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body id="top" suppressHydrationWarning>
        <SiteStructuredData />
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            <PageMotion>
              <main>{children}</main>
            </PageMotion>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
