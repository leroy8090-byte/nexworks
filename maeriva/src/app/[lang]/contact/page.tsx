import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Motion";
import { Container, Icon, PageHero, Title } from "@/components/ui";
import { agencyFor } from "@/data/localized";
import { asLang } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const C = {
  fr: {
    title: "Contact et rendez-vous", description: "Prendre rendez-vous avec MAÉRIVA pour acheter, vendre ou louer une propriété dans le golfe de Saint-Tropez.",
    kicker: "Contact", h1: "Prendre rendez-vous.", text: "Un projet d'achat, une maison à vendre, une location pour l'été : écrivez-nous, un conseiller vous répond personnellement.",
    alt: "Les façades colorées du port de Saint-Tropez", reach: "Nous joindre", listening: "À votre écoute.", phone: "Téléphone", office: "Agence", visits: "Les visites se font uniquement sur rendez-vous.",
    submit: "Envoyer", project: "Votre projet", projects: ["Acheter une propriété", "Vendre ou faire estimer", "Location saisonnière", "Gestion d'une maison", "Autre demande"],
  },
  en: {
    title: "Contact and appointments", description: "Book an appointment with MAÉRIVA to buy, sell or rent a property on the Gulf of Saint-Tropez.",
    kicker: "Contact", h1: "Book an appointment.", text: "A purchase, a home to sell, a summer rental: write to us and an advisor will reply to you personally.",
    alt: "The colourful façades of the harbour of Saint-Tropez", reach: "Get in touch", listening: "At your service.", phone: "Phone", office: "Agency", visits: "Viewings are by appointment only.",
    submit: "Send", project: "Your project", projects: ["Buying a property", "Selling or a valuation", "Seasonal rental", "Managing a home", "Other request"],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return pageMeta({ lang, title: C[lang].title, path: "/contact", image: "/photos/port.webp", description: C[lang].description });
}

export default async function ContactPage({ params }: Props) {
  const lang = asLang((await params).lang);
  const c = C[lang];
  const agency = agencyFor(lang);
  return (
    <>
      <PageHero lang={lang} kicker={c.kicker} title={c.h1} text={c.text} image="/photos/port.webp" alt={c.alt} crumbs={[{ name: c.kicker, path: "/contact" }]} />
      <section className="bg-white py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Title kicker={c.reach} title={c.listening} />
            <Reveal delay={0.2} className="mt-10 space-y-8">
              <a href={`tel:${agency.phoneHref}`} className="group flex items-center gap-5"><span className="grid size-14 place-items-center rounded-full border border-line text-gold"><Icon name="phone" /></span><span><span className="caps block text-[10px] text-pave-dark">{c.phone}</span><span className="serif text-[1.9rem] text-ink">{agency.phone}</span></span></a>
              <div className="flex items-center gap-5"><span className="grid size-14 place-items-center rounded-full border border-line text-gold"><Icon name="pin" /></span><span><span className="caps block text-[10px] text-pave-dark">{c.office}</span><span className="serif text-[1.9rem] text-ink">{agency.city}, {agency.region}</span></span></div>
              <p className="border-l border-gold pl-5 text-[15px] leading-relaxed text-muted">{agency.hours}. {c.visits}</p>
            </Reveal>
          </div>
          <div className="border border-line bg-white p-7 sm:p-12 lg:col-span-8">
            <LeadForm lang={lang} kind="Message depuis le site" submit={c.submit} choices={[{ name: "subject", label: c.project, options: c.projects }]} />
          </div>
        </Container>
      </section>
    </>
  );
}
