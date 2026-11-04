/**
 * CAPITAL IMMOBILIER — concept de refonte réalisé par NEXWORKS AGENCY (démonstration).
 *
 * Coordonnées et services : repris du site public https://www.capitalimmobilier.fr/ (vérifié le 04/11/2026).
 * Biens : TOUS les biens ci-dessous sont des biens de DÉMONSTRATION fictifs. Ils ne sont pas commercialisés par
 * l'agence et leurs photographies sont des images d'illustration libres de droits (voir /capital-immobilier/credits-photos).
 * Aucun avis, chiffre, date, récompense, carte professionnelle ou nom d'équipe n'est affiché : rien n'est inventé.
 */
export const capital = {
  name: "CAPITAL IMMOBILIER",
  basePath: "/capital-immobilier",
  publicSite: "https://www.capitalimmobilier.fr/",
  phone: "04 94 40 86 44",
  phoneHref: "+33494408644",
  email: "contact@capitalimmobilier.fr",
  address: {
    street: "129 Avenue du Général-Leclerc",
    /** Le site public indique 83530 ; le brief indiquait 83700. À confirmer avec l'agence avant mise en ligne. */
    postalCode: "83530",
    city: "Saint-Raphaël",
    country: "FR",
  },
  description:
    "CAPITAL IMMOBILIER est une agence immobilière installée à Saint-Raphaël (Var) : vente, location, gestion locative, syndic de copropriété, ASL et ASA. Concept de refonte réalisé par NEXWORKS AGENCY.",
  hero: {
    title: "L'immobilier mérite une autre perspective.",
    sub: "À Saint-Raphaël et ses environs, nous vous accompagnons dans tous vos projets immobiliers avec exigence, proximité et expertise.",
    image: "/capital-immobilier/hero.webp",
  },
} as const;

const b = capital.basePath;

export const capitalNav = [
  { label: "Acheter", href: `${b}/acheter` },
  { label: "Louer", href: `${b}/louer` },
  { label: "Vendre", href: `${b}/vendre` },
  { label: "Gestion immobilière", href: `${b}/gestion-immobiliere` },
  { label: "Estimation", href: `${b}/estimation` },
  { label: "L'agence", href: `${b}/agence` },
  { label: "Contact", href: `${b}/contact` },
];

/* ------------------------------------------------------------------ Communes */

export type Commune = {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  intro: string[];
  /** Ce que l'agence peut faire ici : uniquement des services confirmés */
  services: string[];
  credit: { author: string; license: string; source: string };
};

