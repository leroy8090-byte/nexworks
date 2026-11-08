import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Motion";
import { Container, CtaBand, Icon, PageHero, Picture, Title } from "@/components/ui";
import { servicesFor, valuesFor } from "@/data/localized";
import { asLang, localePath } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const C = {
  fr: {
    title: "L'agence : notre approche de l'immobilier de prestige", description: "Discrétion, exigence, connaissance du golfe : l'approche de MAÉRIVA pour la vente, l'achat et la location saisonnière de maisons d'exception.",
    kicker: "L'agence", h1: "Une maison discrète, pour des maisons rares.", text: "MAÉRIVA accompagne ceux qui achètent, vendent ou louent une maison d'exception dans le golfe de Saint-Tropez.",
    alt: "Les toits de Saint-Tropez et son clocher, face au golfe", approach: "Notre approche", approachTitle: "Comprendre ce qui fait la valeur d'une maison, ici.",
    p1: "Sur le golfe, deux maisons de même surface peuvent n'avoir rien en commun. L'exposition, le vent, la vue, le chemin jusqu'à la mer, le calme du quartier : ce sont ces détails qui font une propriété d'exception.",
    p2: "Nous présentons chaque maison avec ce regard, et nous recevons chaque acquéreur pour comprendre ce qu'il cherche vraiment, avant de lui proposer une visite.",
    lane: "Ruelle pavée aux façades ocre de Saint-Tropez", pines: "Pins parasols au-dessus du golfe de Saint-Tropez",
    commit: "Nos engagements", commitTitle: "Quatre principes, à chaque étape.", services: "Nos services", servicesTitle: "Acheter, vendre, louer, confier.", more: "En savoir plus",
  },
  en: {
    title: "The agency: our approach to luxury real estate", description: "Discretion, high standards, knowledge of the gulf: the MAÉRIVA approach to selling, buying and renting exceptional homes.",
    kicker: "The agency", h1: "A discreet house, for rare homes.", text: "MAÉRIVA guides those who buy, sell or rent an exceptional home on the Gulf of Saint-Tropez.",
    alt: "The rooftops of Saint-Tropez and its bell tower, facing the gulf", approach: "Our approach", approachTitle: "Understanding what gives a home its value, here.",
    p1: "On the gulf, two homes of the same size can have nothing in common. Exposure, wind, views, the path down to the sea, the calm of the neighbourhood: these are the details that make an exceptional property.",
    p2: "We present every home with this eye, and we meet every buyer to understand what they are really looking for, before suggesting a viewing.",
    lane: "Cobbled lane with ochre façades in Saint-Tropez", pines: "Umbrella pines above the Gulf of Saint-Tropez",
    commit: "Our commitments", commitTitle: "Four principles, at every step.", services: "Our services", servicesTitle: "Buy, sell, rent, entrust.", more: "Learn more",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return pageMeta({ lang, title: C[lang].title, path: "/agence", image: "/photos/toits.webp", description: C[lang].description });
}

export default async function AgencyPage({ params }: Props) {
  const lang = asLang((await params).lang);
  const c = C[lang];
  return (
    <>
      <PageHero lang={lang} kicker={c.kicker} title={c.h1} text={c.text} image="/photos/toits.webp" alt={c.alt} crumbs={[{ name: c.kicker, path: "/agence" }]} />

      <section className="bg-white py-24 sm:py-32">
        <Container className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Title kicker={c.approach} title={c.approachTitle} />
            <Reveal delay={0.1} className="mt-9 space-y-6 text-[16.5px] leading-[1.85] text-ink/85"><p>{c.p1}</p><p>{c.p2}</p></Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <Picture src="/photos/ruelle.webp" alt={c.lane} className="aspect-[3/4]" sizes="(min-width:1024px) 25vw, 50vw" />
            <Picture src="/photos/golfe-pins.webp" alt={c.pines} className="mt-16 aspect-[3/4]" sizes="(min-width:1024px) 25vw, 50vw" />
          </div>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <Title kicker={c.commit} title={c.commitTitle} />
          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {valuesFor(lang).map((v, i) => (
              <li key={v.t} className="bg-white p-8 sm:p-10"><Reveal delay={i * 0.06}><p className="text-[11px] tracking-[0.3em] text-gold">0{i + 1}</p><h3 className="mt-6 text-[1.9rem] text-ink">{v.t}</h3><p className="mt-3 text-[15px] leading-[1.75] text-muted">{v.d}</p></Reveal></li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container>
          <Title kicker={c.services} title={c.servicesTitle} />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {servicesFor(lang).map((s, i) => (
              <Reveal key={s.k} delay={i * 0.06}>
                <Link href={localePath(lang, s.href)} className="group block">
                  <Picture src={s.image} alt="" className="aspect-[4/5]" sizes="(min-width:1024px) 25vw, 50vw" />
                  <p className="mt-5 text-[11px] tracking-[0.3em] text-gold">{s.k}</p>
                  <h3 className="mt-2 text-[1.8rem] text-ink"><span className="line">{s.t}</span></h3>
                  <p className="mt-2 text-[15px] leading-[1.75] text-muted">{s.d}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-ink uppercase">{c.more}<Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
