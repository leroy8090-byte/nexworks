export const processSteps = [
  {
    n: "01",
    title: "Analyser",
    text: "Nous étudions votre activité, vos objectifs, votre présence digitale et vos besoins.",
    details: ["Échange sur vos objectifs", "Analyse de l'existant", "Définition des priorités"],
  },
  {
    n: "02",
    title: "Concevoir",
    text: "Nous imaginons une expérience digitale adaptée à votre marque et à vos clients.",
    details: ["Structure et arborescence", "Maquettes et direction visuelle", "Validation avec vous"],
  },
  {
    n: "03",
    title: "Développer",
    text: "Nous réalisons votre projet avec une attention particulière portée au design, à la performance et à l'expérience utilisateur.",
    details: ["Développement soigné", "Tests sur mobile et ordinateur", "Mise en ligne accompagnée"],
  },
  {
    n: "04",
    title: "Optimiser",
    text: "Nous améliorons votre visibilité, analysons les performances et identifions les axes de progression.",
    details: ["Optimisation SEO et GEO", "Suivi des performances", "Pistes d'amélioration"],
  },
] as const;

export const whyItems = [
  {
    icon: "target",
    title: "Une approche sur mesure",
    text: "Chaque projet est adapté aux besoins et aux objectifs de l'entreprise.",
  },
  {
    icon: "layers",
    title: "Un design professionnel",
    text: "Une image cohérente qui renforce la confiance.",
  },
  {
    icon: "gauge",
    title: "Une approche orientée performance",
    text: "Vitesse, ergonomie, référencement et conversion.",
  },
  {
    icon: "infinity",
    title: "Une vision durable",
    text: "Des solutions pensées pour accompagner l'évolution de votre activité.",
  },
] as const;

export type Sector = {
  slug: string;
  icon: "hotel" | "restaurant" | "business";
  title: string;
  short: string;
  heading: string;
  intro: string;
  needs: { title: string; text: string }[];
  offer: string[];
  metaDescription: string;
};

export const sectors: Sector[] = [
  {
    slug: "hotellerie",
    icon: "hotel",
    title: "Hôtellerie",
    short: "Valoriser votre établissement et faciliter les réservations directes.",
    heading: "Un site d'hôtel qui valorise votre établissement et facilite les réservations directes.",
    intro:
      "Votre site est la vitrine de votre établissement. Il doit donner envie de venir, présenter clairement vos chambres et vos services, et faciliter la réservation directe.",
    needs: [
      { title: "Une présentation qui donne envie", text: "Photos mises en valeur, ambiance, chambres et services présentés clairement." },
      { title: "Un parcours de réservation simple", text: "Un accès visible et rapide à votre moteur de réservation ou à votre formulaire de contact." },
      { title: "Une visibilité locale solide", text: "Informations cohérentes sur votre site, votre fiche Google et les plateformes où vous apparaissez." },
    ],
    offer: [
      "Site vitrine d'hôtel responsive",
      "Présentation des chambres, services et environs",
      "Intégration d'un lien ou d'un module de réservation existant",
      "SEO local et optimisation de la fiche Google Business Profile",
      "Contenus structurés pour les moteurs de réponse IA",
    ],
    metaDescription:
      "Site web pour hôtel : présentation des chambres, réservation directe, SEO local et visibilité dans les moteurs de réponse IA. NEXWORKS AGENCY.",
  },
  {
    slug: "restauration",
    icon: "restaurant",
    title: "Restauration",
    short: "Présenter votre établissement, votre carte et votre expérience client.",
    heading: "Un site de restaurant qui présente votre carte, votre univers et votre expérience client.",
    intro:
      "Vos clients cherchent une adresse, une carte, des horaires et une ambiance. Nous construisons un site lisible et appétissant, utilisable en quelques secondes depuis un smartphone.",
    needs: [
      { title: "Une carte claire et à jour", text: "Une carte facile à lire et à modifier, sans PDF illisible sur mobile." },
      { title: "Les informations essentielles accessibles", text: "Horaires, adresse, contact et réservation visibles dès l'arrivée sur le site." },
      { title: "Une ambiance fidèle à votre lieu", text: "Un univers visuel qui reflète votre cuisine et votre identité." },
    ],
    offer: [
      "Site vitrine de restaurant responsive",
      "Carte et menus présentés de façon lisible",
      "Réservation par formulaire, téléphone ou outil existant",
      "SEO local et optimisation de la fiche Google Business Profile",
      "Données structurées adaptées aux établissements de restauration",
    ],
    metaDescription:
      "Site web pour restaurant : carte, horaires, réservation, SEO local et données structurées. Création de sites de restauration par NEXWORKS AGENCY.",
  },
  {
    slug: "entreprises-independants",
    icon: "business",
    title: "Entreprises & indépendants",
    short: "Renforcer votre image et développer votre visibilité.",
    heading: "Un site professionnel pour renforcer votre image et développer votre visibilité.",
    intro:
      "Artisan, consultant, profession libérale, PME ou commerce : chaque activité a ses codes. Nous concevons un site adapté à votre métier et à votre clientèle, sans vous enfermer dans un modèle.",
    needs: [
      { title: "Une image crédible", text: "Un site propre, cohérent et rassurant, qui présente clairement votre activité." },
      { title: "Des demandes qualifiées", text: "Des pages pensées pour que le visiteur comprenne votre offre et vous contacte facilement." },
      { title: "Une visibilité qui s'installe", text: "Une base SEO et GEO pour être trouvé par les personnes qui cherchent vos services." },
    ],
    offer: [
      "Site vitrine ou institutionnel sur mesure",
      "Landing pages dédiées à une offre",
      "Refonte et amélioration d'un site existant",
      "Audit et optimisation SEO",
      "Structuration des contenus pour le GEO",
    ],
    metaDescription:
      "Création de site web pour entreprises, artisans et indépendants : image professionnelle, visibilité SEO et GEO. NEXWORKS AGENCY.",
  },
];

