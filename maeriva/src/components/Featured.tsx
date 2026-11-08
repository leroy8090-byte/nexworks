"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { propertiesFor } from "@/data/localized";
import type { Lang } from "@/i18n/config";
import { EASE } from "./Motion";
import { PropertyCard } from "./PropertyCard";

const TABS = { fr: ["À la une", "À vendre", "Pour l'été"], en: ["Featured", "For sale", "For the summer"] };
const VALUES = ["", "vente", "location"] as const;

/** Les propriétés de l'accueil, avec un tri simple : à la une, à vendre, à louer pour l'été. */
export function Featured({ lang }: { lang: Lang }) {
  const properties = propertiesFor(lang);
  const [tab, setTab] = useState<"" | "vente" | "location">("");
  const list = (tab ? properties.filter((p) => p.transaction === tab) : properties.filter((p) => p.featured)).slice(0, 6);
  return (
    <>
      <div role="tablist" aria-label={lang === "fr" ? "Filtrer les propriétés" : "Filter properties"} className="mt-12 flex gap-8 border-b border-line">
        {VALUES.map((v, i) => ({ v, l: TABS[lang][i] })).map((t) => (
          <button key={t.v} role="tab" type="button" aria-selected={tab === t.v} onClick={() => setTab(t.v)} className={`relative pb-4 text-[11px] tracking-[0.24em] uppercase transition-colors ${tab === t.v ? "text-ink" : "text-muted hover:text-ink"}`}>
            {t.l}{tab === t.v && <m.span layoutId="featured-tab" className="absolute inset-x-0 -bottom-px h-px bg-ink" />}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <m.ul key={tab} role="tabpanel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => <li key={p.slug}><PropertyCard p={p} lang={lang} eager={i < 3} /></li>)}
        </m.ul>
      </AnimatePresence>
    </>
  );
}
