import type { Metadata } from "next";
import { Estimation } from "@/components/Estimation";
import { Reveal } from "@/components/Motion";
import { Container, CtaBand, Faq, JsonLd, PageHero, Picture, Title } from "@/components/ui";
import { asLang } from "@/i18n/config";
import { faqLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const C = {
  fr: {
    title: "Vendre et estimer sa propriété dans le golfe de Saint-Tropez",
    description: "Estimation argumentée, présentation soignée, vente publique ou confidentielle : confiez la vente de votre villa ou de votre bastide à Saint-Tropez, Sainte-Maxime ou Saint-Raphaël.",
    kicker: "Vendre avec Maériva", h1: "Une maison rare mérite une vente *sur mesure.*", text: "Chaque propriété a son histoire et ses acquéreurs. Nous préparons la vente comme on prépare une maison pour recevoir.",
    alt: "Façade de bastide couverte de glycine", crumb: "Vendre", method: "Notre méthode", methodTitle: "Cinq étapes, un seul interlocuteur.", courtAlt: "Cour intérieure d'un mas provençal",
    steps: [
      { t: "L'estimation", d: "Une visite, puis un avis de valeur argumenté : les ventes comparables, l'exposition, la vue, l'état, le potentiel." },
      { t: "La présentation", d: "Photographies et vidéo soignées, descriptif précis, dossier complet préparé avant la première visite." },
      { t: "La diffusion", d: "Publique et ciblée, ou confidentielle : votre bien n'est montré qu'aux acquéreurs que nous avons rencontrés." },
      { t: "Les visites", d: "Réservées aux acquéreurs qualifiés, organisées à vos conditions, avec un compte rendu après chacune." },
      { t: "La signature", d: "Négociation, compromis, coordination avec les notaires et les diagnostiqueurs, jusqu'à l'acte." },
    ],
    estKicker: "Estimation", estTitle: "Estimer votre propriété.", estText: "Quelques questions pour préparer notre premier échange. Votre adresse reste strictement confidentielle.",
    faq: [
      { q: "L'estimation est-elle payante ?", a: "Non. L'avis de valeur est réalisé après une visite du bien, sans engagement de votre part." },
      { q: "Peut-on vendre sans que le bien soit publié ?", a: "Oui. En vente confidentielle, la maison n'apparaît ni sur le site ni sur les portails : elle est présentée uniquement aux acquéreurs reçus en rendez-vous." },
      { q: "Quels documents faut-il prévoir ?", a: "Le titre de propriété, les diagnostics obligatoires (dont le DPE), les taxes foncières, et pour une copropriété les documents du syndic. Nous vous aidons à les réunir." },
      { q: "Accompagnez-vous les vendeurs qui vivent à l'étranger ?", a: "Oui. Visites, suivi et échanges avec le notaire peuvent se faire à distance, avec des comptes rendus réguliers." },
    ],
    faqTitle: "Vendre, en pratique.", ctaKicker: "Vente confidentielle", ctaTitle: "Parlons de votre maison, en toute *discrétion.*", ctaText: "Un premier échange, sans engagement, pour comprendre votre projet et vous présenter notre approche.",
  },
  en: {
    title: "Sell and value your property on the Gulf of Saint-Tropez",
    description: "A reasoned valuation, a careful presentation, a public or confidential sale: entrust the sale of your villa or bastide in Saint-Tropez, Sainte-Maxime or Saint-Raphaël.",
    kicker: "Selling with Maériva", h1: "A rare home deserves a *tailored sale.*", text: "Every property has its own story and its own buyers. We prepare the sale the way one prepares a home to welcome guests.",
    alt: "Bastide façade covered in wisteria", crumb: "Sell", method: "Our method", methodTitle: "Five steps, a single point of contact.", courtAlt: "Inner courtyard of a Provençal farmhouse",
    steps: [
      { t: "The valuation", d: "A visit, then a reasoned valuation: comparable sales, exposure, views, condition, potential." },
      { t: "The presentation", d: "Careful photography and video, a precise description, a complete file prepared before the first viewing." },
      { t: "The marketing", d: "Public and targeted, or confidential: your property is only shown to buyers we have met." },
      { t: "The viewings", d: "Reserved for qualified buyers, arranged on your terms, with a report after each one." },
      { t: "The signing", d: "Negotiation, preliminary contract, coordination with notaries and surveyors, through to completion." },
    ],
    estKicker: "Valuation", estTitle: "Value your property.", estText: "A few questions to prepare our first conversation. Your address remains strictly confidential.",
    faq: [
      { q: "Is the valuation free of charge?", a: "Yes. The valuation is carried out after a visit of the property, with no obligation on your part." },
      { q: "Can a property be sold without being listed?", a: "Yes. In a confidential sale, the home appears neither on our website nor on property portals: it is presented only to buyers met by appointment." },
      { q: "Which documents should be prepared?", a: "The title deed, the mandatory surveys (including the DPE energy rating), property tax notices and, for a co-ownership, the managing agent's documents. We help you gather them." },
      { q: "Do you assist sellers who live abroad?", a: "Yes. Viewings, follow-up and exchanges with the notary can all be handled remotely, with regular reports." },
    ],
    faqTitle: "Selling, in practice.", ctaKicker: "Confidential sale", ctaTitle: "Let's talk about your home, in complete *discretion.*", ctaText: "A first conversation, with no obligation, to understand your project and present our approach.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return pageMeta({ lang, title: C[lang].title, path: "/vendre", image: "/photos/bastide-glycine.webp", description: C[lang].description });
}

export default async function SellPage({ params }: Props) {
  const lang = asLang((await params).lang);
  const c = C[lang];
  return (
    <>
      <JsonLd data={faqLd(c.faq)} />
      <PageHero lang={lang} kicker={c.kicker} title={c.h1} text={c.text} image="/photos/bastide-glycine.webp" alt={c.alt} crumbs={[{ name: c.crumb, path: "/vendre" }]} />

      <section className="bg-white py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Title kicker={c.method} title={c.methodTitle} />
            <Picture src="/photos/mas-cour.webp" alt={c.courtAlt} className="mt-12 hidden aspect-[4/5] lg:block" sizes="40vw" />
          </div>
          <ol className="lg:col-span-7">
            {c.steps.map((s, i) => (
              <li key={s.t} className="border-b border-line py-9 first:border-t">
                <Reveal delay={i * 0.05} className="grid gap-4 sm:grid-cols-[6rem_1fr]">
                  <span className="serif text-[3.4rem] leading-none text-gold">0{i + 1}</span>
                  <div><h3 className="text-[2.2rem] text-ink">{s.t}</h3><p className="mt-3 max-w-xl text-[16px] leading-[1.8] text-muted">{s.d}</p></div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="estimation" className="scroll-mt-28 bg-paper py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4"><Title kicker={c.estKicker} title={c.estTitle} text={c.estText} /></div>
          <div className="border border-line bg-white p-7 sm:p-12 lg:col-span-8"><Estimation lang={lang} /></div>
        </Container>
      </section>

      <Faq lang={lang} items={c.faq} title={c.faqTitle} />
      <CtaBand lang={lang} kicker={c.ctaKicker} title={c.ctaTitle} text={c.ctaText} />
    </>
  );
}
