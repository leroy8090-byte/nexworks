import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { sierra } from "@/data/sierra";
import { SierraShell } from "@/components/sierra/Shell";

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sierra-sans",
  display: "swap",
});

const display = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sierra-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${sierra.name} — Proposition de refonte (NEXWORKS)`,
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
    image: "https://nexworksagency.vercel.app/sierra-immobilier/logo.png",
    description:
      "Agence immobilière familiale à Saint-Raphaël depuis 1973. Proposition de refonte non officielle — portfolio NEXWORKS AGENCY.",
  };

  return (
    <div className={`${sans.variable} ${display.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SierraShell>{children}</SierraShell>
    </div>
  );
}
