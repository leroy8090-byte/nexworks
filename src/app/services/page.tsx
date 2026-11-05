import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { sectors } from "@/data/content";
import { services } from "@/data/services";
import { breadcrumbJsonLd, organizationId } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectorsLinks } from "@/components/sections/SectorsLinks";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Container, JsonLd, PageHero } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Nos services : création de site, design, SEO et GEO",
  description:
    "Création de sites web, design UX/UI, SEO et GEO : prestations de NEXWORKS AGENCY, sur devis personnalisé.",
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
        title="Ce qu'on fait, *dit simplement.*"
        text="Quatre services, un objectif : que vos futurs clients vous trouvent, vous comprennent et vous contactent. Vous pouvez en prendre un seul ou les combiner."
      >
        <nav aria-label="Aller à un service" className="flex flex-wrap gap-3">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-white/20 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              {s.plainTitle}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="relative pb-24 sm:pb-32">
        <Container className="space-y-14 lg:space-y-20">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} detailed />
          ))}
        </Container>
      </section>

      <SectorsLinks sectors={sectors} />
      <CtaSection />
    </>
  );
}
