import { Results } from "@/components/Results";
import { Container, Crumbs, HeroWords, JsonLd } from "@/components/ui";
import { agency, sectors } from "@/data/agency";
import { TYPES, type Criteria } from "@/lib/filter";
import { getCards } from "@/lib/listings";
import { pageMeta, webPageLd } from "@/lib/seo";

const DESC = "Appartements, maisons et villas à vendre ou à louer à Saint-Raphaël, à Fréjus et dans leurs environs : filtrez les annonces de CAPITAL IMMOBILIER.";
/** Les recherches filtrées gardent cette page comme adresse de référence, pour éviter les doublons. */
export const metadata = pageMeta({ title: "Annonces immobilières à Saint-Raphaël et Fréjus", description: DESC, path: "/biens", image: "/media/massif-esterel.webp" });

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function Biens({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const initial: Criteria = { transaction: one(sp.transaction), commune: one(sp.commune), type: one(sp.type), min: one(sp.min), max: one(sp.max), pieces: one(sp.pieces), surface: one(sp.surface), secteur: one(sp.secteur), sort: one(sp.sort) };
  const cards = getCards();
  const communes = [...new Set(cards.map((c) => c.commune))].sort((a, b) => a.localeCompare(b, "fr"));
  const heading = initial.transaction === "vente" ? "Acheter un bien" : initial.transaction === "location" ? "Louer un bien" : initial.transaction === "vacances" ? "Location de vacances" : "Toutes nos annonces";
  return (
    <section className="pb-24 pt-44 sm:pt-52">
      <JsonLd data={webPageLd({ name: "Annonces immobilières à Saint-Raphaël et Fréjus", path: "/biens", description: DESC })} />
      <Container>
        <Crumbs items={[{ name: "Annonces", path: "/biens" }]} className="mb-6" />
        <h1 className="max-w-4xl text-[3rem] leading-[0.96] text-night sm:text-[5.4rem]"><HeroWords text={heading} /></h1>
        <p className="rise mt-4 max-w-2xl text-[17.5px] leading-[1.6] text-muted">Les annonces de {agency.name}, avec leurs photos, leurs caractéristiques et leurs prix. Disponibilité à confirmer auprès de l’agence.</p>
        <div className="mt-10">
          <h2 className="sr-only">Résultats de la recherche</h2>
          <Results key={JSON.stringify(initial)} cards={cards} communes={communes} types={TYPES} sectors={sectors.map((s) => ({ slug: s.slug, name: s.name, match: s.match }))} initial={initial} />
        </div>
      </Container>
    </section>
  );
}
