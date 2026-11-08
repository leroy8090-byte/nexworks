import { siteConfig } from "@/config/site";
import { faqFor, getServiceFor, processStepsFor, projectsFor, servicePagesFor } from "@/data/localized";
import { pagePath, projectPath, servicePath, type Lang } from "@/i18n/lang";

const plain = (s: string) => s.replace(/\*/g, "");
const abs = (path: string) => `${siteConfig.url}${path}`;

const T = {
  fr: {
    intro: `# ${siteConfig.name}

> ${siteConfig.name} est une agence web. Elle crée des sites internet sur mesure, modernise les sites existants (refonte, design UX/UI), améliore le référencement naturel sur Google (SEO) et rend les entreprises plus faciles à comprendre par les assistants IA (GEO).

Informations importantes :
- Tous les projets sont réalisés sur devis personnalisé. Les tarifs ne sont pas publiés sur le site.
- Aucune position sur Google ni aucune citation par une IA n'est garantie.
- Les projets présentés sont des sites de démonstration pour des établissements fictifs, et non des clients réels.
- Pour demander un devis : `,
    services: "Services",
    work: "Exemples de réalisations",
    demo: "site de démonstration",
    useful: "Pages utiles",
    allServices: "Tous les services",
    method: "Notre méthode",
    contact: "Contact et devis",
    legal: "Mentions légales",
    full: "Version complète pour les IA",
    other: "English version",
    otherPath: "/en/llms.txt",
    fullPath: "/llms-full.txt",
    included: "Ce qui est inclus",
    faq: "Questions fréquentes",
    how: "Comment se déroule un projet",
    general: "Questions générales",
    page: "Page",
  },
  en: {
    intro: `# ${siteConfig.name}

> ${siteConfig.name} is a web agency. It creates custom websites, modernises existing ones (redesign, UX/UI design), improves natural search ranking on Google (SEO) and makes businesses easier for AI assistants to understand (GEO).

Important information:
- Every project is quoted individually. Prices are not published on the website.
- No position on Google and no mention by an AI is guaranteed.
- The projects shown are demonstration websites for fictional businesses, not real clients.
- To request a quote: `,
    services: "Services",
    work: "Examples of work",
    demo: "demonstration website",
    useful: "Useful pages",
    allServices: "All services",
    method: "Our approach",
    contact: "Contact and quote",
    legal: "Legal notice",
    full: "Full version for AI assistants",
    other: "Version française",
    otherPath: "/llms.txt",
    fullPath: "/en/llms-full.txt",
    included: "What's included",
    faq: "Frequently asked questions",
    how: "How a project works",
    general: "General questions",
    page: "Page",
  },
} as const;

const intro = (lang: Lang) => `${T[lang].intro}${abs(pagePath(lang, "contact"))}`;

/** Résumé pour les assistants IA (format llms.txt), en français ou en anglais. */
export function llmsIndex(lang: Lang = "fr") {
  const t = T[lang];
  const pages = servicePagesFor(lang).map((p) => `- [${plain(p.eyebrow)}](${abs(servicePath(lang, p.id))}): ${p.metaDescription}`).join("\n");
  const work = projectsFor(lang).map((p) => `- [${p.name}](${abs(projectPath(lang, p.slug))}): ${p.summary} (${t.demo})`).join("\n");
  return `${intro(lang)}

## ${t.services}

${pages}

## ${t.work}

${work}

## ${t.useful}

- [${t.allServices}](${abs(pagePath(lang, "services"))})
- [${t.method}](${abs(pagePath(lang, "approach"))})
- [${t.contact}](${abs(pagePath(lang, "contact"))})
- [${t.legal}](${abs(pagePath(lang, "legal"))})
- [${t.full}](${abs(t.fullPath)})
- [${t.other}](${abs(t.otherPath)})
`;
}

/** Version complète, avec les réponses détaillées. */
export function llmsFull(lang: Lang = "fr") {
  const t = T[lang];
  const detail = servicePagesFor(lang)
    .map((p) => {
      const s = getServiceFor(lang, p.id);
      const sections = p.sections
        .map((sec) => [`### ${sec.title}`, sec.text ?? "", ...(sec.points ?? []).map((pt) => `- ${pt.title}${lang === "fr" ? " :" : ":"} ${pt.text}`)].filter(Boolean).join("\n"))
        .join("\n\n");
      const questions = p.faq.map((f) => `**${f.q}**\n${f.a}`).join("\n\n");
      return `## ${plain(p.eyebrow)}

${t.page}${lang === "fr" ? " :" : ":"} ${abs(servicePath(lang, p.id))}

${p.answer}

### ${t.included}
${(s?.items ?? []).map((i) => `- ${i}`).join("\n")}

${sections}

### ${t.faq}
${questions}`;
    })
    .join("\n\n");
  const method = processStepsFor(lang).map((s, i) => `${i + 1}. ${s.plainTitle}${lang === "fr" ? " :" : ":"} ${s.plainText}`).join("\n");
  const general = faqFor(lang).map((f) => `**${f.q}**\n${f.a}`).join("\n\n");
  return `${intro(lang)}

## ${t.how}

${method}

${detail}

## ${t.general}

${general}
`;
}
