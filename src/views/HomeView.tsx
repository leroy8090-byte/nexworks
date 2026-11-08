import { Hero } from "@/components/home/Hero";
import { ProcessStory } from "@/components/home/ProcessStory";
import { ServicesExplorer } from "@/components/home/ServicesExplorer";
import { Statement } from "@/components/home/Statement";
import { WorkGallery } from "@/components/home/WorkGallery";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import type { Lang } from "@/i18n/lang";

export function HomeView({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <Statement />
      <ServicesExplorer />
      <ProcessStory />
      <WorkGallery />
      <FaqSection lang={lang} />
      <CtaSection lang={lang} />
    </>
  );
}
