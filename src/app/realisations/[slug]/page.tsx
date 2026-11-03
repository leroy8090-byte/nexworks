import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getProject, projects } from "@/data/projects";
import { breadcrumbJsonLd, buildMetadata, organizationId } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Glow, JsonLd } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ProjectMockup } from "@/components/visuals/ProjectMockups";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.name} : ${p.demo ? "projet de démonstration" : p.categoryLabel.toLowerCase()}`,
    description: `${p.summary} ${p.demo ? "Site de démonstration réalisé par NEXWORKS AGENCY pour un établissement fictif." : ""}`.trim(),
    path: `/realisations/${p.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const others = projects.filter((o) => o.slug !== p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${p.name}${p.demo ? " (projet de démonstration)" : ""}`,
    description: p.summary,
    url: `${siteConfig.url}/realisations/${p.slug}`,
    creator: { "@id": organizationId },
    inLanguage: siteConfig.language,
    genre: p.categoryLabel,
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Nos réalisations", path: "/realisations" },
            { name: p.name, path: `/realisations/${p.slug}` },
          ]),
        ]}
      />
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <Glow className="-top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2" />
        <Container className="relative">
          <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-mist">
            <Link href="/realisations" className="transition-colors hover:text-white">
              ← Nos réalisations
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>{p.categoryLabel}</Eyebrow>
            {p.demo && (
              <span className="rounded-full border border-sky/30 bg-sky/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky">
                Projet de démonstration
              </span>
            )}
          </div>
          <AnimatedHeading
            as="h1"
            immediate
            text={p.name}
            className="mt-6 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.05] tracking-tight"
          />
          <Reveal immediate delay={0.4}>
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
                <ProjectMockup images={p.images} label={p.alt} url={`${p.name} · site de démonstration`} />
              </div>
              <p className="relative mt-4 text-center text-xs text-mist/70">Aperçu animé : la page défile sur ordinateur et sur téléphone.</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-white">Le projet</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-mist">{p.context}</p>
            {p.demo && (
              <p className="mt-5 rounded-xl border border-sky/20 bg-sky/[0.06] px-4 py-3 text-[13px] leading-relaxed text-sky/90">
                {p.name} est un site de démonstration réalisé par NEXWORKS AGENCY pour un établissement fictif. Il ne s&apos;agit pas d&apos;un client réel, et les contenus
                affichés sont des exemples.
              </p>
            )}

            <h2 className="mt-12 font-display text-2xl font-semibold text-white">Objectifs du projet</h2>
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
              <h2 className="font-display text-lg font-semibold text-white">Pages réalisées</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.pages.map((pg) => (
                  <li key={pg} className="rounded-full border border-sky/25 bg-sky/[0.07] px-3 py-1 text-xs text-white/85">
                    {pg}
                  </li>
                ))}
              </ul>
              <h2 className="mt-7 font-display text-lg font-semibold text-white">Fonctionnalités</h2>
              <ul className="mt-4 space-y-3">
                {p.features.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] text-mist">
                    <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-sky" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                {p.demoUrl ? (
                  <Button href={p.demoUrl} target="_blank" rel="noopener noreferrer" arrow className="w-full">
                    Accéder à la démonstration
                  </Button>
                ) : (
                  <p className="text-sm leading-relaxed text-mist">
                    La démonstration en ligne de ce projet n&apos;est pas encore mise en ligne.
                  </p>
                )}
                <Button href="/contact?objet=devis" variant="secondary" className="mt-3 w-full">
                  Un projet similaire ? Parlons-en
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="border-t border-white/[0.06] bg-ink-2 py-20">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-white">Autres réalisations</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {others.map((o) => (
                <ProjectCard key={o.slug} project={o} />
              ))}
            </div>
          </Container>
        </section>
      )}
      <CtaSection />
    </>
  );
}