/** Zones citées sur le site public (titre « St Raphaël, Fréjus, Anthéor et environs » et filtres de recherche). */
export const communes: Commune[] = [
  {
    slug: "saint-raphael",
    name: "Saint-Raphaël",
    image: "/capital-immobilier/t-saint-raphael.webp",
    imageAlt: "Port de plaisance de Saint-Raphaël, bateaux amarrés et grande roue sous un ciel clair",
    tagline: "Là où l'agence est installée.",
    intro: [
      "Saint-Raphaël, dans le Var, est la commune où CAPITAL IMMOBILIER a son agence, avenue du Général-Leclerc. C'est le point de départ de l'essentiel de nos accompagnements : achat, vente, location et gestion.",
      "Entre front de mer, centre-ville et quartiers résidentiels, chaque secteur répond à un mode de vie différent. Un échange avec l'agence permet de situer votre projet et de le replacer dans le marché local.",
    ],
    services: ["Vente et achat", "Location", "Gestion locative", "Syndic de copropriété"],
    credit: { author: "André Alliot", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Saint_Rapha%C3%ABl._Var.jpg" },
  },
  {
    slug: "frejus",
    name: "Fréjus",
    image: "/capital-immobilier/t-frejus.webp",
    imageAlt: "Port de Fréjus, voiliers amarrés devant des immeubles méditerranéens",
    tagline: "La commune voisine, à deux pas de Saint-Raphaël.",
    intro: [
      "Fréjus est mentionnée dans les zones d'intervention de l'agence sur son site public. Voisine de Saint-Raphaël, elle réunit un centre historique, un port et des quartiers résidentiels.",
      "Pour un bien situé à Fréjus, nous vous recevons à l'agence de Saint-Raphaël pour étudier votre projet d'achat, de vente ou de location.",
    ],
    services: ["Vente et achat", "Location", "Gestion locative"],
    credit: { author: "Txllxt TxllxT", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Fr%C3%A9jus_-_Port_Fr%C3%A9jus_-_View_SE.jpg" },
  },
  {
    slug: "antheor",
    name: "Anthéor",
    image: "/capital-immobilier/t-antheor.webp",
    imageAlt: "Vue aérienne du littoral d'Anthéor et des roches rouges de l'Estérel au bord de la Méditerranée",
    tagline: "Le littoral de l'Estérel.",
    intro: [
      "Anthéor figure dans le titre du site public de l'agence, aux côtés de Saint-Raphaël et de Fréjus. Située sur le littoral de l'Estérel, elle est rattachée à la commune de Saint-Raphaël.",
      "Les biens de ce secteur demandent souvent une lecture fine de l'emplacement. C'est précisément ce que nous vous proposons lors d'un premier rendez-vous.",
    ],
    services: ["Vente et achat", "Location", "Gestion locative"],
    credit: { author: "Olivier Cleynen", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Anth%C3%A9or,_aerial_view_01.jpg" },
  },
  {
    slug: "bagnols-en-foret",
    name: "Bagnols-en-Forêt",
    image: "/capital-immobilier/t-bagnols.webp",
    imageAlt: "Village perché de Bagnols-en-Forêt dominant la campagne varoise",
    tagline: "Un village de l'arrière-pays varois.",
    intro: [
      "Bagnols-en-Forêt apparaît dans les filtres de recherche du site public de l'agence. Village de l'arrière-pays varois, il s'adresse à ceux qui recherchent davantage de calme tout en restant proches du littoral.",
      "Que vous souhaitiez acheter, vendre ou louer dans ce secteur, nous étudions votre projet avec vous à l'agence de Saint-Raphaël.",
    ],
    services: ["Vente et achat", "Location"],
    credit: { author: "Marianne Casamance", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Vue_sur_Bagnols-en-For%C3%AAt.JPG" },
  },
  {
    slug: "fayence",
    name: "Fayence",
    image: "/capital-immobilier/t-fayence.webp",
    imageAlt: "Village perché de Fayence et ses façades ocre sous un ciel de fin de journée",
    tagline: "Le pays de Fayence.",
    intro: [
      "Fayence fait partie des localisations proposées dans la recherche du site public de l'agence. Village perché du Var, il fait partie du pays de Fayence.",
      "Pour un projet à Fayence, prenez contact avec l'agence : nous vous indiquerons ce qui est possible dans ce secteur.",
    ],
    services: ["Vente et achat", "Location"],
    credit: { author: "Thérèse Gaigé", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Fayence_(Var)_-_01.jpg" },
  },
  {
    slug: "callian",
    name: "Callian",
    image: "/capital-immobilier/t-callian.webp",
    imageAlt: "Village de Callian et son château dominant la campagne du Var",
    tagline: "Un village du pays de Fayence.",
    intro: [
      "Callian est citée parmi les localisations de la recherche du site public de l'agence. Village varois voisin de Fayence, il est dominé par son château.",
      "Si vous avez un projet d'achat, de vente ou de location à Callian, l'agence vous reçoit à Saint-Raphaël.",
    ],
    services: ["Vente et achat", "Location"],
    credit: { author: "Michel Moumdjian", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Village_de_Callian_(Var).JPG" },
  },
];

export const getCommune = (slug: string) => communes.find((c) => c.slug === slug);
export const communeNames = communes.map((c) => c.name);

/* ------------------------------------------------------------------ Biens (DÉMONSTRATION) */

export type PropertyType = "appartement" | "maison" | "villa";
export type Transaction = "vente" | "location";

export const propertyTypeLabel: Record<PropertyType, string> = {
  appartement: "Appartement",
  maison: "Maison",
  villa: "Villa",
};

export type Property = {
  slug: string;
  ref: string;
  title: string;
  transaction: Transaction;
  type: PropertyType;
  commune: string;
  /** Prix de vente (€) ou loyer mensuel hors charges (€) */
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  tagline: string;
  description: string[];
  features: string[];
  images: { src: string; alt: string }[];
};

const img = (name: string, alt: string) => ({ src: `/capital-immobilier/${name}.webp`, alt });

export const properties: Property[] = [
  {
    slug: "villa-contemporaine-saint-raphael",
    ref: "DEMO-001",
    title: "Villa contemporaine avec piscine",
    transaction: "vente",
    type: "villa",
    commune: "Saint-Raphaël",
    price: 1650000,
    surface: 210,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    tagline: "Lignes pures, grandes baies et piscine face au jardin.",
    description: [
      "Cette villa de démonstration illustre la façon dont nous présentons une maison d'architecte : grande façade vitrée, séjour ouvert sur l'extérieur et piscine dans le prolongement des pièces de vie.",
      "La fiche regroupe l'essentiel : surface, nombre de pièces, prestations et secteur. Pour un vrai bien, s'ajouteraient le diagnostic énergétique et les éléments de copropriété ou de terrain.",
    ],
    features: ["Piscine", "Grandes baies vitrées", "Cuisine ouverte", "Terrasse", "Jardin"],
    images: [
      img("villa-pool", "Façade contemporaine blanche et bois face à une piscine (photographie d'illustration)"),
      img("pool-garden", "Piscine rectangulaire entourée d'un jardin méditerranéen (photographie d'illustration)"),
      img("kitchen-open", "Cuisine ouverte et séjour lumineux (photographie d'illustration)"),
      img("window-sea", "Baie vitrée ouverte sur une terrasse et la mer (photographie d'illustration)"),
    ],
  },
  {
    slug: "villa-vue-mer-antheor",
    ref: "DEMO-002",
    title: "Villa en surplomb, vue mer",
    transaction: "vente",
    type: "villa",
    commune: "Anthéor",
    price: 2490000,
    surface: 260,
    rooms: 7,
    bedrooms: 5,
    bathrooms: 4,
    tagline: "Piscine suspendue au-dessus de la baie, pins parasols et horizon bleu.",
    description: [
      "Un bien de démonstration pensé pour montrer une fiche « signature » : position dominante, vue dégagée et espaces extérieurs pensés comme des pièces à vivre.",
      "Les informations de localisation restent volontairement à l'échelle du secteur : une adresse exacte n'est communiquée qu'en rendez-vous, comme le ferait l'agence pour un bien réel.",
    ],
    features: ["Vue mer", "Piscine", "Terrasses étagées", "Pins parasols", "Séjour lumineux"],
    images: [
      img("pool-sea", "Piscine en surplomb de la mer bordée de pins (photographie d'illustration)"),
      img("balcony-hills", "Balcon donnant sur les collines boisées et la mer (photographie d'illustration)"),
      img("window-sea", "Baie vitrée donnant sur la mer et une ville côtière (photographie d'illustration)"),
      img("living-sun", "Salon baigné de soleil devant un rideau de lin (photographie d'illustration)"),
    ],
  },
  {
    slug: "mas-provencal-bagnols-en-foret",
    ref: "DEMO-003",
    title: "Villa provençale et son bassin",
    transaction: "vente",
    type: "maison",
    commune: "Bagnols-en-Forêt",
    price: 890000,
    surface: 175,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 2,
    tagline: "Tuiles rondes, arcades et soirées autour de la piscine.",
    description: [
      "Bien de démonstration inspiré des maisons provençales de l'arrière-pays : arcades, tuiles canal, patio et bassin pour les longues soirées d'été.",
      "Cette fiche permet de tester la recherche par type de bien « maison » et par commune de l'arrière-pays.",
    ],
    features: ["Piscine", "Arcades", "Patio", "Cuisine d'été", "Mobilier de jardin"],
    images: [
      img("villa-night", "Maison provençale à arcades éclairée au crépuscule devant sa piscine (photographie d'illustration)"),
      img("pool-white", "Piscine bleue et terrasse blanche fleurie (photographie d'illustration)"),
      img("living-oak", "Séjour clair avec buffet en bois et fauteuil (photographie d'illustration)"),
      img("room-bright", "Chambre claire aux portes-fenêtres et parquet (photographie d'illustration)"),
    ],
  },
  {
    slug: "appartement-lumineux-frejus",
    ref: "DEMO-004",
    title: "Appartement traversant, 4 pièces",
    transaction: "vente",
    type: "appartement",
    commune: "Fréjus",
    price: 345000,
    surface: 78,
    rooms: 4,
    bedrooms: 2,
    bathrooms: 1,
    tagline: "Grands volumes, lumière du matin et balcon filant.",
    description: [
      "Appartement de démonstration en étage élevé : séjour avec balcon, cuisine séparée, deux chambres sur le côté calme.",
      "Il illustre une fiche d'appartement classique, avec les informations qui comptent pour comparer : surface, pièces, chambres, étage et prestations.",
    ],
    features: ["Balcon", "Séjour lumineux", "Cuisine équipée", "Parquet", "Étage élevé"],
    images: [
      img("living-sun", "Salon lumineux et son balcon (photographie d'illustration)"),
      img("kitchen-blue", "Cuisine moderne blanche aux touches bleues (photographie d'illustration)"),
      img("room-bright", "Chambre claire aux grandes fenêtres (photographie d'illustration)"),
      img("window-sea", "Vue depuis la fenêtre sur la mer et la ville (photographie d'illustration)"),
    ],
  },
  {
    slug: "appartement-t2-saint-raphael",
    ref: "DEMO-005",
    title: "Appartement 2 pièces rénové",
    transaction: "vente",
    type: "appartement",
    commune: "Saint-Raphaël",
    price: 235000,
    surface: 48,
    rooms: 2,
    bedrooms: 1,
    bathrooms: 1,
    tagline: "Un deux-pièces clair, pensé pour être habité ou loué.",
    description: [
      "Bien de démonstration à budget plus accessible : une pièce de vie avec cuisine ouverte, une chambre, des finitions sobres.",
      "Il permet de vérifier que les filtres de budget et de surface fonctionnent sur toute la gamme du jeu de données.",
    ],
    features: ["Cuisine ouverte", "Rénové", "Lumineux", "Rangements intégrés"],
    images: [
      img("kitchen-open", "Cuisine ouverte sur le séjour (photographie d'illustration)"),
      img("living-oak", "Séjour clair avec mobilier en bois (photographie d'illustration)"),
      img("room-bright", "Chambre claire (photographie d'illustration)"),
    ],
  },
  {
    slug: "villa-architecte-callian",
    ref: "DEMO-006",
    title: "Villa d'architecte et palmiers",
    transaction: "vente",
    type: "villa",
    commune: "Callian",
    price: 1180000,
    surface: 190,
    rooms: 5,
    bedrooms: 4,
    bathrooms: 3,
    tagline: "Volumes blancs, bois chaud et jardin de palmiers.",
    description: [
      "Une villa de démonstration à l'écriture architecturale franche : volumes superposés, bardage bois, longues terrasses.",
      "Elle permet d'illustrer une fiche haut de gamme dans l'arrière-pays, avec galerie plein écran et formulaire de contact intégré.",
    ],
    features: ["Architecture contemporaine", "Terrasses", "Piscine", "Jardin planté de palmiers"],
    images: [
      img("villa-palm", "Villa contemporaine blanche et bois, palmiers au premier plan (photographie d'illustration)"),
      img("white-balcony", "Façade blanche aux longues baies et garde-corps vitré (photographie d'illustration)"),
      img("pool-garden", "Piscine entourée de verdure (photographie d'illustration)"),
      img("kitchen-blue", "Cuisine ouverte contemporaine (photographie d'illustration)"),
    ],
  },
  {
    slug: "location-appartement-3-pieces-saint-raphael",
    ref: "DEMO-007",
    title: "Appartement 3 pièces à louer",
    transaction: "location",
    type: "appartement",
    commune: "Saint-Raphaël",
    price: 1150,
    surface: 68,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    tagline: "Lumineux, calme et prêt à emménager.",
    description: [
      "Annonce de location de démonstration : un trois-pièces lumineux, avec séjour ouvert sur un balcon et deux chambres.",
      "Le loyer affiché est un loyer mensuel hors charges fictif. Pour une vraie location, la fiche préciserait charges, dépôt de garantie et honoraires, à renseigner par l'agence.",
    ],
    features: ["Balcon", "Cuisine équipée", "Deux chambres", "Parquet"],
    images: [
      img("living-sun", "Salon clair et son balcon (photographie d'illustration)"),
      img("room-bright", "Chambre claire et parquet (photographie d'illustration)"),
      img("kitchen-blue", "Cuisine équipée (photographie d'illustration)"),
    ],
  },
  {
    slug: "location-maison-fayence",
    ref: "DEMO-008",
    title: "Maison familiale à louer",
    transaction: "location",
    type: "maison",
    commune: "Fayence",
    price: 1850,
    surface: 120,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    tagline: "Une maison de village avec piscine, à louer à l'année.",
    description: [
      "Annonce de location de démonstration : maison de caractère avec piscine et séjour spacieux, dans le pays de Fayence.",
      "Elle permet de tester la recherche en mode « Louer » sur un type de bien différent des appartements.",
    ],
    features: ["Piscine", "Séjour spacieux", "Toit en tuiles", "Trois chambres"],
    images: [
      img("roof-house", "Maison à toit de tuiles rouges et mer à l'horizon (photographie d'illustration)"),
      img("pool-white", "Piscine et terrasse blanche (photographie d'illustration)"),
      img("living-oak", "Séjour avec buffet en bois (photographie d'illustration)"),
    ],
  },
  {
    slug: "location-studio-frejus",
    ref: "DEMO-009",
    title: "Studio meublé à louer",
    transaction: "location",
    type: "appartement",
    commune: "Fréjus",
    price: 590,
    surface: 28,
    rooms: 1,
    bedrooms: 0,
    bathrooms: 1,
    tagline: "Un studio optimisé, proche du centre.",
    description: [
      "Annonce de démonstration : un studio fonctionnel avec cuisine intégrée et pièce principale lumineuse.",
      "Il illustre l'affichage d'un bien sans chambre séparée (« studio ») dans la fiche et les filtres.",
    ],
    features: ["Cuisine intégrée", "Lumineux", "Vue dégagée"],
    images: [
      img("kitchen-open", "Cuisine ouverte et pièce de vie (photographie d'illustration)"),
      img("window-sea", "Fenêtre ouverte sur un balcon et la ville (photographie d'illustration)"),
    ],
  },
];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);

export const formatEuro = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n).replace(/ /g, " ")} €`;
export const formatPrice = (p: Pick<Property, "price" | "transaction">) =>
  p.transaction === "location" ? `${formatEuro(p.price)} / mois` : formatEuro(p.price);

export type Filters = {
  transaction?: string;
  type?: string;
  commune?: string;
  budgetMax?: number;
  rooms?: number;
  surfaceMin?: number;
  sort?: string;
};

export function filterProperties(f: Filters): Property[] {
  const list = properties.filter(
    (p) =>
      (!f.transaction || p.transaction === f.transaction) &&
      (!f.type || p.type === f.type) &&
      (!f.commune || p.commune === f.commune) &&
      (!f.budgetMax || p.price <= f.budgetMax) &&
      (!f.rooms || p.rooms >= f.rooms) &&
      (!f.surfaceMin || p.surface >= f.surfaceMin),
  );
  if (f.sort === "prix-asc") list.sort((a, b) => a.price - b.price);
  if (f.sort === "prix-desc") list.sort((a, b) => b.price - a.price);
  if (f.sort === "surface-desc") list.sort((a, b) => b.surface - a.surface);
  return list;
}

export function similarProperties(p: Property, n = 3): Property[] {
  return properties
    .filter((x) => x.slug !== p.slug && x.transaction === p.transaction)
    .sort((a, b) => {
      const score = (x: Property) => (x.commune === p.commune ? 2 : 0) + (x.type === p.type ? 1 : 0);
      return score(b) - score(a) || Math.abs(a.price - p.price) - Math.abs(b.price - p.price);
    })
    .slice(0, n);
}

export const budgetOptions: Record<Transaction, number[]> = {
  vente: [300000, 500000, 800000, 1200000, 2000000, 3000000],
  location: [700, 1000, 1500, 2000],
};

/* ------------------------------------------------------------------ Expertises (services confirmés par le site public) */

export const expertises = [
  { title: "Transaction immobilière", text: "Vendre ou acheter avec un interlocuteur unique, de l'estimation à la signature.", href: `${b}/vendre` },
  { title: "Location", text: "Appartements, studios et maisons à louer, et accompagnement des propriétaires bailleurs.", href: `${b}/louer` },
  { title: "Gestion immobilière", text: "La gestion locative de votre bien confiée à l'agence, pour louer l'esprit tranquille.", href: `${b}/gestion-immobiliere` },
  { title: "Gestion de copropriétés", text: "Syndic de petites et moyennes copropriétés, avec un suivi de proximité.", href: `${b}/gestion-copropriete` },
  { title: "ASL et ASA", text: "Gestion des associations syndicales libres et autorisées.", href: `${b}/gestion-copropriete#asl-asa` },
  { title: "Location-gérance", text: "Un service cité par l'agence : les modalités sont à préciser directement avec elle.", href: `${b}/gestion-immobiliere#location-gerance` },
];

export const faq = [
  {
    q: "Qui est CAPITAL IMMOBILIER ?",
    a: "CAPITAL IMMOBILIER est une agence immobilière dont l'adresse est 129 avenue du Général-Leclerc à Saint-Raphaël (Var). Elle propose de la vente, de la location, de la gestion locative et du syndic de copropriété.",
  },
  {
    q: "Quelles zones l'agence couvre-t-elle ?",
    a: "Le site public de l'agence évoque Saint-Raphaël, Fréjus, Anthéor et leurs environs, et propose dans sa recherche Bagnols-en-Forêt, Callian, Fayence et Le Cannet.",
  },
  {
    q: "Les biens présentés sur ce site sont-ils réels ?",
    a: "Non. Ce site est un concept de refonte réalisé par NEXWORKS AGENCY : les biens, prix et photographies sont des exemples de démonstration, clairement signalés. Pour les annonces réelles, consultez le site de l'agence ou contactez-la.",
  },
  {
    q: "Comment contacter l'agence ?",
    a: "Par téléphone au 04 94 40 86 44 ou par e-mail à contact@capitalimmobilier.fr. Les formulaires de ce concept ne transmettent aucun message : ils servent à démontrer le parcours.",
  },
];
