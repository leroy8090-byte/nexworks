/**
 * Grille tarifaire indicative NEXWORKS AGENCY (HT).
 * Prix « à partir de » — devis personnalisé selon le projet.
 * Aucune garantie de classement SEO/GEO.
 */

export type PriceItem = {
  id: string;
  name: string;
  from: number;
  unit?: "projet" | "mois";
  blurb: string;
  includes: string[];
};

export type Pack = {
  id: string;
  name: string;
  badge?: string;
  from: number;
  save?: number;
  services: string[];
  blurb: string;
  includes: string[];
  highlighted?: boolean;
};

export const formatEuro = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/** Prestations à l'unité */
export const priceList: PriceItem[] = [
  {
    id: "site",
    name: "Création de site web",
    from: 1890,
    unit: "projet",
    blurb: "Site vitrine professionnel, responsive, formulaires et mise en ligne.",
    includes: [
      "Jusqu'à ~8 pages",
      "Design sur mesure",
      "Version mobile",
      "Formulaire de contact",
      "Base SEO technique",
      "Mise en ligne + formation courte",
    ],
  },
  {
    id: "design",
    name: "Design & refonte UX/UI",
    from: 1290,
    unit: "projet",
    blurb: "Moderniser un site existant : parcours, mobile, conversion.",
    includes: [
      "Audit UX rapide",
      "Maquettes des pages clés",
      "Refonte visuelle",
      "Optimisation mobile",
      "Intégration sur votre site",
    ],
  },
  {
    id: "seo",
    name: "Référencement SEO",
    from: 890,
    unit: "projet",
    blurb: "Audit + optimisation technique et contenus (démarrage).",
    includes: [
      "Audit SEO",
      "Titles, balises, structure",
      "Pages locales / services",
      "Search Console",
      "Recommandations 90 jours",
    ],
  },
  {
    id: "geo",
    name: "Optimisation GEO",
    from: 690,
    unit: "projet",
    blurb: "Contenus clairs et structurés pour les moteurs de réponse IA.",
    includes: [
      "Structuration des infos clés",
      "FAQ utiles",
      "Données structurées",
      "Cohérence des contenus",
      "Note : aucune citation IA garantie",
    ],
  },
  {
    id: "gbp",
    name: "Fiche Google Business",
    from: 390,
    unit: "projet",
    blurb: "Optimisation de votre présence locale sur Google.",
    includes: ["Optimisation de la fiche", "Catégories & description", "Photos guidées", "Posts de démarrage"],
  },
];

/** Packs duo / trio / complet */
export const packs: Pack[] = [
  {
    id: "duo-presence",
    name: "Pack Duo Présence",
    badge: "Duo",
    from: 2790,
    save: 390,
    services: ["Site web", "Design UX/UI"],
    blurb: "Idéal pour lancer une image pro claire et crédible.",
    includes: ["Site vitrine", "Direction visuelle soignée", "Parcours contact optimisé", "Base SEO technique"],
  },
  {
    id: "duo-visibilite",
    name: "Pack Duo Visibilité",
    badge: "Duo",
    from: 2490,
    save: 290,
    services: ["Site web", "SEO"],
    blurb: "Site + démarrage référencement pour être trouvé localement.",
    includes: ["Site vitrine", "Audit & optimisation SEO", "Pages orientées recherche", "Search Console"],
  },
  {
    id: "trio",
    name: "Pack Trio Croissance",
    badge: "Populaire",
    from: 3490,
    save: 580,
    services: ["Site web", "Design", "SEO"],
    blurb: "Le combo le plus demandé : image + site + visibilité.",
    includes: ["Tout le Duo Présence", "Optimisation SEO de démarrage", "Suivi des priorités 30 jours"],
    highlighted: true,
  },
  {
    id: "complet",
    name: "Pack Complet",
    badge: "Premium",
    from: 4290,
    save: 870,
    services: ["Site", "Design", "SEO", "GEO"],
    blurb: "Parcours digital complet, prêt pour Google et les IA.",
    includes: ["Site + design", "SEO + GEO", "FAQ & contenus structurés", "Fiche Google (option offerte si besoin)"],
  },
];

/** Maintenance mensuelle */
export const maintenancePlans: PriceItem[] = [
  {
    id: "maint-essentiel",
    name: "Maintenance Essentiel",
    from: 79,
    unit: "mois",
    blurb: "Garder le site à jour, sauvegardé et en ligne.",
    includes: ["Mises à jour techniques", "Sauvegardes", "Supervision uptime", "1 petite modification / mois", "Support e-mail"],
  },
  {
    id: "maint-pro",
    name: "Maintenance Pro",
    from: 149,
    unit: "mois",
    blurb: "Suivi + petites évolutions et regard SEO mensuel.",
    includes: [
      "Tout Essentiel",
      "Jusqu'à 2 h de modifications / mois",
      "Rapport simple mensuel",
      "Ajustements SEO légers",
      "Priorité de réponse",
    ],
  },
];

export const pricingDisclaimer =
  "Tarifs indicatifs hors taxes, « à partir de ». Chaque projet fait l'objet d'un devis personnalisé. Le SEO et le GEO sont des travaux d'optimisation : aucun classement ni citation dans une IA n'est garanti.";
