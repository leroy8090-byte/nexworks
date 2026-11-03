import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { riviera } from "@/data/riviera";
import { RivieraShell } from "@/components/riviera/Shell";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-riviera-display",
  display: "swap",
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-riviera-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${riviera.name} — Immobilier de prestige, Côte d'Azur (démonstration)`,
    template: `%s | ${riviera.name}`,
  },
  description: riviera.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${riviera.name} — Immobilier de prestige`,
    description: riviera.description,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RivieraLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <RivieraShell>{children}</RivieraShell>
    </div>
  );
}
