/**
 * Contenu du site de démonstration AZUR PLOMBERIE (entreprise fictive).
 * Aucune coordonnée réelle : téléphone / e-mail via variables d'environnement uniquement.
 */

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : "");

export const azur = {
  name: "AZUR PLOMBERIE",
  shortName: "AZUR",
  location: "Saint-Raphaël",
  region: "Côte d'Azur",
  promise: "Votre plomberie entre de bonnes mains.",
  tagline: "Votre artisan plombier sur la Côte d'Azur.",
  description:
    "AZUR PLOMBERIE est un concept fictif de site vitrine pour un artisan plombier à Saint-Raphaël : dépannage, installation sanitaire et rénovation de salle de bain.",
  phone: env(process.env.NEXT_PUBLIC_AZUR_PHONE),
  email: env(process.env.NEXT_PUBLIC_AZUR_EMAIL),
  basePath: "/azur-plomberie",
} as const;

export const azurNav = [
  { label: "Accueil", href: "/azur-plomberie" },
  { label: "Services", href: "/azur-plomberie/services" },
  { label: "Salle de bain", href: "/azur-plomberie/salle-de-bain" },
  { label: "Zone d'intervention", href: "/azur-plomberie/zone-d-intervention" },
  { label: "À propos", href: "/azur-plomberie/a-propos" },
  { label: "Contact", href: "/azur-plomberie/contact" },
] as const;

export type AzurService = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  alt: string;
  intro: string[];
  includes: string[];
  steps: string[];
  tips: string[];
  /** Lien alternatif (ex. page salle de bain) */
  href?: string;
};

