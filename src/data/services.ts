export type ServiceId = "creation-web" | "design-ux" | "seo" | "geo";

export type Service = {
  id: ServiceId;
  /** Libellé court (étiquette) */
  label: string;
  title: string;
  description: string;
  items: string[];
  /** Page Services : explication pédagogique */
  intro: string[];
  benefits: string[];
  /** Valeur envoyée au formulaire de contact */
  projectType: string;
  note?: string;
};

export const services: Service[] = [
  {
    id: "creation-web",
    label: "Création web",
    title: "Création de sites web",
    description: "Des sites web modernes, rapides et conçus pour transformer vos visiteurs en clients.",
    items: [
      "Sites vitrines professionnels",
      "Sites pour hôtels et restaurants",
      "Landing pages",
      "Sites institutionnels",
      "Sites responsive",
      "Intégration de formulaires et fonctionnalités adaptées",
    ],
    intro: [
      "Votre site est souvent le premier contact entre votre entreprise et un futur client. Nous le concevons comme un véritable outil : clair, rapide, agréable à parcourir sur mobile comme sur ordinateur.",
      "Chaque site est construit sur mesure à partir de vos objectifs : présenter votre activité, recevoir des demandes, faciliter une réservation ou simplement renforcer votre crédibilité.",
    ],
    benefits: [
      "Une image professionnelle dès la première visite",
      "Un site rapide et lisible sur tous les écrans",
      "Un parcours simple qui guide vers la prise de contact",
      "Une base technique saine, prête pour le référencement",
    ],
    projectType: "Création de site web",
  },
  {
    id: "design-ux",
    label: "Design & UX/UI",
    title: "Design & expérience utilisateur",
    description:
      "Une identité digitale soignée qui valorise votre entreprise et renforce la confiance de vos visiteurs.",
    items: [
      "Refonte de sites existants",
      "Design UI/UX",
      "Optimisation du parcours utilisateur",
      "Amélioration de la conversion",
      "Adaptation mobile",
      "Cohérence visuelle et identité digitale",
    ],
    intro: [
      "Un site peut contenir les bonnes informations et pourtant décourager ses visiteurs : navigation confuse, design daté, affichage mobile approximatif. Le design n'est pas une question de décoration, c'est ce qui rend votre offre compréhensible.",
      "Nous analysons votre site actuel, repensons les écrans et les parcours, puis harmonisons l'ensemble avec votre identité visuelle.",
    ],
    benefits: [
      "Une interface claire qui inspire confiance",
      "Des parcours plus fluides, du premier clic à la demande de contact",
      "Une expérience mobile pensée, pas simplement adaptée",
      "Une cohérence visuelle sur toutes vos pages",
    ],
    projectType: "Design & refonte",
  },
  {
    id: "seo",
    label: "Référencement SEO",
    title: "Référencement SEO",
    description:
      "Améliorez votre visibilité sur Google et facilitez la découverte de votre entreprise par vos futurs clients.",
    items: [
      "Audit SEO",
      "Optimisation technique",
      "Optimisation des titres et contenus",
      "Structure des pages",
      "Référencement local",
      "Optimisation Google Business Profile",
      "Amélioration des performances",
    ],
    intro: [
      "Le référencement naturel (SEO) regroupe tout ce qui aide les moteurs de recherche à comprendre votre site et à le proposer aux bonnes personnes. C'est un travail de fond, qui s'inscrit dans la durée.",
      "Nous commençons par un état des lieux, puis nous améliorons la technique, les contenus et votre présence locale. Personne ne peut garantir une position sur Google : nous travaillons sur les leviers qui dépendent réellement de votre site.",
    ],
    benefits: [
      "Un site que les moteurs de recherche comprennent mieux",
      "Des pages plus rapides, plus claires et mieux structurées",
      "Une présence locale cohérente (fiche Google, informations de contact)",
      "Des priorités d'amélioration claires, expliquées simplement",
    ],
    projectType: "Référencement SEO",
    note: "Le SEO est un travail d'optimisation continu. Aucun classement n'est garanti.",
  },
  {
    id: "geo",
    label: "Optimisation GEO",
    title: "Visibilité dans les IA",
    description:
      "Préparez votre présence digitale aux nouvelles habitudes de recherche et améliorez la compréhension de votre entreprise par les moteurs de réponse IA.",
    items: [
      "Optimisation des contenus pour les moteurs de réponse",
      "Structuration des informations",
      "Données structurées pertinentes",
      "Développement de contenus utiles et fiables",
      "Cohérence des informations sur le web",
      "Optimisation de la présence dans les environnements de recherche IA",
    ],
    intro: [
      "De plus en plus de personnes posent leurs questions directement à des assistants et moteurs de réponse basés sur l'IA. Le GEO (Generative Engine Optimization) consiste à rendre votre entreprise facile à comprendre et à citer correctement : informations claires, structurées et cohérentes partout sur le web.",
      "Le GEO est un travail d'optimisation, pas une promesse de résultat. Aucun prestataire ne peut garantir d'apparaître dans ChatGPT, Gemini, Perplexity ou Google : nous améliorons ce qui est dans notre champ d'action.",
    ],
    benefits: [
      "Des informations claires et cohérentes sur votre activité",
      "Des contenus structurés, plus faciles à interpréter par les IA",
      "Une base solide, qui sert aussi votre SEO et vos visiteurs",
      "Une préparation aux nouvelles habitudes de recherche",
    ],
    projectType: "Optimisation GEO",
    note: "Le GEO est un travail d'optimisation. Aucune apparition dans une IA ou un moteur n'est garantie.",
  },
];

export const getService = (id: ServiceId) => services.find((s) => s.id === id)!;
