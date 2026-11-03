"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { formatPrice, sierra, type SierraProperty } from "@/data/sierra";

type FavCtx = {
  favs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  compare: string[];
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
};

const Ctx = createContext<FavCtx | null>(null);
const KEY_F = "sierra-favs-v1";
const KEY_C = "sierra-compare-v1";

export function SierraExtrasProvider({ children }: { children: ReactNode }) {
  const [favs, setFavs] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);

  useEffect(() => {
    try {
      setFavs(JSON.parse(localStorage.getItem(KEY_F) || "[]"));
      setCompare(JSON.parse(localStorage.getItem(KEY_C) || "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY_F, JSON.stringify(favs));
  }, [favs]);
  useEffect(() => {
    localStorage.setItem(KEY_C, JSON.stringify(compare));
  }, [compare]);

  const value = useMemo<FavCtx>(
    () => ({
      favs,
      toggle: (slug) => setFavs((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug])),
      has: (slug) => favs.includes(slug),
      compare,
      toggleCompare: (slug) =>
        setCompare((s) => {
          if (s.includes(slug)) return s.filter((x) => x !== slug);
          if (s.length >= 3) return [...s.slice(1), slug];
          return [...s, slug];
        }),
      clearCompare: () => setCompare([]),
    }),
    [favs, compare],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSierraExtras() {
  const v = useContext(Ctx);
  if (!v) throw new Error("SierraExtrasProvider missing");
  return v;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  if (reduce) return null;
  return <motion.div className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[#A68936]" style={{ scaleX: scrollYProgress }} />;
}

export function FavButton({ slug, className = "" }: { slug: string; className?: string }) {
  const { has, toggle } = useSierraExtras();
  const on = has(slug);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Retirer des favoris" : "Ajouter aux favoris"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={`inline-flex size-10 items-center justify-center rounded-full border transition-colors ${
        on ? "border-[#A68936] bg-[#A68936] text-white" : "border-white/40 bg-[#231F31]/55 text-white hover:border-[#A68936]"
      } ${className}`}
    >
      ♥
    </button>
  );
}

export function CompareButton({ slug }: { slug: string }) {
  const { compare, toggleCompare } = useSierraExtras();
  const on = compare.includes(slug);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCompare(slug);
      }}
      className={`text-[10px] font-bold uppercase tracking-[0.14em] ${on ? "text-[#A68936]" : "text-[#7A7684] hover:text-[#231F31]"}`}
    >
      {on ? "Comparé ✓" : "Comparer"}
    </button>
  );
}

export function FavoritesBar({ properties }: { properties: SierraProperty[] }) {
  const { favs, compare, clearCompare } = useSierraExtras();
  const favProps = properties.filter((p) => favs.includes(p.slug));
  const cmpProps = properties.filter((p) => compare.includes(p.slug));

  return (
    <>
      <AnimatePresence>
        {favProps.length > 0 && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed bottom-20 left-4 z-40 max-w-xs border border-[#A68936]/40 bg-[#231F31] p-3 text-white shadow-xl sm:left-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A68936]">Favoris ({favProps.length})</p>
            <ul className="mt-2 space-y-1.5">
              {favProps.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link href={`${sierra.basePath}/biens/${p.slug}`} className="line-clamp-1 text-[12.5px] hover:text-[#A68936]">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cmpProps.length >= 2 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl border border-[#E8E4DE] bg-white p-4 shadow-2xl sm:inset-x-auto"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A68936]">Comparer ({cmpProps.length}/3)</p>
              <button type="button" onClick={clearCompare} className="text-[11px] font-semibold uppercase tracking-wide text-[#7A7684]">
                Effacer
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {cmpProps.map((p) => (
                <Link key={p.slug} href={`${sierra.basePath}/biens/${p.slug}`} className="flex gap-3 border border-[#E8E4DE] p-2 hover:border-[#A68936]">
                  <div className="relative size-14 shrink-0 overflow-hidden bg-[#231F31]">
                    <Image src={p.images[0]} alt="" fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-[12px] font-semibold text-[#231F31]">{p.title}</p>
                    <p className="mt-1 text-[12px] text-[#A68936]">{formatPrice(p.price, p.transaction)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function HoursCard({ light = false }: { light?: boolean }) {
  return (
    <div className={`border p-5 ${light ? "border-white/15 bg-white/5 text-white" : "border-[#E8E4DE] bg-white text-[#231F31]"}`}>
      <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#A68936]" : "text-[#A68936]"}`}>Horaires</p>
      <ul className="mt-4 space-y-2 text-[13.5px]">
        {sierra.hours.map((h) => (
          <li key={h.day} className="flex items-center justify-between gap-4 border-b border-current/10 pb-2 last:border-0">
            <span className={light ? "text-white/80" : "text-[#7A7684]"}>{h.day}</span>
            <span className={`font-semibold ${h.slots === "Fermé" ? "text-red-500" : ""}`}>{h.slots}</span>
          </li>
        ))}
      </ul>
      <p className={`mt-3 text-[11.5px] ${light ? "text-white/50" : "text-[#7A7684]"}`}>Source : informations Google de l&apos;agence.</p>
    </div>
  );
}
