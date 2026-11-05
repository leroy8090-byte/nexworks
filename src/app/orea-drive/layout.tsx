import type { Metadata } from "next";
import { Big_Shoulders, Instrument_Sans } from "next/font/google";
import { OreaLanguage } from "@/components/demo-i18n/sites";
import { OreaShell } from "@/components/orea/Shell";
import { orea } from "@/data/orea";

const display = Big_Shoulders({ subsets: ["latin"], variable: "--font-orea-display", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-orea-sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${orea.name} — Location de voitures, Côte d'Azur (démonstration)`, template: `%s | ${orea.name}` },
  description: orea.description,
  // Convention des démos : jamais indexées.
  robots: { index: false, follow: false },
  openGraph: { title: `${orea.name} — ${orea.slogan}`, description: orea.description, locale: "fr_FR", type: "website", images: [{ url: "/orea-drive/hero.webp" }] },
};

export default function OreaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <OreaShell>{children}</OreaShell>
      <OreaLanguage />
    </div>
  );
}
