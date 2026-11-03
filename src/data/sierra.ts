/**
 * SIERRA IMMOBILIER — proposition de refonte (démonstration NEXWORKS AGENCY).
 * Informations d'entreprise reprises du brief / site public connu.
 * Les biens listés ci-dessous sont des EXEMPLES DE DÉMONSTRATION, pas des annonces commerciales.
 */
const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : "");

export const sierra = {
  name: "SIERRA IMMOBILIER",
  shortName: "SIERRA",
  basePath: "/sierra-immobilier",
  founded: 1973,
  founder: "Georges Sierra",
  location: "Saint-Raphaël",
  region: "Var · Côte d'Azur",
  address: "6 avenue du Commandant Guilbaud",
  postalCode: "83700",
  city: "Saint-Raphaël",
  phone: "04 98 11 04 04",
  phoneHref: "tel:+33498110404",
  officialSite: "https://www.sierra-immo.fr/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=6+avenue+du+Commandant+Guilbaud+83700+Saint-Rapha%C3%ABl",
  memberships: ["FNAIM", "PR'IMMO"] as const,
  promise: "Une histoire de confiance depuis 1973.",
  description:
    "Proposition de refonte digitale pour Sierra Immobilier, agence familiale à Saint-Raphaël depuis 1973. Projet de démonstration réalisé par NEXWORKS AGENCY — non officiel.",
  email: clean(process.env.NEXT_PUBLIC_SIERRA_EMAIL),
  hero: {
    label: "SAINT-RAPHAËL · FRÉJUS · CÔTE D'AZUR",
    titleLine1: "VOTRE HISTOIRE",
    titleLine2: "COMMENCE ICI.",
    sub: "Depuis 1973, nous vous accompagnons dans tous vos projets immobiliers sur la Côte d'Azur.",
    image: "/sierra-immobilier/hero.webp",
  },
  aboutImage: "/sierra-immobilier/about.webp",
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Sierra+Immobilier+Saint-Rapha%C3%ABl",
} as const;

export const sierraNav = [
  { label: "Accueil", href: "/sierra-immobilier" },
  { label: "Nos biens", href: "/sierra-immobilier/biens" },
  { label: "Acheter", href: "/sierra-immobilier/acheter" },
  { label: "Vendre", href: "/sierra-immobilier/vendre" },
  { label: "Louer", href: "/sierra-immobilier/louer" },
  { label: "L'agence", href: "/sierra-immobilier/agence" },
  { label: "Contact", href: "/sierra-immobilier/contact" },
];

export const sierraTeam = [
  { name: "Ludovic Sierra", role: "Responsable de l'agence" },
  { name: "Sandrine Schoenmaekers", role: "Responsable comptabilité et gestion" },
  { name: "Frédérique Guiol", role: "Responsable service gestion" },
  { name: "Mylaine Bichot", role: "Conseillère en immobilier" },
  { name: "Frédéric Maltese", role: "Agent commercial" },
] as const;

export const sierraServices = [
  {
    n: "01",
    slug: "acheter",
    title: "Acheter",
    text: "Trouver un bien correspondant à ses attentes et être accompagné dans son acquisition.",
    href: "/sierra-immobilier/acheter",
    image: "/sierra-immobilier/service-acheter.webp",
  },
  {
    n: "02",
    slug: "vendre",
    title: "Vendre",
    text: "Bénéficier d'un accompagnement personnalisé pour vendre son bien.",
    href: "/sierra-immobilier/vendre",
    image: "/sierra-immobilier/service-vendre.webp",
  },
  {
    n: "03",
    slug: "louer",
    title: "Louer",
    text: "Trouver une location adaptée à son projet.",
    href: "/sierra-immobilier/louer",
    image: "/sierra-immobilier/service-louer.webp",
  },
  {
    n: "04",
    slug: "gerer",
    title: "Gérer",
    text: "Confier la gestion de son patrimoine immobilier à une équipe spécialisée.",
    href: "/sierra-immobilier/gestion-locative",
    image: "/sierra-immobilier/service-gerer.webp",
  },
] as const;

