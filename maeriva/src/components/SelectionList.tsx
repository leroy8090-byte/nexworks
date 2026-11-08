"use client";

import { AnimatePresence, m } from "framer-motion";
import { propertiesFor } from "@/data/localized";
import type { Lang } from "@/i18n/config";
import { LeadForm } from "./LeadForm";
import { EASE } from "./Motion";
import { PropertyCard } from "./PropertyCard";
import { useSelection } from "./Selection";
import { Btn } from "./ui";

const T = {
  fr: { empty: "Votre sélection est vide.", emptyText: "Touchez le cœur sur une propriété pour la garder ici.", see: "Voir les propriétés", group: "Visite groupée", visit: (n: number) => `Visiter ces ${n} ${n > 1 ? "maisons" : "maison"}.`, ask: "Demander les visites" },
  en: { empty: "Your selection is empty.", emptyText: "Tap the heart on a property to keep it here.", see: "View properties", group: "Combined viewing", visit: (n: number) => `View ${n > 1 ? `these ${n} homes` : "this home"}.`, ask: "Request the viewings" },
};

/** La sélection du visiteur, et une demande de visite groupée pour tous les biens gardés. */
export function SelectionList({ lang }: { lang: Lang }) {
  const t = T[lang];
  const { list } = useSelection();
  const chosen = propertiesFor(lang).filter((p) => list.includes(p.slug));
  if (!chosen.length) {
    return (
      <div className="mt-14 border-l border-gold py-3 pl-7">
        <p className="serif text-[2rem] text-ink">{t.empty}</p>
        <p className="mt-2 max-w-lg text-[15.5px] leading-relaxed text-muted">{t.emptyText}</p>
        <div className="mt-7"><Btn lang={lang} href="/proprietes" arrow>{t.see}</Btn></div>
      </div>
    );
  }
  return (
    <>
      <m.ul layout className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {chosen.map((p) => <m.li key={p.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6, ease: EASE }}><PropertyCard p={p} lang={lang} /></m.li>)}
        </AnimatePresence>
      </m.ul>
      <div className="mt-24 grid gap-12 border-t border-line pt-16 lg:grid-cols-12">
        <div className="lg:col-span-4"><p className="kicker">{t.group}</p><h2 className="mt-5 text-[2.6rem] text-ink sm:text-[3.4rem]">{t.visit(chosen.length)}</h2></div>
        <div className="lg:col-span-8"><LeadForm lang={lang} kind="Demande de visite groupée" details={{ Biens: chosen.map((p) => `${p.name} (${p.ref})`).join(", ") }} date submit={t.ask} /></div>
      </div>
    </>
  );
}
