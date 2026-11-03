import type { Metadata } from "next";
import Link from "next/link";
import { PropertyCard } from "@/components/sierra/PropertyCard";
import { PropertySearch, emptySearch, type SearchValues } from "@/components/sierra/PropertySearch";
import { PageIntro, Wrap } from "@/components/sierra/ui";
import { filterSierraProperties, sierra, sortSierraProperties } from "@/data/sierra";

export const metadata: Metadata = {
  title: "Nos biens (démonstration)",
  description: "Catalogue de démonstration pour la proposition de refonte Sierra Immobilier. Annonces non commerciales.",
};

type Sp = Promise<Record<string, string | string[] | undefined>>;

function one(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] ?? "" : v ?? "";
}

export default async function BiensPage({ searchParams }: { searchParams: Sp }) {
  const sp = await searchParams;
  const initial: SearchValues = {
    transaction: one(sp.transaction) || emptySearch.transaction,
    location: one(sp.location),
    type: one(sp.type),
    budgetMin: one(sp.budgetMin),
    budgetMax: one(sp.budgetMax),
    rooms: one(sp.rooms),
  };
  const sort = (one(sp.sort) as "price-asc" | "price-desc" | "surface-desc" | "surface-asc") || "price-desc";
  const filtered = sortSierraProperties(
    filterSierraProperties({
      transaction: initial.transaction || undefined,
      location: initial.location || undefined,
      type: initial.type || undefined,
      budgetMin: initial.budgetMin ? Number(initial.budgetMin) : undefined,
      budgetMax: initial.budgetMax ? Number(initial.budgetMax) : undefined,
      rooms: initial.rooms ? Number(initial.rooms) : undefined,
    }),
    sort,
  );

  return (
    <>
      <PageIntro
        eyebrow="Catalogue"
        title="Nos biens à découvrir."
        text="Sélection d'annonces publiques Sierra Immobilier. Disponibilités à confirmer sur le site officiel."
      />
      <Wrap className="py-12 sm:py-16">
        <PropertySearch initial={initial} />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[14px] text-[#77766F]">
            {filtered.length} bien{filtered.length > 1 ? "s" : ""} · démonstration
          </p>
          <div className="flex flex-wrap gap-3 text-[12px] font-semibold uppercase tracking-[0.14em]">
            {(
              [
                ["price-desc", "Prix ↓"],
                ["price-asc", "Prix ↑"],
                ["surface-desc", "Surface ↓"],
                ["surface-asc", "Surface ↑"],
              ] as const
            ).map(([k, label]) => {
              const params = new URLSearchParams();
              Object.entries(initial).forEach(([key, val]) => {
                if (val) params.set(key, val);
              });
              params.set("sort", k);
              return (
                <Link
                  key={k}
                  href={`${sierra.basePath}/biens?${params.toString()}`}
                  className={sort === k ? "text-[#263B48] underline underline-offset-4" : "text-[#77766F] hover:text-[#222421]"}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="mt-16 border border-dashed border-[#D8C9B5] bg-[#FCFBF8] p-12 text-center">
            <p className="font-[family-name:var(--font-sierra-display)] text-[2rem] font-light text-[#222421]">Aucun résultat</p>
            <p className="mt-3 text-[15px] text-[#77766F]">Élargissez vos critères ou consultez le catalogue officiel.</p>
            <a href={sierra.officialSite} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-[12px] font-semibold uppercase tracking-[0.16em] text-[#263B48] underline underline-offset-4">
              Voir sierra-immo.fr
            </a>
          </div>
        ) : (
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        )}
        <p className="mt-14 text-center text-[13px] text-[#77766F]">
          Besoin du catalogue réel ?{" "}
          <a href={sierra.officialSite} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            Accéder au site officiel Sierra Immobilier
          </a>
        </p>
      </Wrap>
    </>
  );
}
