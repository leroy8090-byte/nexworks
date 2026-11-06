import { FavoritesList } from "@/components/capital/FavoritesList";
import { toCard } from "@/components/capital/Listing";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro, Wrap } from "@/components/capital/ui";
import { getProperties } from "@/lib/capital-properties";

export const metadata = capitalMeta("Mes favoris", "Les biens que vous avez gardés de côté.", "/favoris");

export default async function Favoris() {
  const properties = (await getProperties()).map(toCard);
  return (
    <>
      <PageIntro eyebrow="Mes favoris" title="Les biens que vous gardez de côté." text="Ils restent enregistrés dans ce navigateur : rien n'est envoyé." />
      <section className="py-14 sm:py-20"><Wrap><FavoritesList properties={properties} /></Wrap></section>
    </>
  );
}
