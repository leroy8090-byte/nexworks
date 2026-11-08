/**
 * Données du site dans la langue demandée. Le français reste dans site.ts et properties.ts ;
 * ce fichier ajoute l'anglais et rend, pour chaque langue, des objets prêts à afficher.
 */
import type { Lang } from "@/i18n/config";
import { privateCollection as privateFr, properties as propertiesFr, type Property } from "./properties";
import { agency as agencyFr, destinations as destinationsFr, lifestyle as lifestyleFr, nav as navFr, services as servicesFr, values as valuesFr, type Destination } from "./site";

/* ─────────────── L'agence et la navigation ─────────────── */

export const agencyFor = (lang: Lang) => lang === "fr" ? agencyFr : {
  ...agencyFr,
  baseline: "Exceptional real estate on the Gulf of Saint-Tropez",
  description: "MAÉRIVA, luxury real estate agency: villas, bastides and exceptional homes in Saint-Tropez, Ramatuelle, Gassin, Sainte-Maxime and Saint-Raphaël. Sales, seasonal rentals and tailored guidance.",
  hours: "Monday to Saturday, by appointment",
};

const NAV_EN: Record<string, string> = { "/proprietes": "Properties", "/destinations": "Destinations", "/vendre": "Sell", "/collection-privee": "Private collection", "/agence": "The agency", "/contact": "Contact" };
export const navFor = (lang: Lang) => navFr.map((n) => ({ ...n, label: lang === "fr" ? n.label : NAV_EN[n.href] ?? n.label }));

/* ─────────────── Les destinations ─────────────── */

type DestText = Pick<Destination, "kicker" | "title" | "lead" | "alt" | "alt2" | "alt3" | "intro" | "highlights" | "access" | "living">;
const DEST_EN: Record<string, DestText> = {
  "saint-tropez": {
    kicker: "The peninsula",
    title: "Saint-Tropez, the village that became a legend.",
    lead: "A harbour, a citadel, cobbled lanes lined with ochre façades, and all around, the peninsula: Ramatuelle, Gassin, the vineyards and the beaches of Pampelonne.",
    alt: "Aerial view of the old harbour of Saint-Tropez and its bell tower",
    alt2: "Aerial view of La Ponche beach in Saint-Tropez",
    alt3: "Pétanque players under the plane trees of Place des Lices",
    intro: [
      "Once a fishing village, Saint-Tropez has kept its human scale: the old harbour, the La Ponche quarter, the lanes climbing towards the 17th-century citadel. Painters made it famous long before its beaches, and the Musée de l'Annonciade still bears witness to it.",
      "Around the village, the peninsula changes character: wooded hills, the wine estates of Ramatuelle, the hilltop village of Gassin, and the long bay of Pampelonne, in the commune of Ramatuelle.",
    ],
    highlights: [
      { t: "Place des Lices", d: "A Provençal market on Tuesday and Saturday mornings, pétanque games under the plane trees." },
      { t: "The citadel", d: "It overlooks the gulf and houses a museum of maritime history." },
      { t: "Pampelonne", d: "Several kilometres of east-facing sand, in the commune of Ramatuelle." },
      { t: "The hilltop villages", d: "Gassin and Ramatuelle, their lanes, their views over the sea and the vineyards." },
    ],
    access: ["Gulf of Saint-Tropez airport at La Môle, for business aviation", "Toulon-Hyères and Nice Côte d'Azur airports", "Sea shuttles to Sainte-Maxime"],
    living: "Villas in the hills, bastides among the vineyards, village houses a few steps from the harbour: the peninsula offers very different properties, often rare ones.",
  },
  "sainte-maxime": {
    kicker: "Facing the gulf",
    title: "Sainte-Maxime, with Saint-Tropez across the water.",
    lead: "On the other side of the gulf, a sunny town with south-facing beaches and an unrivalled view of Saint-Tropez.",
    alt: "View over the Gulf of Saint-Tropez from the heights of Sainte-Maxime",
    alt2: "Villas and pine trees on the heights of Sainte-Maxime, facing the sea",
    alt3: "The coastline of Sainte-Maxime and its coves",
    intro: [
      "Sainte-Maxime looks out at Saint-Tropez across the gulf. Its wooded hills offer some of the finest views of the peninsula, and its south-facing beaches stay in the sun all day long.",
      "The town lives all year round, with its marina, its golf course and its shops, while remaining linked to Saint-Tropez by sea.",
    ],
    highlights: [
      { t: "The view over the gulf", d: "From the heights, Saint-Tropez and the peninsula unfold opposite." },
      { t: "South-facing beaches", d: "In the sun from morning to evening, a few minutes from the centre." },
      { t: "The golf course", d: "A course in the hills, with the sea as a backdrop." },
      { t: "The sea link", d: "Shuttles cross the gulf to Saint-Tropez." },
    ],
    access: ["Sea shuttles to Saint-Tropez", "Toulon-Hyères and Nice Côte d'Azur airports", "Saint-Raphaël TGV station nearby"],
    living: "Villas overlooking the gulf, estates in the hills and new developments: a sought-after market for its views and year-round living.",
  },
  "saint-raphael": {
    kicker: "Between sea and Estérel",
    title: "Saint-Raphaël, the sea at the foot of the Estérel.",
    lead: "Red rocks plunging into the sea, coves, residential quarters beneath the pines: Valescure, Boulouris, Agay.",
    alt: "The red rocks of the Estérel massif by the sea",
    alt2: "The harbour of Saint-Raphaël and the Notre-Dame-de-la-Victoire basilica",
    alt3: "A terrace open onto the Mediterranean",
    intro: [
      "Saint-Raphaël stretches between the sea and the Estérel massif, whose red rocks plunge into turquoise coves along the Corniche d'Or.",
      "Its residential quarters each have their own atmosphere: the pines and golf course of Valescure, the waterfront villas of Boulouris, the bay of Agay at the foot of the massif.",
    ],
    highlights: [
      { t: "The Estérel massif", d: "Trails, red rocks and coves just minutes away." },
      { t: "The Corniche d'Or", d: "A seaside road, among the most beautiful on the coast." },
      { t: "Valescure", d: "A quarter beneath the pines, around one of the oldest golf courses in the region." },
      { t: "The TGV station", d: "Saint-Raphaël is served directly by the high-speed train." },
    ],
    access: ["Saint-Raphaël-Valescure TGV station", "Nice Côte d'Azur airport", "A8 motorway nearby"],
    living: "Waterfront villas, homes beneath the pines of Valescure, apartments facing the harbour: properties to enjoy all year round.",
  },
};
export const destinationsFor = (lang: Lang): Destination[] => lang === "fr" ? destinationsFr : destinationsFr.map((d) => ({ ...d, ...DEST_EN[d.slug] }));
export const destinationFor = (slug: string, lang: Lang) => destinationsFor(lang).find((d) => d.slug === slug);

