"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { locations, propertyTypeLabel, sierra } from "@/data/sierra";

export type SearchValues = {
  transaction: string;
  location: string;
  type: string;
  budgetMin: string;
  budgetMax: string;
  rooms: string;
};

export const emptySearch: SearchValues = {
  transaction: "achat",
  location: "",
  type: "",
  budgetMin: "",
  budgetMax: "",
  rooms: "",
};

const field =
  "w-full border-0 border-b border-[#D8D2C8] bg-transparent px-0 py-2.5 text-[15px] text-[#231F31] outline-none transition-colors focus:border-[#A68936]";
const label = "block text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#7A7684]";

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
    router.push(`${sierra.basePath}/biens${qs ? `?${qs}` : ""}`);
  }

  function reset() {
    setV(emptySearch);
    router.push(`${sierra.basePath}/biens`);
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Recherche immobilière"
      className={`border border-[#E8E4DE] bg-white p-6 sm:p-8 ${variant === "home" ? "shadow-[0_30px_60px_-40px_rgba(35,31,49,.4)]" : ""}`}
    >
      <div className="mb-6 flex flex-wrap gap-6" role="radiogroup" aria-label="Type d'offre">
        {[
          { v: "achat", l: "Acheter" },
          { v: "location", l: "Louer" },
        ].map((t) => (
          <label key={t.v} className="flex cursor-pointer items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#231F31]">
            <input
              type="radio"
              name="transaction"
              value={t.v}
              checked={v.transaction === t.v}
              onChange={set("transaction")}
              className="size-4 accent-[#A68936]"
            />
            {t.l}
          </label>
        ))}
      </div>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor={`loc-${variant}`} className={label}>
            Localisation
          </label>
          <select id={`loc-${variant}`} className={field} value={v.location} onChange={set("location")}>
            <option value="">Toutes</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`type-${variant}`} className={label}>
            Type de bien
          </label>
          <select id={`type-${variant}`} className={field} value={v.type} onChange={set("type")}>
            <option value="">Tous</option>
            {Object.entries(propertyTypeLabel).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`rooms-${variant}`} className={label}>
            Nombre de pièces
          </label>
          <select id={`rooms-${variant}`} className={field} value={v.rooms} onChange={set("rooms")}>
            <option value="">Indifférent</option>
            {[2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`bmin-${variant}`} className={label}>
            Budget min (€)
          </label>
          <input
            id={`bmin-${variant}`}
            type="number"
            min={0}
            step={10000}
            inputMode="numeric"
            placeholder="200 000"
            className={field}
            value={v.budgetMin}
            onChange={set("budgetMin")}
          />
        </div>
        <div>
          <label htmlFor={`bmax-${variant}`} className={label}>
            Budget max (€)
          </label>
          <input
            id={`bmax-${variant}`}
            type="number"
            min={0}
            step={10000}
            inputMode="numeric"
            placeholder="800 000"
            className={field}
            value={v.budgetMax}
            onChange={set("budgetMax")}
          />
        </div>
        <div className="flex items-end gap-3">
          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center bg-[#A68936] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#231F31]"
          >
            Rechercher un bien
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-3 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#7A7684] underline-offset-4 hover:text-[#231F31] hover:underline"
          >
            Reset
          </button>
        </div>
      </div>
      {variant === "home" && (
        <p className="mt-5 text-[12.5px] leading-relaxed text-[#7A7684]">
          Sélection d&apos;annonces publiques Sierra Immobilier. Catalogue complet :{" "}
          <a href={sierra.officialSite} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            sierra-immo.fr
          </a>
          .
        </p>
      )}
    </form>
  );
}
