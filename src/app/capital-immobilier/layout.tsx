import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { capital } from "@/data/capital";
import { CapitalShell } from "@/components/capital/Shell";
import { agencyJsonLd } from "@/components/capital/seo";
import { JsonLdScript } from "@/components/capital/ui";

const serif = Newsreader({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-cap-serif", display: "swap" });
const sans = Figtree({ subsets: ["latin"], variable: "--font-cap-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${capital.name} — Agence immobilière à Saint-Raphaël (concept de refonte)`,
    template: `%s | ${capital.name}`,
  },
  description: capital.description,
  // Convention des démos du repo : jamais indexées.
  robots: { index: false, follow: false },
};

export default function CapitalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`cap-root ${serif.variable} ${sans.variable}`}>
      {/* La feuille globale du site NEXWORKS force la police des titres : on la remplace ici pour la démo. */}
      <style>{`.cap-root :is(h1,h2,h3,h4){font-family:var(--font-cap-serif),Georgia,serif;letter-spacing:-0.01em}.cap-root :is(h1,h2,h3,h4).cap-label{font-family:var(--font-cap-sans),system-ui,sans-serif;letter-spacing:0.2em}`}</style>
      <JsonLdScript data={agencyJsonLd()} />
      <CapitalShell>{children}</CapitalShell>
    </div>
  );
}
