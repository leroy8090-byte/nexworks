import { AzurLanguage } from "@/components/demo-i18n/sites";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { azur } from "@/data/azur";
import { AzurShell } from "@/components/azur/Shell";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-azur-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-azur-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${azur.name} — Plombier à Saint-Raphaël (démonstration)`,
    template: `%s | ${azur.name}`,
  },
  description: azur.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${azur.name} — Plombier à Saint-Raphaël`,
    description: azur.description,
    locale: "fr_FR",
    type: "website",
  },
};

export default function AzurLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${manrope.variable} ${inter.variable}`}>
      <AzurShell>{children}</AzurShell>
      <AzurLanguage />
    </div>
  );
}
