import { siteConfig } from "@/config/site";
import { faq, processSteps } from "@/data/content";
import { projects } from "@/data/projects";
import { servicePages } from "@/data/service-pages";
import { services } from "@/data/services";

const plain = (s: string) => s.replace(/\*/g, "");
const abs = (path: string) => `${siteConfig.url}${path}`;

const intro = `# ${siteConfig.name}

> ${siteConfig.name} est une agence web. Elle crée des sites internet sur mesure, modernise les sites existants (refonte, design UX/UI), améliore le référencement naturel sur Google (SEO) et rend les entreprises plus faciles à comprendre par les assistants IA (GEO).

Informations importantes :
- Tous les projets sont réalisés sur devis personnalisé. Les tarifs ne sont pas publiés sur le site.
- Aucune position sur Google ni aucune citation par une IA n'est garantie.
- Les projets présentés sont des sites de démonstration pour des établissements fictifs, et non des clients réels.
- Pour demander un devis : ${abs("/contact")}`;

/** Résumé pour les assistants IA (format llms.txt). */
export function llmsIndex() {
  const pages = servicePages.map((p) => `- [${plain(p.eyebrow)}](${abs(`/services/${p.slug}`)}): ${p.metaDescription}`).join("\n");
  const work = projects.map((p) => `- [${p.name}](${abs(`/realisations/${p.slug}`)}): ${p.summary} (site de démonstration)`).join("\n");
  return `${intro}

## Services

${pages}

## Exemples de réalisations

${work}

## Pages utiles

- [Tous les services](${abs("/services")})
- [Notre méthode](${abs("/notre-approche")})
- [Contact et devis](${abs("/contact")})
- [Mentions légales](${abs("/mentions-legales")})
- [Version complète pour les IA](${abs("/llms-full.txt")})
`;
}

/** Version complète, avec les réponses détaillées. */
export function llmsFull() {
  const detail = servicePages
    .map((p) => {
      const s = services.find((x) => x.id === p.id);
      const sections = p.sections
        .map((sec) => [`### ${sec.title}`, sec.text ?? "", ...(sec.points ?? []).map((pt) => `- ${pt.title} : ${pt.text}`)].filter(Boolean).join("\n"))
        .join("\n\n");
      const questions = p.faq.map((f) => `**${f.q}**\n${f.a}`).join("\n\n");
      return `## ${plain(p.eyebrow)}

Page : ${abs(`/services/${p.slug}`)}

${p.answer}

### Ce qui est inclus
${(s?.items ?? []).map((i) => `- ${i}`).join("\n")}

${sections}

### Questions fréquentes
${questions}`;
    })
    .join("\n\n");
  const method = processSteps.map((s, i) => `${i + 1}. ${s.plainTitle} : ${s.plainText}`).join("\n");
  const general = faq.map((f) => `**${f.q}**\n${f.a}`).join("\n\n");
  return `${intro}

## Comment se déroule un projet

${method}

${detail}

## Questions générales

${general}
`;
}
