import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Motion";
import { Photo } from "@/components/Photo";
import { PropertyCard } from "@/components/PropertyCard";
import { Container, CtaBand, Faq, Icon, JsonLd, PageHero, Picture, Title } from "@/components/ui";
import { destinationFor, destinationsFor, propertiesFor } from "@/data/localized";
import { destinations } from "@/data/site";
import { asLang, localePath } from "@/i18n/config";
import { faqLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => destinations.map((d) => ({ slug: d.slug }));

const C = {
  fr: {
    meta: (n: string) => `Immobilier de prestige à ${n}`, metaDesc: (communes: string) => `Villas, bastides et maisons à vendre ou à louer à ${communes}.`,
    dest: "Destinations", spirit: "L'esprit des lieux", live: (n: string) => `Vivre à ${n}.`, notMiss: "À ne pas manquer", charm: "Ce qui fait le charme du lieu.",
    props: "Propriétés", ours: (n: string) => `Nos maisons à ${n}.`, all: "Toutes les propriétés", practical: (n: string) => `${n}, en pratique.`,
    q1: (n: string) => `Quels types de biens trouve-t-on à ${n} ?`, q2: (n: string) => `Comment se rendre à ${n} ?`, q3: "Les adresses des biens sont-elles publiées ?",
    a3: "Non. Par discrétion pour les propriétaires, l'adresse exacte est communiquée lors de la prise de rendez-vous, avant la visite.",
  },
  en: {
    meta: (n: string) => `Luxury real estate in ${n}`, metaDesc: (communes: string) => `Villas, bastides and homes for sale or rent in ${communes}.`,
    dest: "Destinations", spirit: "The spirit of the place", live: (n: string) => `Living in ${n}.`, notMiss: "Not to be missed", charm: "What gives the place its charm.",
    props: "Properties", ours: (n: string) => `Our homes in ${n}.`, all: "All properties", practical: (n: string) => `${n}, in practice.`,
    q1: (n: string) => `What kind of properties can be found in ${n}?`, q2: (n: string) => `How do you get to ${n}?`, q3: "Are property addresses published?",
    a3: "No. Out of discretion for the owners, the exact address is shared when you book a viewing, before the visit.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang = asLang(l);
  const d = destinationFor(slug, lang);
  return d ? pageMeta({ lang, title: C[lang].meta(d.name), path: `/destinations/${d.slug}`, image: d.image, description: `${d.lead} ${C[lang].metaDesc(d.communes.join(", "))}` }) : {};
}

export default async function DestinationPage({ params }: Props) {
  const { lang: l, slug } = await params;
  const lang = asLang(l);
  const c = C[lang];
  const d = destinationFor(slug, lang);
  if (!d) notFound();
  const list = propertiesFor(lang).filter((p) => p.destination === d.slug);
  const others = destinationsFor(lang).filter((x) => x.slug !== d.slug);
  const faq = [
    { q: c.q1(d.name), a: d.living },
    { q: c.q2(d.name), a: `${d.access.join(". ")}.` },
    { q: c.q3, a: c.a3 },
  ];
  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <PageHero lang={lang} kicker={d.kicker} title={d.title} text={d.lead} image={d.image} alt={d.alt} crumbs={[{ name: c.dest, path: "/destinations" }, { name: d.name, path: `/destinations/${d.slug}` }]} />

      <section className="bg-white py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Title kicker={c.spirit} title={c.live(d.name)} />
            <Reveal delay={0.1} className="mt-9 space-y-6 text-[16.5px] leading-[1.85] text-ink/85">{d.intro.map((t) => <p key={t.slice(0, 16)}>{t}</p>)}</Reveal>
            <Reveal delay={0.15}><p className="mt-8 text-[13.5px] tracking-wide text-pave-dark">{d.communes.join(" · ")}</p></Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <Picture src={d.image2} alt={d.alt2} className="aspect-[3/4]" sizes="(min-width:1024px) 28vw, 50vw" />
            <Picture src={d.image3} alt={d.alt3} className="mt-16 aspect-[3/4]" sizes="(min-width:1024px) 28vw, 50vw" />
          </div>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <Title kicker={c.notMiss} title={c.charm} />
          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {d.highlights.map((h, i) => (
              <li key={h.t} className="bg-white p-8"><Reveal delay={i * 0.06}><p className="text-[11px] tracking-[0.3em] text-gold">0{i + 1}</p><h3 className="mt-6 text-[1.8rem] leading-tight text-ink">{h.t}</h3><p className="mt-3 text-[15px] leading-[1.75] text-muted">{h.d}</p></Reveal></li>
            ))}
          </ul>
          <Reveal className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-[14px] text-muted">{d.access.map((a) => <span key={a} className="flex items-center gap-3"><Icon name="check" className="size-4 text-gold" />{a}</span>)}</Reveal>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Title kicker={c.props} title={c.ours(d.name)} />
            <Reveal><Link href={localePath(lang, "/proprietes")} className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] text-ink uppercase"><span className="line">{c.all}</span><Icon name="arrow" className="size-4" /></Link></Reveal>
          </div>
          <ul className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <li key={p.slug}><Reveal><PropertyCard p={p} lang={lang} /></Reveal></li>)}</ul>
        </Container>
      </section>

      <Faq lang={lang} items={faq} title={c.practical(d.name)} />

      <section className="border-t border-line bg-white py-20">
        <Container className="grid gap-8 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={localePath(lang, `/destinations/${o.slug}`)} className="group grid grid-cols-[8rem_1fr] items-center gap-6 sm:grid-cols-[11rem_1fr]">
              <div className="relative aspect-square overflow-hidden bg-paper"><Photo src={o.image} alt={o.alt} fill sizes="176px" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]" /></div>
              <div><p className="caps text-[10px] text-pave-dark">{o.kicker}</p><p className="serif mt-2 text-[2rem] leading-none text-ink"><span className="line">{o.name}</span></p></div>
            </Link>
          ))}
        </Container>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
