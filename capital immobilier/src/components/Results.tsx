"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { applyCriteria, BUDGETS, euro, type Card, type Criteria } from "@/lib/filter";
import { agency } from "@/data/agency";
import { PropertyCard } from "./PropertyCard";

const PAGE = 12;
const field = "select h-10 w-full cursor-pointer border-0 border-b border-night/25 bg-transparent text-[15.5px] text-night outline-none transition-colors hover:border-night focus:border-night";
const L = ({ label, children }: { label: string; children: ReactNode }) => <label className="block min-w-0 text-[13.5px] text-muted">{label}{children}</label>;
const EMPTY: Criteria = { transaction: "", commune: "", type: "", min: "", max: "", pieces: "", surface: "", secteur: "", sort: "" };

/** Résultats : les critères arrivent par l'adresse, se modifient ici sans rechargement, et l'adresse reste partageable. */
export function Results({ cards, communes, types, sectors, initial }: { cards: Card[]; communes: string[]; types: string[]; sectors: { slug: string; name: string; match: string }[]; initial: Criteria }) {
  const [c, setC] = useState<Criteria>({ ...EMPTY, ...initial });
  const [visible, setVisible] = useState(PAGE);
  const [open, setOpen] = useState(false);
  const sector = sectors.find((s) => s.slug === c.secteur);
  const results = useMemo(() => applyCriteria(cards, c, sector?.match), [cards, c, sector]);
  useEffect(() => {
    const q = new URLSearchParams();
    (Object.entries(c) as [string, string][]).forEach(([k, v]) => { if (v) q.set(k, v); });
    const s = q.toString();
    window.history.replaceState(null, "", `/biens${s ? `?${s}` : ""}`);
  }, [c]);
  const set = (k: keyof Criteria, v: string) => { setVisible(PAGE); setC((s) => ({ ...s, [k]: v, ...(k === "transaction" ? { min: "", max: "" } : {}) })); };
  const active = (["commune", "type", "min", "max", "pieces", "surface", "secteur"] as const).filter((k) => c[k]).length;
  const reset = () => { setVisible(PAGE); setC({ ...EMPTY, transaction: c.transaction, sort: c.sort }); };
  const budgets = BUDGETS[c.transaction || "vente"] ?? BUDGETS.vente;
  const suffix = c.transaction === "location" || c.transaction === "vacances" ? " / mois" : "";
  const shown = results.slice(0, visible);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Type d’annonce">
        {([["", "Toutes les annonces"], ["vente", "Acheter"], ["location", "Louer"], ["vacances", "Location de vacances"]] as const).map(([k, l]) => (
          <button key={k} type="button" aria-pressed={c.transaction === k} onClick={() => set("transaction", k)} className={`min-h-10 rounded-full border px-4 text-[14.5px] transition-colors duration-300 ${c.transaction === k ? "border-night bg-night text-white" : "border-night/20 text-night hover:border-night"}`}>{l}</button>
        ))}
        <button type="button" aria-expanded={open} onClick={() => setOpen((s) => !s)} className="ml-auto min-h-10 rounded-full border border-night/20 px-4 text-[14.5px] text-night transition-colors hover:border-night">{active ? `Filtres (${active})` : "Filtres"}</button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <m.form onSubmit={(e) => e.preventDefault()} aria-label="Filtrer les annonces" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-6 md:grid-cols-3 lg:grid-cols-7">
              <L label="Localisation"><select value={c.commune} onChange={(e) => set("commune", e.target.value)} className={field}><option value="">Toutes</option>{communes.map((x) => <option key={x}>{x}</option>)}</select></L>
              <L label="Secteur"><select value={c.secteur} onChange={(e) => set("secteur", e.target.value)} className={field}><option value="">Tous</option>{sectors.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select></L>
              <L label="Type de bien"><select value={c.type} onChange={(e) => set("type", e.target.value)} className={field}><option value="">Tous</option>{types.map((t) => <option key={t} value={t}>{t === "Villa" ? "Maison, villa" : t}</option>)}</select></L>
              <L label="Budget minimum"><select value={c.min} onChange={(e) => set("min", e.target.value)} className={field}><option value="">Sans minimum</option>{budgets.map((b) => <option key={b} value={b}>{`${euro(b)}${suffix}`}</option>)}</select></L>
              <L label="Budget maximum"><select value={c.max} onChange={(e) => set("max", e.target.value)} className={field}><option value="">Sans maximum</option>{budgets.map((b) => <option key={b} value={b}>{`${euro(b)}${suffix}`}</option>)}</select></L>
              <L label="Pièces"><select value={c.pieces} onChange={(e) => set("pieces", e.target.value)} className={field}><option value="">Indifférent</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{`${n} et plus`}</option>)}</select></L>
              <L label="Surface minimale"><select value={c.surface} onChange={(e) => set("surface", e.target.value)} className={field}><option value="">Indifférente</option>{[30, 50, 70, 90, 120].map((n) => <option key={n} value={n}>{`${n} m² et plus`}</option>)}</select></L>
            </div>
          </m.form>
        )}
      </AnimatePresence>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-5">
        <p role="status" aria-live="polite" className="text-[1.9rem] leading-none text-night [font-family:var(--font-display)]">{results.length} {results.length > 1 ? "biens" : "bien"}</p>
        <div className="flex items-center gap-5">
          {active > 0 && <button type="button" onClick={reset} className="line-on text-[15px] text-muted hover:text-night">Réinitialiser</button>}
          <label className="flex items-center gap-2 text-[14.5px] text-muted">Trier
            <select value={c.sort} onChange={(e) => set("sort", e.target.value)} className="select cursor-pointer border-0 bg-transparent text-[15px] text-night outline-none">
              <option value="">Prix décroissant</option>
              <option value="prix-asc">Prix croissant</option>
              <option value="surface-desc">Surface décroissante</option>
              <option value="surface-asc">Surface croissante</option>
            </select>
          </label>
        </div>
      </div>
      {results.length > 0 ? (
        <ul key={[c.transaction, c.commune, c.type, c.min, c.max, c.pieces, c.surface, c.secteur, c.sort].join("|")} className="mt-8 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <m.li key={p.id} data-reveal initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}>
              <PropertyCard property={p} priority={i < 3} />
            </m.li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 bg-white p-10 text-center sm:p-14">
          <p className="text-[2rem] leading-tight text-night [font-family:var(--font-display)]">{c.transaction === "vacances" ? "Aucun logement de vacances n’est en ligne pour le moment." : "Aucun bien ne correspond à ces critères."}</p>
          <p className="mx-auto mt-3 max-w-md text-[16.5px] leading-relaxed text-muted">Élargissez votre recherche, ou décrivez votre projet à l’agence au {agency.phone}.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {active > 0 && <button type="button" onClick={reset} className="min-h-[3.3rem] border border-night/35 px-7 text-[15px] font-medium text-night hover:bg-night hover:text-white">Réinitialiser les filtres</button>}
            <Link href="/contact" className="grid min-h-[3.3rem] place-items-center bg-night px-7 text-[15px] font-medium text-white hover:bg-sea">Contacter l’agence</Link>
          </div>
        </div>
      )}
      {results.length > visible && (
        <div className="mt-14 flex flex-col items-center gap-3">
          <p className="text-[15px] text-muted">{`${shown.length} biens sur ${results.length}`}</p>
          <button type="button" onClick={() => setVisible((n) => n + PAGE)} className="min-h-[3.3rem] border border-night/35 px-8 text-[15px] font-medium text-night transition-colors hover:bg-night hover:text-white">Voir la suite</button>
        </div>
      )}
    </div>
  );
}
