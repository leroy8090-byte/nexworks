import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageIntro, SierraButton, Wrap } from "@/components/sierra/ui";
import { sierra, sierraSectors } from "@/data/sierra";

type Params = Promise<{ slug: string }>;

const copy: Record<string, { title: string; paragraphs: string[]; seo: string }> = {
  "saint-raphael": {
    title: "Immobilier à Saint-Raphaël",
    seo: "Agence immobilière Saint-Raphaël — vieux port, plages et quartiers résidentiels.",
    paragraphs: [
      "Saint-Raphaël allie vieux port, commerces, écoles et un littoral recherché. L'agence y est implantée depuis 1973, face au port.",
      "Cette page locale présente le territoire sans inventer de statistiques de marché. Pour les annonces réelles, consultez le catalogue officiel.",
    ],
  },
  frejus: {
    title: "Immobilier à Fréjus",
    seo: "Agence immobilière Fréjus — patrimoine, littoral et quartiers résidentiels.",
    paragraphs: [
      "Fréjus combine patrimoine historique, littoral et quartiers résidentiels. Un marché complémentaire de Saint-Raphaël pour les projets d'achat ou de location.",
      "Les biens affichés dans cette démonstration restent fictifs et clairement identifiés comme tels.",
    ],
  },
  "puget-sur-argens": {
    title: "Immobilier à Puget-sur-Argens",
    seo: "Agence immobilière Puget-sur-Argens — cadre résidentiel et proximité du littoral varois.",
    paragraphs: [
      "Puget-sur-Argens offre un environnement résidentiel et une proximité avec les communes du littoral varois.",
      "Contactez l'agence pour un projet concret d'achat, de vente ou de location sur ce secteur.",
    ],
  },
};

export function generateStaticParams() {
  return sierraSectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const c = copy[slug];
  if (!c) return { title: "Secteur" };
  return { title: c.title, description: c.seo };
}

export default async function SectorPage({ params }: { params: Params }) {
  const { slug } = await params;
  const sector = sierraSectors.find((s) => s.slug === slug);
  const c = copy[slug];
  if (!sector || !c) notFound();

  return (
    <>
      <PageIntro eyebrow="Territoire" title={c.title} text={sector.text} />
      <Wrap className="grid gap-12 py-16 lg:grid-cols-2 lg:items-start">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#D8C9B5]">
          <Image src={sector.image} alt={`${sector.name}, Var`} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
        </div>
        <div className="space-y-5 text-[16px] leading-[1.85] text-[#77766F]">
          {c.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          <div className="flex flex-wrap gap-3 pt-4">
            <SierraButton href={`${sierra.basePath}/biens?location=${encodeURIComponent(sector.name)}`}>Biens sur {sector.name} (démo)</SierraButton>
            <SierraButton href={`${sierra.basePath}/contact`} variant="secondary">
              Contacter l&apos;agence
            </SierraButton>
          </div>
        </div>
      </Wrap>
    </>
  );
}
