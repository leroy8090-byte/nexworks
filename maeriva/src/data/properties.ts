/**
 * Biens fictifs, pour la démonstration. Les photographies sont libres de droits et ne montrent pas ces biens :
 * elles illustrent le type de maison décrit. Les prix sont plausibles mais inventés.
 */
export type Transaction = "vente" | "location";
export type PropertyType = "Villa" | "Bastide" | "Maison de village" | "Programme neuf";

export type Property = {
  slug: string; ref: string; name: string; type: PropertyType; transaction: Transaction;
  city: string; sector: string; destination: "saint-tropez" | "sainte-maxime" | "saint-raphael";
  price: number | null; priceNote?: string;
  surface: number; land?: number; bedrooms: number; bathrooms: number;
  seaView: boolean; pool: boolean; dpe?: string; ges?: string;
  headline: string; description: string[]; features: string[];
  images: { src: string; alt: string }[];
  featured?: boolean; render?: boolean;
};

export const properties: Property[] = [
  {
    slug: "villa-horizon-saint-tropez", ref: "MV-1042", name: "Villa Horizon", type: "Villa", transaction: "vente",
    city: "Saint-Tropez", sector: "Les Salins", destination: "saint-tropez",
    price: 14900000, surface: 420, land: 4200, bedrooms: 6, bathrooms: 6, seaView: true, pool: true, dpe: "B", ges: "A",
    headline: "Une architecture contemporaine posée face à la mer.",
    description: [
      "Sur les hauteurs des Salins, la villa s'ouvre entièrement vers la Méditerranée. Les volumes blancs, les grandes baies et les terrasses en cascade laissent la lumière traverser la maison du matin au soir.",
      "Le séjour de plain-pied donne sur une piscine à débordement qui prolonge l'horizon. Six suites, dont une suite parentale avec terrasse privée, un pool house et un jardin méditerranéen complètent la propriété.",
    ],
    features: ["Piscine à débordement chauffée", "Six suites avec salle de bains", "Pool house et cuisine d'été", "Domotique et climatisation", "Garage pour trois voitures", "Jardin méditerranéen arrosé"],
    images: [
      { src: "/photos/villa-moderne.webp", alt: "Villa contemporaine blanche sur une colline face à la mer" },
      { src: "/photos/piscine-mer.webp", alt: "Piscine à débordement ouverte sur la mer" },
      { src: "/photos/sejour-vue.webp", alt: "Séjour vitré ouvert sur le paysage" },
      { src: "/photos/chambre.webp", alt: "Suite parentale lumineuse" },
      { src: "/photos/salle-de-bain.webp", alt: "Salle de bains avec double vasque" },
    ],
    featured: true,
  },
  {
    slug: "bastide-des-vignes-ramatuelle", ref: "MV-1037", name: "Bastide des Vignes", type: "Bastide", transaction: "vente",
    city: "Ramatuelle", sector: "Au cœur des vignobles", destination: "saint-tropez",
    price: 8400000, surface: 380, land: 21000, bedrooms: 5, bathrooms: 5, seaView: false, pool: true, dpe: "C", ges: "B",
    headline: "Une bastide en pierre, entourée de ses vignes.",
    description: [
      "À quelques minutes des plages de Pampelonne, la bastide se dresse au milieu de deux hectares de vignes et d'oliviers. Les murs en pierre, les volets clairs et la cour ombragée racontent la Provence d'autrefois.",
      "L'intérieur a été entièrement repensé : une cuisine ouverte sur la terrasse, de grandes pièces de réception et cinq chambres, chacune avec sa salle de bains.",
    ],
    features: ["Deux hectares de vignes et d'oliviers", "Cour intérieure ombragée", "Piscine entourée de lavandes", "Cuisine ouverte sur la terrasse", "Maison de gardien", "Puits et arrosage automatique"],
    images: [
      { src: "/photos/bastide-vignes.webp", alt: "Bastide en pierre au milieu des vignes" },
      { src: "/photos/vignes.webp", alt: "Rangs de vignes sur les collines" },
      { src: "/photos/mas-cour.webp", alt: "Cour intérieure d'un mas provençal" },
      { src: "/photos/cuisine.webp", alt: "Cuisine ouverte sur la salle à manger" },
    ],
    featured: true,
  },
  {
    slug: "villa-blanche-gassin", ref: "MV-1029", name: "Villa Blanche", type: "Villa", transaction: "vente",
    city: "Gassin", sector: "Proche du village", destination: "saint-tropez",
    price: 6900000, surface: 310, land: 3000, bedrooms: 5, bathrooms: 4, seaView: true, pool: true, dpe: "C", ges: "A",
    headline: "Des arcades blanches sous les bougainvilliers.",
    description: [
      "Inspirée des maisons méditerranéennes, la villa déroule ses arcades blanches autour d'un patio fleuri. Depuis les terrasses, la vue file vers le golfe et les toits de Saint-Tropez.",
      "Le séjour cathédrale, la cuisine ouverte et les cinq chambres ont été pensés pour recevoir. Le jardin en restanques descend doucement vers la piscine.",
    ],
    features: ["Arcades et patio fleuri", "Vue sur le golfe", "Séjour sous plafond cathédrale", "Jardin en restanques", "Piscine et solarium", "Proche du village de Gassin"],
    images: [
      { src: "/photos/villa-blanche.webp", alt: "Villa blanche à arcades avec bougainvilliers" },
      { src: "/photos/piscine-jardin.webp", alt: "Piscine entourée d'un jardin méditerranéen" },
      { src: "/photos/salon-cuisine.webp", alt: "Grand séjour contemporain ouvert sur la cuisine" },
      { src: "/photos/baignoire.webp", alt: "Salle de bains avec baignoire îlot" },
    ],
    featured: true,
  },
  {
    slug: "villa-du-golfe-sainte-maxime", ref: "MV-1051", name: "Villa du Golfe", type: "Villa", transaction: "vente",
    city: "Sainte-Maxime", sector: "Les hauteurs", destination: "sainte-maxime",
    price: 4750000, surface: 290, land: 2500, bedrooms: 5, bathrooms: 4, seaView: true, pool: true, dpe: "B", ges: "A",
    headline: "Saint-Tropez en face, depuis chaque pièce.",
    description: [
      "Sur les hauteurs de Sainte-Maxime, la villa offre une vue panoramique sur le golfe et la presqu'île de Saint-Tropez. La piscine à débordement semble se fondre dans la mer.",
      "Les pièces de vie s'ouvrent largement sur les terrasses. Cinq chambres, dont deux suites avec vue mer, et un appartement indépendant pour les invités.",
    ],
    features: ["Vue panoramique sur le golfe", "Piscine à débordement", "Appartement d'invités indépendant", "Grandes terrasses", "Exposition sud", "À quelques minutes des plages"],
    images: [
      { src: "/photos/piscine-debordement.webp", alt: "Piscine à débordement face à la mer et aux îles" },
      { src: "/photos/sainte-maxime-baie.webp", alt: "Vue sur le golfe de Saint-Tropez depuis Sainte-Maxime" },
      { src: "/photos/sejour-jardin.webp", alt: "Séjour ouvert sur le jardin par de grandes baies" },
      { src: "/photos/fenetre-mer.webp", alt: "Grande baie vitrée sur la mer au coucher du soleil" },
    ],
    featured: true,
  },
  {
    slug: "maison-de-la-ponche-saint-tropez", ref: "MV-1018", name: "Maison de la Ponche", type: "Maison de village", transaction: "vente",
    city: "Saint-Tropez", sector: "La Ponche", destination: "saint-tropez",
    price: 3900000, surface: 160, bedrooms: 4, bathrooms: 3, seaView: true, pool: false, dpe: "D", ges: "B",
    headline: "Au cœur du vieux Saint-Tropez, à deux pas de la mer.",
    description: [
      "Dans le quartier historique de la Ponche, cette maison de village a conservé ses murs anciens, ses tomettes et ses volets peints. Le toit-terrasse offre une vue rare sur la mer et les toits du village.",
      "Quatre chambres réparties sur trois niveaux, une cuisine ouverte et un salon voûté : tout se fait à pied, du port à la plage de la Ponche.",
    ],
    features: ["Toit-terrasse avec vue mer", "Murs anciens et tomettes", "Salon voûté", "Tout à pied : port, plage, place des Lices", "Rénovation récente", "Rare sur le marché"],
    images: [
      { src: "/photos/ruelle.webp", alt: "Ruelle pavée aux façades ocre du vieux Saint-Tropez" },
      { src: "/photos/ponche.webp", alt: "Les maisons de la Ponche au bord de l'eau" },
      { src: "/photos/toits.webp", alt: "Les toits de Saint-Tropez et le clocher" },
    ],
    featured: true,
  },
  {
    slug: "bastide-de-la-glycine-grimaud", ref: "MV-1024", name: "Bastide de la Glycine", type: "Bastide", transaction: "vente",
    city: "Grimaud", sector: "Les collines", destination: "saint-tropez",
    price: 5200000, surface: 340, land: 9000, bedrooms: 6, bathrooms: 5, seaView: true, pool: true, dpe: "C", ges: "B",
    headline: "Une bastide sous la glycine, la mer au loin.",
    description: [
      "Sur les collines de Grimaud, la bastide se cache derrière une allée de platanes. Sa façade disparaît au printemps sous la glycine, et le parc descend vers une piscine entourée de pelouse.",
      "Six chambres, une bibliothèque, une grande cuisine de famille et des terrasses tournées vers le golfe : une maison pour vivre plusieurs générations ensemble.",
    ],
    features: ["Parc arboré de près d'un hectare", "Façade couverte de glycine", "Vue lointaine sur le golfe", "Bibliothèque et bureau", "Piscine et pool house", "Allée de platanes"],
    images: [
      { src: "/photos/bastide-glycine.webp", alt: "Façade de bastide couverte de glycine" },
      { src: "/photos/piscine-pelouse.webp", alt: "Piscine bordée de pelouse et de palmiers" },
      { src: "/photos/golfe-grimaud.webp", alt: "Vue sur le golfe depuis les collines de Grimaud" },
    ],
  },
  {
    slug: "villa-pampelonne-ramatuelle", ref: "MV-2007", name: "Villa Pampelonne", type: "Villa", transaction: "location",
    city: "Ramatuelle", sector: "Proche des plages", destination: "saint-tropez",
    price: 45000, priceNote: "par semaine, à partir de", surface: 350, land: 5000, bedrooms: 7, bathrooms: 7, seaView: false, pool: true,
    headline: "L'été à quelques minutes de Pampelonne.",
    description: [
      "Sous les pins parasols, la villa accueille jusqu'à quatorze personnes dans sept suites. La piscine, le jardin et les terrasses ombragées invitent à vivre dehors du matin au soir.",
      "Ménage quotidien, chef sur demande, accueil à l'arrivée : le séjour est préparé en amont, pour profiter de chaque jour.",
    ],
    features: ["Sept suites, quatorze personnes", "Piscine chauffée", "Pins parasols et jardin", "Ménage quotidien inclus", "Chef et chauffeur sur demande", "À quelques minutes des plages"],
    images: [
      { src: "/photos/maison-pins.webp", alt: "Villa provençale sous les pins parasols" },
      { src: "/photos/piscine-palmiers.webp", alt: "Piscine à débordement bordée de palmiers face à la mer" },
      { src: "/photos/ponton.webp", alt: "Ponton en bois au-dessus d'une eau turquoise" },
      { src: "/photos/pampelonne-baie.webp", alt: "La baie de Pampelonne vue des collines" },
    ],
    featured: true,
  },
  {
    slug: "villa-esterel-saint-raphael", ref: "MV-2011", name: "Villa Estérel", type: "Villa", transaction: "location",
    city: "Saint-Raphaël", sector: "Boulouris", destination: "saint-raphael",
    price: 18000, priceNote: "par semaine, à partir de", surface: 240, land: 1800, bedrooms: 5, bathrooms: 4, seaView: true, pool: true,
    headline: "Les pieds dans l'eau, face aux roches rouges.",
    description: [
      "À Boulouris, la villa domine la mer avec, au loin, les roches rouges de l'Estérel. Une piscine en pierre, des terrasses en bord de mer et un accès direct aux criques.",
      "Cinq chambres lumineuses, un séjour ouvert sur la terrasse : une maison simple et élégante, pensée pour l'été.",
    ],
    features: ["Vue mer et Estérel", "Piscine en pierre", "Accès aux criques", "Cinq chambres", "Climatisation", "Gare TGV à proximité"],
    images: [
      { src: "/photos/piscine-pierre.webp", alt: "Piscine en pierre ouverte sur la mer" },
      { src: "/photos/terrasse-mer.webp", alt: "Terrasse ombragée face à la mer" },
      { src: "/photos/esterel.webp", alt: "Les roches rouges de l'Estérel plongeant dans la mer" },
      { src: "/photos/saint-raphael-port.webp", alt: "Le port de Saint-Raphaël" },
    ],
  },
  {
    slug: "les-terrasses-du-golfe-sainte-maxime", ref: "MV-3002", name: "Les Terrasses du Golfe", type: "Programme neuf", transaction: "vente",
    city: "Sainte-Maxime", sector: "Vue sur le golfe", destination: "sainte-maxime",
    price: null, priceNote: "Prix sur demande", surface: 260, land: 1500, bedrooms: 4, bathrooms: 4, seaView: true, pool: true,
    headline: "Quatre villas contemporaines, en cours de conception.",
    description: [
      "Un programme confidentiel de quatre villas contemporaines, chacune avec sa piscine et son jardin, orientées vers le golfe de Saint-Tropez.",
      "Les plans peuvent encore être adaptés. Le calendrier, les prix et les prestations détaillées sont communiqués sur rendez-vous.",
    ],
    features: ["Quatre villas seulement", "Piscine privée pour chaque villa", "Plans personnalisables", "Normes énergétiques récentes", "Vue sur le golfe", "Calendrier sur rendez-vous"],
    images: [
      { src: "/photos/perspective.webp", alt: "Perspective 3D d'une villa contemporaine (visuel d'architecte)" },
      { src: "/photos/sainte-maxime-golfe.webp", alt: "Les hauteurs de Sainte-Maxime face à la mer" },
    ],
    render: true,
  },
];

export const propertyBySlug = (slug: string) => properties.find((p) => p.slug === slug);
export const featured = properties.filter((p) => p.featured);

const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
export const formatPrice = (p: Property) => (p.price === null ? p.priceNote ?? "Prix sur demande" : euro.format(p.price));
export const priceLabel = (p: Property) => (p.price === null ? "Prix sur demande" : p.transaction === "location" ? `${euro.format(p.price)} / semaine` : euro.format(p.price));

/** Biens jamais publiés : seule une silhouette est montrée, l'accès se fait sur demande. */
export const privateCollection = [
  { label: "Villa contemporaine", place: "Saint-Tropez", detail: "8 chambres · vue mer", image: "/photos/piscine-mer.webp" },
  { label: "Domaine viticole", place: "Presqu'île de Saint-Tropez", detail: "Vignes · bastide", image: "/photos/vignes.webp" },
  { label: "Propriété pieds dans l'eau", place: "Sainte-Maxime", detail: "Accès direct à la mer", image: "/photos/sainte-maxime-cote.webp" },
];
