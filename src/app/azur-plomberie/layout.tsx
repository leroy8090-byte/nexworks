import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { AzurShell } from "@/components/azur/Shell";
import { AzurLanguage } from "@/components/demo-i18n/sites";
import { azur } from "@/data/azur";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-azur-display", display: "swap", axes: ["SOFT", "WONK", "opsz"] });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-azur-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${azur.name}, plombier à Saint-Raphaël (démonstration)`,
    template: `%s | ${azur.name}`,
  },
  description: azur.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${azur.name}, plombier à Saint-Raphaël`,
    description: azur.description,
    locale: "fr_FR",
    type: "website",
  },
};

export default function AzurLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fraunces.variable} ${hanken.variable}`}>
      <AzurShell>{children}</AzurShell>
      <AzurLanguage />
    </div>
  );
}
