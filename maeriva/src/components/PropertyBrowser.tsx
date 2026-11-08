"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { propertiesFor, typeLabel } from "@/data/localized";
import { type Property } from "@/data/properties";
import type { Lang } from "@/i18n/config";
import { EASE } from "./Motion";
import { PropertyCard } from "./PropertyCard";
import { BUDGETS, PLACES, TYPES, WEEKLY } from "./SearchBar";

const T = {
  fr: { sorts: ["Sélection de l'agence", "Prix croissant", "Prix décroissant", "Surface"], group: "Type de recherche", all: "Tous", buy: "Acheter", rent: "Louer pour l'été", sea: "Vue mer", pool: "Piscine", dest: "Destination", gulf: "Tout le golfe", type: "Type", allTypes: "Tous les biens", budget: "Budget", any: "Sans limite", beds: "Chambres", anyBeds: "Indifférent", more: "et plus", sort: "Trier", one: "propriété", many: "propriétés", clear: "Effacer les filtres", none: "Aucune propriété publiée ne correspond.", noneText: "Élargissez votre recherche, ou décrivez-nous la maison que vous cherchez : certains biens ne sont présentés qu'en rendez-vous." },
  en: { sorts: ["Agency selection", "Price: low to high", "Price: high to low", "Floor area"], group: "Type of search", all: "All", buy: "Buy", rent: "Summer rental", sea: "Sea view", pool: "Pool", dest: "Destination", gulf: "The whole gulf", type: "Type", allTypes: "All properties", budget: "Budget", any: "No limit", beds: "Bedrooms", anyBeds: "Any", more: "or more", sort: "Sort by", one: "property", many: "properties", clear: "Clear filters", none: "No listed property matches.", noneText: "Broaden your search, or describe the home you are looking for: some properties are only presented by appointment." },
};
const SORT_VALUES = ["", "prix-asc", "prix-desc", "surface"];

/**
 * La liste des propriétés et ses filtres. Les choix sont gardés dans l'adresse de la page :
 * on peut partager une recherche, revenir en arrière, ou arriver directement depuis la recherche de l'accueil.
 */
export function PropertyBrowser({ lang }: { lang: Lang }) {
  const t = T[lang];
  const properties = propertiesFor(lang);
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const get = (k: string) => params.get(k) ?? "";
  const tx = get("transaction"), lieu = get("lieu"), type = get("type"), budget = Number(get("budget")) || 0, beds = Number(get("chambres")) || 0;
  const sea = get("vue") === "1", pool = get("piscine") === "1", sort = get("tri");

  const set = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) { if (v) next.set(k, v); else next.delete(k); }
    if ("transaction" in patch) next.delete("budget");
    const q = next.toString();
    router.replace(q ? `${path}?${q}` : path, { scroll: false });
  };

  const list = useMemo(() => {
    const out = properties.filter((p: Property) =>
      (!tx || p.transaction === tx) && (!lieu || p.city === lieu) && (!type || p.type === type) &&
      (!budget || (p.price !== null && p.price <= budget)) && (!beds || p.bedrooms >= beds) && (!sea || p.seaView) && (!pool || p.pool));
    const price = (p: Property) => p.price ?? Number.MAX_SAFE_INTEGER;
    if (sort === "prix-asc") out.sort((a, b) => price(a) - price(b));
    if (sort === "prix-desc") out.sort((a, b) => price(b) - price(a));
    if (sort === "surface") out.sort((a, b) => b.surface - a.surface);
    return out;
  }, [properties, tx, lieu, type, budget, beds, sea, pool, sort]);

  const active = [tx, lieu, type, budget, beds, sea, pool].filter(Boolean).length;
  const sel = "field cursor-pointer py-2.5 text-[15px]";
  const label = "caps text-[10px] text-pave-dark";
  const chip = (on: boolean) => `min-h-11 border px-5 text-[11.5px] tracking-[0.2em] uppercase transition-colors duration-300 ${on ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`;

  return (
    <div>
      <div className="under-header-0 z-30 -mx-5 md:sticky md:top-[95px] border-b border-line bg-white/95 px-5 py-5 backdrop-blur-md sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t.group}>
          {[{ v: "", l: t.all }, { v: "vente", l: t.buy }, { v: "location", l: t.rent }].map((o) => <button key={o.v} type="button" aria-pressed={tx === o.v} onClick={() => set({ transaction: o.v })} className={chip(tx === o.v)}>{o.l}</button>)}
          <span className="mx-2 hidden h-6 w-px bg-line sm:block" />
          <button type="button" aria-pressed={sea} onClick={() => set({ vue: sea ? "" : "1" })} className={chip(sea)}>{t.sea}</button>
          <button type="button" aria-pressed={pool} onClick={() => set({ piscine: pool ? "" : "1" })} className={chip(pool)}>{t.pool}</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-5">
          <label className="grid gap-0.5"><span className={label}>{t.dest}</span><select value={lieu} onChange={(e) => set({ lieu: e.target.value })} className={sel}><option value="">{t.gulf}</option>{PLACES.map((p) => <option key={p}>{p}</option>)}</select></label>
          <label className="grid gap-0.5"><span className={label}>{t.type}</span><select value={type} onChange={(e) => set({ type: e.target.value })} className={sel}><option value="">{t.allTypes}</option>{TYPES.map((v) => <option key={v} value={v}>{typeLabel(v, lang)}</option>)}</select></label>
          <label className="grid gap-0.5"><span className={label}>{t.budget}</span><select value={budget ? String(budget) : ""} onChange={(e) => set({ budget: e.target.value })} className={sel}><option value="">{t.any}</option>{(tx === "location" ? WEEKLY[lang] : tx === "vente" ? BUDGETS[lang] : [...BUDGETS[lang], ...WEEKLY[lang]]).map((b) => <option key={b.v} value={b.v}>{b.l}</option>)}</select></label>
          <label className="grid gap-0.5"><span className={label}>{t.beds}</span><select value={beds ? String(beds) : ""} onChange={(e) => set({ chambres: e.target.value })} className={sel}><option value="">{t.anyBeds}</option>{[3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {t.more}</option>)}</select></label>
          <label className="col-span-2 grid gap-0.5 md:col-span-1"><span className={label}>{t.sort}</span><select value={sort} onChange={(e) => set({ tri: e.target.value })} className={sel}>{SORT_VALUES.map((v, i) => <option key={v} value={v}>{t.sorts[i]}</option>)}</select></label>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="text-[15px] text-muted"><span className="serif text-[1.9rem] text-ink">{list.length}</span> {list.length > 1 ? t.many : t.one}</p>
        {active > 0 && <button type="button" onClick={() => router.replace(path, { scroll: false })} className="line text-[12px] tracking-[0.2em] text-ink uppercase">{t.clear} ({active})</button>}
      </div>

      <m.ul layout className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <m.li key={p.slug} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.8, ease: EASE, delay: Math.min(i, 6) * 0.06 }}>
              <PropertyCard p={p} lang={lang} eager={i < 3} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
      {list.length === 0 && (
        <div className="mt-6 border-l border-gold py-3 pl-6">
          <p className="serif text-[2rem] text-ink">{t.none}</p>
          <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-muted">{t.noneText}</p>
        </div>
      )}
    </div>
  );
}