export const faq = [
  {
    q: "Quels services propose NEXWORKS AGENCY ?",
    a: "NEXWORKS AGENCY est une agence digitale spécialisée dans la création de sites web, le design et la refonte (UX/UI), l'optimisation SEO (référencement naturel) et l'optimisation GEO (visibilité dans les moteurs de réponse IA). Nous accompagnons aussi les entreprises dans l'évolution de leur présence digitale.",
  },
  {
    q: "Que signifie SEO ?",
    a: "SEO signifie Search Engine Optimization, c'est-à-dire l'optimisation pour les moteurs de recherche. Elle regroupe les actions techniques, éditoriales et locales qui aident votre site à être mieux compris et mieux référencé par Google et les autres moteurs de recherche.",
  },
  {
    q: "Que signifie GEO ?",
    a: "GEO signifie Generative Engine Optimization. Il s'agit d'optimiser vos contenus et la manière dont votre entreprise est décrite sur le web, afin qu'elle soit mieux comprise par les assistants et moteurs de réponse basés sur l'IA. C'est un travail d'optimisation : aucune apparition n'est garantie.",
  },
  {
    q: "Pouvez-vous garantir ma première place sur Google ou ma citation par une IA ?",
    a: "Non, et méfiez-vous de ceux qui le promettent. Les moteurs de recherche et les IA décident seuls de ce qu'ils affichent. Nous agissons sur ce qui dépend de vous et de nous : la qualité technique, la clarté des contenus, la cohérence des informations et la présence locale.",
  },
  {
    q: "Travaillez-vous uniquement avec des hôtels et des restaurants ?",
    a: "Non. L'hôtellerie et la restauration sont des univers que nous mettons en avant, mais nos services s'adressent à toutes les entreprises, aux indépendants et aux associations qui souhaitent créer ou améliorer leur présence en ligne.",
  },
  {
    q: "Pouvez-vous refondre mon site actuel ?",
    a: "Oui. Nous analysons d'abord votre site existant (design, parcours, performances, structure), puis nous proposons une refonte qui conserve ce qui fonctionne et améliore ce qui freine vos visiteurs.",
  },
  {
    q: "Comment se déroule un projet ?",
    a: "Chaque projet suit quatre étapes : analyser vos besoins, concevoir l'expérience, développer le site, puis optimiser sa visibilité et ses performances. Vous êtes consulté aux moments clés et recevez des livrables clairs.",
  },
  {
    q: "Comment obtenir un devis ?",
    a: "Rendez-vous sur la page Contact, décrivez votre besoin et, si vous le souhaitez, votre budget indicatif. Nous revenons vers vous pour échanger sur votre projet.",
  },
];
