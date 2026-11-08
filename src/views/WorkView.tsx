import { siteConfig } from "@/config/site";
import { projectsFor } from "@/data/localized";
import { pagePath, projectPath, type Lang } from "@/i18n/lang";
import { breadcrumbJsonLd } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Container, JsonLd, PageHero } from "@/components/ui/Section";

const T = {
  fr: {
    list: `Nos réalisations — ${siteConfig.name}`,
    home: "Accueil",
    work: "Nos réalisations",
    eyebrow: "Nos réalisations",
    title: "Regardez plutôt *ce que nous construisons.*",
    text: "Chaque projet présenté ici est un site de démonstration réalisé par NEXWORKS AGENCY pour un établissement fictif : il illustre notre façon de concevoir, sans être associé à un client réel.",
    moreTitle: "D'autres réalisations viendront s'ajouter.",
    moreText: "Cette page évolue avec nos projets. Chaque nouvelle réalisation sera présentée avec ses objectifs et ses livrables.",
  },
  en: {
    list: `Our work — ${siteConfig.name}`,
    home: "Home",
    work: "Our work",
    eyebrow: "Our work",
    title: "See for yourself *what we build.*",
    text: "Every project shown here is a demonstration website created by NEXWORKS AGENCY for a fictional business: it illustrates how we design, and is not linked to a real client.",
    moreTitle: "More projects will be added.",
    moreText: "This page grows with our projects. Each new piece of work will be presented with its goals and deliverables.",
  },
} as const;

export function WorkView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.list,
    itemListElement: projectsFor(lang).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}${projectPath(lang, p.slug)}`,
      name: p.name,
    })),
  };
  return (
    <>
      <JsonLd data={[listJsonLd, breadcrumbJsonLd([{ name: t.home, path: pagePath(lang, "home") }, { name: t.work, path: pagePath(lang, "work") }])]} />
      <PageHero eyebrow={t.eyebrow} title={t.title} text={t.text} />
      <section className="pb-24 sm:pb-32">
        <Container>
          <PortfolioGrid />
          <Reveal>
            <div className="mt-12 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center sm:p-8">
              <p className="font-display text-lg font-semibold text-white">{t.moreTitle}</p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-mist">{t.moreText}</p>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaSection lang={lang} />
    </>
  );
}
