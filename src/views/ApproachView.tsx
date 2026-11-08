import { processStepsFor } from "@/data/localized";
import { pagePath, type Lang } from "@/i18n/lang";
import { breadcrumbJsonLd } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { Check, Gauge, Layers, Target } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Container, JsonLd, PageHero, SectionHeading } from "@/components/ui/Section";
import { ScrollLine } from "@/components/ui/ScrollLine";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const T = {
  fr: {
    home: "Accueil",
    crumb: "Notre approche",
    eyebrow: "Notre approche",
    title: "Un site n'est pas qu'un catalogue. *Il doit travailler pour vous.*",
    text: "Chez NEXWORKS AGENCY, nous ne nous contentons pas de « faire un site ». Nous construisons un outil qui présente votre activité, inspire confiance, se fait trouver et vous aide à avancer.",
    principles: [
      { icon: Target, title: "Comprendre avant de concevoir", text: "Avant de dessiner une page, nous cherchons à comprendre votre activité, vos clients et ce que votre site doit accomplir." },
      { icon: Layers, title: "Concevoir pour l'usage", text: "Un bon design se juge à ce qu'il permet : trouver une information, comprendre une offre, vous contacter sans effort." },
      { icon: Gauge, title: "Construire pour durer", text: "Un code propre, des pages rapides et des contenus structurés : une base qui peut évoluer avec votre activité." },
    ],
    diffEyebrow: "La différence",
    diffTitle: "Une brochure en ligne, ou un *outil qui travaille pour vous ?*",
    classic: "Un site classique",
    classicItems: ["Présente votre entreprise, une fois pour toutes", "Se contente d'être « joli »", "Reste difficile à trouver", "Évolue rarement"],
    nexworks: "Un outil digital NEXWORKS",
    nexworksItems: [
      "Répond à un objectif précis : contact, réservation, image",
      "Allie design, rapidité et clarté du parcours",
      "Structuré pour le SEO et compris par les moteurs de réponse IA",
      "Pensé pour évoluer avec votre activité",
    ],
    collabEyebrow: "Collaboration",
    collabTitle: "Quatre étapes, et vous savez *toujours où on en est.*",
    collabText: "Voici comment se déroule concrètement un projet avec NEXWORKS AGENCY.",
    stepOf: (i: number, n: number) => `Étape ${i} sur ${n}`,
    commEyebrow: "Communication",
    commTitle: "Une relation *claire* du début à la fin.",
    communication: [
      { title: "Un langage simple", text: "Nous expliquons les choix techniques en termes compréhensibles, sans jargon inutile." },
      { title: "Des validations aux moments clés", text: "Vous êtes consulté avant chaque grande étape : structure, design, mise en ligne." },
      { title: "Une transparence totale", text: "Nous vous disons ce qui est possible et ce qui ne l'est pas. Nous ne promettons ni position sur Google, ni citation par une IA." },
    ],
    delEyebrow: "Livrables et accompagnement",
    delTitle: "Ce que vous *recevez.*",
    deliverables: [
      "Une synthèse de vos besoins et des priorités du projet",
      "Une structure de site et des maquettes validées avec vous",
      "Un site responsive, testé et mis en ligne",
      "Une base SEO et GEO : balises, structure, données structurées",
      "Des recommandations pour faire évoluer votre présence digitale",
    ],
    after: "Après la mise en ligne, l'accompagnement se poursuit : analyse des performances, pistes d'amélioration et évolutions selon vos besoins.",
  },
  en: {
    home: "Home",
    crumb: "Our approach",
    eyebrow: "Our approach",
    title: "A website is more than a catalogue. *It should work for you.*",
    text: "At NEXWORKS AGENCY, we don't just “make a website”. We build a tool that presents your business, inspires trust, gets found and helps you move forward.",
    principles: [
      { icon: Target, title: "Understand before designing", text: "Before drawing a single page, we try to understand your business, your customers and what your website needs to achieve." },
      { icon: Layers, title: "Design for real use", text: "Good design is judged by what it makes possible: finding information, understanding an offer, getting in touch without effort." },
      { icon: Gauge, title: "Build to last", text: "Clean code, fast pages and well-structured content: a foundation that can grow with your business." },
    ],
    diffEyebrow: "The difference",
    diffTitle: "An online brochure, or *a tool that works for you?*",
    classic: "A typical website",
    classicItems: ["Presents your business once and for all", "Is content to look “pretty”", "Stays hard to find", "Rarely evolves"],
    nexworks: "A NEXWORKS digital tool",
    nexworksItems: [
      "Serves a clear goal: enquiries, bookings, image",
      "Combines design, speed and a clear journey",
      "Structured for SEO and understood by AI answer engines",
      "Built to evolve with your business",
    ],
    collabEyebrow: "Working together",
    collabTitle: "Four steps, and you always *know where things stand.*",
    collabText: "Here is how a project works in practice with NEXWORKS AGENCY.",
    stepOf: (i: number, n: number) => `Step ${i} of ${n}`,
    commEyebrow: "Communication",
    commTitle: "A *clear* relationship from start to finish.",
    communication: [
      { title: "Plain language", text: "We explain technical choices in terms you can follow, without needless jargon." },
      { title: "Sign-off at key moments", text: "You are consulted before every major step: structure, design, going live." },
      { title: "Complete transparency", text: "We tell you what is possible and what is not. We promise neither a position on Google nor a mention by an AI." },
    ],
    delEyebrow: "Deliverables and support",
    delTitle: "What you *receive.*",
    deliverables: [
      "A summary of your needs and the project priorities",
      "A site structure and mock-ups approved with you",
      "A responsive website, tested and published",
      "An SEO and GEO foundation: tags, structure, structured data",
      "Recommendations to develop your digital presence further",
    ],
    after: "Support continues after launch: performance analysis, ideas for improvement and changes as your needs evolve.",
  },
} as const;

