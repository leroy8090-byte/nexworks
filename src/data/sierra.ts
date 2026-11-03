/**
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

export const sierraProperties: SierraProperty[] = [
  {
    "slug": "2420-bel-appartement-3-pieces-58-m-terrasse-plein-sud-cave-et-parking",
    "title": "BEL APPARTEMENT 3 PIÈCES – 58 M² – TERRASSE PLEIN SUD – CAVE ET",
    "city": "Saint-Raphaël",
    "price": 238500,
    "surface": 58,
    "rooms": 3,
    "bedrooms": 2,
    "type": "appartement",
    "transaction": "achat",
    "tagline": "Exclusivité Sierra Immobilier",
    "features": [
      "Exclusif",
      "Coup de cœur",
      "58 m²",
      "3 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t3/2420-bel-appartement-3-pieces-58-m-terrasse-plein-sud-cave-et-parking/"
    ],
    "images": [
      "/sierra-immobilier/biens/01-2420-bel-appartement-3-pieces-58-m-terra.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t3/2420-bel-appartement-3-pieces-58-m-terrasse-plein-sud-cave-et-parking/",
    "exclusif": true,
    "coupDeCoeur": true,
    "realListing": true
  },
  {
    "slug": "2418-st-raphael-centre-ville-studio-40m",
    "title": "ST RAPHAEL - Centre ville STUDIO 40m²",
    "city": "Saint-Raphaël",
    "price": 120000,
    "surface": 40,
    "rooms": 1,
    "bedrooms": 0,
    "type": "appartement",
    "transaction": "achat",
    "tagline": "Exclusivité Sierra Immobilier",
    "features": [
      "Exclusif",
      "40 m²",
      "1 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t1/2418-st-raphael-centre-ville-studio-40m/"
    ],
    "images": [
      "/sierra-immobilier/biens/02-2418-st-raphael-centre-ville-studio-40m.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t1/2418-st-raphael-centre-ville-studio-40m/",
    "exclusif": true,
    "coupDeCoeur": false,
    "realListing": true
  },
  {
    "slug": "2417-studio-triangle-d-or-saint-raphael-83700",
    "title": "Studio Triangle d'or Saint-Raphael 83700",
    "city": "Saint-Raphaël",
    "price": 191000,
    "surface": 31,
    "rooms": 1,
    "bedrooms": 0,
    "type": "appartement",
    "transaction": "achat",
    "tagline": "Annonce Sierra Immobilier",
    "features": [
      "31 m²",
      "1 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/vente/83-var/15884-st-raphael/2-appartement/t1/2417-studio-triangle-d-or-saint-raphael-83700/"
    ],
    "images": [
      "/sierra-immobilier/biens/03-2417-studio-triangle-d-or-saint-raphael-.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/vente/83-var/15884-st-raphael/2-appartement/t1/2417-studio-triangle-d-or-saint-raphael-83700/",
    "exclusif": false,
    "coupDeCoeur": false,
    "realListing": true
  },
  {
    "slug": "2413-frejus-exclusivite-t2-30m-renove-au-calme",
    "title": "FRÉJUS – EXCLUSIVITÉ – T2 30m² RÉNOVÉ AU CALME",
    "city": "Fréjus",
    "price": 129900,
    "surface": 30,
    "rooms": 2,
    "bedrooms": 1,
    "type": "appartement",
    "transaction": "achat",
    "tagline": "Annonce Sierra Immobilier",
    "features": [
      "30 m²",
      "2 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/vente/83-var/15885-frejus/2-appartement/t2/2413-frejus-exclusivite-t2-30m-renove-au-calme/"
    ],
    "images": [
      "/sierra-immobilier/biens/04-2413-frejus-exclusivite-t2-30m-renove-au.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/vente/83-var/15885-frejus/2-appartement/t2/2413-frejus-exclusivite-t2-30m-renove-au-calme/",
    "exclusif": false,
    "coupDeCoeur": false,
    "realListing": true
  },
  {
    "slug": "2410-saint-raphael-t2-47m-parking-prive-et-cave",
    "title": "SAINT-RAPHAEL - T2 47m² + Parking privé et cave",
    "city": "Saint-Raphaël",
    "price": 179900,
    "surface": 47,
    "rooms": 2,
    "bedrooms": 1,
    "type": "appartement",
    "transaction": "achat",
    "tagline": "Exclusivité Sierra Immobilier",
    "features": [
      "Exclusif",
      "Coup de cœur",
      "47 m²",
      "2 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t2/2410-saint-raphael-t2-47m-parking-prive-et-cave/"
    ],
    "images": [
      "/sierra-immobilier/biens/05-2410-saint-raphael-t2-47m-parking-prive-.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t2/2410-saint-raphael-t2-47m-parking-prive-et-cave/",
    "exclusif": true,
    "coupDeCoeur": true,
    "realListing": true
  },
  {
    "slug": "2408-saint-raphael-t3-75m-garage-proche-centre-ville",
    "title": "SAINT-RAPHAEL - T3 75m² + GARAGE Proche Centre ville",
    "city": "Saint-Raphaël",
    "price": 290000,
    "surface": 75,
    "rooms": 3,
    "bedrooms": 2,
    "type": "appartement",
    "transaction": "achat",
    "tagline": "Exclusivité Sierra Immobilier",
    "features": [
      "Exclusif",
      "Coup de cœur",
      "75 m²",
      "3 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t3/2408-saint-raphael-t3-75m-garage-proche-centre-ville/"
    ],
    "images": [
      "/sierra-immobilier/biens/06-2408-saint-raphael-t3-75m-garage-proche-.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t3/2408-saint-raphael-t3-75m-garage-proche-centre-ville/",
    "exclusif": true,
    "coupDeCoeur": true,
    "realListing": true
  },
  {
    "slug": "2406-studio-mezzanine-vue-mer-vieux-port",
    "title": "STUDIO MEZZANINE VUE MER - VIEUX PORT",
    "city": "Saint-Raphaël",
    "price": 169000,
    "surface": 35.46,
    "rooms": 1,
    "bedrooms": 0,
    "type": "appartement",
    "transaction": "achat",
    "tagline": "Exclusivité Sierra Immobilier",
    "features": [
      "Exclusif",
      "35.46 m²",
      "1 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t1/2406-studio-mezzanine-vue-mer-vieux-port/"
    ],
    "images": [
      "/sierra-immobilier/biens/07-2406-studio-mezzanine-vue-mer-vieux-port.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t1/2406-studio-mezzanine-vue-mer-vieux-port/",
    "exclusif": true,
    "coupDeCoeur": false,
    "realListing": true
  },
  {
    "slug": "2401-3-pieces-90m-sur-le-vieux-port-de-saint-raphael-83700",
    "title": "3 pièces 90m² sur le vieux port de Saint-Raphaël 83700",
    "city": "Saint-Raphaël",
    "price": 580000,
    "surface": 90,
    "rooms": 3,
    "bedrooms": 2,
    "type": "appartement",
    "transaction": "achat",
    "tagline": "Exclusivité Sierra Immobilier",
    "features": [
      "Exclusif",
      "90 m²",
      "3 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t3/2401-3-pieces-90m-sur-le-vieux-port-de-saint-raphael-83700/"
    ],
    "images": [
      "/sierra-immobilier/biens/08-2401-3-pieces-90m-sur-le-vieux-port-de-s.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t3/2401-3-pieces-90m-sur-le-vieux-port-de-saint-raphael-83700/",
    "exclusif": true,
    "coupDeCoeur": false,
    "realListing": true
  },
  {
    "slug": "2400-st-raphael-centre-ville-t2-54m-garage-et-cave",
    "title": "ST RAPHAEL CENTRE VILLE - T2 54m² + GARAGE ET CAVE",
    "city": "Saint-Raphaël",
    "price": 286000,
    "surface": 54,
    "rooms": 2,
    "bedrooms": 1,
    "type": "appartement",
    "transaction": "achat",
    "tagline": "Exclusivité Sierra Immobilier",
    "features": [
      "Exclusif",
      "54 m²",
      "2 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t2/2400-st-raphael-centre-ville-t2-54m-garage-et-cave/"
    ],
    "images": [
      "/sierra-immobilier/biens/09-2400-st-raphael-centre-ville-t2-54m-gara.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t2/2400-st-raphael-centre-ville-t2-54m-garage-et-cave/",
    "exclusif": true,
    "coupDeCoeur": false,
    "realListing": true
  },
  {
    "slug": "2396-st-raphael-t3-75m-rdjardin-garage",
    "title": "ST RAPHAEL - T3 75m² RDJardin + GARAGE",
    "city": "Saint-Raphaël",
    "price": 499900,
    "surface": 75,
    "rooms": 3,
    "bedrooms": 2,
    "type": "appartement",
    "transaction": "achat",
    "tagline": "Coup de cœur",
    "features": [
      "Coup de cœur",
      "75 m²",
      "3 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t3/2396-st-raphael-t3-75m-rdjardin-garage/"
    ],
    "images": [
      "/sierra-immobilier/biens/10-2396-st-raphael-t3-75m-rdjardin-garage.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/vente/83-var/15906-saint-raphael/2-appartement/t3/2396-st-raphael-t3-75m-rdjardin-garage/",
    "exclusif": false,
    "coupDeCoeur": true,
    "realListing": true
  },
  {
    "slug": "2421-grand-3-pieces-77-13-m",
    "title": "Grand 3 PIECES 77.13 M²",
    "city": "Fréjus",
    "price": 800,
    "surface": 77.13,
    "rooms": 3,
    "bedrooms": 2,
    "type": "appartement",
    "transaction": "location",
    "tagline": "Annonce Sierra Immobilier",
    "features": [
      "77.13 m²",
      "3 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/location/83-var/15885-frejus/2-appartement/t3/2421-grand-3-pieces-77-13-m/"
    ],
    "images": [
      "/sierra-immobilier/biens/11-2421-grand-3-pieces-77-13-m.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/location/83-var/15885-frejus/2-appartement/t3/2421-grand-3-pieces-77-13-m/",
    "exclusif": false,
    "coupDeCoeur": false,
    "realListing": true
  },
  {
    "slug": "2419-3-pieces",
    "title": "3 PIECES",
    "city": "Saint-Raphaël",
    "price": 890,
    "surface": 68.12,
    "rooms": 3,
    "bedrooms": 2,
    "type": "appartement",
    "transaction": "location",
    "tagline": "Annonce Sierra Immobilier",
    "features": [
      "68.12 m²",
      "3 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/location/83-var/15884-st-raphael/2-appartement/t3/2419-3-pieces/"
    ],
    "images": [
      "/sierra-immobilier/biens/12-2419-3-pieces.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/location/83-var/15884-st-raphael/2-appartement/t3/2419-3-pieces/",
    "exclusif": false,
    "coupDeCoeur": false,
    "realListing": true
  },
  {
    "slug": "2414-a-louer-2-pieces-en-centre-ville-de-saint-raphael",
    "title": "A LOUER 2 PIECES EN CENTRE VILLE DE SAINT-RAPHAEL",
    "city": "Saint-Raphaël",
    "price": 730,
    "surface": 42.65,
    "rooms": 2,
    "bedrooms": 1,
    "type": "appartement",
    "transaction": "location",
    "tagline": "Annonce Sierra Immobilier",
    "features": [
      "42.65 m²",
      "2 pièces"
    ],
    "description": [
      "Annonce issue du catalogue public de Sierra Immobilier. Les informations affichées ici sont une sélection pour cette proposition de refonte.",
      "Consultez la fiche complète et les disponibilités sur le site officiel : https://www.sierra-immo.fr/location/83-var/15884-st-raphael/2-appartement/t2/2414-a-louer-2-pieces-en-centre-ville-de-saint-raphael/"
    ],
    "images": [
      "/sierra-immobilier/biens/13-2414-a-louer-2-pieces-en-centre-ville-de.webp"
    ],
    "officialUrl": "https://www.sierra-immo.fr/location/83-var/15884-st-raphael/2-appartement/t2/2414-a-louer-2-pieces-en-centre-ville-de-saint-raphael/",
    "exclusif": false,
    "coupDeCoeur": false,
    "realListing": true
  }
];

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