/* ─────────────── Services, engagements, art de vivre ─────────────── */

const SERVICES_EN = [
  { t: "Bespoke search", d: "Describe the home you have in mind; we select the properties that match it, listed or not." },
  { t: "Sales and valuation", d: "A reasoned valuation, a presentation worthy of the property, viewings reserved for qualified buyers." },
  { t: "Seasonal rentals", d: "Villas chosen for the summer, with support before and during your stay." },
  { t: "Management and care", d: "Maintenance, welcome, service providers: the house is looked after all year round, even in your absence." },
];
export const servicesFor = (lang: Lang) => servicesFr.map((s, i) => (lang === "fr" ? s : { ...s, ...SERVICES_EN[i] }));

const VALUES_EN = [
  { t: "Discretion", d: "Some properties are never listed. Exact addresses are only shared with buyers we have met in person." },
  { t: "High standards", d: "Every home is carefully presented: photography, precise descriptions, information checked before any viewing." },
  { t: "Knowledge of the gulf", d: "Neighbourhoods, exposure, wind, views, access to the sea: what gives a home its value here." },
  { t: "Complete support", d: "From the first viewing to the signing at the notary's office, with the right contacts at every step." },
];
export const valuesFor = (lang: Lang) => valuesFr.map((v, i) => (lang === "fr" ? v : VALUES_EN[i]));

const LIFESTYLE_EN = [
  { alt: "Sailing boats moored in the harbour of Saint-Tropez", t: "The old harbour" },
  { alt: "Pétanque under the plane trees of Place des Lices", t: "Place des Lices" },
  { alt: "Aerial view of the bay of Pampelonne", t: "Pampelonne" },
  { alt: "Rows of vines on the Saint-Tropez peninsula", t: "The vineyards" },
  { alt: "Cannons of the citadel facing the gulf", t: "The citadel" },
  { alt: "A lane full of bougainvillea in Gassin", t: "Flowered lanes" },
  { alt: "Wooden jetty above turquoise water", t: "The jetties" },
  { alt: "Large yacht sailing offshore", t: "Offshore" },
];
export const lifestyleFor = (lang: Lang) => lifestyleFr.map((l, i) => (lang === "fr" ? l : { ...l, ...LIFESTYLE_EN[i], p: l.p === "En mer" ? "At sea" : l.p }));

/* ─────────────── Les biens ─────────────── */