export function ApproachView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const steps = processStepsFor(lang);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: t.home, path: pagePath(lang, "home") }, { name: t.crumb, path: pagePath(lang, "approach") }])} />
      <PageHero eyebrow={t.eyebrow} title={t.title} text={t.text} />

      <section className="pb-24">
        <Container>
          <Stagger className="grid gap-5 md:grid-cols-3">
            {t.principles.map((p) => (
              <StaggerItem key={p.title} className="h-full">
                <SpotlightCard className="h-full p-8">
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-sky/25 bg-sky/10 text-sky">
                    <p.icon className="size-6" />
                  </div>
                  <h2 className="mt-6 font-display text-xl font-semibold text-white">{p.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist">{p.text}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="border-y border-white/[0.06] bg-ink-2 py-24">
        <Container>
          <SectionHeading eyebrow={t.diffEyebrow} title={t.diffTitle} />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">{t.classic}</p>
                <ul className="mt-6 space-y-3 text-[15px] text-mist">
                  {t.classicItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-px w-3 shrink-0 bg-mist/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-sky/30 bg-gradient-to-br from-sky/[0.1] to-transparent p-8 shadow-[0_0_60px_-20px_rgba(85,189,242,0.4)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">{t.nexworks}</p>
                <ul className="mt-6 space-y-3 text-[15px] text-white/90">
                  {t.nexworksItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sky/20 text-sky">
                        <Check className="size-3.5" strokeWidth={2.2} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow={t.collabEyebrow} title={t.collabTitle} text={t.collabText} />
          {/* Le trait décoratif reste hors de la liste : une liste ne doit contenir que ses étapes */}
          <div className="relative mt-14">
          <ScrollLine className="absolute bottom-6 left-[27px] top-6 hidden w-0.5 overflow-hidden rounded-full sm:block" />
          <ol className="relative space-y-5">
            {steps.map((s, i) => (
              <li key={s.n}>
              <Reveal delay={0.05}>
                <div className="relative grid gap-5 sm:grid-cols-[54px_1fr] sm:gap-8">
                  <div className="relative z-10 flex size-[54px] items-center justify-center rounded-full border border-sky/50 bg-ink font-display text-sm font-semibold text-sky shadow-[0_0_30px_-4px_rgba(85,189,242,0.4)]">
                    {s.n}
                  </div>
                  <SpotlightCard className="p-7 sm:p-8">
                    <h3 className="font-display text-2xl font-bold text-white">{s.plainTitle}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-mist">{s.plainText}</p>
                    <ul className="mt-5 flex flex-wrap gap-2.5">
                      {s.details.map((d) => (
                        <li key={d} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-white/75">
                          {d}
                        </li>
                      ))}
                    </ul>
                    <span className="sr-only">{t.stepOf(i + 1, steps.length)}</span>
                  </SpotlightCard>
                </div>
              </Reveal>
              </li>
            ))}
          </ol>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] bg-ink-2 py-24">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t.commEyebrow} title={t.commTitle} />
            <div className="mt-10 space-y-6">
              {t.communication.map((c) => (
                <Reveal key={c.title}>
                  <div className="border-l border-sky/40 pl-6">
                    <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-mist">{c.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={t.delEyebrow} title={t.delTitle} />
            <Reveal delay={0.1}>
              <ul className="mt-10 space-y-3.5">
                {t.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-[15px] text-white/90">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky">
                      <Check className="size-3.5" strokeWidth={2.2} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-mist">{t.after}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaSection lang={lang} />
    </>
  );
}
