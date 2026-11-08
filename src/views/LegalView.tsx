import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pagePath, type Lang } from "@/i18n/lang";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Container, JsonLd, PageHero } from "@/components/ui/Section";

const h2 = "mt-12 font-display text-2xl font-bold text-white";
const p = "mt-3 text-[17px] leading-relaxed text-mist";

const T = {
  fr: {
    home: "Accueil",
    crumb: "Mentions légales",
    eyebrow: "Informations légales",
    title: "Mentions légales",
    text: "Les informations relatives à l'éditeur et à l'hébergeur de ce site.",
    publisher: "Éditeur du site",
    labels: {
      company: "Dénomination",
      form: "Forme juridique",
      capital: "Capital social",
      address: "Siège social",
      siren: "SIREN / SIRET",
      vat: "N° de TVA intracommunautaire",
      director: "Directeur de la publication",
      phone: "Téléphone",
      email: "E-mail",
    },
    host: "Hébergeur",
    hostText: "Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis. Site : vercel.com.",
    ip: "Propriété intellectuelle",
    ipText:
      "Les textes, visuels et éléments graphiques de ce site sont protégés. Toute reproduction sans autorisation préalable est interdite. Les projets présentés dans les réalisations sont des sites de démonstration pour des établissements fictifs, et non des clients réels.",
    data: "Données personnelles",
    dataBefore: "Le traitement des informations transmises par le formulaire de contact est décrit dans la ",
    dataLink: "politique de confidentialité",
    seo: "Référencement et intelligence artificielle",
    seoText:
      "Les informations de ce site décrivent des services d'optimisation. Aucune position sur un moteur de recherche ni aucune citation par une intelligence artificielle n'est garantie.",
  },
  en: {
    home: "Home",
    crumb: "Legal notice",
    eyebrow: "Legal information",
    title: "Legal notice",
    text: "Information about the publisher and the host of this website.",
    publisher: "Website publisher",
    labels: {
      company: "Name",
      form: "Legal form",
      capital: "Share capital",
      address: "Registered office",
      siren: "SIREN / SIRET (French company number)",
      vat: "Intra-community VAT number",
      director: "Publication director",
      phone: "Telephone",
      email: "Email",
    },
    host: "Hosting provider",
    hostText: "Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States. Website: vercel.com.",
    ip: "Intellectual property",
    ipText:
      "The texts, visuals and graphic elements of this website are protected. Any reproduction without prior permission is prohibited. The projects shown in our work are demonstration websites for fictional businesses, not real clients.",
    data: "Personal data",
    dataBefore: "The handling of the information submitted through the contact form is described in the ",
    dataLink: "privacy policy",
    seo: "Search engines and artificial intelligence",
    seoText:
      "The information on this website describes optimisation services. No position in a search engine and no mention by an artificial intelligence is guaranteed.",
  },
} as const;

export function LegalView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const { legal, contactEmail, name } = siteConfig;
  // Seuls les champs renseignés apparaissent : rien n'est inventé.
  const publisher: [string, string][] = (
    [
      [t.labels.company, legal.company || name],
      [t.labels.form, legal.form],
      [t.labels.capital, legal.capital],
      [t.labels.address, [legal.address, legal.postalCode, legal.city].filter(Boolean).join(", ")],
      [t.labels.siren, legal.siren],
      [t.labels.vat, legal.vat],
      [t.labels.director, legal.director],
      [t.labels.phone, legal.phone],
      [t.labels.email, contactEmail],
    ] as [string, string][]
  ).filter(([, v]) => v);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: t.home, path: pagePath(lang, "home") }, { name: t.crumb, path: pagePath(lang, "legal") }])} />
      <PageHero eyebrow={t.eyebrow} title={t.title} text={t.text} />
      <section className="pb-28 sm:pb-40">
        <Container>
          <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white">{t.publisher}</h2>
          <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {publisher.map(([label, value]) => (
              <div key={label} className="grid gap-1 py-3 sm:grid-cols-[240px_1fr]">
                <dt className="text-[15px] font-semibold text-white">{label}</dt>
                <dd className="text-[15px] text-mist">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className={h2}>{t.host}</h2>
          <p className={p}>{t.hostText}</p>

          <h2 className={h2}>{t.ip}</h2>
          <p className={p}>{t.ipText}</p>

          <h2 className={h2}>{t.data}</h2>
          <p className={p}>
            {t.dataBefore}
            <Link href={pagePath(lang, "privacy")} className="font-bold text-white underline-offset-4 hover:underline">
              {t.dataLink}
            </Link>
            .
          </p>

          <h2 className={h2}>{t.seo}</h2>
          <p className={p}>{t.seoText}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
