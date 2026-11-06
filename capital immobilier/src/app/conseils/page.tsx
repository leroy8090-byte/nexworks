import { ScrollText } from "@/components/ScrollFx";
import { ArticleCards, RedBand } from "@/components/Sections";
import { Container, PageHero } from "@/components/ui";
import { articles } from "@/data/articles";
import { pageMeta } from "@/lib/seo";

const DESC = "Acheter, vendre, louer, gestion locative, syndic, ASL et ASA, quartiers de Saint-Raphaël, investissement : les conseils immobiliers de CAPITAL IMMOBILIER.";
export const metadata = pageMeta({ title: "Conseils immobiliers à Saint-Raphaël", description: DESC, path: "/conseils", image: "/media/corniche.webp" });

export default function Conseils() {
  return (
    <>
      <PageHero crumbs={[{ name: "Conseils", path: "/conseils" }]} eyebrow="Conseils" title="Comprendre avant de décider." text="Des articles clairs, pour préparer votre projet immobilier à Saint-Raphaël et alentour." image="/media/corniche.webp" alt="La corniche d’Or et les roches rouges de l’Estérel" />
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <p className="max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.4rem]"><ScrollText text="Acheter, vendre, confier la gestion d’un bien ou choisir un syndic : quelques repères simples évitent bien des surprises." /></p>
          <h2 className="mt-16 text-[2.5rem] leading-[0.98] text-night sm:mt-24 sm:text-[4rem]">Tous les articles</h2>
          <div className="mt-12"><ArticleCards items={articles} /></div>
        </Container>
      </section>
      <RedBand title="Une question précise ?" text="Consultez les réponses directes, ou appelez l’agence." primary={{ label: "Questions fréquentes", href: "/questions" }} secondary={{ label: "Contacter l’agence", href: "/contact" }} />
    </>
  );
}
