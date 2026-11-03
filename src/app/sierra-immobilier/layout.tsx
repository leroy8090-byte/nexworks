import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { sierra } from "@/data/sierra";
import { SierraShell } from "@/components/sierra/Shell";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sierra-display",
  display: "swap",
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-sierra-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${sierra.name} — Proposition de refonte (démonstration NEXWORKS)`,
    template: `%s | ${sierra.name}`,
  },
  description: sierra.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${sierra.name} — Proposition de refonte`,
    description: sierra.description,
    locale: "fr_FR",
    type: "website",
  },
};

export default function SierraLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: sierra.name,
    foundingDate: String(sierra.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: sierra.address,
      postalCode: sierra.postalCode,
      addressLocality: sierra.city,
      addressCountry: "FR",
    },
    telephone: sierra.phone,
    url: sierra.officialSite,
    description:
      "Agence immobilière familiale à Saint-Raphaël depuis 1973. Cette page fait partie d'une proposition de refonte non officielle réalisée pour le portfolio NEXWORKS AGENCY.",
  };

  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SierraShell>{children}</SierraShell>
    </div>
  );
}
