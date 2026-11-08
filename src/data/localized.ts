import type { Lang } from "@/i18n/lang";
import { servicePath } from "@/i18n/lang";
import { faq, processSteps, whyItems } from "./content";
import { faqEn, processStepsEn, whyItemsEn } from "./en/content";
import { projectCategories, projects, type Project } from "./projects";
import { projectsEn } from "./en/projects";
import { servicePages, type ServicePage } from "./service-pages";
import { servicePagesEn } from "./en/service-pages";
import { services, type Service, type ServiceId } from "./services";
import { servicesEn } from "./en/services";

/** Accès aux contenus dans la langue de la page. Le français reste la référence (mêmes formes dans les deux langues). */
export const processStepsFor = (lang: Lang) => (lang === "en" ? processStepsEn : processSteps);
export const whyItemsFor = (lang: Lang) => (lang === "en" ? whyItemsEn : whyItems);
export const faqFor = (lang: Lang) => (lang === "en" ? faqEn : faq);

export const servicesFor = (lang: Lang): Service[] => (lang === "en" ? servicesEn : services);
export const getServiceFor = (lang: Lang, id: ServiceId) => servicesFor(lang).find((s) => s.id === id)!;

export const servicePagesFor = (lang: Lang): ServicePage[] => (lang === "en" ? servicePagesEn : servicePages);
export const getServicePageFor = (lang: Lang, slug: string) => servicePagesFor(lang).find((p) => p.slug === slug);
/** Adresse de la page détaillée d'un service dans la langue demandée */
export const servicePagePathFor = (lang: Lang, id: ServiceId) => servicePath(lang, id);

export const projectsFor = (lang: Lang): Project[] => (lang === "en" ? projectsEn : projects);
export const getProjectFor = (lang: Lang, slug: string) => projectsFor(lang).find((p) => p.slug === slug);
export const projectCategoriesFor = (lang: Lang) => {
  const list = projectsFor(lang);
  return [
    { key: "tous", label: lang === "en" ? "All projects" : "Tous les projets" },
    ...Array.from(new Map(list.map((p) => [p.category, p.filterLabel])).entries()).map(([key, label]) => ({ key, label })),
  ];
};
export { projectCategories };
