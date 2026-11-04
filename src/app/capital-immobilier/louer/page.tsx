import { Listing, type SP } from "@/components/capital/Listing";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro } from "@/components/capital/ui";
import { capital } from "@/data/capital";

export const metadata = capitalMeta("Louer à Saint-Raphaël et alentour", "Rechercher une location autour de Saint-Raphaël : appartements, studios et maisons. Annonces de démonstration.", "/louer");

export default async function Louer({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <>
      <PageIntro eyebrow="Louer" title="Une location qui vous ressemble." text="Appartements, studios et maisons : filtrez par commune, loyer, pièces ou surface. Vous êtes propriétaire ? Découvrez aussi notre gestion immobilière." />
      <Listing basePath={`${capital.basePath}/louer`} sp={sp} transaction="location" />
    </>
  );
}
