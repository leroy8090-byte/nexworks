"use client";

import { useState } from "react";
import { typeLabel } from "@/data/localized";
import { localePath, type Lang } from "@/i18n/config";
import { Icon } from "./ui";

export const PLACES = ["Saint-Tropez", "Ramatuelle", "Gassin", "Grimaud", "Sainte-Maxime", "Saint-Raphaël"];
/** Valeurs internes (en français, utilisées dans l'adresse) ; l'affichage est traduit avec typeLabel. */
export const TYPES = ["Villa", "Bastide", "Maison de village", "Programme neuf"];
export const BUDGETS = { fr: [{ v: "3000000", l: "Jusqu'à 3 M€" }, { v: "5000000", l: "Jusqu'à 5 M€" }, { v: "8000000", l: "Jusqu'à 8 M€" }, { v: "15000000", l: "Jusqu'à 15 M€" }], en: [{ v: "3000000", l: "Up to €3M" }, { v: "5000000", l: "Up to €5M" }, { v: "8000000", l: "Up to €8M" }, { v: "15000000", l: "Up to €15M" }] };
export const WEEKLY = { fr: [{ v: "20000", l: "Jusqu'à 20 000 € / sem." }, { v: "50000", l: "Jusqu'à 50 000 € / sem." }], en: [{ v: "20000", l: "Up to €20,000 / week" }, { v: "50000", l: "Up to €50,000 / week" }] };

const T = {
  fr: { aria: "Rechercher une propriété", buy: "Acheter", rent: "Louer pour l'été", dest: "Destination", all: "Tout le golfe", type: "Type de bien", allTypes: "Tous les biens", budget: "Budget", any: "Sans limite", go: "Rechercher" },
  en: { aria: "Search for a property", buy: "Buy", rent: "Summer rental", dest: "Destination", all: "The whole gulf", type: "Property type", allTypes: "All properties", budget: "Budget", any: "No limit", go: "Search" },
};

/**
 * Recherche rapide : un vrai formulaire qui mène à la liste des propriétés, même sans JavaScript.
 * Acheter ou louer change la liste des budgets proposés.
 */
export function SearchBar({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [tx, setTx] = useState<"vente" | "location">("vente");
  const sel = "w-full appearance-none bg-transparent py-1 text-[15px] text-ink outline-none";
  const cell = "relative flex flex-col justify-center gap-1 border-line px-5 py-3.5";
  return (
    <form action={localePath(lang, "/proprietes")} method="get" role="search" aria-label={t.aria} className="w-full border border-line bg-white">
      <div className="flex border-b border-line">
        {(["vente", "location"] as const).map((v) => (
          <label key={v} className={`relative cursor-pointer px-5 py-3 text-[10.5px] tracking-[0.24em] uppercase transition-colors ${tx === v ? "text-ink" : "text-muted hover:text-ink"}`}>
            <input type="radio" name="transaction" value={v} checked={tx === v} onChange={() => setTx(v)} className="sr-only" />
            {v === "vente" ? t.buy : t.rent}
            <span aria-hidden className={`absolute inset-x-5 bottom-0 h-px bg-ink transition-transform duration-300 ${tx === v ? "scale-x-100" : "scale-x-0"}`} />
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr_auto]">
        <label className={`${cell} border-r border-b md:border-b-0`}><span className="caps text-[9.5px] text-pave-dark">{t.dest}</span>
          <select name="lieu" defaultValue="" className={sel}><option value="">{t.all}</option>{PLACES.map((p) => <option key={p}>{p}</option>)}</select>
        </label>
        <label className={`${cell} border-b md:border-r md:border-b-0`}><span className="caps text-[9.5px] text-pave-dark">{t.type}</span>
          <select name="type" defaultValue="" className={sel}><option value="">{t.allTypes}</option>{TYPES.map((v) => <option key={v} value={v}>{typeLabel(v, lang)}</option>)}</select>
        </label>
        <label className={`${cell} col-span-2 border-b md:col-span-1 md:border-r md:border-b-0`}><span className="caps text-[9.5px] text-pave-dark">{t.budget}</span>
          <select name="budget" key={tx} defaultValue="" className={sel}><option value="">{t.any}</option>{(tx === "vente" ? BUDGETS[lang] : WEEKLY[lang]).map((b) => <option key={b.v} value={b.v}>{b.l}</option>)}</select>
        </label>
        <button type="submit" className="group/b col-span-2 flex min-h-[3.6rem] items-center justify-center gap-3 bg-ink px-8 text-[11px] font-medium tracking-[0.24em] text-white uppercase transition-colors hover:bg-sea md:col-span-1">
          {t.go}<Icon name="arrow" className="size-4 transition-transform duration-300 group-hover/b:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
