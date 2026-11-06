import { articles } from "@/data/articles";
import { agency, LIVE, sectors } from "@/data/agency";
import { questions } from "@/data/questions";
import { getCards } from "@/lib/listings";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/** Présentation factuelle de l'agence pour les assistants. Aide à la compréhension, sans garantie de citation. */
export function GET() {
  const cards = getCards();
  const concept = LIVE ? "" : `\n> Attention : ce site est un concept de refonte réalisé par NEXWORKS AGENCY. Le site officiel de l'agence reste ${agency.officialSite}\n`;
  const body = `# ${agency.name}
${concept}
> ${agency.description}

## L'agence
- Nom : ${agency.name}
- Adresse : ${agency.street}, ${agency.postalCode} ${agency.city} (${agency.region}, France)
- Téléphone : ${agency.phone}
- E-mail : ${agency.email}
- Secteurs : ${sectors.map((s) => s.name).join(", ")}
- Spécialités annoncées : petites et moyennes copropriétés, gestion d'ASL et d'ASA, démarrage de copropriétés neuves

## Services
- [Acheter](${abs("/acheter")})
- [Louer](${abs("/louer")})
- [Location de vacances](${abs("/location-vacances")})
- [Vendre](${abs("/vendre")})
- [Estimation](${abs("/estimation")})
- [Gestion locative](${abs("/gestion-locative")})
- [Syndic de copropriété](${abs("/syndic")})
- [ASL et ASA](${abs("/asl-asa")})
- [Barème des honoraires](${abs("/honoraires")})
- [Contact](${abs("/contact")})

## Annonces
- [Toutes les annonces](${abs("/biens")}) : ${cards.filter((c) => c.transaction === "vente").length} à vendre et ${cards.filter((c) => c.transaction === "location").length} à louer au dernier relevé. Disponibilité à confirmer auprès de l'agence.

## Questions fréquentes
${questions.map((q) => `- [${q.q}](${abs(`/questions#${q.id}`)})`).join("\n")}

## Conseils
${articles.map((a) => `- [${a.title}](${abs(`/conseils/${a.slug}`)}) : ${a.description}`).join("\n")}

## Secteurs
${sectors.map((s) => `- [${s.h1}](${abs(`/secteurs/${s.slug}`)}) : ${s.text}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", ...(LIVE ? {} : { "X-Robots-Tag": "noindex" }) } });
}
