import { Listing, type SP } from "@/components/capital/Listing";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro } from "@/components/capital/ui";
import { capital } from "@/data/capital";

export const metadata = capitalMeta("Acheter à Saint-Raphaël et alentour", "Rechercher un bien à acheter autour de Saint-Raphaël : type de bien, commune, budget, pièces, surface. Biens de démonstration.", "/acheter");

export default async function Acheter({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <>
      <PageIntro eyebrow="Acheter" title="Trouver le bien qui vous correspond." text="Affinez par type de bien, commune, budget, nombre de pièces ou surface. Les résultats se mettent à jour à chaque recherche." />
      <Listing basePath={`${capital.basePath}/acheter`} sp={sp} transaction="vente" />
    </>
  );
}
