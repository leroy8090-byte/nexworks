import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope, Sora } from "next/font/google";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { HideOnDemo, SiteScope } from "@/components/layout/HideOnDemo";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { JsonLd } from "@/components/ui/Section";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Agence digitale : sites web, design, SEO et GEO`,
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
      <body className="min-h-dvh bg-ink font-sans text-white antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Providers>
          <SiteScope>
            <HideOnDemo>
              <Header />
            </HideOnDemo>
            <main id="contenu">{children}</main>
            <HideOnDemo>
              <Footer />
            </HideOnDemo>
          </SiteScope>
        </Providers>
      </body>
    </html>
  );
}
