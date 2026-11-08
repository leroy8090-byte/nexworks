import { siteConfig } from "@/config/site";
import { servicesFor } from "@/data/localized";
import { pagePath, servicePath, type Lang } from "@/i18n/lang";
import { breadcrumbJsonLd, organizationId } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ServicesNav } from "@/components/sections/ServicesNav";
import { Container, JsonLd, PageHero } from "@/components/ui/Section";

const T = {
  fr: {
    list: `Services de ${siteConfig.name}`,
    home: "Accueil",
    services: "Services",
    eyebrow: "Nos services",
    title: "Ce qu'on fait, *dit simplement.*",
    text: "Quatre services, un objectif : que vos futurs clients vous trouvent, vous comprennent et vous contactent. Vous pouvez en prendre un seul ou les combiner.",
  },
  en: {
    list: `Services from ${siteConfig.name}`,
    home: "Home",
    services: "Services",
    eyebrow: "Our services",
    title: "What we do, *in plain words.*",
    text: "Four services, one goal: that your future customers find you, understand you and get in touch. You can take just one, or combine them.",
  },
} as const;

export function ServicesView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const services = servicesFor(lang);
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.list,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        serviceType: s.projectType,
        url: `${siteConfig.url}${servicePath(lang, s.id)}`,
        provider: { "@id": organizationId },
        inLanguage: lang,
      },
    })),
  };
  return (
    <>
      <JsonLd
        data={[servicesJsonLd, breadcrumbJsonLd([{ name: t.home, path: pagePath(lang, "home") }, { name: t.services, path: pagePath(lang, "services") }])]}
      />
      <PageHero eyebrow={t.eyebrow} title={t.title} text={t.text} />

      <section className="relative pb-24 sm:pb-32">
        <Container>
          <ServicesNav />
          <div className="space-y-14 lg:space-y-20">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} detailed lang={lang} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection lang={lang} />
    </>
  );
}
