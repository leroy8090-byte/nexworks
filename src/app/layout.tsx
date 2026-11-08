import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope, Sora } from "next/font/google";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { HideOnDemo, SiteScope } from "@/components/layout/HideOnDemo";
import { MobileQuoteBar } from "@/components/layout/MobileQuoteBar";
import { CookieNoteLazy } from "@/components/layout/CookieNoteLazy";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { JsonLd } from "@/components/ui/Section";
import { LangAttr } from "@/i18n/use-lang";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Création de site internet, SEO et GEO | NEXWORKS AGENCY",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
  ...(siteConfig.googleVerification || siteConfig.bingVerification
    ? {
        verification: {
          ...(siteConfig.googleVerification ? { google: siteConfig.googleVerification } : {}),
          ...(siteConfig.bingVerification ? { other: { "msvalidate.01": siteConfig.bingVerification } } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.language} className={`${sora.variable} ${manrope.variable} ${bricolage.variable}`}>
      <head>
        {/* Sans JavaScript (certains robots), les blocs animés restent visibles. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-ink font-sans text-white antialiased">
        <LangAttr />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Providers>
          <SiteScope>
            <HideOnDemo>
              <Header />
            </HideOnDemo>
            <main id="contenu">{children}</main>
            <HideOnDemo>
              <Footer />
              <MobileQuoteBar />
              <CookieNoteLazy />
            </HideOnDemo>
          </SiteScope>
        </Providers>
      </body>
    </html>
  );
}