export const azurServices: AzurService[] = [
  {
    slug: "depannage",
    title: "Dépannage plomberie",
    short: "Fuite, robinet défectueux ou canalisation bouchée : retrouvez rapidement votre confort.",
    description:
      "Une fuite, un robinet défectueux ou une canalisation bouchée ? Découvrez nos solutions de dépannage pour retrouver rapidement votre confort.",
    image: "/azur/service-depannage.webp",
    alt: "Intervention de plomberie sous un évier dans une cuisine moderne",
    intro: [
      "Un problème de plomberie peut survenir à tout moment : fuite sous l'évier, chasse d'eau qui fuit, robinet qui goutte ou mauvaise odeur dans une canalisation.",
      "Cette page présente l'approche du concept AZUR PLOMBERIE pour le dépannage : comprendre le problème, sécuriser l'installation si besoin, puis proposer une réparation adaptée.",
    ],
    includes: [
      "Fuite visible sur robinetterie, flexible ou joint",
      "Remplacement de joints, flexibles et petits accessoires",
      "Remise en service d'un équipement après diagnostic",
      "Conseils pour limiter les dégâts en attendant l'intervention",
    ],
    steps: [
      "Vous décrivez le problème et votre commune via le formulaire.",
      "Nous étudions les informations transmises (et les photos si vous en ajoutez).",
      "Une proposition de solution peut être formulée après étude du besoin.",
      "L'intervention se déroule selon les modalités convenues.",
    ],
    tips: [
      "En cas de fuite active, coupez l'arrivée d'eau au robinet d'arrêt le plus proche.",
      "Évitez d'utiliser l'équipement concerné jusqu'au diagnostic.",
      "Une photo du problème accélère souvent la compréhension du besoin.",
    ],
  },
  {
    slug: "recherche-fuite",
    title: "Recherche de fuite",
    short: "Identifier l'origine d'une humidité ou d'une fuite pour limiter les dégâts.",
    description:
      "Identifiez l'origine de vos problèmes d'humidité ou de fuite et découvrez les solutions adaptées pour limiter les dégâts.",
    image: "/azur/service-fuite.webp",
    alt: "Outils et matériel de plomberie pour une intervention technique",
    intro: [
      "Une tache d'humidité, une facture d'eau inhabituelle ou un bruit d'écoulement anormal peuvent signaler une fuite non apparente.",
      "Sur ce concept, la recherche de fuite consiste à localiser l'origine du problème avant de proposer une réparation ciblée — sans inventer de méthode magique ni de délai garanti.",
    ],
    includes: [
      "Analyse des symptômes décrits (humidité, bruit, consommation)",
      "Inspection des points d'accès visibles (sous évier, regard, joints)",
      "Proposition de suite : réparation, remplacement ou contrôle complémentaire",
      "Explications claires sur ce qui a été observé",
    ],
    steps: [
      "Transmission des symptômes et de la zone concernée.",
      "Étude de la demande et, si nécessaire, questions complémentaires.",
      "Intervention de localisation selon le cas.",
      "Proposition de réparation une fois l'origine identifiée.",
    ],
    tips: [
      "Notez depuis quand le problème est apparu.",
      "Indiquez si d'autres pièces sont touchées.",
      "Ne percez pas ni n'ouvrez de cloison sans diagnostic.",
    ],
  },
  {
    slug: "debouchage",
    title: "Débouchage",
    short: "Évier, lavabo, douche ou canalisation : solutions aux problèmes d'écoulement.",
    description:
      "Évier, lavabo, douche ou canalisation : des solutions adaptées aux problèmes d'écoulement et d'obstruction.",
    image: "/azur/service-debouchage.webp",
    alt: "Lavabo et robinetterie dans une salle de bain claire",
    intro: [
      "Un écoulement lent, une douche qui se vide mal ou un WC qui refoule indiquent souvent une obstruction.",
      "Le concept AZUR PLOMBERIE présente le débouchage comme une intervention de remise en état de l'écoulement, avec des conseils pour limiter les récidives.",
    ],
    includes: [
      "Évier de cuisine et lave-vaisselle",
      "Lavabo, douche et baignoire",
      "WC et regards accessibles",
      "Conseils d'entretien après intervention",
    ],
    steps: [
      "Description du point d'eau concerné et des symptômes.",
      "Étude de la demande.",
      "Intervention de débouchage adaptée à la situation.",
      "Vérification de l'écoulement avec vous.",
    ],
    tips: [
      "Évitez les produits chimiques agressifs avant l'intervention : ils peuvent compliquer le diagnostic.",
      "Ne forcez pas avec un objet qui pourrait casser dans la canalisation.",
      "Précisez si le problème touche un seul point d'eau ou plusieurs.",
    ],
  },
  {
    slug: "installation-sanitaire",
    title: "Installation sanitaire",
    short: "Pose et remplacement d'équipements pour plus de confort au quotidien.",
    description:
      "Installation et remplacement de vos équipements sanitaires pour améliorer le confort et la fonctionnalité de votre logement.",
    image: "/azur/service-sanitaire.webp",
    alt: "Salle de bain contemporaine avec lavabo et robinetterie soignée",
    intro: [
      "Remplacer un lavabo, poser une nouvelle robinetterie ou installer un WC fait partie des travaux courants de plomberie.",
      "Cette page décrit l'approche du concept : choix d'équipements adaptés, pose soignée et finitions propres.",
    ],
    includes: [
      "Pose ou remplacement de lavabo, vasque et robinetterie",
      "Installation de WC et mécanismes de chasse",
      "Raccordements d'eau chaude et froide",
      "Remise en état des finitions accessibles autour de l'équipement",
    ],
    steps: [
      "Vous précisez l'équipement à poser ou à remplacer.",
      "Nous étudions la faisabilité à partir de vos informations et photos.",
      "Une proposition peut être établie après étude du besoin.",
      "Pose et essais de fonctionnement.",
    ],
    tips: [
      "Indiquez la marque ou le modèle si vous avez déjà choisi l'équipement.",
      "Précisez si le meuble ou le carrelage doit être conservé.",
      "Joignez une photo de l'existant pour faciliter l'étude.",
    ],
  },
  {
    slug: "chauffe-eau",
    title: "Chauffe-eau",
    short: "Installation ou remplacement d'un équipement adapté à vos besoins.",
    description:
      "Installation ou remplacement de chauffe-eau et accompagnement dans le choix d'un équipement adapté à vos besoins.",
    image: "/azur/service-chauffe-eau.webp",
    alt: "Local technique propre avec équipements de chauffage et d'eau chaude",
    intro: [
      "Manque d'eau chaude, ballon en fin de vie ou projet de remplacement : le chauffe-eau est un équipement central du confort quotidien.",
      "Le concept présente l'installation et le remplacement sans inventer de performances, de marques imposées ou de délais.",
    ],
    includes: [
      "Diagnostic d'un manque d'eau chaude signalé",
      "Remplacement d'un ballon électrique (selon configuration)",
      "Conseils sur le volume adapté à votre foyer",
      "Mise en service et vérification des raccordements",
    ],
    steps: [
      "Description du problème ou du projet de remplacement.",
      "Étude de la configuration (emplacement, type d'appareil).",
      "Proposition adaptée après analyse.",
      "Installation et essais.",
    ],
    tips: [
      "Indiquez le type d'appareil actuel si vous le connaissez (électrique, thermodynamique…).",
      "Précisez le nombre de personnes dans le logement.",
      "Signalez tout bruit inhabituel ou coupure d'eau chaude totale.",
    ],
  },
  {
    slug: "renovation-salle-de-bain",
    title: "Rénovation de salle de bain",
    short: "Un espace moderne, fonctionnel et adapté à votre logement.",
    description:
      "Transformez votre salle de bain avec des équipements modernes, fonctionnels et adaptés à votre espace.",
    image: "/azur/service-sdb.webp",
    alt: "Salle de bain contemporaine lumineuse avec douche et carrelage clair",
    href: "/azur-plomberie/salle-de-bain",
    intro: [
      "Rénover une salle de bain, c'est souvent plus qu'un simple changement de robinet : douche, évacuations, arrivées d'eau et organisation de l'espace.",
      "La page dédiée détaille les prestations de rénovation présentées par ce concept.",
    ],
    includes: [
      "Remplacement de baignoire par douche",
      "Douche à l'italienne (selon faisabilité)",
      "Lavabo, robinetterie et WC",
      "Reprise des réseaux de plomberie nécessaires au projet",
    ],
    steps: [
      "Vous décrivez votre projet et l'état actuel de la pièce.",
      "Étude du besoin à partir de vos informations.",
      "Proposition de périmètre de travaux.",
      "Réalisation selon les modalités convenues.",
    ],
    tips: [
      "Précisez si vous souhaitez conserver le carrelage existant.",
      "Indiquez les contraintes d'accès (appartement, étage).",
      "Des photos de l'existant aident beaucoup.",
    ],
  },
];

