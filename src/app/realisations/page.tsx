import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Container, JsonLd, PageHero } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Nos réalisations : sites web de restaurant et d'hôtel",
  description:
    "Découvrez les projets de démonstration de NEXWORKS AGENCY : un site de restaurant (SOLEA), un site hôtelier (CALYRA) et un site d'artisan plombier (AZUR PLOMBERIE).",
  path: "/realisations",
});

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Nos réalisations — ${siteConfig.name}`,
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${siteConfig.url}/realisations/${p.slug}`,
    name: p.name,
  })),
};

export default function RealisationsPage() {
  return (
    <>
      <JsonLd
        data={[
          listJsonLd,
          breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Nos réalisations", path: "/realisations" }]),
        ]}
      />
      <PageHero
        eyebrow="Nos réalisations"
        title="Des expériences digitales pensées pour faire *la différence.*"
        text="Chaque projet présenté ici est un site de démonstration réalisé par NEXWORKS AGENCY pour un établissement ou une entreprise fictifs : il illustre notre façon de concevoir, sans être associé à un client réel."
      />
      <section className="pb-24 sm:pb-32">
        <Container>
          <PortfolioGrid />
          <Reveal>
            <div className="mt-12 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center sm:p-8">
              <p className="font-display text-lg font-semibold text-white">D&apos;autres réalisations viendront s&apos;ajouter.</p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-mist">
                Cette page évolue avec nos projets. Chaque nouvelle réalisation sera présentée avec ses objectifs et ses
                livrables.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
