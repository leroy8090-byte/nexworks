"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { volt, voltProgrammes } from "@/data/volt";
import { Photo, VoltButton } from "./ui";

const cats = ["Tous", "Strength", "Performance", "Energy"] as const;

export function ProgrammeList() {
  const [cat, setCat] = useState<(typeof cats)[number]>("Tous");
  const list = voltProgrammes.filter((p) => cat === "Tous" || p.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par univers">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`border px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.14em] transition-colors ${
              cat === c ? "border-[#C6FF3D] bg-[#C6FF3D] text-[#101010]" : "border-[#F5F5F0]/20 hover:border-[#C6FF3D] hover:text-[#C6FF3D]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article
              layout
              key={p.slug}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col border border-[#F5F5F0]/10 bg-[#1B1B1B] transition-colors hover:border-[#C6FF3D]/60"
            >
              <div className="relative overflow-hidden">
                <Photo
                  src={p.image}
                  alt={`Programme ${p.title}`}
                  className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <span className="absolute left-4 top-4 bg-[#101010]/85 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-[#C6FF3D]">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-[family-name:var(--font-volt-display)] text-[2.4rem] uppercase leading-none">{p.title}</h3>
                <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#C6FF3D]">
                  {p.duration} · {p.frequency} · {p.level}
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.75] text-[#F5F5F0]/65">{p.summary}</p>
                <ul className="mt-4 flex-1 space-y-1.5 text-[13.5px] text-[#F5F5F0]/80">
                  {p.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-[7px] size-1.5 shrink-0 bg-[#C6FF3D]" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                <VoltButton href={`${volt.basePath}/contact?cours=${p.slug}`} variant="secondary" className="mt-6">
                  En savoir plus (démo)
                </VoltButton>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      <p className="mt-8 text-[12px] text-[#858585]">
        Programmes fictifs. Aucun résultat garanti ; ne remplace pas l&apos;avis d&apos;un professionnel de santé.
      </p>
    </div>
  );
}
