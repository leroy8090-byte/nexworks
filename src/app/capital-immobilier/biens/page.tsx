import { Listing, type SP } from "@/components/capital/Listing";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro } from "@/components/capital/ui";
import { capital } from "@/data/capital";

export const metadata = capitalMeta("Nos biens", "Tous les biens de démonstration, à vendre et à louer, autour de Saint-Raphaël.", "/biens");

export default async function Biens({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <>
      <PageIntro eyebrow="Nos biens" title="L'ensemble de la sélection." text="Achat et location réunis : utilisez les filtres pour affiner votre recherche." />
      <Listing basePath={`${capital.basePath}/biens`} sp={sp} />
    </>
  );
}