export const sierraSectors = [
  {
    slug: "saint-raphael",
    name: "Saint-Raphaël",
    text: "Vieux port, quartiers résidentiels, plages et un cadre de vie balnéaire recherché.",
    image: "/sierra-immobilier/sector-saint-raphael.webp",
    href: "/sierra-immobilier/secteurs/saint-raphael",
  },
  {
    slug: "frejus",
    name: "Fréjus",
    text: "Patrimoine historique, littoral et quartiers résidentiels au rythme de la Côte d'Azur.",
    image: "/sierra-immobilier/sector-frejus.webp",
    href: "/sierra-immobilier/secteurs/frejus",
  },
  {
    slug: "puget-sur-argens",
    name: "Puget-sur-Argens",
    text: "Environnement résidentiel et proximité des communes du littoral varois.",
    image: "/sierra-immobilier/sector-puget.webp",
    href: "/sierra-immobilier/secteurs/puget-sur-argens",
  },
] as const;

export const sierraFaq = [
  {
    q: "Depuis quand existe Sierra Immobilier ?",
    a: "L'agence a été fondée par Georges Sierra en 1973. Elle accompagne ses clients depuis plus de cinquante ans à Saint-Raphaël.",
  },
  {
    q: "Où se situe l'agence Sierra Immobilier ?",
    a: "L'agence est située au 6 avenue du Commandant Guilbaud, 83700 Saint-Raphaël, face au vieux port.",
  },
  {
    q: "Dans quelles villes intervient Sierra Immobilier ?",
    a: "L'agence intervient notamment à Saint-Raphaël, Fréjus, Puget-sur-Argens et dans les communes environnantes.",
  },
  {
    q: "Quels services immobiliers propose l'agence ?",
    a: "Achat, vente, location, gestion locative, estimation immobilière, ainsi qu'un accompagnement des propriétaires et des acquéreurs.",
  },
  {
    q: "Comment faire estimer son bien ?",
    a: "Vous pouvez formuler une demande d'estimation via le formulaire de cette démonstration, ou contacter l'agence au 04 98 11 04 04. Aucune estimation automatique n'est délivrée ici.",
  },
  {
    q: "Comment confier un bien en gestion locative ?",
    a: "Contactez l'équipe gestion de l'agence pour étudier votre projet. Sur cette démonstration, le formulaire n'envoie aucune donnée.",
  },
  {
    q: "Comment contacter Sierra Immobilier ?",
    a: "Par téléphone au 04 98 11 04 04, ou via le site officiel sierra-immo.fr. Les formulaires de cette proposition de refonte sont en mode démonstration uniquement.",
  },
] as const;

export type PropertyType = "appartement" | "maison" | "villa" | "local";

export type SierraProperty = {
  slug: string;
  title: string;
  city: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  type: PropertyType;
  transaction: "achat" | "location";
  tagline: string;
  features: string[];
  description: string[];
  images: string[];
  /** Toujours true : biens de démonstration uniquement */
  demo: true;
};

const imgs = (slug: string) => [1, 2, 3].map((i) => `/sierra-immobilier/${slug}-${i}.webp`);

