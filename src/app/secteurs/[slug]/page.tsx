import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { sectors } from "@/data/content";
import { projects } from "@/data/projects";
import { breadcrumbJsonLd, buildMetadata, organizationId } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Check } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Container, Eyebrow, Glow, JsonLd } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type Params = { slug: string };

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = sectors.find((x) => x.slug === slug);
  if (!s) return {};
  return buildMetadata({
    title: `Site web et visibilité pour ${s.title.toLowerCase()}`,
    description: s.metaDescription,
    path: `/secteurs/${s.slug}`,
  });
}

export default async function SectorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = sectors.find((x) => x.slug === slug);
  if (!s) notFound();
  const related = projects.filter((p) => (s.slug === "hotellerie" ? p.category === "hotellerie" : s.slug === "restauration" ? p.category === "restauration" : p.category === "artisans"));
  const others = sectors.filter((x) => x.slug !== s.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Site web et visibilité pour ${s.title.toLowerCase()}`,
    description: s.metaDescription,
    url: `${siteConfig.url}/secteurs/${s.slug}`,
    about: { "@id": organizationId },
    inLanguage: siteConfig.language,
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Secteurs", path: "/secteurs" },
            { name: s.title, path: `/secteurs/${s.slug}` },
          ]),
        ]}
      />
      <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <Glow className="-top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-mist">
              <Link href="/secteurs" className="transition-colors hover:text-white">
                ← Tous les secteurs
              </Link>
            </nav>
            <Eyebrow>Secteur · {s.title}</Eyebrow>
            <AnimatedHeading
              as="h1"
              immediate
              text={s.heading}
              className="mt-6 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-tight"
            />
            <Reveal immediate delay={0.4}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{s.intro}</p>
            </Reveal>
          </div>
          <Reveal immediate delay={0.3}>
            <div className="glass relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={s.image} alt={s.imageAlt} fill preload sizes="(max-width: 1024px) 92vw, 520px" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Ce dont votre activité a besoin</h2>
          <Stagger className="mt-8 grid gap-5 md:grid-cols-3">
            {s.needs.map((n) => (
              <StaggerItem key={n.title} className="h-full">
                <SpotlightCard className="h-full p-7">
                  <h3 className="font-display text-lg font-semibold text-white">{n.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist">{n.text}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="border-y border-white/[0.06] bg-ink-2 py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Ce que nous mettons en place</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-mist">
              Chaque projet est adapté à votre établissement et à vos objectifs. Voici les prestations les plus courantes
              pour ce secteur. Elles peuvent être combinées ou ajustées.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-mist/70">
              Le SEO et le GEO sont des travaux d&apos;optimisation : aucun classement ni aucune citation par une IA ne
              peut être garanti.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-3.5">
              {s.offer.map((o) => (
                <li key={o} className="flex items-start gap-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-[15px] text-white/90">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky">
                    <Check className="size-3.5" strokeWidth={2.2} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-20">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Un exemple de réalisation</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="pb-4">
        <Container>
          <p className="text-sm text-mist">
            Vous exercez une autre activité ? Nos services s&apos;adaptent à votre métier. Voir aussi :{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                <Link href={`/secteurs/${o.slug}`} className="text-sky underline-offset-4 hover:underline">
                  {o.title}
                </Link>
                {i < others.length - 1 ? ", " : ". "}
              </span>
            ))}
            <Link href="/services" className="text-sky underline-offset-4 hover:underline">
              Découvrir tous nos services
            </Link>
            .
          </p>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
