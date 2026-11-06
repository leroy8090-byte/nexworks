import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Motion";
import { PropertyCard } from "@/components/PropertyCard";
import { Further } from "@/components/Sections";
import { Btn, Container, PageHero, Title } from "@/components/ui";
import { landings } from "@/data/landings";
import { getCards } from "@/lib/listings";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => landings.map((l) => ({ slug: l.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const page = landings.find((x) => x.slug === slug);
  if (!page) return {};
  return pageMeta({ title: page.title, description: page.description, path: `/annonces/${page.slug}`, image: page.image, alt: page.alt });
}

export default async function Landing({ params }: Props) {
  const slug = (await params).slug;
  const l = landings.find((x) => x.slug === slug);
  if (!l) notFound();
  const pool = getCards().filter((c) => c.transaction === l.transaction && l.types.includes(c.type));
  const here = l.communes ? pool.filter((c) => l.communes!.test(c.commune)) : pool;
  const near = l.nearby ? pool.filter((c) => !here.includes(c) && l.nearby!.test(c.commune)) : [];
  const grid = (items: typeof pool) => <ul className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{items.map((c, i) => <li key={c.id} className="scale-in"><Reveal delay={(i % 3) * 0.08}><PropertyCard property={c} /></Reveal></li>)}</ul>;
  const total = here.length + near.length;
  return (
    <>
      <PageHero crumbs={[l.parent, { name: l.h1, path: `/annonces/${l.slug}` }]} eyebrow={l.eyebrow} title={l.h1} text={l.intro} image={l.image} alt={l.alt}>
        {total > 0 && <Btn href="#annonces" arrow>{`Voir ${total > 1 ? `les ${total} annonces` : "l’annonce"}`}</Btn>}
      </PageHero>
      <section id="annonces" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Title eyebrow="Annonces" title={here.length > 0 ? `${here.length} ${here.length > 1 ? "biens en ligne" : "bien en ligne"}.` : near.length > 0 ? "Rien sur la commune aujourd’hui." : "Rien en ligne aujourd’hui."} text={here.length > 0 ? "Disponibilité à confirmer auprès de l’agence." : l.none} />
            <Reveal><Btn href={l.filter} variant="line" arrow>Affiner la recherche</Btn></Reveal>
          </div>
          {here.length > 0 && grid(here)}
          {near.length > 0 && (
            <div className="mt-20">
              <h2 className="text-[2rem] leading-tight text-night sm:text-[2.6rem]">{l.nearbyTitle}</h2>
              {grid(near)}
            </div>
          )}
        </Container>
      </section>
      <Further items={l.links} />
    </>
  );
}
