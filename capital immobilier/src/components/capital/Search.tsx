"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition, type FormEvent } from "react";
import { budgetOptions, capital, communeNames, filterProperties, formatEuro, propertyTypeLabel, type Property, type Transaction } from "@/data/capital";

const selectCls = "w-full cursor-pointer appearance-none border-0 border-b-2 border-[#0E4F68]/20 bg-transparent py-2 text-[16px] font-medium text-[#1F2D33] outline-none transition-colors focus:border-[#B94F33]";
const labelCls = "block text-[13px] font-semibold text-[#0E4F68]";

/** La recherche de l'accueil : le bouton annonce le nombre de biens avant même de cliquer. */
export function HeroSearch({ properties }: { properties: Property[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [mode, setMode] = useState<Transaction>("vente");
  const [type, setType] = useState("");
  const [commune, setCommune] = useState("");
  const [budget, setBudget] = useState("");
  const count = useMemo(() => filterProperties(properties, { transaction: mode, type, commune, budgetMax: Number(budget) || undefined }).length, [properties, mode, type, commune, budget]);

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
    <form onSubmit={submit} aria-label="Rechercher un bien" className="relative z-10 w-full rounded-[2rem] bg-white p-5 shadow-[0_30px_70px_-30px_rgba(11,58,76,.55)] sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div role="radiogroup" aria-label="Type de recherche" className="inline-flex rounded-full bg-[#F0E4CE] p-1">
          {([["vente", "Acheter"], ["location", "Louer"]] as const).map(([k, l]) => (
            <label key={k} className={`cursor-pointer rounded-full px-6 py-2.5 text-[15px] font-semibold transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#0E4F68] ${mode === k ? "bg-[#0E4F68] text-white" : "text-[#0E4F68]"}`}>
              <input type="radio" name="mode" value={k} checked={mode === k} onChange={() => { setMode(k); setBudget(""); }} className="sr-only" />
              {l}
            </label>
          ))}
        </div>
        <p className="text-[15px] text-[#1F2D33]/80">
          Vous êtes propriétaire ?{" "}
          <a href={`${capital.basePath}/vendre`} className="font-semibold text-[#B94F33] underline underline-offset-4">Vendre</a>
          {" ou "}
          <a href={`${capital.basePath}/estimation`} className="font-semibold text-[#B94F33] underline underline-offset-4">estimer</a>
        </p>
      </div>
      <div className="grid gap-x-7 gap-y-5 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label htmlFor="hs-type" className={labelCls}>Type de bien</label>
          <select id="hs-type" value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
            <option value="">Tous les types</option>
            {Object.entries(propertyTypeLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="hs-commune" className={labelCls}>Localisation</label>
          <select id="hs-commune" value={commune} onChange={(e) => setCommune(e.target.value)} className={selectCls}>
            <option value="">Toutes les communes</option>
            {communeNames.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="hs-budget" className={labelCls}>{mode === "vente" ? "Budget maximum" : "Loyer maximum"}</label>
          <select id="hs-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={selectCls}>
            <option value="">Sans limite</option>
            {budgetOptions[mode].map((b) => <option key={b} value={b}>{formatEuro(b)}{mode === "location" ? " / mois" : ""}</option>)}
          </select>
        </div>
        <button type="submit" disabled={pending} className="inline-flex h-14 items-center justify-center rounded-full bg-[#B94F33] px-8 text-[16px] font-semibold text-white transition-all hover:bg-[#9E3F27] active:scale-[0.98] disabled:opacity-60 sm:col-span-3 lg:col-span-1">
          {pending ? "Recherche…" : `Voir ${count} ${count > 1 ? "biens" : "bien"}`}
        </button>
      </div>
    </form>
  );
}
