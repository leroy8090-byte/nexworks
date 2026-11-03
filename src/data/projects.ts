/**
 * Réalisations. Pour ajouter un projet :
 *  1. Ajouter une entrée dans `projects` (slug unique).
 *  2. Déposer ses visuels dans public/projects/ (voir `scripts/process-projects.mjs` pour les générer
 *     à partir de captures d'écran du site).
 * Les pages /realisations, /realisations/[slug], le sitemap et les filtres se mettent à jour automatiquement.
 *
 * Les projets marqués `demo: true` sont des sites de démonstration réalisés par NEXWORKS AGENCY pour des
 * établissements fictifs : ils ne sont jamais présentés comme des clients réels.
 */
export type ProjectImages = {
  /** Capture du hero (couverture, 1400×~875) */
  cover: string;
  /** Capture de la page d'accueil complète, défile au survol */
  desktop: { src: string; width: number; height: number };
  /** Capture mobile, défile au survol */
  mobile: { src: string; width: number; height: number };
};

export type Project = {
  slug: string;
  name: string;
  /** Clé de filtre (portfolio) */
  category: string;
  categoryLabel: string;
  /** Libellé court du filtre */
  filterLabel: string;
  /** true = site de démonstration pour un établissement fictif */
  demo: boolean;
  images: ProjectImages;
  summary: string;
  context: string;
  goals: string[];
  /** Pages réalisées */
  pages: string[];
  /** Fonctionnalités développées */
  features: string[];
  highlights: string[];
  /** Lien vers le site de démonstration en ligne, lorsqu'il existe (variable d'environnement) */
  demoUrl?: string;
  tags: string[];
  alt: string;
};

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

