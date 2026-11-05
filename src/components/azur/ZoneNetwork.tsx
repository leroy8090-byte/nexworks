"use client";

import { useState } from "react";
import { azurZones } from "@/data/azur";
import { cn } from "@/lib/utils";

const ALL = "M640 96H160M640 96V300H250";

/** Le secteur dessiné comme un plan de tuyauterie : simple à lire, sans prétendre être une carte. */
export function ZoneNetwork({ detailed }: { detailed?: boolean }) {
  const [active, setActive] = useState("issambres");
  const zone = azurZones.find((z) => z.key === active) ?? azurZones[0];
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
      <div className="overflow-hidden rounded-2xl border-2 border-az-ink bg-white p-3 sm:p-6">
        <svg viewBox="60 30 680 340" role="img" aria-label="Plan schématique du secteur, depuis Saint-Raphaël" className="block h-auto w-full">
          <path d={ALL} fill="none" stroke="#7d421d" strokeWidth="14" strokeLinejoin="round" />
          <path d={ALL} fill="none" stroke="#c2703a" strokeWidth="9" strokeLinejoin="round" />
          {zone.pipe && <path key={zone.key} d={zone.pipe} fill="none" stroke="#4cc9ec" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" className="az-flow" />}
          {azurZones.map((z) => {
            const on = z.key === active;
            const below = z.y > 200 || z.key === "puget";
            return (
              <g key={z.key} className="cursor-pointer" onClick={() => setActive(z.key)}>
                <circle cx={z.x} cy={z.y} r="26" fill="transparent" />
                <circle cx={z.x} cy={z.y} r={on ? 16 : 12} fill={on ? "#f2bd3e" : "#fff"} stroke="#0a1647" strokeWidth="4" className="transition-all" />
                <text x={z.x} y={below ? z.y + 44 : z.y - 28} textAnchor="middle" fontSize="19" fontWeight="700" fill="#0a1647">{z.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div>
        <div role="group" aria-label="Choisir une commune" className="flex flex-wrap gap-2">
          {azurZones.map((z) => (
            <button key={z.key} type="button" aria-pressed={z.key === active} onClick={() => setActive(z.key)} onMouseEnter={() => setActive(z.key)} className={cn("min-h-11 rounded-lg border-2 px-3.5 py-2 text-[15px] font-bold transition-colors", z.key === active ? "border-az-ink bg-az-ink text-white" : "border-az-ink/25 bg-white hover:border-az-ink")}>
              {z.name}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="mt-6 min-h-[4.5rem] text-xl leading-relaxed">
          <strong className="az-display block text-[2.3rem]">{zone.name}</strong>
          {zone.text}
        </p>
        {detailed && <p className="mt-4 text-[15px] text-az-ink/75">Plan simplifié, sans échelle. Entreprise et secteur fictifs, villes bien réelles.</p>}
      </div>
    </div>
  );
}
