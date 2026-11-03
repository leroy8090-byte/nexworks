import type { Metadata } from "next";
import { filterProperties, riviera } from "@/data/riviera";
import { PropertyCard } from "@/components/riviera/PropertyCard";
import { PropertySearch, emptySearch, type SearchValues } from "@/components/riviera/PropertySearch";
import { PageIntro, Reveal, Wrap } from "@/components/riviera/ui";

export const metadata: Metadata = {
  title: "Nos propriétés",
  description: "Sélection de propriétés fictives de prestige sur la Côte d'Azur — démonstration.",
};

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const num = (s: string) => {
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export default async function ProprietesPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const values: SearchValues = {
    transaction: one(sp.transaction) || emptySearch.transaction,
    location: one(sp.location),
    type: one(sp.type),
    budgetMin: one(sp.budgetMin),
    budgetMax: one(sp.budgetMax),
    bedrooms: one(sp.bedrooms),
    surfaceMin: one(sp.surfaceMin),
  };
  const results = filterProperties({
    transaction: values.transaction,
    location: values.location,
    type: values.type,
    budgetMin: num(values.budgetMin),
    budgetMax: num(values.budgetMax),
    bedrooms: num(values.bedrooms),
    surfaceMin: num(values.surfaceMin),
  });

  return (
    <>
      <PageIntro eyebrow="Nos propriétés" title="Des adresses à habiter" text="Affinez votre recherche par localisation, type de bien, budget ou surface." />
      <section className="py-14 sm:py-20">
        <Wrap>
          <PropertySearch key={JSON.stringify(values)} initial={values} />
          <p className="mt-10 text-[13px] uppercase tracking-[0.2em] text-[#858178]" aria-live="polite">
            {results.length} {results.length > 1 ? "propriétés" : "propriété"}
          </p>
          {results.length > 0 ? (
            <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-8 border border-dashed border-[#D9CBB7] p-12 text-center">
              <p className="font-[family-name:var(--font-riviera-display)] text-[1.9rem] font-light">Aucune propriété ne correspond à ces critères.</p>
              <p className="mt-3 text-[15px] text-[#858178]">
                {values.transaction === "location"
                  ? "Cette démonstration ne présente que des biens à l'achat. "
                  : ""}
                Élargissez votre recherche ou réinitialisez les filtres.
              </p>
            </div>
          )}
          <p className="mt-12 text-[12.5px] text-[#858178]">Biens fictifs, prix et descriptions imaginaires — {riviera.name} est un site de démonstration.</p>
        </Wrap>
      </section>
    </>
  );
}
