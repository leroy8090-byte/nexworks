"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { locations, propertyTypeLabel, riviera } from "@/data/riviera";

export type SearchValues = {
  transaction: string;
  location: string;
  type: string;
  budgetMin: string;
  budgetMax: string;
  bedrooms: string;
  surfaceMin: string;
};

export const emptySearch: SearchValues = {
  transaction: "achat",
  location: "",
  type: "",
  budgetMin: "",
  budgetMax: "",
  bedrooms: "",
  surfaceMin: "",
};

const field =
  "w-full border-0 border-b border-[#D9CBB7] bg-transparent px-0 py-2.5 text-[15px] text-[#24251F] outline-none transition-colors focus:border-[#68715B]";
const label = "block text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#858178]";

export function PropertySearch({ initial = emptySearch, variant = "page" }: { initial?: SearchValues; variant?: "page" | "home" }) {
  const router = useRouter();
  const [v, setV] = useState<SearchValues>(initial);
  const set = (k: keyof SearchValues) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    (Object.keys(v) as (keyof SearchValues)[]).forEach((k) => {
      if (v[k]) params.set(k, v[k]);
    });
    const qs = params.toString();
    router.push(`${riviera.basePath}/proprietes${qs ? `?${qs}` : ""}`);
  }

  function reset() {
    setV(emptySearch);
    router.push(`${riviera.basePath}/proprietes`);
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Recherche de propriétés"
      className={`border border-[#D9CBB7] bg-[#FFFEFA] p-6 sm:p-8 ${variant === "home" ? "shadow-[0_30px_60px_-40px_rgba(36,37,31,.35)]" : ""}`}
    >
      <div className="mb-6 flex gap-6" role="radiogroup" aria-label="Type de transaction">
        {[
          { v: "achat", l: "Achat" },
          { v: "location", l: "Location" },
        ].map((t) => (
          <label key={t.v} className="flex cursor-pointer items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#24251F]">
            <input
              type="radio"
              name="transaction"
              value={t.v}
              checked={v.transaction === t.v}
              onChange={set("transaction")}
              className="size-4 accent-[#68715B]"
            />
            {t.l}
          </label>
        ))}
      </div>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor={`loc-${variant}`} className={label}>Localisation</label>
          <select id={`loc-${variant}`} className={field} value={v.location} onChange={set("location")}>
            <option value="">Toutes</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`type-${variant}`} className={label}>Type de bien</label>
          <select id={`type-${variant}`} className={field} value={v.type} onChange={set("type")}>
            <option value="">Tous</option>
            {Object.entries(propertyTypeLabel).map(([k, l]) => (
              <option key={k} value={k}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`bmin-${variant}`} className={label}>Budget min (€)</label>
          <input id={`bmin-${variant}`} type="number" min={0} step={50000} inputMode="numeric" placeholder="500 000" className={field} value={v.budgetMin} onChange={set("budgetMin")} />
        </div>
        <div>
          <label htmlFor={`bmax-${variant}`} className={label}>Budget max (€)</label>
          <input id={`bmax-${variant}`} type="number" min={0} step={50000} inputMode="numeric" placeholder="3 500 000" className={field} value={v.budgetMax} onChange={set("budgetMax")} />
        </div>
        <div>
          <label htmlFor={`bed-${variant}`} className={label}>Chambres (min.)</label>
          <select id={`bed-${variant}`} className={field} value={v.bedrooms} onChange={set("bedrooms")}>
            <option value="">Indifférent</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`surf-${variant}`} className={label}>Surface min. (m²)</label>
          <input id={`surf-${variant}`} type="number" min={0} step={10} inputMode="numeric" placeholder="100" className={field} value={v.surfaceMin} onChange={set("surfaceMin")} />
        </div>
        <div className="flex items-end gap-3 sm:col-span-2">
          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center bg-[#24251F] px-7 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#FFFEFA] transition-colors hover:bg-[#68715B]"
          >
            Recherche
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-3 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#858178] underline-offset-4 hover:text-[#24251F] hover:underline"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </form>
  );
}
