# SEO et GEO : état et mise en ligne

État au 06/11/2026. Le site reste fermé aux moteurs tant que l'agence n'a pas donné son accord.

## Ce qui change selon le mode

| | Concept (par défaut) | Site réel (`NEXT_PUBLIC_CAPITAL_LIVE=1`) |
|---|---|---|
| Balise robots | `noindex` | `index, follow` |
| `robots.txt` | tout fermé | ouvert, avec le lien du sitemap |
| `sitemap.xml` | vide | 70 adresses |
| `llms.txt` | avertissement de concept | sans avertissement |
| Bandeau de concept | affiché | retiré |

## Avant la mise en ligne

1. Obtenir l'accord écrit de l'agence, y compris pour réutiliser ses annonces et ses photos.
2. Faire relire par l'agence les articles (`src/data/articles.ts`) et les réponses (`src/data/questions.ts`), publiés sous son nom.
3. Faire confirmer le code postal (83530 sur le site officiel, à vérifier), les mentions légales et le barème.
4. Brancher les annonces sur le flux réel dans `src/lib/listings.ts`. Le relevé actuel date du 06/11/2026 (30 biens).
5. Connecter les formulaires : `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`.
6. Définir `NEXT_PUBLIC_CAPITAL_LIVE=1` et `NEXT_PUBLIC_SITE_URL=https://www.capitalimmobilier.fr`, puis reconstruire.

## Le jour de la bascule

1. Pointer le domaine `capitalimmobilier.fr` vers le nouveau site : les redirections 301 de `next.config.ts` ne servent qu'à cette condition.
2. Tester un échantillon d'anciennes adresses, dont une annonce et une recherche.
3. Déclarer `sitemap.xml` dans Google Search Console et demander l'inspection des pages principales.
4. Tester les données structurées avec le test des résultats enrichis de Google : ce test n'a pas encore été fait.
5. Vérifier la cohérence du nom, de l'adresse et du téléphone sur la fiche Google Business Profile et sur les réseaux sociaux.

## Limites

- Aucun positionnement n'est garanti, ni dans Google, ni dans ChatGPT, Gemini ou Perplexity.
- Une annonce ajoutée au flux après le relevé n'aura pas d'ancienne adresse à rediriger. Une annonce retirée de l'ancien site mène à `/biens`.
- Les textes juridiques sont des informations générales à la date indiquée. Les règles évoluent, en particulier la fiscalité et la location saisonnière.

## Mesures (06/11/2026, version de production, serveur local)

| Lighthouse | Téléphone (4G lente simulée) | Ordinateur |
|---|---|---|
| Performance | 82 à 86 | 96 à 98 |
| Affichage principal (LCP) | 4,1 à 4,8 s | 1,0 à 1,4 s |
| Décalage de mise en page (CLS) | 0 | 0 |
| Accessibilité | 100 | 100 |
| Bonnes pratiques | 100 | 100 |

Le score SEO affiché en mode concept (69) vient uniquement du `noindex` volontaire. Sur téléphone, le LCP reste au-dessus du seuil recommandé de 2,5 s : les pistes restantes sont le poids du JavaScript des animations, les polices et l'ouverture du site.
