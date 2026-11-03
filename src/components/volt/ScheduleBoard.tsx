"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { volt, voltDays, voltLevels, voltSchedule, type VoltClass, type VoltDay, type VoltLevel } from "@/data/volt";
import { VoltButton } from "./ui";

function todayDay(): VoltDay {
  const i = (new Date().getDay() + 6) % 7; // lundi = 0
  return voltDays[i];
}

function ReserveModal({ item, onClose }: { item: VoltClass; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#101010]/85 p-5 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="volt-modal-title"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md border border-[#C6FF3D]/40 bg-[#1B1B1B] p-7"
      >
        <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#C6FF3D]">Démonstration</p>
        <h3 id="volt-modal-title" className="mt-2 font-[family-name:var(--font-volt-display)] text-[2.4rem] uppercase leading-none">
          {item.name}
        </h3>
        <p className="mt-2 text-[14px] text-[#F5F5F0]/70">
          {item.day} · {item.time} · {item.duration} · {item.coach}
        </p>
        <p className="mt-5 text-[14px] leading-relaxed text-[#F5F5F0]/70">
          Ceci illustre un parcours de réservation : aucune place n&apos;est réservée et aucune donnée n&apos;est envoyée, le club étant fictif.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <VoltButton href={`${volt.basePath}/contact?cours=${item.id}`}>Aller au formulaire</VoltButton>
          <VoltButton variant="secondary" onClick={onClose}>
            Fermer
          </VoltButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ScheduleBoard({ compact = false }: { compact?: boolean }) {
  const [day, setDay] = useState<VoltDay>("Lundi");
  const [level, setLevel] = useState<VoltLevel | "Tous">("Tous");
  const [selected, setSelected] = useState<VoltClass | null>(null);

  useEffect(() => setDay(todayDay()), []);

  const items = voltSchedule.filter((c) => c.day === day && (level === "Tous" || c.level === level));

  return (
    <div>
      <div role="tablist" aria-label="Jour de la semaine" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        {voltDays.map((d) => (
          <button
            key={d}
            role="tab"
            type="button"
            aria-selected={day === d}
            onClick={() => setDay(d)}
            className={`shrink-0 border px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.14em] transition-colors focus-visible:outline-2 focus-visible:outline-[#C6FF3D] ${
              day === d
                ? "border-[#C6FF3D] bg-[#C6FF3D] text-[#101010]"
                : "border-[#F5F5F0]/20 text-[#F5F5F0] hover:border-[#C6FF3D] hover:text-[#C6FF3D]"
            }`}
          >
            {compact ? d.slice(0, 3) : d}
          </button>
        ))}
      </div>

      {!compact && (
        <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer par niveau">
          <span className="mr-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#858585]">Niveau</span>
          {(["Tous", ...voltLevels] as const).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={level === l}
              onClick={() => setLevel(l)}
              className={`px-4 py-2 text-[12px] font-semibold transition-colors ${
                level === l ? "bg-[#F5F5F0] text-[#101010]" : "bg-[#1B1B1B] text-[#F5F5F0]/75 hover:text-[#C6FF3D]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-6 divide-y divide-[#F5F5F0]/10 border-y border-[#F5F5F0]/10" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {items.map((c) => (
            <motion.li
              layout
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="group grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 py-5 transition-colors hover:bg-[#1B1B1B] sm:grid-cols-[110px_1fr_auto] sm:px-3"
            >
              <span className="font-[family-name:var(--font-volt-display)] text-[2.2rem] leading-none text-[#C6FF3D]">{c.time}</span>
              <div>
                <p className="font-[family-name:var(--font-volt-display)] text-[1.9rem] uppercase leading-none">{c.name}</p>
                <p className="mt-1.5 text-[13px] text-[#F5F5F0]/60">
                  {c.duration} · {c.level} · {c.coach} · {c.room}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(c)}
                className="col-span-2 justify-self-start border border-[#F5F5F0]/30 px-5 py-2.5 text-[11.5px] font-extrabold uppercase tracking-[0.16em] transition-colors hover:border-[#C6FF3D] hover:bg-[#C6FF3D] hover:text-[#101010] sm:col-span-1 sm:justify-self-end"
              >
                Réserver (démo)
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
        {items.length === 0 && <li className="py-10 text-center text-[14px] text-[#858585]">Aucun cours ce jour-là pour ce niveau.</li>}
      </ul>

      {compact && (
        <div className="mt-8">
          <Link href={`${volt.basePath}/planning`} className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-[#C6FF3D] underline-offset-8 hover:underline">
            Voir le planning complet →
          </Link>
        </div>
      )}
      <p className="mt-4 text-[12px] text-[#858585]">Planning fictif, à titre d&apos;illustration.</p>

      <AnimatePresence>{selected && <ReserveModal item={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </div>
  );
}
