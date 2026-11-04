"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { budgetOptions, capital, communeNames, formatEuro, propertyTypeLabel, type Transaction } from "@/data/capital";

const selectCls =
  "w-full appearance-none rounded-none border-0 border-b border-[#183B50]/25 bg-transparent px-0 py-2.5 text-[15px] text-[#252A2D] outline-none transition-colors focus:border-[#183B50] focus-visible:border-[#183B50]";
const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#183B50]/70";

/** Moteur de recherche du hero : redirige vers /acheter ou /louer avec les critères dans l'URL (résultats calculés sur les biens du logiciel). */
export function HeroSearch() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [mode, setMode] = useState<Transaction>("vente");
  const [type, setType] = useState("");
  const [commune, setCommune] = useState("");
  const [budget, setBudget] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (type) p.set("type", type);
    if (commune) p.set("commune", commune);
    if (budget) p.set("budget", budget);
    const qs = p.toString();
    start(() => router.push(`${capital.basePath}/${mode === "vente" ? "acheter" : "louer"}${qs ? `?${qs}` : ""}`));
  }

  return (
    <form onSubmit={submit} aria-label="Rechercher un bien" className="w-full max-w-5xl bg-[#F8F7F3] p-5 shadow-[0_30px_80px_-30px_rgba(24,59,80,.55)] sm:p-7">
      <div role="radiogroup" aria-label="Type de recherche" className="mb-5 inline-flex rounded-full bg-[#E8E0D4] p-1">
        {(
          [
            ["vente", "Acheter"],
            ["location", "Louer"],
          ] as const
        ).map(([v, l]) => (
          <label key={v} className={`cursor-pointer rounded-full px-6 py-2 text-[13px] font-semibold transition-colors ${mode === v ? "bg-[#183B50] text-[#F8F7F3]" : "text-[#183B50]"}`}>
            <input
              type="radio"
              name="mode"
              value={v}
              checked={mode === v}
              onChange={() => {
                setMode(v);
                setBudget("");
              }}
              className="sr-only"
            />
            {l}
          </label>
        ))}
      </div>
      <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label htmlFor="hs-type" className={labelCls}>
            Type de bien
          </label>
          <select id="hs-type" value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
            <option value="">Tous les types</option>
            {Object.entries(propertyTypeLabel).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hs-commune" className={labelCls}>
            Localisation
          </label>
          <select id="hs-commune" value={commune} onChange={(e) => setCommune(e.target.value)} className={selectCls}>
            <option value="">Toutes les communes</option>
            {communeNames.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hs-budget" className={labelCls}>
            {mode === "vente" ? "Budget maximum" : "Loyer maximum"}
          </label>
          <select id="hs-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={selectCls}>
            <option value="">Sans limite</option>
            {budgetOptions[mode].map((b) => (
              <option key={b} value={b}>
                {formatEuro(b)}
                {mode === "location" ? " / mois" : ""}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-[#183B50] px-8 py-3.5 text-[13.5px] font-semibold text-[#F8F7F3] transition-all hover:bg-[#252A2D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183B50] disabled:opacity-60 sm:col-span-2 lg:col-span-1"
        >
          {pending ? "Recherche…" : "Rechercher"}
        </button>
      </div>
    </form>
  );
}

export type ListFilters = { type: string; commune: string; budget: string; rooms: string; surface: string; sort: string; transaction: string };

/** Barre de filtres des listes : met à jour l'URL (les résultats sont calculés côté serveur). */
export function FilterBar({ basePath, initial, fixedTransaction }: { basePath: string; initial: ListFilters; fixedTransaction?: Transaction }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [v, setV] = useState<ListFilters>(initial);
  const mode: Transaction = (fixedTransaction ?? (v.transaction as Transaction)) === "location" ? "location" : "vente";
  const set = (k: keyof ListFilters) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  function push(next: ListFilters) {
    const p = new URLSearchParams();
    (Object.keys(next) as (keyof ListFilters)[]).forEach((k) => next[k] && p.set(k, next[k]));
    const qs = p.toString();
    start(() => router.push(`${basePath}${qs ? `?${qs}` : ""}`, { scroll: false }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    push(v);
  }

  function reset() {
    const empty = { type: "", commune: "", budget: "", rooms: "", surface: "", sort: "", transaction: "" };
    setV(empty);
    push(empty);
  }

  return (
    <form onSubmit={submit} aria-label="Filtrer les biens" className="border border-[#E8E0D4] bg-white p-5 sm:p-7" aria-busy={pending}>
      <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {!fixedTransaction && (
          <div>
            <label htmlFor="f-tr" className={labelCls}>
              Transaction
            </label>
            <select id="f-tr" value={v.transaction} onChange={(e) => setV((s) => ({ ...s, transaction: e.target.value, budget: "" }))} className={selectCls}>
              <option value="">Achat et location</option>
              <option value="vente">À vendre</option>
              <option value="location">À louer</option>
            </select>
          </div>
        )}
        <div>
          <label htmlFor="f-type" className={labelCls}>
            Type de bien
          </label>
          <select id="f-type" value={v.type} onChange={set("type")} className={selectCls}>
            <option value="">Tous</option>
            {Object.entries(propertyTypeLabel).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-commune" className={labelCls}>
            Localisation
          </label>
          <select id="f-commune" value={v.commune} onChange={set("commune")} className={selectCls}>
            <option value="">Toutes</option>
            {communeNames.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-budget" className={labelCls}>
            {mode === "vente" ? "Budget maximum" : "Loyer maximum"}
          </label>
          <select id="f-budget" value={v.budget} onChange={set("budget")} className={selectCls}>
            <option value="">Sans limite</option>
            {budgetOptions[mode].map((b) => (
              <option key={b} value={b}>
                {formatEuro(b)}
                {mode === "location" ? " / mois" : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-rooms" className={labelCls}>
            Pièces (min.)
          </label>
          <select id="f-rooms" value={v.rooms} onChange={set("rooms")} className={selectCls}>
            <option value="">Indifférent</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-surface" className={labelCls}>
            Surface min. (m²)
          </label>
          <input id="f-surface" type="number" min={0} step={10} inputMode="numeric" placeholder="ex. 60" value={v.surface} onChange={set("surface")} className={selectCls} />
        </div>
        <div>
          <label htmlFor="f-sort" className={labelCls}>
            Trier par
          </label>
          <select id="f-sort" value={v.sort} onChange={set("sort")} className={selectCls}>
            <option value="">Pertinence</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="surface-desc">Surface décroissante</option>
          </select>
        </div>
        <div className="flex items-end gap-3">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-[#183B50] px-6 py-3 text-[13.5px] font-semibold text-[#F8F7F3] transition-colors hover:bg-[#252A2D] disabled:opacity-60"
          >
            {pending ? "Recherche…" : "Appliquer"}
          </button>
          <button type="button" onClick={reset} className="px-2 py-3 text-[13px] font-semibold text-[#183B50]/70 underline-offset-4 hover:text-[#183B50] hover:underline">
            Réinitialiser
          </button>
        </div>
      </div>
    </form>
  );
}
