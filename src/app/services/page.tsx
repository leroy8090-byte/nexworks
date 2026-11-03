import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { sectors } from "@/data/content";
import { services } from "@/data/services";
import { breadcrumbJsonLd, organizationId } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { SectorsLinks } from "@/components/sections/SectorsLinks";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Container, JsonLd, PageHero } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Nos services & tarifs : création de site, design, SEO et GEO",
  description:
    "Création de sites web, design UX/UI, SEO et GEO : prestations et tarifs indicatifs de NEXWORKS AGENCY.",
  path: "/services",
});

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Services de ${siteConfig.name}`,
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      serviceType: s.projectType,
      url: `${siteConfig.url}/services#${s.id}`,
      provider: { "@id": organizationId },
      inLanguage: siteConfig.language,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[servicesJsonLd, breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Services", path: "/services" }])]}
      />
      <PageHero
        eyebrow="Nos services"
        title="Quatre expertises pour une présence digitale *complète.*"
        text="Création web, design, SEO et GEO : chaque service est conçu pour répondre à un besoin concret de votre entreprise, expliqué sans jargon inutile."
      >
        <nav aria-label="Aller à un service" className="flex flex-wrap gap-3">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm text-white/85 transition hover:border-sky/60 hover:bg-white/[0.07] hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="relative pb-24 sm:pb-32">
        <Container className="space-y-6 lg:space-y-8">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} detailed />
          ))}
        </Container>
      </section>

      <PricingSection />
      <SectorsLinks sectors={sectors} />
      <CtaSection />
    </>
  );
}
