import type { Metadata } from "next";
import { processSteps } from "@/data/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { Check, Gauge, Layers, Target } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Container, JsonLd, PageHero, SectionHeading } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export const metadata: Metadata = buildMetadata({
  title: "Notre approche : construire un véritable outil digital",
  description:
    "La philosophie de NEXWORKS AGENCY : analyser, concevoir, développer et optimiser pour construire un outil digital utile, avec une communication claire et des livrables précis.",
  path: "/notre-approche",
});

const principles = [
  {
    icon: Target,
    title: "Comprendre avant de concevoir",
    text: "Avant de dessiner une page, nous cherchons à comprendre votre activité, vos clients et ce que votre site doit accomplir.",
  },
  {
    icon: Layers,
    title: "Concevoir pour l'usage",
    text: "Un bon design se juge à ce qu'il permet : trouver une information, comprendre une offre, vous contacter sans effort.",
  },
  {
    icon: Gauge,
    title: "Construire pour durer",
    text: "Un code propre, des pages rapides et des contenus structurés : une base qui peut évoluer avec votre activité.",
  },
];

const deliverables = [
  "Une synthèse de vos besoins et des priorités du projet",
  "Une structure de site et des maquettes validées avec vous",
  "Un site responsive, testé et mis en ligne",
  "Une base SEO et GEO : balises, structure, données structurées",
  "Des recommandations pour faire évoluer votre présence digitale",
];

const communication = [
  { title: "Un langage simple", text: "Nous expliquons les choix techniques en termes compréhensibles, sans jargon inutile." },
  { title: "Des validations aux moments clés", text: "Vous êtes consulté avant chaque grande étape : structure, design, mise en ligne." },
  { title: "Une transparence totale", text: "Nous vous disons ce qui est possible et ce qui ne l'est pas. Nous ne promettons ni position sur Google, ni citation par une IA." },
];

export default function ApprochePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Notre approche", path: "/notre-approche" }])} />
      <PageHero
        eyebrow="Notre approche"
        title="Un site ne suffit pas. Il faut un véritable *outil digital.*"
        text="Chez NEXWORKS AGENCY, nous ne nous contentons pas de « faire un site ». Nous construisons un outil qui présente votre activité, inspire confiance, se fait trouver et vous aide à avancer."
      />

      <section className="pb-24">
        <Container>
          <Stagger className="grid gap-5 md:grid-cols-3">
            {principles.map((p) => (
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
          <SectionHeading eyebrow="La différence" title="Une brochure en ligne, ou un *outil qui travaille pour vous ?*" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">Un site classique</p>
                <ul className="mt-6 space-y-3 text-[15px] text-mist">
                  {["Présente votre entreprise, une fois pour toutes", "Se contente d'être « joli »", "Reste difficile à trouver", "Évolue rarement"].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 h-px w-3 shrink-0 bg-mist/60" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-sky/30 bg-gradient-to-br from-sky/[0.1] to-transparent p-8 shadow-[0_0_60px_-20px_rgba(85,189,242,0.4)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Un outil digital NEXWORKS</p>
                <ul className="mt-6 space-y-3 text-[15px] text-white/90">
                  {[
                    "Répond à un objectif précis : contact, réservation, image",
                    "Allie design, rapidité et clarté du parcours",
                    "Structuré pour le SEO et compris par les moteurs de réponse IA",
                    "Pensé pour évoluer avec votre activité",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sky/20 text-sky">
                        <Check className="size-3.5" strokeWidth={2.2} />
                      </span>
                      {t}
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
          <SectionHeading
            eyebrow="Collaboration"
            title="Quatre étapes, des *livrables clairs* à chaque fois."
            text="Voici comment se déroule concrètement un projet avec NEXWORKS AGENCY."
          />
          <ol className="relative mt-14 space-y-5">
            <div className="absolute bottom-6 left-[27px] top-6 hidden w-px bg-gradient-to-b from-sky/60 via-white/10 to-transparent sm:block" aria-hidden />
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={0.05}>
                <li className="relative grid gap-5 sm:grid-cols-[54px_1fr] sm:gap-8">
                  <div className="relative z-10 flex size-[54px] items-center justify-center rounded-full border border-sky/50 bg-ink font-display text-sm font-semibold text-sky shadow-[0_0_30px_-4px_rgba(85,189,242,0.4)]">
                    {s.n}
                  </div>
                  <SpotlightCard className="p-7 sm:p-8">
                    <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">{s.title}</h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mist">{s.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2.5">
                      {s.details.map((d) => (
                        <li key={d} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-white/75">
                          {d}
                        </li>
                      ))}
                    </ul>
                    <span className="sr-only">Étape {i + 1} sur {processSteps.length}</span>
                  </SpotlightCard>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] bg-ink-2 py-24">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Communication" title="Une relation *claire* du début à la fin." />
            <div className="mt-10 space-y-6">
              {communication.map((c) => (
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
            <SectionHeading eyebrow="Livrables et accompagnement" title="Ce que vous *recevez.*" />
            <Reveal delay={0.1}>
              <ul className="mt-10 space-y-3.5">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-[15px] text-white/90">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky">
                      <Check className="size-3.5" strokeWidth={2.2} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-mist">
                Après la mise en ligne, l&apos;accompagnement se poursuit : analyse des performances, pistes
                d&apos;amélioration et évolutions selon vos besoins.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