/** Biens fictifs pour la démo — ne pas confondre avec le catalogue officiel. */
export const sierraProperties: SierraProperty[] = [
  {
    slug: "appartement-t4-centre-saint-raphael",
    title: "Appartement T4 rénové",
    city: "Saint-Raphaël",
    price: 325000,
    surface: 75,
    rooms: 4,
    bedrooms: 3,
    type: "appartement",
    transaction: "achat",
    tagline: "Exemple de démonstration — T4 lumineux proche centre, terrasse et stationnement.",
    features: ["Terrasse", "Ascenseur", "Cave", "Garage (exemple)"],
    description: [
      "Cet appartement de démonstration illustre une fiche bien premium : volumes clairs, cuisine équipée et pièces de nuit organisées.",
      "Il ne correspond pas à une annonce commercialisée ici. Pour le catalogue réel de Sierra Immobilier, consultez sierra-immo.fr.",
    ],
    images: imgs("appartement-t4-centre-saint-raphael"),
    demo: true,
  },
  {
    slug: "villa-vue-mer-frejus",
    title: "Villa méditerranéenne",
    city: "Fréjus",
    price: 890000,
    surface: 160,
    rooms: 5,
    bedrooms: 4,
    type: "villa",
    transaction: "achat",
    tagline: "Exemple de démonstration — villa, jardin et lumière du Sud.",
    features: ["Jardin", "Piscine (exemple)", "Garage", "Terrasses"],
    description: [
      "Villa de démonstration imaginée pour montrer une présentation photographique immersive et un parcours d'intérêt clair.",
      "Aucun prix ni disponibilité réelle n'est associé à ce contenu.",
    ],
    images: imgs("villa-vue-mer-frejus"),
    demo: true,
  },
  {
    slug: "maison-familiale-puget",
    title: "Maison familiale",
    city: "Puget-sur-Argens",
    price: 520000,
    surface: 130,
    rooms: 5,
    bedrooms: 4,
    type: "maison",
    transaction: "achat",
    tagline: "Exemple de démonstration — maison avec extérieur, proche des axes.",
    features: ["Jardin", "Parking", "Plain-pied partiel", "Buanderie"],
    description: [
      "Maison fictive destinée à illustrer les filtres, la fiche détaillée et les biens similaires.",
      "Pour une recherche réelle, utilisez le catalogue officiel de l'agence.",
    ],
    images: imgs("maison-familiale-puget"),
    demo: true,
  },
  {
    slug: "appartement-location-saint-raphael",
    title: "Appartement T2 meublé",
    city: "Saint-Raphaël",
    price: 950,
    surface: 42,
    rooms: 2,
    bedrooms: 1,
    type: "appartement",
    transaction: "location",
    tagline: "Exemple de démonstration — location saisonnière / annuelle (fictive).",
    features: ["Meublé", "Climatisation", "Proche commerces"],
    description: [
      "Annonce de location fictive pour tester le filtre « Louer » et le parcours de contact.",
      "Aucune location réelle n'est proposée via cette démonstration.",
    ],
    images: imgs("appartement-location-saint-raphael"),
    demo: true,
  },
  {
    slug: "appartement-t3-frejus-plage",
    title: "Appartement T3 proche plage",
    city: "Fréjus",
    price: 389000,
    surface: 68,
    rooms: 3,
    bedrooms: 2,
    type: "appartement",
    transaction: "achat",
    tagline: "Exemple de démonstration — séjour lumineux et balcon.",
    features: ["Balcon", "Résidence avec ascenseur", "Cave"],
    description: [
      "Fiche de démonstration pour un parcours d'achat sur le littoral varois.",
      "Les photographies sont des images d'ambiance libres de droits, non liées à un bien Sierra Immobilier.",
    ],
    images: imgs("appartement-t3-frejus-plage"),
    demo: true,
  },
  {
    slug: "villa-contemporaine-saint-raphael",
    title: "Villa contemporaine",
    city: "Saint-Raphaël",
    price: 1250000,
    surface: 210,
    rooms: 6,
    bedrooms: 5,
    type: "villa",
    transaction: "achat",
    tagline: "Exemple de démonstration — volumes contemporains et horizon.",
    features: ["Vue dégagée", "Piscine", "Domotique (exemple)", "Garage double"],
    description: [
      "Bien fictif haut de gamme pour illustrer le positionnement premium de la proposition de refonte.",
      "Consultez sierra-immo.fr pour les annonces réellement commercialisées.",
    ],
    images: imgs("villa-contemporaine-saint-raphael"),
    demo: true,
  },
];

export const getSierraProperty = (slug: string) => sierraProperties.find((p) => p.slug === slug);

export const propertyTypeLabel: Record<PropertyType, string> = {
  appartement: "Appartement",
  maison: "Maison",
  villa: "Villa",
  local: "Local",
};

export const locations = ["Saint-Raphaël", "Fréjus", "Puget-sur-Argens"] as const;

export const formatPrice = (n: number, transaction: "achat" | "location" = "achat") => {
  const base = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
  return transaction === "location" ? `${base} / mois` : base;
};

export type PropertyFilters = {
  location?: string;
  type?: string;
  budgetMin?: number;
  budgetMax?: number;
  rooms?: number;
  bedrooms?: number;
  transaction?: string;
};

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function filterSierraProperties(f: PropertyFilters): SierraProperty[] {
  return sierraProperties.filter((p) => {
    if (f.location && norm(p.city) !== norm(f.location) && !norm(p.city).includes(norm(f.location))) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.budgetMin && p.price < f.budgetMin) return false;
    if (f.budgetMax && p.price > f.budgetMax) return false;
    if (f.rooms && p.rooms < f.rooms) return false;
    if (f.bedrooms && p.bedrooms < f.bedrooms) return false;
    if (f.transaction && p.transaction !== f.transaction) return false;
    return true;
  });
}

export function sortSierraProperties(
  list: SierraProperty[],
  sort: "price-asc" | "price-desc" | "surface-desc" | "surface-asc" = "price-desc",
) {
  const arr = [...list];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "surface-asc":
      return arr.sort((a, b) => a.surface - b.surface);
    case "surface-desc":
      return arr.sort((a, b) => b.surface - a.surface);
    default:
      return arr;
  }
}
