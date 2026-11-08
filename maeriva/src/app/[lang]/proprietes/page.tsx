import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertyBrowser } from "@/components/PropertyBrowser";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { asLang } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const C = {
  fr: {
    title: "Propriétés à vendre et à louer, golfe de Saint-Tropez",
    description: "Villas avec vue mer, bastides, maisons de village et programmes neufs à Saint-Tropez, Ramatuelle, Gassin, Grimaud, Sainte-Maxime et Saint-Raphaël, à la vente ou en location saisonnière.",
    kicker: "Propriétés", h1: "Les maisons du golfe.", text: "Une sélection de villas, bastides et maisons de village, à la vente ou pour l'été. Filtrez, comparez, mettez de côté celles qui vous parlent.",
    loading: "Chargement des propriétés…", ctaTitle: "Vous ne trouvez pas la maison idéale ?", ctaText: "Décrivez-nous votre projet : nous vous présentons aussi les biens qui ne sont jamais publiés.",
  },
  en: {
    title: "Properties for sale and rent, Gulf of Saint-Tropez",
    description: "Sea-view villas, bastides, village houses and new developments in Saint-Tropez, Ramatuelle, Gassin, Grimaud, Sainte-Maxime and Saint-Raphaël, for sale or for seasonal rental.",
    kicker: "Properties", h1: "The homes of the gulf.", text: "A selection of villas, bastides and village houses, for sale or for the summer. Filter, compare, and keep the ones that speak to you.",
    loading: "Loading properties…", ctaTitle: "Can't find the ideal home?", ctaText: "Tell us about your project: we will also present the properties that are never listed.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return pageMeta({ lang, title: C[lang].title, path: "/proprietes", image: "/photos/piscine-mer.webp", description: C[lang].description });
}

export default async function PropertiesPage({ params }: Props) {
  const lang = asLang((await params).lang);
  const c = C[lang];
  return (
    <>
      <PageHero lang={lang} kicker={c.kicker} title={c.h1} text={c.text} crumbs={[{ name: c.kicker, path: "/proprietes" }]} />
      <section className="bg-white pt-14 pb-28 sm:pb-36">
        <Container>
          <Suspense fallback={<p className="py-16 text-muted">{c.loading}</p>}>
            <PropertyBrowser lang={lang} />
          </Suspense>
        </Container>
      </section>
      <CtaBand lang={lang} title={c.ctaTitle} text={c.ctaText} />
    </>
  );
}
