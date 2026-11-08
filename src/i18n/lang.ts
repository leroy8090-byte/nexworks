import type { ServiceId } from "@/data/services";

export type Lang = "fr" | "en";
export const langs: readonly Lang[] = ["fr", "en"];
export const otherLang = (lang: Lang): Lang => (lang === "fr" ? "en" : "fr");

/** Le français reste à la racine (adresses déjà référencées) ; l'anglais vit sous /en. */
export const langFromPath = (pathname: string): Lang => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr");

export const ogLocale: Record<Lang, string> = { fr: "fr_FR", en: "en_GB" };

/** Pages fixes : adresse française ↔ adresse anglaise */
export const pages = {
  home: { fr: "/", en: "/en" },
  services: { fr: "/services", en: "/en/services" },
  work: { fr: "/realisations", en: "/en/work" },
  approach: { fr: "/notre-approche", en: "/en/approach" },
  contact: { fr: "/contact", en: "/en/contact" },
  legal: { fr: "/mentions-legales", en: "/en/legal-notice" },
  privacy: { fr: "/confidentialite", en: "/en/privacy" },
} as const;
export type PageKey = keyof typeof pages;

/** Adresses des pages de service, dans chaque langue */
export const serviceSlugs: Record<ServiceId, Record<Lang, string>> = {
  "creation-web": { fr: "creation-site-web", en: "website-creation" },
  "design-ux": { fr: "refonte-site-web", en: "website-redesign" },
  seo: { fr: "referencement-seo", en: "seo-services" },
  geo: { fr: "optimisation-geo", en: "geo-optimization" },
};

export const pagePath = (lang: Lang, key: PageKey) => pages[key][lang];
export const servicePath = (lang: Lang, id: ServiceId) => `${pages.services[lang]}/${serviceSlugs[id][lang]}`;
/** Les adresses des projets sont les mêmes dans les deux langues (noms propres) */
export const projectPath = (lang: Lang, slug: string) => `${pages.work[lang]}/${slug}`;
/** Aller à une ancre de la page de contact (formulaire de devis) */
export const quotePath = (lang: Lang) => `${pages.contact[lang]}#formulaire`;

/** Même page dans l'autre langue (pour le sélecteur de langue et les balises hreflang). */
export function counterpartPath(pathname: string, to: Lang): string {
  const from = langFromPath(pathname);
  if (from === to) return pathname;
  const clean = pathname.replace(/\/+$/, "") || "/";
  for (const p of Object.values(pages)) if (p[from] === clean) return p[to];
  const svc = clean.startsWith(`${pages.services[from]}/`) ? clean.slice(pages.services[from].length + 1) : null;
  if (svc) {
    const id = (Object.keys(serviceSlugs) as ServiceId[]).find((k) => serviceSlugs[k][from] === svc);
    if (id) return servicePath(to, id);
  }
  const prj = clean.startsWith(`${pages.work[from]}/`) ? clean.slice(pages.work[from].length + 1) : null;
  if (prj) return projectPath(to, prj);
  return pages.home[to];
}
