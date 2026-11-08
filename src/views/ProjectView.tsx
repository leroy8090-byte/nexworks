import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getProjectFor, projectsFor } from "@/data/localized";
import { pagePath, projectPath, type Lang } from "@/i18n/lang";
import { breadcrumbJsonLd, organizationId } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Glow, JsonLd } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ProjectMockup } from "@/components/visuals/ProjectMockups";

const T = {
  fr: {
    home: "Accueil",
    work: "Nos réalisations",
    breadcrumb: "Fil d'Ariane",
    back: "← Nos réalisations",
    concept: "Concept de refonte",
    demo: "Projet de démonstration",
    conceptLower: "concept de refonte",
    demoLower: "projet de démonstration",
    urlConcept: "concept de refonte",
    urlDemo: "site de démonstration",
    preview: "Aperçu animé : la page défile sur ordinateur et sur téléphone.",
    theProject: "Le projet",
    conceptNote: (n: string) =>
      `${n} est un concept de refonte réalisé de notre propre initiative par NEXWORKS AGENCY, à partir des informations publiques de l'entreprise. Il n'a pas été commandé ni validé par elle : ce n'est pas un client, et les biens et photographies affichés sont des exemples.`,
    demoNote: (n: string) => `${n} est un site de démonstration réalisé par NEXWORKS AGENCY pour un établissement fictif. Il ne s'agit pas d'un client réel, et les contenus affichés sont des exemples.`,
    goals: "Objectifs du projet",
    pages: "Pages réalisées",
    features: "Fonctionnalités",
    open: "Accéder à la démonstration",
    noDemo: "La démonstration en ligne de ce projet n'est pas encore mise en ligne.",
    similar: "Un projet similaire ? Parlons-en",
    objet: "devis",
    others: "Autres réalisations",
    seeAll: "Voir tous les projets",
    metaDemoSuffix: " Site de démonstration.",
  },
  en: {
    home: "Home",
    work: "Our work",
    breadcrumb: "Breadcrumb",
    back: "← Our work",
    concept: "Redesign concept",
    demo: "Demonstration project",
    conceptLower: "redesign concept",
    demoLower: "demonstration project",
    urlConcept: "redesign concept",
    urlDemo: "demonstration website",
    preview: "Animated preview: the page scrolls on desktop and on mobile.",
    theProject: "The project",
    conceptNote: (n: string) =>
      `${n} is a redesign concept created on our own initiative by NEXWORKS AGENCY, based on the company's public information. It was neither commissioned nor approved by the company: it is not a client, and the properties and photographs shown are examples.`,
    demoNote: (n: string) => `${n} is a demonstration website created by NEXWORKS AGENCY for a fictional business. It is not a real client, and the content shown is for illustration.`,
    goals: "Project goals",
    pages: "Pages built",
    features: "Features",
    open: "Visit the demonstration",
    noDemo: "The online demonstration of this project is not live yet.",
    similar: "A similar project? Let's talk",
    objet: "quote",
    others: "More work",
    seeAll: "See all projects",
    metaDemoSuffix: " Demonstration website.",
  },
} as const;

export function projectMetadataParts(lang: Lang, slug: string) {
  const p = getProjectFor(lang, slug);
  if (!p) return null;
  const t = T[lang];
  return {
    title: `${p.name} : ${p.concept ? t.conceptLower : p.demo ? t.demoLower : p.categoryLabel.toLowerCase()}`,
    description: `${p.summary}${t.metaDemoSuffix}`,
    path: projectPath(lang, p.slug),
  };
}

export function ProjectView({ lang, slug }: { lang: Lang; slug: string }) {
  const t = T[lang];
  const p = getProjectFor(lang, slug);
  if (!p) notFound();
  const others = projectsFor(lang).filter((o) => o.slug !== p.slug);
  const path = projectPath(lang, p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${p.name}${p.concept ? ` (${t.conceptLower})` : p.demo ? ` (${t.demoLower})` : ""}`,
    description: p.summary,
    url: `${siteConfig.url}${path}`,
    creator: { "@id": organizationId },
    inLanguage: lang,
    genre: p.categoryLabel,
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: t.home, path: pagePath(lang, "home") },
            { name: t.work, path: pagePath(lang, "work") },
            { name: p.name, path },
          ]),
        ]}
      />
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <Glow className="-top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2" />
        <Container className="relative">
          <nav aria-label={t.breadcrumb} className="mb-5 text-[15px] text-mist">
            <Link href={pagePath(lang, "work")} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
              {t.back}
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>{p.categoryLabel}</Eyebrow>
            {p.demo && (
              <span className="rounded-full border border-sky/30 bg-sky/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky">
                {p.concept ? t.concept : t.demo}
              </span>
            )}
          </div>
          <AnimatedHeading
            as="h1"
            immediate
            text={p.name}
            className="mt-6 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.05] tracking-tight"
          />
          <Reveal immediate visible y={16} delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{p.summary}</p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <Reveal>
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-ink-3 to-ink-2 p-5 sm:p-10 lg:p-14">
              <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />
              <div className="relative mx-auto max-w-[900px]">
                <ProjectMockup images={p.images} label={p.alt} url={`${p.name} · ${p.concept ? t.urlConcept : t.urlDemo}`} />
              </div>
              <p className="relative mt-4 text-center text-xs text-mist/70">{t.preview}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-white">{t.theProject}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-mist">{p.context}</p>
            {p.demo && (
              <p className="mt-5 rounded-xl border border-sky/20 bg-sky/[0.06] px-4 py-3 text-[13px] leading-relaxed text-sky/90">
                {p.concept ? t.conceptNote(p.name) : t.demoNote(p.name)}
              </p>
            )}

            <h2 className="mt-12 font-display text-2xl font-semibold text-white">{t.goals}</h2>
            <ul className="mt-5 space-y-3">
              {p.goals.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[15px] text-white/85">
                  <span className="mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky">
                    <Check className="size-3" strokeWidth={2.2} />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-7 sm:p-8">
              <h2 className="font-display text-lg font-semibold text-white">{t.pages}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.pages.map((pg) => (
                  <li key={pg} className="rounded-full border border-sky/25 bg-sky/[0.07] px-3 py-1 text-xs text-white/85">
                    {pg}
                  </li>
                ))}
              </ul>
              <h2 className="mt-7 font-display text-lg font-semibold text-white">{t.features}</h2>
              <ul className="mt-4 space-y-3">
                {p.features.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] text-mist">
                    <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-sky" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                {p.demoUrl ? (
                  <Button href={p.demoUrl} target="_blank" rel="noopener noreferrer" arrow className="w-full">
                    {t.open}
                  </Button>
                ) : (
                  <p className="text-sm leading-relaxed text-mist">{t.noDemo}</p>
                )}
                <Button href={`${pagePath(lang, "contact")}?objet=${t.objet}`} variant="secondary" className="mt-3 w-full">
                  {t.similar}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="border-t border-white/[0.06] bg-ink-2 py-20">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-white">{t.others}</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {others.map((o, i) => (
                <div key={o.slug} className={i >= 3 ? "hidden lg:block" : undefined}>
                  <ProjectCard project={o} lang={lang} />
                </div>
              ))}
            </div>
            {others.length > 3 && (
              <Button href={pagePath(lang, "work")} variant="secondary" arrow className="mt-8 lg:hidden">
                {t.seeAll}
              </Button>
            )}
          </Container>
        </section>
      )}
      <CtaSection lang={lang} />
    </>
  );
}
