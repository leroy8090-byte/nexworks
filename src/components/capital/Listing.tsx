import { Suspense } from "react";
import { capital, filterProperties, type Transaction } from "@/data/capital";
import { PropertyCard } from "./PropertyCard";
import { FilterBar, type ListFilters } from "./Search";
import { CapButton, DemoNotice, Reveal, Wrap } from "./ui";

export type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const num = (s: string) => {
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

/** Liste filtrée : les critères viennent de l'URL, le calcul se fait sur le jeu de données de démonstration. */
export function Listing({ basePath, sp, transaction }: { basePath: string; sp: SP; transaction?: Transaction }) {
  const values: ListFilters = {
    type: one(sp.type),
    commune: one(sp.commune),
    budget: one(sp.budget),
    rooms: one(sp.rooms),
    surface: one(sp.surface),
    sort: one(sp.sort),
    transaction: transaction ?? one(sp.transaction),
  };
  const results = filterProperties({
    transaction: values.transaction,
    type: values.type,
    commune: values.commune,
    budgetMax: num(values.budget),
    rooms: num(values.rooms),
    surfaceMin: num(values.surface),
    sort: values.sort,
  });

  return (
    <section className="py-12 sm:py-16">
      <Wrap>
        <DemoNotice className="mb-8" />
        <Suspense fallback={<div className="h-40 animate-pulse bg-[#E8E0D4]/60" aria-hidden />}>
          <FilterBar key={JSON.stringify(values)} basePath={basePath} initial={values} fixedTransaction={transaction} />
        </Suspense>
        <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#183B50]" role="status" aria-live="polite">
          {results.length} {results.length > 1 ? "biens de démonstration" : "bien de démonstration"}
        </p>
        {results.length > 0 ? (
          <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <PropertyCard property={p} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-[#183B50]/30 p-10 text-center sm:p-16">
            <p className="font-[family-name:var(--font-cap-serif)] text-[2rem] leading-tight">Aucun bien ne correspond à ces critères.</p>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#252A2D]/65">
              Élargissez votre recherche ou réinitialisez les filtres. Pour un projet précis, l&apos;agence peut aussi vous répondre directement.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CapButton href={basePath} variant="secondary" arrow={false}>
                Réinitialiser la recherche
              </CapButton>
              <CapButton href={`${capital.basePath}/contact`}>Contacter l&apos;agence</CapButton>
            </div>
          </div>
        )}
      </Wrap>
    </section>
  );
}
