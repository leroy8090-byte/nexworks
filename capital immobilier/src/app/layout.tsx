import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight } from "next/font/google";
import { CookieBanner } from "@/components/Cookies";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro, INTRO_SCRIPT } from "@/components/Intro";
import { MobileBar } from "@/components/MobileBar";
import { MotionProvider } from "@/components/Motion";
import { RouteProgress } from "@/components/RouteProgress";
import { JsonLd } from "@/components/ui";
import { agency, LIVE } from "@/data/agency";
import { siteLd, SITE_URL } from "@/lib/seo";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], variable: "--font-cap-display", display: "swap" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-cap-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `Agence immobilière à Saint-Raphaël | ${agency.name}`, template: `%s | ${agency.name}` },
  description: agency.description,
  /** Fermé aux moteurs tant que le site est un concept. */
  robots: LIVE ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0a0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style></noscript>
      </head>
      <body className="min-h-dvh">
        <JsonLd data={siteLd()} />
        <MotionProvider>
          <Intro />
          <div aria-hidden className="progress" />
          <RouteProgress />
          <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2">Aller au contenu</a>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <MobileBar />
          <CookieBanner />
        </MotionProvider>
      </body>
    </html>
  );
}
