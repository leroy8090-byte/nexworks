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
  /** true = concept de refonte NON commandé d'un site d'une entreprise réelle (non fictive, non cliente) */
  concept?: boolean;
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

// En production, une adresse locale ne mène nulle part pour un visiteur : elle est ignorée.
const env = (v: string | undefined) => {
  const value = v?.trim();
  if (!value) return undefined;
  return process.env.NODE_ENV === "production" && /localhost|127\.0\.0\.1/.test(value) ? undefined : value;
};

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
      desktop: { src: "/projects/azur-desktop.webp", width: 1100, height: 7882 },
      mobile: { src: "/projects/azur-mobile.webp", width: 390, height: 11859 },
    },
    summary:
      "Site de plombier fictif à Saint-Raphaël : maison interactive pour trouver son problème, bon réflexe en cas de fuite et demande en 3 étapes.",
    context:
      "AZUR PLOMBERIE est une entreprise fictive, conçue par NEXWORKS AGENCY pour montrer ce qu'un site peut apporter à un artisan. Celui qui a une fuite n'a pas le temps de lire : le site l'aide à comprendre son problème et lui dit quoi faire tout de suite, avant de lui proposer de faire sa demande.",
    goals: [
      "Séparer tout de suite l'urgence du projet",
      "Aider à nommer le problème, même sans connaître la plomberie",
      "Donner le bon réflexe avant de demander quoi que ce soit",
      "Une identité propre : émail, faïence et cuivre, loin du modèle d'artisan habituel",
      "Rester honnête : aucun faux avis, aucune certification, aucun numéro inventé",
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
      "Maison en coupe interactive : on touche ce qui ne va pas, le site explique quoi faire",
      "Hero animé au défilement : l'eau monte jusqu'à remplir l'écran",
      "Vanne animée et bon réflexe en cas de fuite, étape par étape",
      "Services en carreaux émaillés qui se retournent, salle de bain révélée carreau par carreau",
      "Demande en trois étapes, préremplie depuis la maison et les pages de service",
      "Illustrations dessinées sur mesure, version anglaise et animations réduites respectées",
    ],
    highlights: ["Maison interactive", "Illustrations sur mesure", "Demande en 3 étapes"],
    demoUrl: "/azur-plomberie",
    tags: ["Artisan", "Plomberie", "Next.js", "Saint-Raphaël"],
    alt: "Site AZUR PLOMBERIE : hero bleu émail « Ça fuit ? On s'en occupe. », avec une tuyauterie de cuivre et un robinet qui goutte",
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
  {
    slug: "orea-drive",
    name: "ORÉA DRIVE",
    category: "mobilite",
    categoryLabel: "Site web location de voitures",
    filterLabel: "Location de voitures",
    demo: true,
    images: {
      cover: "/projects/orea-cover.webp",
      desktop: { src: "/projects/orea-desktop.webp", width: 1100, height: 9068 },
      mobile: { src: "/projects/orea-mobile.webp", width: 390, height: 12764 },
    },
    summary:
      "Un site de location de voitures fictif sur la Côte d'Azur : catalogue de 160 véhicules, réservation complète et prix calculé en direct.",
    context:
      "ORÉA DRIVE est un loueur fictif imaginé par NEXWORKS AGENCY pour montrer ce qu'un site de location peut offrir : un visiteur choisit son lieu et ses dates, compare les véhicules avec le prix total affiché, puis suit un parcours de réservation clair, le tout porté par de grandes animations au défilement.",
    goals: [
      "Permettre de trouver le bon véhicule et son prix total en quelques clics",
      "Rendre chaque étape de la réservation évidente, surtout sur téléphone",
      "Donner à la marque une identité forte, inspirée de la signalisation routière",
      "Rester honnête : aucune fausse réservation, aucun paiement, aucun faux avis",
    ],
    pages: ["Accueil", "Véhicules", "Fiche véhicule", "Réservation", "Destinations", "Agences", "Contact", "Mentions légales", "Confidentialité"],
    features: [
      "Recherche par agence et par dates, avec prix total recalculé sur chaque véhicule",
      "Parcours de réservation en trois étapes avec options, vérification et récapitulatif",
      "Flotte en défilement horizontal et route qui se dessine au fil de la page",
      "Compteur de vitesse interactif qui calcule le prix en direct",
      "Catalogue de 160 véhicules en 8 catégories, avec recherche, filtres et chargement progressif",
      "Version anglaise et adaptation aux animations réduites",
    ],
    highlights: ["Réservation complète", "Grandes animations", "Prix en direct"],
    demoUrl: "/orea-drive",
    tags: ["Location de voitures", "Réservation", "Next.js", "Côte d'Azur"],
    alt: "Site ORÉA DRIVE : grand titre « La route vous attend. » sur une photo de voiture et une barre de recherche par lieu et dates",
  },
  {
    slug: "capital-immobilier",
    name: "CAPITAL IMMOBILIER",
    category: "immobilier",
    categoryLabel: "Site web agence immobilière",
    filterLabel: "Immobilier",
    demo: true,
    concept: true,
    images: {
      cover: "/projects/capital-immobilier-cover.webp",
      desktop: { src: "/projects/capital-immobilier-desktop.webp", width: 1100, height: 13228 },
      mobile: { src: "/projects/capital-immobilier-mobile.webp", width: 390, height: 16000 },
    },
    summary:
      "Un concept de refonte pour une agence immobilière de Saint-Raphaël : annonces filtrables, estimation guidée et pages claires pour le syndic et la gestion locative.",
    context:
      "CAPITAL IMMOBILIER est une agence réelle de Saint-Raphaël. NEXWORKS AGENCY a imaginé une refonte complète de son site à partir de ses informations publiques : un design noir, blanc et rouge, de grandes animations au défilement et un parcours simple pour acheter, louer, vendre ou confier un bien.",
    goals: [
      "Trouver un bien en quelques clics, sur téléphone comme sur ordinateur",
      "Expliquer clairement les métiers de l'agence, dont le syndic et la gestion d'ASL et d'ASA",
      "Faciliter les demandes : estimation, visite, proposition de syndic",
      "Rester honnête : aucun faux avis, aucun chiffre inventé, formulaires qui disent s'ils sont reliés",
    ],
    pages: ["Accueil", "Annonces", "Fiche d'un bien", "Acheter", "Louer", "Vendre", "Estimation", "Gestion locative", "Syndic", "ASL et ASA", "Secteurs", "Conseils", "Questions", "L'agence", "Contact"],
    features: [
      "Recherche et filtres avec nombre de résultats mis à jour en direct",
      "Fiches complètes avec galerie, caractéristiques, DPE, favoris et biens similaires",
      "Estimation en quatre étapes, avec l'adresse précise du bien",
      "Ouverture animée avec le logo et bandeau de cookies avec un vrai choix",
      "Animations au défilement, adaptées aux réglages de mouvement réduit",
      "Données structurées et redirections prêtes en cas de mise en ligne",
    ],
    highlights: ["Catalogue filtrable", "Estimation guidée", "Grandes animations"],
    demoUrl: env(process.env.NEXT_PUBLIC_DEMO_CAPITAL_URL),
    tags: ["Agence immobilière", "Syndic", "Next.js", "Saint-Raphaël"],
    alt: "Concept de refonte CAPITAL IMMOBILIER : grand titre « Votre prochain chapitre commence ici. » sur une photo du massif de l'Estérel",
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
