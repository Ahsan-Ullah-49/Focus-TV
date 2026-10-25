import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header/Header";
import { CustomCursor } from "@/components/ui/CustomCursor/CustomCursor";
import { Footer } from "@/components/layout/Footer/Footer";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Creative Studio`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.productionUrl),
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "FocusTV | Stories worth telling",
    description: siteConfig.description,
    images: [
      { url: "/media/hero/focustv-Hero-poster.png", alt: "The Answer — a FocusTV documentary" },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index:
      process.env.VERCEL_ENV === "production" ||
      (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV),
    follow:
      process.env.VERCEL_ENV === "production" ||
      (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV),
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
      className={`${manrope.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body id="top">
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
