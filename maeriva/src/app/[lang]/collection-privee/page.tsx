import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Motion";
import { Container, Icon, PageHero, Title } from "@/components/ui";
import { privateCollectionFor } from "@/data/localized";
import { asLang } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const C = {
  fr: {
    title: "Collection privée : biens confidentiels", description: "Villas et domaines présentés uniquement en rendez-vous, à la demande de leurs propriétaires. Demandez un accès à la collection privée MAÉRIVA.",
    kicker: "Collection privée", h1: "Ce qui ne se publie pas.", text: "Certains propriétaires souhaitent vendre sans que leur maison apparaisse en ligne. Ces biens sont présentés en rendez-vous, aux acquéreurs que nous avons rencontrés.",
    alt: "Grande baie vitrée ouverte sur la mer au crépuscule", now: "En ce moment", nowTitle: "Trois biens, présentés sur rendez-vous.", nowText: "Les photos, les adresses et les prix ne sont communiqués qu'après un premier échange.", onRequest: "Prix sur demande",
    access: "Demande d'accès", accessTitle: "Présentez-nous votre projet.", accessText: "Votre recherche, votre budget, vos dates : nous revenons vers vous pour un premier échange, puis nous vous présentons les biens qui y répondent.",
    points: ["Réponse personnalisée, sans liste automatique", "Coordonnées utilisées uniquement pour votre demande", "Visites organisées à vos dates"],
    submit: "Demander un accès", ph: "La maison que vous imaginez : vue, nombre de chambres, quartier…",
    budget: "Budget", budgets: ["De 2 à 5 M€", "De 5 à 10 M€", "De 10 à 20 M€", "Plus de 20 M€", "Location saisonnière"], zone: "Destination", zones: ["Saint-Tropez et la presqu'île", "Sainte-Maxime", "Saint-Raphaël", "Tout le golfe"],
  },
  en: {
    title: "Private collection: confidential properties", description: "Villas and estates presented by appointment only, at their owners' request. Request access to the MAÉRIVA private collection.",
    kicker: "Private collection", h1: "What is never published.", text: "Some owners wish to sell without their home appearing online. These properties are presented by appointment, to buyers we have met.",
    alt: "Large bay window opening onto the sea at dusk", now: "Currently", nowTitle: "Three properties, presented by appointment.", nowText: "Photos, addresses and prices are only shared after a first conversation.", onRequest: "Price on request",
    access: "Access request", accessTitle: "Tell us about your project.", accessText: "Your search, your budget, your dates: we will get back to you for a first conversation, then present the properties that match.",
    points: ["A personal reply, never an automated list", "Details used solely for your request", "Viewings arranged on your dates"],
    submit: "Request access", ph: "The home you have in mind: view, number of bedrooms, neighbourhood…",
    budget: "Budget", budgets: ["€2M to €5M", "€5M to €10M", "€10M to €20M", "Over €20M", "Seasonal rental"], zone: "Destination", zones: ["Saint-Tropez and the peninsula", "Sainte-Maxime", "Saint-Raphaël", "The whole gulf"],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return pageMeta({ lang, title: C[lang].title, path: "/collection-privee", image: "/photos/fenetre-mer.webp", description: C[lang].description });
}

export default async function PrivatePage({ params }: Props) {
  const lang = asLang((await params).lang);
  const c = C[lang];
  return (
    <>
      <PageHero lang={lang} kicker={c.kicker} title={c.h1} text={c.text} image="/photos/fenetre-mer.webp" alt={c.alt} crumbs={[{ name: c.kicker, path: "/collection-privee" }]} />

      <section className="bg-white py-24 sm:py-32">
        <Container>
          <Title kicker={c.now} title={c.nowTitle} text={c.nowText} />
          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3">
            {privateCollectionFor(lang).map((p, i) => (
              <li key={p.label} className="bg-white p-8 sm:p-10">
                <Reveal delay={i * 0.08}>
                  <Icon name="lock" className="size-5 text-gold" />
                  <p className="caps mt-8 text-[10px] text-pave-dark">{p.place}</p>
                  <p className="serif mt-2 text-[1.9rem] leading-tight text-ink">{p.label}</p>
                  <p className="mt-2 text-[14.5px] text-muted">{p.detail} · {c.onRequest}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Title kicker={c.access} title={c.accessTitle} text={c.accessText} />
            <Reveal delay={0.1} className="mt-10 space-y-4 text-[15px] text-muted">
              {c.points.map((t) => <p key={t} className="flex items-center gap-4"><Icon name="check" className="size-4 text-gold" />{t}</p>)}
            </Reveal>
          </div>
          <Reveal delay={0.1} className="border border-line bg-white p-7 sm:p-12 lg:col-span-7">
            <LeadForm lang={lang} kind="Demande d'accès à la collection privée" submit={c.submit} messagePlaceholder={c.ph}
              choices={[{ name: "budget", label: c.budget, options: c.budgets }, { name: "zone", label: c.zone, options: c.zones }]} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