export const getAzurService = (slug: string) => azurServices.find((s) => s.slug === slug);

export const azurBand = [
  { label: "Dépannage", icon: "wrench" as const, href: "/azur-plomberie/services/depannage" },
  { label: "Recherche de fuite", icon: "drop" as const, href: "/azur-plomberie/services/recherche-fuite" },
  { label: "Installation sanitaire", icon: "bath" as const, href: "/azur-plomberie/services/installation-sanitaire" },
  { label: "Rénovation", icon: "home" as const, href: "/azur-plomberie/salle-de-bain" },
  { label: "Chauffe-eau", icon: "heater" as const, href: "/azur-plomberie/services/chauffe-eau" },
];

export const azurWhy = [
  {
    n: "01",
    title: "Professionnalisme",
    text: "Des interventions organisées et un travail attentif aux détails.",
  },
  {
    n: "02",
    title: "Transparence",
    text: "Des explications claires sur les travaux à réaliser et les solutions envisageables.",
  },
  {
    n: "03",
    title: "Solutions adaptées",
    text: "Chaque situation est étudiée pour proposer une intervention adaptée à vos besoins.",
  },
  {
    n: "04",
    title: "Accompagnement",
    text: "Un interlocuteur pour vous accompagner de la demande initiale jusqu'à la réalisation du projet.",
  },
];

export const azurSteps = [
  {
    n: "01",
    title: "Vous nous contactez",
    text: "Décrivez votre problème ou votre projet à travers notre formulaire.",
  },
  {
    n: "02",
    title: "Étude du besoin",
    text: "Nous prenons connaissance de votre demande et des informations transmises.",
  },
  {
    n: "03",
    title: "Proposition",
    text: "Une solution et un devis adapté peuvent être proposés après étude du besoin.",
  },
  {
    n: "04",
    title: "Intervention",
    text: "Les travaux sont réalisés selon les modalités convenues avec le client.",
  },
];

export const azurZones = [
  {
    name: "Saint-Raphaël",
    text: "Ville de référence du concept, sur la Côte d'Azur.",
  },
  {
    name: "Fréjus",
    text: "Commune voisine présentée dans la zone indicative.",
  },
  {
    name: "Puget-sur-Argens",
    text: "Secteur illustratif du périmètre de démonstration.",
  },
  {
    name: "Roquebrune-sur-Argens",
    text: "Incluse à titre d'exemple de zone proche.",
  },
  {
    name: "Sainte-Maxime",
    text: "Présentée comme commune du littoral environnant.",
  },
  {
    name: "Les Issambres",
    text: "Quartier / secteur indicatif du concept.",
  },
];

