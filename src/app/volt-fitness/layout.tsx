import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { volt } from "@/data/volt";
import { VoltShell } from "@/components/volt/Shell";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-volt-display",
  display: "swap",
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-volt-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${volt.name} — Fitness & performance, Côte d'Azur (démonstration)`,
    template: `%s | ${volt.name}`,
  },
  description: volt.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${volt.name} — ${volt.slogan}`,
    description: volt.description,
    locale: "fr_FR",
    type: "website",
  },
};

export default function VoltLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <VoltShell>{children}</VoltShell>
    </div>
  );
}
