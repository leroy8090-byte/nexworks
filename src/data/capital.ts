/**
 * CAPITAL IMMOBILIER — concept de refonte réalisé par NEXWORKS AGENCY (démonstration).
 *
 * Coordonnées et services : repris du site public https://www.capitalimmobilier.fr/ (vérifié le 04/11/2026).
 * Biens : ils ne sont plus ici. Ils sont saisis dans le logiciel NEXWORKS ESTATE et lus par src/lib/capital-properties.ts.
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

/* ------------------------------------------------------------------ Biens (saisis dans NEXWORKS ESTATE) */

export type Transaction = "vente" | "location";

/** Mêmes types que le formulaire du logiciel. */
export const propertyTypeLabel: Record<string, string> = {
  appartement: "Appartement",
  maison: "Maison",
  villa: "Villa",
  studio: "Studio",
  terrain: "Terrain",
  "local commercial": "Local commercial",
  immeuble: "Immeuble",
  parking: "Parking",
};

export type Property = {
  slug: string;
  ref: string;
  title: string;
  transaction: Transaction;
  /** En minuscules, pour les filtres ; typeLabel est le libellé affiché. */
  type: string;
  typeLabel: string;
  commune: string;
  /** Adresse exacte : null si l'agence a choisi de ne pas l'afficher sur ce bien. */
  address: string | null;
  /** Prix de vente (€) ou loyer mensuel hors charges (€) */
  price: number | null;
  fees: number | null;
  feesNote: string | null;
  surface: number | null;
  landSurface: number | null;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  description: string[];
  features: string[];
  dpe: string | null;
  ges: string | null;
  images: { src: string; alt: string }[];
  videos: string[];
};

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** La ville est saisie à la main dans le logiciel : « ST RAPHAEL » ou « Saint-Raphaël » désignent la même commune. */
export const isSameCommune = (a: string, b: string) => {
  const key = (s: string) => slugify(s).replace(/^st-/, "saint-");
  return key(a) === key(b);
};

export const formatEuro = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n).replace(/\u202f/g, "\u00a0")}\u00a0€`;
export const formatPrice = (p: Pick<Property, "price" | "transaction">) =>
  p.price == null ? "Prix sur demande" : p.transaction === "location" ? `${formatEuro(p.price)} / mois` : formatEuro(p.price);

/** Seules les informations renseignées dans le logiciel sont affichées. */
export const roomsSummary = (p: Pick<Property, "surface" | "rooms" | "bedrooms">) =>
  [
    p.surface != null && `${p.surface} m²`,
    p.rooms != null && `${p.rooms} ${p.rooms > 1 ? "pièces" : "pièce"}`,
    p.bedrooms != null && p.bedrooms > 0 && `${p.bedrooms} ${p.bedrooms > 1 ? "chambres" : "chambre"}`,
  ]
    .filter(Boolean)
    .join(" · ");

/** Lecteur intégré pour YouTube et Vimeo ; null pour un autre lien, affiché alors comme simple lien. */
export function videoEmbedUrl(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www|m)\./, "");
  if (host === "youtu.be" || host === "youtube.com" || host === "youtube-nocookie.com") {
    const id = host === "youtu.be" ? u.pathname.split("/")[1] : (u.searchParams.get("v") ?? u.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1]);
    return id && /^[\w-]{6,20}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = u.pathname.match(/(\d{6,12})/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }
  return null;
}

export type Filters = {
  transaction?: string;
  type?: string;
  commune?: string;
  budgetMax?: number;
  rooms?: number;
  surfaceMin?: number;
  sort?: string;
};

export function filterProperties(all: Property[], f: Filters): Property[] {
  const list = all.filter(
    (p) =>
      (!f.transaction || p.transaction === f.transaction) &&
      (!f.type || p.type === f.type) &&
      (!f.commune || isSameCommune(p.commune, f.commune)) &&
      (!f.budgetMax || (p.price != null && p.price <= f.budgetMax)) &&
      (!f.rooms || (p.rooms != null && p.rooms >= f.rooms)) &&
      (!f.surfaceMin || (p.surface != null && p.surface >= f.surfaceMin)),
  );
  const price = (p: Property) => p.price ?? 0;
  if (f.sort === "prix-asc") list.sort((a, b) => price(a) - price(b));
  if (f.sort === "prix-desc") list.sort((a, b) => price(b) - price(a));
  if (f.sort === "surface-desc") list.sort((a, b) => (b.surface ?? 0) - (a.surface ?? 0));
  return list;
}

export function similarProperties(p: Property, all: Property[], n = 3): Property[] {
  return all
    .filter((x) => x.ref !== p.ref && x.transaction === p.transaction)
    .sort((a, b) => {
      const score = (x: Property) => (isSameCommune(x.commune, p.commune) ? 2 : 0) + (x.type === p.type ? 1 : 0);
      return score(b) - score(a) || Math.abs((a.price ?? 0) - (p.price ?? 0)) - Math.abs((b.price ?? 0) - (p.price ?? 0));
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
    a: "Non. Ce site est un concept de refonte réalisé par NEXWORKS AGENCY : les annonces affichées sont des biens de test saisis dans le logiciel NEXWORKS ESTATE. Pour les annonces réelles, consultez le site de l'agence ou contactez-la.",
  },
  {
    q: "Comment contacter l'agence ?",
    a: "Par téléphone au 04 94 40 86 44 ou par e-mail à contact@capitalimmobilier.fr. Les formulaires de ce concept arrivent dans le logiciel de test NEXWORKS ESTATE : ils ne sont pas transmis à l'agence.",
  },
];
