"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { applyCriteria, BUDGETS, euro, type Card } from "@/lib/filter";

const TABS = [["vente", "Acheter"], ["location", "Louer"]] as const;
const field = "select h-11 w-full cursor-pointer border-0 border-b border-night/25 bg-transparent text-[16px] text-night outline-none transition-colors hover:border-night focus:border-night";

function F({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return <div className="min-w-0"><label htmlFor={id} className="block text-[13.5px] text-muted">{label}</label>{children}</div>;
}

/** Le moteur de recherche : chaque critère part dans l'adresse de la page de résultats. */
export function Search({ cards, communes, types }: { cards: Card[]; communes: string[]; types: string[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [tab, setTab] = useState<(typeof TABS)[number][0]>("vente");
  const [v, setV] = useState({ commune: "", type: "", min: "", max: "", pieces: "", surface: "" });
  const set = (k: keyof typeof v, value: string) => setV((s) => ({ ...s, [k]: value }));
  const count = useMemo(() => applyCriteria(cards, { transaction: tab, ...v }).length, [cards, tab, v]);
  const budgets = BUDGETS[tab];
  const suffix = tab === "vente" ? "" : " / mois";

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({ transaction: tab });
    (Object.keys(v) as (keyof typeof v)[]).forEach((k) => { if (v[k]) q.set(k, v[k]); });
    start(() => router.push(`/biens?${q.toString()}`));
  }

  const index = TABS.findIndex(([k]) => k === tab);
  return (
    <form onSubmit={submit} aria-label="Rechercher un bien" className=" bg-white p-5 shadow-[0_40px_80px_-45px_rgba(0,0,0,.55)] sm:p-8">
      <div role="tablist" aria-label="Type de recherche" className="relative grid max-w-sm grid-cols-2 border-b border-rule">
        {TABS.map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => { setTab(k); setV((s) => ({ ...s, min: "", max: "" })); }} className={`min-h-11 pb-2 text-left text-[15px] leading-tight transition-colors sm:text-[16px] ${tab === k ? "font-medium text-night" : "text-muted hover:text-night"}`}>{l}</button>
        ))}
        <span aria-hidden className="absolute -bottom-px left-0 h-[3px] w-1/2 bg-sea transition-transform duration-500 ease-out" style={{ transform: `translateX(${index * 100}%)` }} />
      </div>
      <div className="mt-5 grid grid-cols-2 items-end gap-x-6 gap-y-4 md:grid-cols-3 lg:grid-cols-[1.3fr_1.1fr_1fr_1fr_1fr_1fr_auto]">
        <F id="s-commune" label="Localisation">
          <select id="s-commune" value={v.commune} onChange={(e) => set("commune", e.target.value)} className={field}>
            <option value="">Toutes</option>
            {communes.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </F>
        <F id="s-type" label="Type de bien">
          <select id="s-type" value={v.type} onChange={(e) => set("type", e.target.value)} className={field}>
            <option value="">Tous</option>
            {types.map((t) => <option key={t} value={t}>{t === "Villa" ? "Maison, villa" : t}</option>)}
          </select>
        </F>
        <F id="s-min" label="Budget minimum">
          <select id="s-min" value={v.min} onChange={(e) => set("min", e.target.value)} className={field}>
            <option value="">Sans minimum</option>
            {budgets.map((b) => <option key={b} value={b}>{`${euro(b)}${suffix}`}</option>)}
          </select>
        </F>
        <F id="s-max" label="Budget maximum">
          <select id="s-max" value={v.max} onChange={(e) => set("max", e.target.value)} className={field}>
            <option value="">Sans maximum</option>
            {budgets.map((b) => <option key={b} value={b}>{`${euro(b)}${suffix}`}</option>)}
          </select>
        </F>
        <F id="s-pieces" label="Pièces">
          <select id="s-pieces" value={v.pieces} onChange={(e) => set("pieces", e.target.value)} className={field}>
            <option value="">Indifférent</option>
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{`${n} et plus`}</option>)}
          </select>
        </F>
        <F id="s-surface" label="Surface minimale">
          <select id="s-surface" value={v.surface} onChange={(e) => set("surface", e.target.value)} className={field}>
            <option value="">Indifférente</option>
            {[30, 50, 70, 90, 120].map((n) => <option key={n} value={n}>{`${n} m² et plus`}</option>)}
          </select>
        </F>
        <button type="submit" disabled={pending} className="col-span-2 min-h-[3.3rem] whitespace-nowrap fill bg-sea px-7 text-[15px] font-semibold text-white [--f:var(--color-night)] disabled:opacity-60 md:col-span-3 lg:col-span-1">{pending ? "Recherche…" : "Trouver mon bien"}</button>
      </div>
      <p key={count} role="status" aria-live="polite" className="tick mt-3 text-[14.5px] text-muted">
        {count > 0 ? `${count} ${count > 1 ? "biens correspondent" : "bien correspond"} à ces critères.` : "Aucun bien ne correspond pour le moment : élargissez vos critères."}
      </p>
    </form>
  );
}
