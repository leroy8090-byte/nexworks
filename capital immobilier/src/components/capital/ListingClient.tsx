"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { budgetOptions, capital, communeNames, filterProperties, formatEuro, FEATURE_CHIPS, propertyTypeLabel, type Property, type Transaction } from "@/data/capital";
import { PropertyCard } from "./PropertyCard";
import { CapButton } from "./ui";

export type ListValues = { type: string; commune: string; budget: string; rooms: string; surface: string; sort: string; transaction: string; feature: string };
const PAGE = 12;
const num = (s: string) => { const n = Number(s); return Number.isFinite(n) && n > 0 ? n : undefined; };
const field = "h-12 w-full cursor-pointer appearance-none rounded-full border border-[#0E4F68]/25 bg-[#FBF7EE] pl-4 pr-7 text-[14px] font-medium sm:pl-5 sm:pr-9 sm:text-[15px] text-[#1F2D33] outline-none transition-colors hover:border-[#0E4F68]/60 focus:border-[#0E4F68]";
const chevron = { backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%230E4F68' stroke-width='1.6'%3E%3Cpath d='m1 1.5 5 5 5-5'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "11px" };

/** La recherche : tout se met à jour immédiatement, et l'adresse de la page garde les critères. */
export function ListingClient({ properties, basePath, initial, fixedTransaction }: { properties: Property[]; basePath: string; initial: ListValues; fixedTransaction?: Transaction }) {
  const [v, setV] = useState<ListValues>(initial);
  const [visible, setVisible] = useState(PAGE);
  const [more, setMore] = useState(Boolean(initial.rooms || initial.surface));
  const top = useRef<HTMLDivElement>(null);
  const chips = v.feature ? v.feature.split(",") : [];
  const mode: Transaction = (fixedTransaction ?? v.transaction) === "location" ? "location" : "vente";

  const results = useMemo(() => filterProperties(properties, {
    transaction: fixedTransaction ?? v.transaction,
    type: v.type,
    commune: v.commune,
    budgetMax: num(v.budget),
    rooms: num(v.rooms),
    surfaceMin: num(v.surface),
    sort: v.sort,
    features: chips,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [properties, v, fixedTransaction]);

  useEffect(() => {
    const p = new URLSearchParams();
    (Object.keys(v) as (keyof ListValues)[]).forEach((k) => { if (v[k] && !(k === "transaction" && fixedTransaction)) p.set(k, v[k]); });
    const qs = p.toString();
    window.history.replaceState(null, "", `${basePath}${qs ? `?${qs}` : ""}`);
  }, [v, basePath, fixedTransaction]);

  const change = (k: keyof ListValues, value: string) => { setVisible(PAGE); setV((s) => ({ ...s, [k]: value, ...(k === "transaction" ? { budget: "" } : {}) })); };
  const toggleChip = (c: string) => change("feature", (chips.includes(c) ? chips.filter((x) => x !== c) : [...chips, c]).join(","));
  const active = Boolean(v.type || v.commune || v.budget || v.rooms || v.surface || v.feature || (!fixedTransaction && v.transaction));
  const reset = () => { setVisible(PAGE); setV({ type: "", commune: "", budget: "", rooms: "", surface: "", sort: v.sort, transaction: "", feature: "" }); };
  const shown = results.slice(0, visible);
  const left = results.length - shown.length;

  return (
    <div ref={top}>
      <form onSubmit={(e) => e.preventDefault()} aria-label="Filtrer les biens" className="z-30 rounded-[2rem] transition-[top] duration-500 lg:sticky lg:top-[var(--cap-sticky,124px)] border border-[#0E4F68]/15 bg-[#FBF7EE]/95 p-3 shadow-[0_18px_40px_-28px_rgba(11,58,76,.7)] backdrop-blur sm:p-4">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
          {!fixedTransaction && (
            <select aria-label="Transaction" value={v.transaction} onChange={(e) => change("transaction", e.target.value)} className={field} style={chevron}>
              <option value="">Achat, location</option>
              <option value="vente">À vendre</option>
              <option value="location">À louer</option>
            </select>
          )}
          <select aria-label="Type de bien" value={v.type} onChange={(e) => change("type", e.target.value)} className={field} style={chevron}>
            <option value="">Tous types</option>
            {Object.entries(propertyTypeLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
          <select aria-label="Localisation" value={v.commune} onChange={(e) => change("commune", e.target.value)} className={field} style={chevron}>
            <option value="">Communes</option>
            {communeNames.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select aria-label={mode === "vente" ? "Budget maximum" : "Loyer maximum"} value={v.budget} onChange={(e) => change("budget", e.target.value)} className={field} style={chevron}>
            <option value="">{mode === "vente" ? "Tous budgets" : "Tous loyers"}</option>
            {budgetOptions[mode].map((b) => <option key={b} value={b}>{`Jusqu'à ${formatEuro(b)}${mode === "location" ? " / mois" : ""}`}</option>)}
          </select>
          {fixedTransaction && (
            <select aria-label="Trier" value={v.sort} onChange={(e) => change("sort", e.target.value)} className={field} style={chevron}>
              <option value="">Les plus récents</option>
              <option value="prix-asc">Prix croissant</option>
              <option value="prix-desc">Prix décroissant</option>
              <option value="surface-desc">Les plus grands</option>
            </select>
          )}
          <button type="button" onClick={() => setMore((m) => !m)} aria-expanded={more} className="col-span-2 h-12 rounded-full bg-[#0E4F68] px-6 text-[15px] font-semibold text-[#FBF7EE] transition-colors hover:bg-[#0B3A4C] lg:col-span-1">
            {more ? "Moins de filtres" : "Plus de filtres"}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {more && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="grid grid-cols-2 gap-2 pt-2 lg:grid-cols-4">
                <select aria-label="Nombre de pièces" value={v.rooms} onChange={(e) => change("rooms", e.target.value)} className={field} style={chevron}>
                  <option value="">Toutes les tailles</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{`${n} pièces et plus`}</option>)}
                </select>
                <select aria-label="Surface minimum" value={v.surface} onChange={(e) => change("surface", e.target.value)} className={field} style={chevron}>
                  <option value="">Toutes les surfaces</option>
                  {[40, 60, 80, 100, 150, 200, 300].map((n) => <option key={n} value={n}>{`${n} m² et plus`}</option>)}
                </select>
                {!fixedTransaction && (
                  <select aria-label="Trier" value={v.sort} onChange={(e) => change("sort", e.target.value)} className={field} style={chevron}>
                    <option value="">Les plus récents</option>
                    <option value="prix-asc">Prix croissant</option>
                    <option value="prix-desc">Prix décroissant</option>
                    <option value="surface-desc">Les plus grands</option>
                  </select>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div role="group" aria-label="Prestations" className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {FEATURE_CHIPS.map((c) => {
            const on = chips.includes(c);
            return (
              <button key={c} type="button" aria-pressed={on} onClick={() => toggleChip(c)} className={`h-10 shrink-0 rounded-full border px-4 text-[14px] font-semibold transition-all duration-200 active:scale-95 ${on ? "border-[#B94F33] bg-[#B94F33] text-white" : "border-[#0E4F68]/20 text-[#0E4F68] hover:border-[#0E4F68]"}`}>
                {c}
              </button>
            );
          })}
        </div>
      </form>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="font-[family-name:var(--font-cap-serif)] text-[1.9rem] text-[#0E4F68]">
          {results.length} {results.length > 1 ? "biens" : "bien"}
        </p>
        {active && <button type="button" onClick={reset} className="text-[15px] font-semibold text-[#B94F33] underline underline-offset-4">Effacer les filtres</button>}
      </div>

      {results.length > 0 ? (
        <motion.ul layout="position" className="mt-6 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, i) => (
              <motion.li key={p.ref} layout="position" initial={{ opacity: 0, y: 26, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <PropertyCard property={p} priority={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-8 rounded-[2rem] border border-dashed border-[#0E4F68]/30 p-10 text-center sm:p-16">
          <p className="font-[family-name:var(--font-cap-serif)] text-[2rem] leading-tight">Aucun bien ne correspond à ces critères.</p>
          <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-[#1F2D33]/75">Élargissez votre recherche, ou décrivez votre projet à l&apos;agence.</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={reset} className="rounded-full border border-[#0E4F68]/40 px-7 py-3.5 text-[14.5px] font-semibold text-[#0E4F68] hover:bg-[#0E4F68] hover:text-white">Effacer les filtres</button>
            <CapButton href={`${capital.basePath}/contact`}>Contacter l&apos;agence</CapButton>
          </div>
        </div>
      )}

      {left > 0 && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-[15px] text-[#1F2D33]/75">{`${shown.length} biens sur ${results.length}`}</p>
          <button type="button" onClick={() => setVisible((n) => n + PAGE)} className="rounded-full bg-[#B94F33] px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#9E3F27]">
            {`Voir ${Math.min(left, PAGE)} biens de plus`}
          </button>
        </div>
      )}
    </div>
  );
}
