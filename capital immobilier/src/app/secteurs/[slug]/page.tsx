import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Motion";
import { PropertyCard } from "@/components/PropertyCard";
import { ScrollText } from "@/components/ScrollFx";
import { Checks, Further, RedBand, Split } from "@/components/Sections";
import { Btn, Container, PageHero, Title } from "@/components/ui";
import { sectors } from "@/data/agency";
import { sectorMatches } from "@/lib/filter";
import { getCards } from "@/lib/listings";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => sectors.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const sector = sectors.find((x) => x.slug === slug);
  if (!sector) return {};
  return pageMeta({ title: sector.metaTitle, description: sector.description, path: `/secteurs/${slug}`, image: sector.image, alt: sector.alt });
}

export default async function Secteur({ params }: Props) {
  const slug = (await params).slug;
  const s = sectors.find((x) => x.slug === slug);
  if (!s) notFound();
  const cards = getCards().filter((c) => sectorMatches(c, s.match));
  const others = sectors.filter((x) => x.slug !== s.slug);
  return (
    <>
      <PageHero crumbs={[{ name: "Nos secteurs", path: "/secteurs" }, { name: s.name, path: `/secteurs/${s.slug}` }]} eyebrow={s.name} title={s.h1} text={s.text} image={s.image} alt={s.alt}>
        <Btn href="#annonces" arrow>{cards.length > 0 ? `Voir ${cards.length > 1 ? `les ${cards.length} annonces` : "l’annonce"}` : "Nous interroger"}</Btn>
      </PageHero>
      <section className="bg-white py-20 sm:py-32">
        <Container><p className="max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.4rem]"><ScrollText text={s.lead} /></p></Container>
      </section>
      <Split eyebrow="Le secteur" title={`Vivre à ${s.name === "Pays de Fayence" ? "Fayence et alentour" : s.name}.`} image={s.image2} alt={s.alt2} reverse>
        {s.body.map((p) => <p key={p}>{p}</p>)}
      </Split>
      <section className="bg-night py-20 text-white sm:py-32">
        <Container>
          <Title light eyebrow="Avant de vous décider" title="Ce qu’il faut regarder ici." />
          <div className="mt-12"><Checks dark items={s.points} /></div>
        </Container>
      </section>
      <section id="annonces" className="scroll-mt-24 bg-white py-20 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Title eyebrow="Annonces" title={cards.length > 0 ? `${cards.length} ${cards.length > 1 ? "biens" : "bien"} dans ce secteur.` : "Rien en ligne aujourd’hui."} text={cards.length > 0 ? "Disponibilité à confirmer auprès de l’agence." : "Aucune annonce ne mentionne ce secteur aujourd’hui. Confiez votre recherche à l’agence, ou regardez l’ensemble des biens."} />
            <Reveal className="flex flex-wrap gap-3"><Btn href="/biens" variant="line" arrow>Toutes les annonces</Btn>{cards.length === 0 && <Btn href="/contact">Nous interroger</Btn>}</Reveal>
          </div>
          {cards.length > 0 && <ul className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{cards.map((c, i) => <li key={c.id} className="scale-in"><Reveal delay={(i % 3) * 0.08}><PropertyCard property={c} /></Reveal></li>)}</ul>}
        </Container>
      </section>
      <Further eyebrow="L’agence" title={`Vos projets à ${s.name === "Pays de Fayence" ? "Fayence et alentour" : s.name}.`} items={[
        { label: "Estimer mon bien", href: "/estimation" },
        { label: "Confier la gestion locative", href: "/gestion-locative" },
        { label: "Trouver un syndic de copropriété", href: "/syndic" },
        { label: "Les quartiers de Saint-Raphaël", href: "/conseils/quartiers-saint-raphael" },
      ]} />
      <section className="overflow-hidden bg-night py-14 text-white sm:py-20">
        <Container>
          <h2 className="text-[1.6rem] leading-tight sm:text-[2rem]">Les autres secteurs</h2>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((o, i) => <li key={o.slug}><Reveal delay={i * 0.04}><Link href={`/secteurs/${o.slug}`} className="text-[1.7rem] font-bold uppercase leading-tight tracking-[-0.01em] text-white/70 transition-colors duration-300 [font-family:var(--font-display)] hover:text-sea sm:text-[2.6rem]">{o.name}</Link></Reveal></li>)}
          </ul>
        </Container>
      </section>
      <RedBand title="Un projet dans ce secteur ?" text="Présentez-le à l’agence : elle vous répond." primary={{ label: "Parlons de votre projet", href: "/contact" }} secondary={{ label: "Estimer mon bien", href: "/estimation" }} />
    </>
  );
}
