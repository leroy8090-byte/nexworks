/**
 * MAISON RIVIERA — agence immobilière FICTIVE (démonstration NEXWORKS AGENCY).
 * Aucun bien, prix, avis, chiffre ou coordonnée n'est réel.
 */
const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : "");

export const riviera = {
  name: "MAISON RIVIERA",
  basePath: "/maison-riviera",
  location: "Saint-Raphaël",
  region: "Côte d'Azur",
  promise: "Trouvez le lieu qui vous ressemble.",
  description:
    "MAISON RIVIERA, agence immobilière de prestige fictive à Saint-Raphaël, Côte d'Azur. Site de démonstration réalisé par NEXWORKS AGENCY.",
  phone: clean(process.env.NEXT_PUBLIC_RIVIERA_PHONE),
  email: clean(process.env.NEXT_PUBLIC_RIVIERA_EMAIL),
  hero: {
    label: "IMMOBILIER DE PRESTIGE · CÔTE D'AZUR",
    title: "L'exception a une adresse.",
    sub: "Découvrez une sélection de propriétés singulières au cœur de la Riviera française.",
    cities: "Saint-Raphaël · Cannes · Saint-Tropez",
    image: "/maison-riviera/hero.webp",
  },
  aboutImage: "/maison-riviera/about.webp",
} as const;

export const rivieraNav = [
  { label: "Accueil", href: "/maison-riviera" },
  { label: "Acheter", href: "/maison-riviera/acheter" },
  { label: "Vendre", href: "/maison-riviera/vendre" },
  { label: "Nos propriétés", href: "/maison-riviera/proprietes" },
  { label: "L'agence", href: "/maison-riviera/agence" },
  { label: "Contact", href: "/maison-riviera/contact" },
];

export type PropertyType = "villa" | "maison" | "appartement";

export type Property = {
  slug: string;
  title: string;
  city: string;
  price: number;
  surface: number;
  bedrooms: number;
  bathrooms: number;
  type: PropertyType;
  transaction: "achat" | "location";
  tagline: string;
  features: string[];
  description: string[];
  images: string[];
};

const imgs = (slug: string) => [1, 2, 3, 4].map((i) => `/maison-riviera/${slug}-${i}.webp`);

