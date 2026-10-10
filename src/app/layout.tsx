import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header/Header";
import { CustomCursor } from "@/components/ui/CustomCursor/CustomCursor";
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
  robots: {
    index: process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production",
    follow: process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production",
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
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            <main>{children}</main>
            <footer
              style={{
                borderTop: "1px solid var(--color-border)",
                padding: "var(--space-8) var(--page-gutter)",
                textAlign: "center",
                color: "var(--color-text-secondary)",
                fontSize: "var(--text-xs)",
              }}
            >
              © {new Date().getFullYear()} FocusTV Creative Studio. All rights reserved.
            </footer>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
