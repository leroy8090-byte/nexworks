import type { Metadata } from "next";
import Link from "next/link";
import { BiensLive } from "@/components/sierra/CatalogLive";
import { PropertySearch, emptySearch, type SearchValues } from "@/components/sierra/PropertySearch";
import { PageIntro, Wrap } from "@/components/sierra/ui";
import { sierra } from "@/data/sierra";
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
  const catalog = await listPublished();
  const initial: SearchValues = {
    transaction: one(sp.transaction) || emptySearch.transaction,
    location: one(sp.location),
    type: one(sp.type),
    budgetMin: one(sp.budgetMin),
    budgetMax: one(sp.budgetMax),
    rooms: one(sp.rooms),
  };
  const sort = (one(sp.sort) as "price-asc" | "price-desc" | "surface-desc" | "surface-asc") || "price-desc";

  return (
    <>
      <PageIntro
        eyebrow="Catalogue"
        title="Nos biens à découvrir."
        text="Annonces gérées depuis le back-office. Disponibilités à confirmer sur le site officiel si besoin."
      />
      <Wrap className="py-12 sm:py-16">
        <PropertySearch initial={initial} />
        <div className="mt-8 flex flex-wrap items-center justify-end gap-4">
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
        <BiensLive initial={catalog} search={initial} sort={sort} />
      </Wrap>
    </>
  );
}