export const properties: Property[] = [
  {
    slug: "villa-contemporaine-saint-raphael",
    title: "Villa contemporaine",
    city: "Saint-Raphaël",
    price: 1850000,
    surface: 220,
    bedrooms: 5,
    bathrooms: 4,
    type: "villa",
    transaction: "achat",
    tagline: "Lignes pures, piscine à débordement et horizon sur la Méditerranée.",
    features: ["Piscine à débordement", "Vue mer", "Terrasse panoramique", "Jardin paysager"],
    description: [
      "Posée sur les hauteurs de Saint-Raphaël, cette villa contemporaine déploie ses volumes lumineux face à la mer. De grandes baies coulissantes effacent la frontière entre le séjour et la terrasse panoramique.",
      "Le jardin paysager, planté d'essences méditerranéennes, accompagne une piscine à débordement dont la ligne rejoint l'horizon. Cinq chambres, chacune pensée comme une suite, offrent calme et intimité.",
    ],
    images: imgs("villa-contemporaine-saint-raphael"),
  },
  {
    slug: "maison-provencale-sainte-maxime",
    title: "Maison provençale",
    city: "Sainte-Maxime",
    price: 1250000,
    surface: 185,
    bedrooms: 4,
    bathrooms: 3,
    type: "maison",
    transaction: "achat",
    tagline: "Pierre claire, volets lavande et jardin d'oliviers.",
    features: ["Pierres apparentes", "Jardin d'oliviers", "Cuisine d'été", "Piscine chauffée"],
    description: [
      "À quelques minutes du golfe de Saint-Tropez, cette maison de caractère marie le charme provençal et le confort actuel. Les pierres apparentes, les tomettes et les poutres anciennes composent une atmosphère chaleureuse.",
      "Autour de la maison, un jardin d'oliviers abrite une cuisine d'été et une piscine, idéales pour prolonger les repas jusqu'au soir.",
    ],
    images: imgs("maison-provencale-sainte-maxime"),
  },
  {
    slug: "appartement-vue-mer-cannes",
    title: "Appartement vue mer",
    city: "Cannes",
    price: 890000,
    surface: 95,
    bedrooms: 3,
    bathrooms: 2,
    type: "appartement",
    transaction: "achat",
    tagline: "Un balcon ouvert sur la baie, à deux pas de la Croisette.",
    features: ["Vue mer", "Balcon-terrasse", "Résidence sécurisée", "Parking privatif"],
    description: [
      "Au dernier étage d'une résidence élégante, cet appartement traversant s'ouvre sur la baie de Cannes. Le séjour baigné de lumière prolonge sa vue sur un balcon-terrasse aménagé.",
      "Trois chambres, deux salles d'eau et des finitions soignées en font une adresse aussi agréable à l'année qu'en résidence secondaire.",
    ],
    images: imgs("appartement-vue-mer-cannes"),
  },
  {
    slug: "propriete-exception-issambres",
    title: "Propriété d'exception",
    city: "Les Issambres",
    price: 3400000,
    surface: 310,
    bedrooms: 6,
    bathrooms: 5,
    type: "villa",
    transaction: "achat",
    tagline: "Un domaine intime, en position dominante sur la côte.",
    features: ["Vue mer panoramique", "Piscine et pool house", "Accès privé à la mer", "Domaine arboré"],
    description: [
      "Nichée dans un écrin de verdure aux Issambres, cette propriété d'exception réunit une villa principale et un pool house au cœur d'un domaine arboré. Chaque pièce de réception s'ouvre sur la mer.",
      "Six chambres en suite, de vastes terrasses et un accès privé à la mer composent un lieu rare, pensé pour recevoir comme pour se retirer.",
    ],
    images: imgs("propriete-exception-issambres"),
  },
  {
    slug: "villa-mediterraneenne-frejus",
    title: "Villa méditerranéenne",
    city: "Fréjus",
    price: 1490000,
    surface: 200,
    bedrooms: 4,
    bathrooms: 3,
    type: "villa",
    transaction: "achat",
    tagline: "Patios ombragés, enduits chaux et lumière du Sud.",
    features: ["Patio ombragé", "Piscine", "Jardin méditerranéen", "Garage double"],
    description: [
      "Au calme d'un quartier résidentiel de Fréjus, cette villa aux enduits clairs s'organise autour d'un patio ombragé. Les volumes généreux et les matières naturelles invitent à la détente.",
      "Le jardin méditerranéen, la piscine et un double garage complètent une propriété équilibrée, proche des plages et du centre.",
    ],
    images: imgs("villa-mediterraneenne-frejus"),
  },
  {
    slug: "appartement-prestige-saint-tropez",
    title: "Appartement de prestige",
    city: "Saint-Tropez",
    price: 1150000,
    surface: 88,
    bedrooms: 2,
    bathrooms: 2,
    type: "appartement",
    transaction: "achat",
    tagline: "Un refuge raffiné à quelques pas du port.",
    features: ["Proche du port", "Terrasse ensoleillée", "Rénovation haut de gamme", "Climatisation"],
    description: [
      "Au cœur de Saint-Tropez, cet appartement entièrement rénové conjugue matériaux nobles et esprit balnéaire. La terrasse ensoleillée prolonge un séjour lumineux et feutré.",
      "Deux chambres, deux salles d'eau et une situation à pied du port : un pied-à-terre élégant dans le village.",
    ],
    images: imgs("appartement-prestige-saint-tropez"),
  },
];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);

export const propertyTypeLabel: Record<PropertyType, string> = {
  villa: "Villa",
  maison: "Maison",
  appartement: "Appartement",
};

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export type PropertyFilters = {
  location?: string;
  type?: string;
  budgetMin?: number;
  budgetMax?: number;
  bedrooms?: number;
  surfaceMin?: number;
  transaction?: string;
};

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function filterProperties(f: PropertyFilters): Property[] {
  return properties.filter((p) => {
    if (f.location && norm(p.city) !== norm(f.location) && !norm(p.city).includes(norm(f.location))) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.budgetMin && p.price < f.budgetMin) return false;
    if (f.budgetMax && p.price > f.budgetMax) return false;
    if (f.bedrooms && p.bedrooms < f.bedrooms) return false;
    if (f.surfaceMin && p.surface < f.surfaceMin) return false;
    if (f.transaction && p.transaction !== f.transaction) return false;
    return true;
  });
}

