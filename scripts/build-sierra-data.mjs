import { readFileSync, writeFileSync } from "node:fs";

const props = JSON.parse(readFileSync("D:/tmp/sierra-props.json", "utf8"));

const file = `/**
 * SIERRA IMMOBILIER — proposition de refonte (NEXWORKS AGENCY).
 * Annonces reprises du catalogue public sierra-immo.fr (sélection).
 * Site non officiel — toujours renvoyer vers la fiche officielle.
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
  officialVentes: "https://www.sierra-immo.fr/vente/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=6+avenue+du+Commandant+Guilbaud+83700+Saint-Rapha%C3%ABl",
  memberships: ["FNAIM", "PR'IMMO"] as const,
  servicesLine: "LOCATION · GESTION · TRANSACTION",
  promise: "Agence familiale face au vieux port, depuis 1973.",
  description:
    "Proposition de refonte digitale pour Sierra Immobilier, agence à Saint-Raphaël depuis 1973. Projet de démonstration NEXWORKS AGENCY — non officiel.",
  email: clean(process.env.NEXT_PUBLIC_SIERRA_EMAIL),
  logo: "/sierra-immobilier/logo.png",
  hero: {
    label: "SAINT-RAPHAËL · DEPUIS 1973",
    titleLine1: "VOTRE HISTOIRE",
    titleLine2: "COMMENCE ICI.",
    sub: "Depuis 1973, Sierra Immobilier accompagne vos projets d'achat, de vente, de location et de gestion sur la Côte d'Azur.",
    image: "/sierra-immobilier/agency-hero.webp",
  },
  aboutImage: "/sierra-immobilier/agency.webp",
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Sierra+Immobilier+Saint-Rapha%C3%ABl",
  brand: {
    navy: "#231F31",
    navy2: "#2D2640",
    gold: "#A68936",
    goldSoft: "#C4A85A",
    ink: "#1A1624",
    mist: "#F4F2F0",
    paper: "#FBFAF8",
    mute: "#7A7684",
  },
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
    text: "Trouver un bien et être accompagné jusqu'à l'acquisition.",
    href: "/sierra-immobilier/acheter",
    image: "/sierra-immobilier/service-acheter.webp",
  },
  {
    n: "02",
    slug: "vendre",
    title: "Vendre",
    text: "Estimer, valoriser et commercialiser votre bien.",
    href: "/sierra-immobilier/vendre",
    image: "/sierra-immobilier/service-vendre.webp",
  },
  {
    n: "03",
    slug: "louer",
    title: "Louer",
    text: "Locations sélectionnées à Saint-Raphaël et alentours.",
    href: "/sierra-immobilier/louer",
    image: "/sierra-immobilier/service-louer.webp",
  },
  {
    n: "04",
    slug: "gerer",
    title: "Gérer",
    text: "Gestion locative confiée à une équipe dédiée.",
    href: "/sierra-immobilier/gestion-locative",
    image: "/sierra-immobilier/service-gerer.webp",
  },
] as const;

export const sierraSectors = [
  {
    slug: "saint-raphael",
    name: "Saint-Raphaël",
    text: "Vieux port, centre-ville et quartiers résidentiels.",
    image: "/sierra-immobilier/sector-saint-raphael.webp",
    href: "/sierra-immobilier/secteurs/saint-raphael",
  },
  {
    slug: "frejus",
    name: "Fréjus",
    text: "Patrimoine, littoral et secteurs résidentiels.",
    image: "/sierra-immobilier/sector-frejus.webp",
    href: "/sierra-immobilier/secteurs/frejus",
  },
  {
    slug: "puget-sur-argens",
    name: "Puget-sur-Argens",
    text: "Cadre résidentiel proche du littoral varois.",
    image: "/sierra-immobilier/sector-puget.webp",
    href: "/sierra-immobilier/secteurs/puget-sur-argens",
  },
] as const;

export const sierraFaq = [
  {
    q: "Depuis quand existe Sierra Immobilier ?",
    a: "L'agence a été fondée par Georges Sierra en 1973 à Saint-Raphaël.",
  },
  {
    q: "Où se situe l'agence ?",
    a: "6 avenue du Commandant Guilbaud, 83700 Saint-Raphaël, face au vieux port.",
  },
  {
    q: "Dans quelles villes intervient l'agence ?",
    a: "Saint-Raphaël, Fréjus, Puget-sur-Argens et communes environnantes.",
  },
  {
    q: "Quels services propose Sierra Immobilier ?",
    a: "Location, gestion et transaction : achat, vente, location, gestion locative et estimation.",
  },
  {
    q: "Comment voir les annonces à jour ?",
    a: "Cette proposition affiche une sélection du catalogue public. Le catalogue complet et à jour reste sur sierra-immo.fr.",
  },
  {
    q: "Comment contacter l'agence ?",
    a: "Au 04 98 11 04 04, ou via le site officiel sierra-immo.fr.",
  },
] as const;

export type PropertyType = "appartement" | "maison" | "villa" | "terrain";

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
  officialUrl: string;
  exclusif?: boolean;
  coupDeCoeur?: boolean;
  realListing: true;
};

export const sierraProperties: SierraProperty[] = ${JSON.stringify(props, null, 2).replace(/"type": "appartement"/g, '"type": "appartement"')
  .replace(/"transaction": "achat"/g, '"transaction": "achat"')
  .replace(/"transaction": "location"/g, '"transaction": "location"')
  .replace(/"realListing": true/g, '"realListing": true')};

export const getSierraProperty = (slug: string) => sierraProperties.find((p) => p.slug === slug);

export const propertyTypeLabel: Record<PropertyType, string> = {
  appartement: "Appartement",
  maison: "Maison",
  villa: "Villa",
  terrain: "Terrain",
};

export const locations = ["Saint-Raphaël", "Fréjus", "Puget-sur-Argens"] as const;

export const formatPrice = (n: number, transaction: "achat" | "location" = "achat") => {
  const base = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
  return transaction === "location" ? \`\${base} / mois\` : base;
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

const norm = (s: string) => s.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase().trim();

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
`;

writeFileSync("src/data/sierra.ts", file);
console.log("wrote sierra.ts with", props.length, "properties");
