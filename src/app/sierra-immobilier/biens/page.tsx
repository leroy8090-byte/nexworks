import type { Metadata } from "next";
import Link from "next/link";
import { PropertyCard } from "@/components/sierra/PropertyCard";
import { PropertySearch, emptySearch, type SearchValues } from "@/components/sierra/PropertySearch";
import { PageIntro, Wrap } from "@/components/sierra/ui";
import { filterSierraProperties, sierra, sortSierraProperties } from "@/data/sierra";
import { listPublished } from "@/lib/sierra-cms";

export const metadata: Metadata = {
  title: "Nos biens",
  description: "Catalogue d'annonces Sierra Immobilier — proposition de refonte.",
};

export const dynamic = "force-dynamic";

type Sp = Promise<Record<string, string | string[] | undefined>>;

function one(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] ?? "" : v ?? "";
}

export default async function BiensPage({ searchParams }: { searchParams: Sp }) {
  const sp = await searchParams;
  const catalog = listPublished();
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
    filterSierraProperties(
      {
        transaction: initial.transaction || undefined,
        location: initial.location || undefined,
        type: initial.type || undefined,
        budgetMin: initial.budgetMin ? Number(initial.budgetMin) : undefined,
        budgetMax: initial.budgetMax ? Number(initial.budgetMax) : undefined,
        rooms: initial.rooms ? Number(initial.rooms) : undefined,
      },
      catalog,
    ),
    sort,
  );

  return (
    <>
      <PageIntro
        eyebrow="Catalogue"
        title="Nos biens à découvrir."
        text="Annonces gérées depuis le back-office. Disponibilités à confirmer sur le site officiel si besoin."
      />
      <Wrap className="py-12 sm:py-16">
        <PropertySearch initial={initial} />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[14px] text-[#7A7684]">
            {filtered.length} bien{filtered.length > 1 ? "s" : ""}
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
                  className={sort === k ? "text-[#A68936] underline underline-offset-4" : "text-[#7A7684] hover:text-[#231F31]"}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="mt-16 border border-dashed border-[#D8C9B5] bg-white p-12 text-center">
            <p className="text-[2rem] font-light text-[#231F31]">Aucun résultat</p>
            <p className="mt-3 text-[15px] text-[#7A7684]">Élargissez vos critères ou ajoutez un bien dans le back-office.</p>
            <Link href={`${sierra.basePath}/admin`} className="mt-6 inline-block text-[12px] font-semibold uppercase tracking-[0.16em] text-[#A68936] underline underline-offset-4">
              Ouvrir le back-office
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        )}
      </Wrap>
    </>
  );
}