export const locations = Array.from(new Set(properties.map((p) => p.city))).sort((a, b) => a.localeCompare(b, "fr"));

export const destinations = [
  { slug: "saint-raphael", name: "Saint-Raphaël", text: "Criques rouges de l'Estérel, port et art de vivre balnéaire.", image: "/maison-riviera/dest-saint-raphael.webp" },
  { slug: "cannes", name: "Cannes", text: "L'élégance de la baie et la lumière de la Croisette.", image: "/maison-riviera/dest-cannes.webp" },
  { slug: "saint-tropez", name: "Saint-Tropez", text: "Un village de caractère entre port, ruelles et plages.", image: "/maison-riviera/dest-saint-tropez.webp" },
  { slug: "sainte-maxime", name: "Sainte-Maxime", text: "Face au golfe, une douceur de vivre à l'année.", image: "/maison-riviera/dest-sainte-maxime.webp" },
  { slug: "frejus", name: "Fréjus", text: "Patrimoine, plages et vastes jardins méditerranéens.", image: "/maison-riviera/dest-frejus.webp" },
  { slug: "les-issambres", name: "Les Issambres", text: "Un littoral préservé, entre pins parasols et eaux claires.", image: "/maison-riviera/dest-issambres.webp" },
];

export const faq = [
  {
    q: "Ce site présente-t-il de vrais biens ?",
    a: "Non. MAISON RIVIERA est une agence fictive et les biens, prix et descriptions sont imaginés pour une démonstration du savoir-faire de NEXWORKS AGENCY.",
  },
  {
    q: "Comment organiser une visite ?",
    a: "Depuis la fiche d'un bien, le bouton de visite mène au formulaire de contact pré-rempli. Dans cette démonstration, aucune demande n'est transmise.",
  },
  {
    q: "Accompagnez-vous la vente d'un bien ?",
    a: "Oui, dans l'univers du concept : estimation, mise en valeur, présentation aux acquéreurs et accompagnement jusqu'à la signature. Voir la page Vendre.",
  },
  {
    q: "Mes données sont-elles conservées ?",
    a: "Les formulaires sont uniquement des démonstrations : rien n'est envoyé ni enregistré.",
  },
  {
    q: "Peut-on s'inspirer de ce site pour mon agence ?",
    a: "C'est précisément l'objet de la démonstration. NEXWORKS AGENCY conçoit des sites sur mesure pour les professionnels de l'immobilier.",
  },
];

export const sellSteps = [
  { title: "Premier échange", text: "Nous écoutons votre projet, vos contraintes et le calendrier qui vous convient." },
  { title: "Estimation argumentée", text: "Une analyse du bien et de son marché local, expliquée avec clarté et sans engagement." },
  { title: "Mise en valeur", text: "Photographies soignées, texte juste et présentation à la hauteur de votre propriété." },
  { title: "Rencontre des acquéreurs", text: "Des visites organisées avec discrétion, auprès de profils en adéquation avec le bien." },
  { title: "Accompagnement jusqu'à la signature", text: "Suivi des offres, du dossier et des échanges jusqu'à l'acte authentique." },
];

export const buyPoints = [
  { title: "Une sélection, pas un catalogue", text: "Peu de biens, choisis pour leur singularité, leur situation et leur état." },
  { title: "Une écoute du mode de vie", text: "Nous partons de votre quotidien pour trouver le lieu qui vous ressemble." },
  { title: "Un accompagnement transparent", text: "Informations claires sur le bien, le quartier et les étapes d'acquisition." },
  { title: "Une visite à votre rythme", text: "Visites programmées selon vos disponibilités, sans pression." },
];
