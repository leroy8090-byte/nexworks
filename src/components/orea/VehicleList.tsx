"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { categories, vehicles, type CategoryKey } from "@/data/orea";
import { cn, ease } from "@/lib/utils";
import { VehicleCard } from "./VehicleCard";

const PAGE = 12;
const chip = (on: boolean) => cn("inline-flex min-h-11 items-center gap-2 rounded-lg border-2 px-4 py-2 text-[15px] font-bold transition-colors", on ? "border-or-ink bg-or-ink text-white" : "border-or-ink/20 hover:border-or-ink");
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Le catalogue : filtres, recherche et chargement progressif, pour rester rapide avec 160 véhicules. */
export function VehicleList({ initialCategory, days, query }: { initialCategory?: string; days?: number; query: string }) {
  const known = categories.some((c) => c.key === initialCategory);
  const [category, setCategory] = useState<CategoryKey | "toutes">(known ? (initialCategory as CategoryKey) : "toutes");
  const [search, setSearch] = useState("");
  const [auto, setAuto] = useState(false);
  const [seats, setSeats] = useState(0);
  const [energy, setEnergy] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [visible, setVisible] = useState(PAGE);

  const list = useMemo(() => {
    const q = norm(search.trim());
    return vehicles
      .filter((v) => category === "toutes" || v.category === category)
      .filter((v) => !q || norm(v.name).includes(q))
      .filter((v) => !auto || v.transmission === "Automatique")
      .filter((v) => v.seats >= seats)
      .filter((v) => !energy || v.energy === energy)
      .sort((a, b) => (sort === "asc" ? a.pricePerDay - b.pricePerDay : b.pricePerDay - a.pricePerDay));
  }, [category, search, auto, seats, energy, sort]);

  // Chaque nouvelle recherche repart du début de la liste.
  useEffect(() => setVisible(PAGE), [category, search, auto, seats, energy, sort]);

  const reset = () => { setCategory("toutes"); setSearch(""); setAuto(false); setSeats(0); setEnergy(""); };
  const shown = list.slice(0, visible);
  const left = list.length - shown.length;
  const select = "h-11 rounded-lg border-2 border-or-ink/20 bg-white px-2 font-bold";

  return (
    <>
      <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={category === "toutes"} onClick={() => setCategory("toutes")} className={chip(category === "toutes")}>Toutes</button>
        {categories.map((c) => (
          <button key={c.key} type="button" aria-pressed={category === c.key} onClick={() => setCategory(c.key)} className={chip(category === c.key)}>{c.label}</button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 border-b-2 border-or-ink/15 pb-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[15px] font-semibold">
          <label className="block w-full sm:w-64">
            <span className="sr-only">Rechercher un modèle</span>
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un modèle" className="h-11 w-full rounded-lg border-2 border-or-ink/20 bg-white px-3 font-semibold outline-none focus:border-or-flame-deep" />
          </label>
          <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} className="size-5 accent-[#c73d08]" />Boîte automatique</label>
          <label className="flex items-center gap-2">
            Places
            <select value={seats} onChange={(e) => setSeats(Number(e.target.value))} className={select}>
              <option value={0}>Toutes</option>
              <option value={4}>4 ou plus</option>
              <option value={5}>5 ou plus</option>
              <option value={7}>7 ou plus</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            Énergie
            <select value={energy} onChange={(e) => setEnergy(e.target.value)} className={select}>
              <option value="">Toutes</option>
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybride">Hybride</option>
              <option value="Électrique">Électrique</option>
            </select>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p aria-live="polite" className="text-[15px] font-bold">{`${list.length} ${list.length > 1 ? "véhicules" : "véhicule"}`}</p>
          <label className="flex items-center gap-2 text-[15px] font-semibold">
            Trier
            <select value={sort} onChange={(e) => setSort(e.target.value as "asc" | "desc")} className={select}>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </label>
        </div>
      </div>

      {list.length ? (
        <>
          <motion.ul layout="position" className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((v) => (
                <motion.li key={v.slug} layout="position" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}>
                  <VehicleCard v={v} days={days} query={query} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="text-[15px] font-semibold">{`${shown.length} véhicules affichés sur ${list.length}`}</p>
            {left > 0 && (
              <button type="button" onClick={() => setVisible((n) => n + PAGE)} className="min-h-14 rounded-lg bg-or-ink px-7 text-base font-bold text-white transition-colors hover:bg-black">
                {`Voir ${Math.min(left, PAGE)} véhicules de plus`}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="mt-10 rounded-2xl bg-white p-8 text-center">
          <p className="font-[family-name:var(--font-orea-display)] text-4xl font-extrabold uppercase">Aucun véhicule avec ces critères</p>
          <button type="button" onClick={reset} className="mt-4 text-base font-bold text-or-flame-deep underline underline-offset-4">Retirer les filtres</button>
        </div>
      )}
    </>
  );
}