type PropText = { sector: string; headline: string; description: string[]; features: string[]; alts: string[]; priceNote?: string };
const PROPS_EN: Record<string, PropText> = {
  "villa-horizon-saint-tropez": {
    sector: "Les Salins",
    headline: "Contemporary architecture set facing the sea.",
    description: [
      "On the heights of Les Salins, the villa opens entirely onto the Mediterranean. White volumes, wide bay windows and cascading terraces let the light pass through the house from morning to evening.",
      "The single-level living room opens onto an infinity pool that extends the horizon. Six suites, including a master suite with a private terrace, a pool house and a Mediterranean garden complete the estate.",
    ],
    features: ["Heated infinity pool", "Six suites with bathrooms", "Pool house and summer kitchen", "Home automation and air conditioning", "Three-car garage", "Irrigated Mediterranean garden"],
    alts: ["Contemporary white villa on a hillside facing the sea", "Infinity pool opening onto the sea", "Glazed living room open onto the landscape", "Bright master suite", "Bathroom with double basin"],
  },
  "bastide-des-vignes-ramatuelle": {
    sector: "In the heart of the vineyards",
    headline: "A stone bastide, surrounded by its vineyards.",
    description: [
      "A few minutes from the beaches of Pampelonne, the bastide stands amid two hectares of vines and olive trees. Stone walls, pale shutters and a shaded courtyard tell the story of the Provence of old.",
      "The interior has been entirely redesigned: a kitchen opening onto the terrace, large reception rooms and five bedrooms, each with its own bathroom.",
    ],
    features: ["Two hectares of vines and olive trees", "Shaded inner courtyard", "Pool surrounded by lavender", "Kitchen opening onto the terrace", "Caretaker's house", "Well and automatic irrigation"],
    alts: ["Stone bastide in the middle of the vineyards", "Rows of vines on the hills", "Inner courtyard of a Provençal farmhouse", "Kitchen open onto the dining room"],
  },
  "villa-blanche-gassin": {
    sector: "Close to the village",
    headline: "White arcades beneath the bougainvillea.",
    description: [
      "Inspired by Mediterranean houses, the villa unfolds its white arcades around a flowered patio. From the terraces, the view stretches towards the gulf and the rooftops of Saint-Tropez.",
      "The cathedral-ceiling living room, the open kitchen and the five bedrooms were designed for entertaining. The terraced garden slopes gently down to the pool.",
    ],
    features: ["Arcades and flowered patio", "View over the gulf", "Cathedral-ceiling living room", "Terraced garden", "Pool and sun deck", "Close to the village of Gassin"],
    alts: ["White villa with arcades and bougainvillea", "Pool surrounded by a Mediterranean garden", "Large contemporary living room open onto the kitchen", "Bathroom with freestanding bathtub"],
  },
  "villa-du-golfe-sainte-maxime": {
    sector: "The heights",
    headline: "Saint-Tropez opposite, from every room.",
    description: [
      "On the heights of Sainte-Maxime, the villa enjoys a panoramic view over the gulf and the Saint-Tropez peninsula. The infinity pool seems to merge with the sea.",
      "The living areas open wide onto the terraces. Five bedrooms, including two sea-view suites, and an independent guest apartment.",
    ],
    features: ["Panoramic view over the gulf", "Infinity pool", "Independent guest apartment", "Large terraces", "South-facing", "A few minutes from the beaches"],
    alts: ["Infinity pool facing the sea and the islands", "View over the Gulf of Saint-Tropez from Sainte-Maxime", "Living room opening onto the garden through large bay windows", "Large bay window onto the sea at sunset"],
  },
  "maison-de-la-ponche-saint-tropez": {
    sector: "La Ponche",
    headline: "In the heart of old Saint-Tropez, steps from the sea.",
    description: [
      "In the historic La Ponche quarter, this village house has kept its old walls, its terracotta tiles and its painted shutters. The roof terrace offers a rare view over the sea and the village rooftops.",
      "Four bedrooms over three levels, an open kitchen and a vaulted lounge: everything is within walking distance, from the harbour to La Ponche beach.",
    ],
    features: ["Roof terrace with sea view", "Old walls and terracotta tiles", "Vaulted lounge", "Everything on foot: harbour, beach, Place des Lices", "Recently renovated", "Rarely on the market"],
    alts: ["Cobbled lane with ochre façades in old Saint-Tropez", "The houses of La Ponche by the water", "The rooftops of Saint-Tropez and the bell tower"],
  },
  "bastide-de-la-glycine-grimaud": {
    sector: "The hills",
    headline: "A bastide beneath the wisteria, the sea in the distance.",
    description: [
      "On the hills of Grimaud, the bastide hides behind an avenue of plane trees. In spring its façade disappears beneath the wisteria, and the park slopes down to a pool surrounded by lawn.",
      "Six bedrooms, a library, a large family kitchen and terraces facing the gulf: a house for several generations to live in together.",
    ],
    features: ["Wooded park of nearly one hectare", "Wisteria-covered façade", "Distant view over the gulf", "Library and study", "Pool and pool house", "Avenue of plane trees"],
    alts: ["Bastide façade covered in wisteria", "Pool bordered by lawn and palm trees", "View over the gulf from the hills of Grimaud"],
  },
  "villa-pampelonne-ramatuelle": {
    sector: "Close to the beaches",
    headline: "Summer, a few minutes from Pampelonne.",
    description: [
      "Beneath umbrella pines, the villa welcomes up to fourteen guests in seven suites. The pool, the garden and the shaded terraces invite you to live outdoors from morning to evening.",
      "Daily housekeeping, a chef on request, a welcome on arrival: your stay is prepared in advance, so you can enjoy every day.",
    ],
    features: ["Seven suites, fourteen guests", "Heated pool", "Umbrella pines and garden", "Daily housekeeping included", "Chef and driver on request", "A few minutes from the beaches"],
    alts: ["Provençal villa beneath umbrella pines", "Infinity pool lined with palm trees facing the sea", "Wooden jetty above turquoise water", "The bay of Pampelonne seen from the hills"],
    priceNote: "per week, from",
  },
  "villa-esterel-saint-raphael": {
    sector: "Boulouris",
    headline: "Waterfront, facing the red rocks.",
    description: [
      "In Boulouris, the villa overlooks the sea with the red rocks of the Estérel in the distance. A stone pool, seaside terraces and direct access to the coves.",
      "Five bright bedrooms and a living room opening onto the terrace: a simple, elegant house designed for summer.",
    ],
    features: ["Sea and Estérel views", "Stone pool", "Access to the coves", "Five bedrooms", "Air conditioning", "TGV station nearby"],
    alts: ["Stone pool open onto the sea", "Shaded terrace facing the sea", "The red rocks of the Estérel plunging into the sea", "The harbour of Saint-Raphaël"],
    priceNote: "per week, from",
  },
  "les-terrasses-du-golfe-sainte-maxime": {
    sector: "Overlooking the gulf",
    headline: "Four contemporary villas, currently being designed.",
    description: [
      "A confidential development of four contemporary villas, each with its own pool and garden, facing the Gulf of Saint-Tropez.",
      "The plans can still be adapted. The schedule, prices and detailed specifications are shared by appointment.",
    ],
    features: ["Only four villas", "Private pool for each villa", "Customisable plans", "Latest energy standards", "View over the gulf", "Schedule on appointment"],
    alts: ["3D rendering of a contemporary villa (architect's visual)", "The heights of Sainte-Maxime facing the sea"],
    priceNote: "Price on request",
  },
};
export const propertiesFor = (lang: Lang): Property[] => lang === "fr" ? propertiesFr : propertiesFr.map((p) => {
  const e = PROPS_EN[p.slug];
  if (!e) return p;
  return { ...p, sector: e.sector, headline: e.headline, description: e.description, features: e.features, priceNote: e.priceNote ?? p.priceNote, images: p.images.map((im, i) => ({ ...im, alt: e.alts[i] ?? im.alt })) };
});
export const propertyFor = (slug: string, lang: Lang) => propertiesFor(lang).find((p) => p.slug === slug);

const PRIVATE_EN = [
  { label: "Contemporary villa", place: "Saint-Tropez", detail: "8 bedrooms · sea view" },
  { label: "Wine estate", place: "Saint-Tropez peninsula", detail: "Vineyards · bastide" },
  { label: "Waterfront estate", place: "Sainte-Maxime", detail: "Direct access to the sea" },
];
export const privateCollectionFor = (lang: Lang) => privateFr.map((c, i) => (lang === "fr" ? c : { ...c, ...PRIVATE_EN[i] }));

/* ─────────────── Libellés et prix ─────────────── */

const TYPE_EN: Record<string, string> = { Villa: "Villa", Bastide: "Bastide", "Maison de village": "Village house", "Programme neuf": "New development" };
export const typeLabel = (type: string, lang: Lang) => (lang === "fr" ? type : TYPE_EN[type] ?? type);

const money = { fr: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }), en: new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }) };
export const priceText = (p: Property, lang: Lang) =>
  p.price === null ? (lang === "fr" ? "Prix sur demande" : "Price on request") : p.transaction === "location" ? `${money[lang].format(p.price)} / ${lang === "fr" ? "semaine" : "week"}` : money[lang].format(p.price);
export const num = (n: number, lang: Lang) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB");
