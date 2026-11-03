"use client";

import { useState } from "react";
import { volt, voltCompare, voltPlans } from "@/data/volt";
import { Reveal, VoltButton } from "./ui";

export function PlanCards() {
  const [active, setActive] = useState("performance");
  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
      {voltPlans.map((p, i) => {
        const on = active === p.slug;
        return (
          <Reveal key={p.slug} delay={i * 0.08} className="h-full">
            <article
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              className={`relative flex h-full flex-col border p-8 transition-all duration-300 ${
                on ? "border-[#C6FF3D] bg-[#1B1B1B] lg:-translate-y-2" : "border-[#F5F5F0]/12 bg-[#101010]"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-8 bg-[#C6FF3D] px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-[#101010]">
                  Le plus choisi (démo)
                </span>
              )}
              <h3 className="font-[family-name:var(--font-volt-display)] text-[2.6rem] uppercase leading-none">{p.name}</h3>
              <p className="mt-2 text-[14px] text-[#F5F5F0]/60">{p.tagline}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className={`font-[family-name:var(--font-volt-display)] text-[5rem] leading-none ${on ? "text-[#C6FF3D]" : "text-[#F5F5F0]"}`}>
                  {p.price}€
                </span>
                <span className="text-[13px] text-[#858585]">/ mois (fictif)</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-[14.5px]">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-[7px] size-1.5 shrink-0 bg-[#C6FF3D]" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <VoltButton href={`${volt.basePath}/contact?formule=${p.slug}`} variant={on ? "primary" : "secondary"} className="mt-8">
                Choisir {p.name}
              </VoltButton>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function CompareTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-[14.5px]">
        <caption className="sr-only">Comparatif des formules START, PERFORMANCE et ELITE (tarifs fictifs)</caption>
        <thead>
          <tr className="border-b border-[#F5F5F0]/20">
            <th scope="col" className="py-4 pr-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#858585]">
              Inclus
            </th>
            {voltPlans.map((p) => (
              <th
                key={p.slug}
                scope="col"
                className={`py-4 text-center font-[family-name:var(--font-volt-display)] text-[1.6rem] uppercase ${p.highlight ? "text-[#C6FF3D]" : ""}`}
              >
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {voltCompare.map((row) => (
            <tr key={row.label} className="border-b border-[#F5F5F0]/10 transition-colors hover:bg-[#1B1B1B]">
              <th scope="row" className="py-4 pr-4 font-medium text-[#F5F5F0]/85">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td key={i} className={`py-4 text-center ${voltPlans[i].highlight ? "bg-[#C6FF3D]/5" : ""}`}>
                  {v === true ? (
                    <span className="font-bold text-[#C6FF3D]" aria-label="Inclus">
                      ✓
                    </span>
                  ) : v === false ? (
                    <span className="text-[#858585]" aria-label="Non inclus">
                      —
                    </span>
                  ) : (
                    <span className="text-[#F5F5F0]">{v}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-[12px] text-[#858585]">Tarifs et contenus fictifs — démonstration NEXWORKS AGENCY.</p>
    </div>
  );
}