export const projects: Project[] = [
  {
    slug: "solea-restaurant",
    name: "SOLEA Restaurant",
    category: "restauration",
    categoryLabel: "Site web restaurant",
    filterLabel: "Restauration",
    demo: true,
    images: {
      cover: "/projects/solea-cover.webp",
      desktop: { src: "/projects/solea-desktop.webp", width: 1100, height: 6875 },
      mobile: { src: "/projects/solea-mobile.webp", width: 390, height: 3600 },
    },
    summary: "Une expérience digitale méditerranéenne imaginée pour valoriser un restaurant, sa carte et son univers.",
    context:
      "SOLEA est un restaurant méditerranéen fictif à Saint-Raphaël, imaginé par NEXWORKS AGENCY pour illustrer notre approche du site de restauration : une identité solaire et chaleureuse, une carte lisible sur mobile, des photos mises en valeur et un parcours de réservation sans friction.",
    goals: [
      "Faire ressentir l'ambiance du lieu dès l'arrivée sur le site",
      "Présenter la carte de façon lisible, notamment sur mobile",
      "Placer la réservation et les informations pratiques à portée de pouce",
      "Poser les bases d'un référencement local propre",
    ],
    pages: ["Accueil", "Notre histoire", "La carte", "Galerie", "Réservation", "Contact", "Pages légales et RGPD"],
    features: [
      "Carte explorable par catégories",
      "Galerie photo avec visionneuse plein écran",
      "Formulaire de réservation avec créneaux selon les jours d'ouverture",
      "Formulaire de contact validé, en mode démonstration",
      "Bandeau de consentement et pages RGPD",
      "Sitemap, métadonnées et données structurées de restaurant",
    ],
    highlights: ["Univers méditerranéen", "Carte lisible sur mobile", "Réservation mise en avant"],
    demoUrl: env(process.env.NEXT_PUBLIC_DEMO_SOLEA_URL),
    tags: ["Restauration", "Next.js", "UX/UI", "SEO local"],
    alt: "Site SOLEA Restaurant : page d'accueil avec une terrasse méditerranéenne face à la mer, titre « Un goût de Méditerranée » et boutons de carte et de réservation",
  },
  {
    slug: "calyra-hotel",
    name: "CALYRA Hotel",
    category: "hotellerie",
    categoryLabel: "Site web hôtelier",
    filterLabel: "Hôtellerie",
    demo: true,
    images: {
      cover: "/projects/calyra-cover.webp",
      desktop: { src: "/projects/calyra-desktop.webp", width: 1100, height: 6875 },
      mobile: { src: "/projects/calyra-mobile.webp", width: 390, height: 3600 },
    },
    summary:
      "Une expérience web élégante conçue pour mettre en valeur un établissement hôtelier et faciliter la découverte de ses chambres et services.",
    context:
      "CALYRA HOTEL est un hôtel boutique fictif à Saint-Raphaël, imaginé par NEXWORKS AGENCY pour illustrer notre approche du site hôtelier : une présentation élégante, des chambres mises en valeur, un site bilingue et un chemin direct vers la réservation.",
    goals: [
      "Installer une image haut de gamme et rassurante",
      "Mettre en valeur les chambres, les expériences et les services",
      "Faciliter la réservation directe grâce à un module de recherche clair",
      "Structurer les informations pour les moteurs de recherche et de réponse IA",
    ],
    pages: ["Accueil", "L'hôtel", "Chambres et suites", "Expériences", "Galerie", "Réservation", "Contact", "Pages légales"],
    features: [
      "Site bilingue français / anglais avec sélecteur de langue",
      "Module de recherche de séjour (dates, voyageurs, chambres)",
      "Présentation détaillée des chambres et suites",
      "Galerie photo avec visionneuse plein écran",
      "Formulaires de contact, de réservation et de newsletter, en mode démonstration",
      "Bandeau de consentement, sitemap, métadonnées et données structurées d'hôtel",
    ],
    highlights: ["Image haut de gamme", "Site bilingue FR / EN", "Réservation directe facilitée"],
    demoUrl: env(process.env.NEXT_PUBLIC_DEMO_CALYRA_URL),
    tags: ["Hôtellerie", "Next.js", "Bilingue", "UX/UI"],
    alt: "Site CALYRA Hotel : page d'accueil avec une piscine à débordement face à la Méditerranée et le titre « Laissez-vous porter par la Méditerranée »",
  },
  {
    slug: "azur-plomberie",
    name: "AZUR PLOMBERIE",
    category: "artisans",
    categoryLabel: "Site vitrine artisan",
    filterLabel: "Artisans",
    demo: true,
    images: {
      cover: "/projects/azur-cover.webp",
      desktop: { src: "/projects/azur-desktop.webp", width: 1100, height: 8029 },
      mobile: { src: "/projects/azur-mobile.webp", width: 390, height: 14172 },
    },
    summary:
      "Un site vitrine complet pour un artisan plombier fictif à Saint-Raphaël : pages services dédiées, rénovation, zone locale et devis.",
    context:
      "AZUR PLOMBERIE est une entreprise fictive située à Saint-Raphaël, conçue par NEXWORKS AGENCY pour illustrer un site d'artisan complet — au même niveau qu'un site restaurant ou hôtel : navigation multi-pages, fiches prestations, galerie, FAQ et formulaire de devis en mode démonstration.",
    goals: [
      "Offrir un vrai parcours multi-pages, pas seulement une landing",
      "Détailler chaque prestation sur sa propre page",
      "Mettre le devis à portée de main sur mobile",
      "Rester honnête : aucun faux avis, aucune coordonnée inventée",
    ],
    pages: [
      "Accueil",
      "Services",
      "Dépannage",
      "Recherche de fuite",
      "Débouchage",
      "Installation sanitaire",
      "Chauffe-eau",
      "Salle de bain",
      "Zone d'intervention",
      "À propos",
      "Contact",
      "Mentions légales",
      "Confidentialité",
    ],
    features: [
      "Site multi-pages avec header sticky et menu mobile",
      "Cinq fiches services complètes + page rénovation salle de bain",
      "Galerie, étapes, FAQ, zone locale indicative",
      "Formulaire de devis validé, honeypot et mode démonstration",
      "Bandeau de transparence : démonstration pour entreprise fictive",
    ],
    highlights: ["Site complet", "Fiches services", "Orienté devis"],
    demoUrl: "/azur-plomberie",
    tags: ["Artisan", "Plomberie", "Next.js", "Saint-Raphaël"],
    alt: "Site AZUR PLOMBERIE : hero « Votre plombier de confiance à Saint-Raphaël » avec photographie de salle de bain contemporaine",
  },
  {
    slug: "maison-riviera",
    name: "MAISON RIVIERA",
    category: "immobilier",
    categoryLabel: "Site web immobilier de prestige",
    filterLabel: "Immobilier",
    demo: true,
    images: {
      cover: "/projects/maison-riviera-cover.webp",
      desktop: { src: "/projects/maison-riviera-desktop.webp", width: 1100, height: 6144 },
      mobile: { src: "/projects/maison-riviera-mobile.webp", width: 390, height: 11287 },
    },
    summary:
      "Un site éditorial pour une agence immobilière de prestige fictive sur la Côte d'Azur : recherche de biens, fiches détaillées et estimation.",
    context:
      "MAISON RIVIERA est une agence fictive installée à Saint-Raphaël, imaginée par NEXWORKS AGENCY pour illustrer un site immobilier haut de gamme : photographie immersive, recherche filtrée, fiches de propriétés avec galerie plein écran et formulaires en mode démonstration.",
    goals: [
      "Installer une atmosphère éditoriale et premium",
      "Faciliter la recherche par localisation, type, budget et surface",
      "Mettre chaque propriété en valeur avec galerie et visite à portée de clic",
      "Rester honnête : aucun faux avis, aucune coordonnée inventée",
    ],
    pages: [
      "Accueil",
      "Acheter",
      "Vendre",
      "Nos propriétés",
      "Fiches propriétés",
      "L'agence",
      "Contact",
      "Mentions légales",
      "Confidentialité",
    ],
    features: [
      "Recherche filtrée synchronisée avec l'URL",
      "Fiches avec galerie, lightbox plein écran et CTA de visite",
      "Formulaires de contact et d'estimation en mode démonstration",
      "Bandeau de transparence : démonstration pour agence fictive",
    ],
    highlights: ["Éditorial", "Recherche de biens", "Fiches détaillées"],
    demoUrl: "/maison-riviera",
    tags: ["Immobilier", "Prestige", "Next.js", "Côte d'Azur"],
    alt: "Site MAISON RIVIERA : hero « L'exception a une adresse » avec villa de prestige face à la Méditerranée",
  },
  {
    slug: "volt-fitness-club",
    name: "VOLT FITNESS CLUB",
    category: "fitness",
    categoryLabel: "Site web club de fitness",
    filterLabel: "Fitness",
    demo: true,
    images: {
      cover: "/projects/volt-cover.webp",
      desktop: { src: "/projects/volt-desktop.webp", width: 1100, height: 9436 },
      mobile: { src: "/projects/volt-mobile.webp", width: 390, height: 8633 },
    },
    summary:
      "Un site athlétique et immersif pour un club de fitness fictif à Saint-Raphaël : planning interactif, formules d'abonnement et programmes.",
    context:
      "VOLT FITNESS CLUB est un club fictif installé à Saint-Raphaël, imaginé par NEXWORKS AGENCY pour illustrer un site de sport premium : typographie massive, photographie sombre et cinématographique, accents vert électrique, planning de cours interactif et formulaires en mode démonstration.",
    goals: [
      "Installer une identité athlétique, sombre et premium",
      "Rendre le planning et les cours faciles à parcourir sur mobile",
      "Présenter clairement les formules d'abonnement",
      "Rester honnête : aucun faux avis, aucune promesse de résultat, aucune coordonnée inventée",
    ],
    pages: ["Accueil", "Club", "Programmes", "Planning", "Abonnements", "Contact", "Mentions légales", "Confidentialité"],
    features: [
      "Hero parallaxe, compteurs animés et barre de progression de lecture",
      "Planning interactif : sélecteur de jour, filtre par niveau, réservation en démonstration",
      "Formules START / PERFORMANCE / ELITE avec tableau comparatif",
      "Formulaire de contact validé, honeypot et mode démonstration",
      "Bandeau de transparence : démonstration pour club fictif",
    ],
    highlights: ["Typographie massive", "Planning interactif", "Formules claires"],
    demoUrl: "/volt-fitness",
    tags: ["Fitness", "Sport", "Next.js", "Saint-Raphaël"],
    alt: "Site VOLT FITNESS CLUB : hero « BUILT TO BE STRONGER. » avec athlète dans une salle de sport sombre et accents vert électrique",
  },
];

export const projectCategories = [
  { key: "tous", label: "Tous les projets" },
  ...Array.from(new Map(projects.map((p) => [p.category, p.filterLabel])).entries()).map(([key, label]) => ({
    key,
    label,
  })),
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
