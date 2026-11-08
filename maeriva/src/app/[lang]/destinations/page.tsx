import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Motion";
import { Container, CtaBand, Icon, PageHero, Picture } from "@/components/ui";
import { destinationsFor, propertiesFor } from "@/data/localized";
import { asLang, localePath } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const C = {
  fr: {
    title: "Destinations : Saint-Tropez, Sainte-Maxime, Saint-Raphaël",
    description: "La presqu'île de Saint-Tropez avec Ramatuelle, Gassin et Grimaud, Sainte-Maxime face au golfe, Saint-Raphaël entre mer et Estérel : les quartiers, l'art de vivre et les biens disponibles.",
    kicker: "Destinations", h1: "Le golfe, rivage par rivage.", text: "Chaque côté du golfe a son caractère : le village et ses ruelles, les collines face à la mer, les roches rouges de l'Estérel.",
    alt: "Vue sur le golfe de Saint-Tropez depuis le village de Grimaud", discover: "Découvrir", one: "propriété", many: "propriétés",
  },
  en: {
    title: "Destinations: Saint-Tropez, Sainte-Maxime, Saint-Raphaël",
    description: "The Saint-Tropez peninsula with Ramatuelle, Gassin and Grimaud, Sainte-Maxime facing the gulf, Saint-Raphaël between sea and Estérel: the neighbourhoods, the lifestyle and the available properties.",
    kicker: "Destinations", h1: "The gulf, shore by shore.", text: "Each side of the gulf has its own character: the village and its lanes, the hills facing the sea, the red rocks of the Estérel.",
    alt: "View over the Gulf of Saint-Tropez from the village of Grimaud", discover: "Discover", one: "property", many: "properties",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return pageMeta({ lang, title: C[lang].title, path: "/destinations", image: "/photos/golfe-grimaud.webp", description: C[lang].description });
}

export default async function DestinationsPage({ params }: Props) {
  const lang = asLang((await params).lang);
  const c = C[lang];
  const properties = propertiesFor(lang);
  return (
    <>
      <PageHero lang={lang} kicker={c.kicker} title={c.h1} text={c.text} image="/photos/golfe-grimaud.webp" alt={c.alt} crumbs={[{ name: c.kicker, path: "/destinations" }]} />
      <section className="bg-white py-24 sm:py-32">
        <Container className="space-y-28 sm:space-y-40">
          {destinationsFor(lang).map((d, i) => {
            const count = properties.filter((p) => p.destination === d.slug).length;
            return (
              <article key={d.slug} className="grid items-center gap-12 lg:grid-cols-12">
                <Picture src={d.image} alt={d.alt} sizes="(min-width:1024px) 58vw, 100vw" className={`aspect-[4/5] sm:aspect-[16/11] lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`} />
                <div className="lg:col-span-5">
                  <Reveal><p className="kicker">0{i + 1} · {d.kicker}</p></Reveal>
                  <Reveal delay={0.1}><h2 className="mt-6 text-[2.8rem] text-ink sm:text-[4.2rem]">{d.name}</h2></Reveal>
                  <Reveal delay={0.2}><p className="mt-6 text-[17px] leading-[1.8] text-muted">{d.lead}</p></Reveal>
                  <Reveal delay={0.25}><p className="mt-6 text-[14px] tracking-wide text-pave-dark">{d.communes.join(" · ")}</p></Reveal>
                  <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center gap-6">
                    <Link href={localePath(lang, `/destinations/${d.slug}`)} className="group/b inline-flex min-h-[3.4rem] items-center gap-3 bg-ink px-8 text-[11.5px] font-medium tracking-[0.24em] text-white uppercase transition-colors hover:bg-sea">{c.discover}<Icon name="arrow" className="size-4 transition-transform duration-500 group-hover/b:translate-x-1" /></Link>
                    <span className="text-[14px] text-muted">{count} {count > 1 ? c.many : c.one}</span>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </Container>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