export const azurSdbItems = [
  {
    title: "Remplacement de baignoire par douche",
    text: "Libérer de l'espace et gagner en accessibilité, avec reprise des évacuations si nécessaire.",
  },
  {
    title: "Douche à l'italienne",
    text: "Un espace ouvert et contemporain, étudié selon la configuration de votre pièce.",
  },
  {
    title: "Lavabo et robinetterie",
    text: "Remplacement d'équipements pour plus de confort et une esthétique actuelle.",
  },
  {
    title: "Modernisation des équipements",
    text: "WC, meuble vasque, mitigeurs : des éléments choisis pour durer et rester simples d'usage.",
  },
  {
    title: "Réorganisation des espaces",
    text: "Repenser la circulation et le rangement sans promettre un résultat architectural standardisé.",
  },
  {
    title: "Réseaux de plomberie",
    text: "Reprise des arrivées et évacuations nécessaires au bon fonctionnement du projet.",
  },
];

export const azurGallery = [
  { src: "/azur/sdb-hero.webp", alt: "Salle de bain contemporaine claire" },
  { src: "/azur/service-sdb.webp", alt: "Douche et carrelage clair" },
  { src: "/azur/service-sanitaire.webp", alt: "Lavabo et robinetterie modernes" },
  { src: "/azur/hero.webp", alt: "Baignoire design dans une salle de bain lumineuse" },
  { src: "/azur/service-debouchage.webp", alt: "Vasque dans une salle d'eau" },
  { src: "/azur/about.webp", alt: "Cadre résidentiel contemporain" },
];

export const azurFaq = [
  {
    q: "Quels types de travaux de plomberie pouvez-vous réaliser ?",
    a: "Le concept AZUR PLOMBERIE couvre le dépannage, la recherche de fuite, le débouchage, l'installation sanitaire, le chauffe-eau et la rénovation de salle de bain. Chaque demande est étudiée individuellement.",
  },
  {
    q: "Comment demander un devis ?",
    a: "Utilisez le formulaire de contact en décrivant votre besoin, votre commune et, si possible, des photos. Nous étudions ensuite votre demande. Sur ce site de démonstration, l'envoi est simulé.",
  },
  {
    q: "Intervenez-vous pour les petites réparations ?",
    a: "Oui : robinetterie, joints, petits remplacements et interventions courantes font partie des prestations présentées sur ce concept.",
  },
  {
    q: "Pouvez-vous rénover une salle de bain ?",
    a: "La page dédiée présente une offre de rénovation (douche, lavabo, robinetterie, réorganisation). Un projet réel nécessiterait une étude sur place.",
  },
  {
    q: "Comment se déroule une recherche de fuite ?",
    a: "Après description du problème, une intervention peut être envisagée pour localiser l'origine et proposer une réparation adaptée. Les moyens techniques précis dépendent de chaque situation.",
  },
  {
    q: "Quels éléments fournir pour une demande d'intervention ?",
    a: "Votre commune, le type de prestation, une description claire et, si possible, des photos. Plus les informations sont précises, plus l'étude du besoin est efficace.",
  },
  {
    q: "Intervenez-vous dans les communes autour de Saint-Raphaël ?",
    a: "Ce concept présente une zone indicative autour de Saint-Raphaël (Fréjus, Puget-sur-Argens, etc.). Il ne s'agit pas d'une zone réellement desservie : l'entreprise est fictive.",
  },
];

export const azurPrestationOptions = [
  "Dépannage",
  "Fuite d'eau",
  "Débouchage",
  "Installation sanitaire",
  "Chauffe-eau",
  "Rénovation salle de bain",
  "Autre",
] as const;

export const azurValuesLong = [
  {
    title: "Une plomberie claire et soignée",
    text: "Le positionnement du concept est celui d'un artisan moderne : expliquer ce qui est fait, laisser un chantier propre, et rester transparent sur les solutions possibles.",
  },
  {
    title: "Un site pensé pour décider",
    text: "Chaque page mène vers une demande de devis. L'objectif n'est pas d'impressionner avec de faux chiffres, mais de rendre le prochain pas évident.",
  },
  {
    title: "Une démonstration NEXWORKS",
    text: "AZUR PLOMBERIE montre comment NEXWORKS AGENCY structure un site vitrine local : services détaillés, zone indicative, FAQ utile et formulaire honnête.",
  },
];
