import { FLEET_ROWS } from "./orea-fleet";

/**
 * ORÉA DRIVE : loueur de voitures FICTIF, site de démonstration NEXWORKS AGENCY.
 * Les agences, les tarifs, les disponibilités et les conditions sont imaginaires. Les modèles cités sont de vrais
 * véhicules, sans aucun lien avec leurs constructeurs. Aucune réservation ni aucun paiement n'est possible.
 */
export const orea = {
  name: "ORÉA DRIVE",
  basePath: "/orea-drive",
  slogan: "La route vous attend.",
  description:
    "ORÉA DRIVE est un loueur de voitures fictif sur la Côte d'Azur : 160 modèles, réservation en ligne et prix clairs. Site de démonstration réalisé par NEXWORKS AGENCY.",
  nav: [
    { label: "Véhicules", href: "/orea-drive/vehicules" },
    { label: "Destinations", href: "/orea-drive/destinations" },
    { label: "Agences", href: "/orea-drive/agences" },
    { label: "Contact", href: "/orea-drive/contact" },
  ],
};

export type CategoryKey = "citadine" | "compacte" | "berline" | "suv" | "sport" | "cabriolet" | "electrique" | "van";

const photo = (slug: string) => `/orea-drive/catalogue/${slug}.webp`;

export const categories: { key: CategoryKey; label: string; hint: string; image: string; from: string }[] = [
  { key: "citadine", label: "Citadine", hint: "Facile à garer", image: photo("renault-clio"), from: "hyundai-i10" },
  { key: "compacte", label: "Compacte", hint: "Polyvalente", image: photo("audi-a3"), from: "nissan-pulsar" },
  { key: "berline", label: "Berline", hint: "Grand confort", image: photo("mercedes-classe-s"), from: "ford-mondeo" },
  { key: "suv", label: "SUV", hint: "Pour la famille", image: photo("porsche-cayenne"), from: "dacia-duster" },
  { key: "sport", label: "Sport", hint: "Pour le plaisir", image: photo("ferrari-488"), from: "audi-tt" },
  { key: "cabriolet", label: "Cabriolet", hint: "Cheveux au vent", image: photo("bentley-continental-gtc"), from: "fiat-500c" },
  { key: "electrique", label: "Électrique", hint: "Silencieuse", image: photo("tesla-model-3"), from: "dacia-spring" },
  { key: "van", label: "Van", hint: "Pour l'aventure", image: photo("volkswagen-transporter-t6"), from: "renault-kangoo" },
];

/** Textes par type de véhicule, avec leur traduction : [français, anglais]. */
type Pair = readonly [string, string];
type Profile = { taglines: Pair[]; descriptions: Pair[]; features: Pair[]; ideal: Pair[] };

export const PROFILES: Record<CategoryKey | "van-util" | "van-pass" | "van-loisir", Profile> = {
  citadine: {
    taglines: [["Se garer partout, enfin.", "Finally, park anywhere."], ["La ville sans le stress.", "The city without the stress."], ["Petite, et jamais à court d'idées.", "Small, and never short of ideas."], ["Le plus simple pour se déplacer.", "The simplest way to get around."], ["Légère sur la route, et sur le budget.", "Light on the road, and on the budget."]],
    descriptions: [["Vive et simple à conduire, elle se faufile dans les ruelles et trouve une place là où les autres renoncent.", "Lively and simple to drive, it slips through the lanes and finds a spot where others give up."], ["Idéale pour la ville et les petits trajets : facile à garer, économique et agréable au quotidien.", "Ideal for the city and short trips: easy to park, economical and pleasant every day."], ["Compacte à l'extérieur, pratique à l'intérieur : tout ce qu'il faut pour se déplacer sans y penser.", "Compact outside, practical inside: everything you need to get around without thinking about it."]],
    features: [["Climatisation", "Air conditioning"], ["Bluetooth", "Bluetooth"], ["Aide au stationnement", "Parking assist"], ["Prise USB", "USB socket"], ["Écran tactile", "Touchscreen"], ["Régulateur de vitesse", "Cruise control"]],
    ideal: [["Les centres-villes et les petits trajets à deux", "City centres and short trips for two"]],
  },
  compacte: {
    taglines: [["Le bon choix, tout simplement.", "Simply the right choice."], ["Ni trop petite, ni trop grande.", "Not too small, not too big."], ["À l'aise partout.", "At ease everywhere."], ["La voiture qui ne vous demande pas de choisir.", "The car that never makes you choose."], ["Du quotidien aux grands départs.", "From everyday drives to big departures."]],
    descriptions: [["Assez petite pour la ville, assez grande pour partir en week-end : la voiture à tout faire.", "Small enough for the city, big enough for a weekend away: the do-it-all car."], ["Confortable et polyvalente, elle garde son calme sur l'autoroute comme dans les rues étroites.", "Comfortable and versatile, it stays calm on the motorway and in narrow streets alike."], ["De la place pour quatre et leurs bagages, avec une conduite facile et rassurante.", "Room for four and their luggage, with easy and reassuring handling."]],
    features: [["Climatisation automatique", "Automatic air conditioning"], ["Navigation intégrée", "Built-in navigation"], ["Régulateur de vitesse", "Cruise control"], ["Caméra de recul", "Reversing camera"], ["Bluetooth", "Bluetooth"], ["Aide au maintien de voie", "Lane assist"]],
    ideal: [["Le quotidien et les week-ends à quatre", "Everyday driving and weekends for four"]],
  },
  berline: {
    taglines: [["Arriver reposé.", "Arrive rested."], ["Le confort, kilomètre après kilomètre.", "Comfort, mile after mile."], ["Pour les rendez-vous qui comptent.", "For the meetings that matter."], ["Le silence à bord.", "Silence on board."], ["Une belle façon de voyager.", "A fine way to travel."]],
    descriptions: [["Silencieuse et confortable, cette berline avale les kilomètres et soigne vos rendez-vous comme vos vacances.", "Quiet and comfortable, this saloon eats up the miles for your meetings and your holidays alike."], ["Un grand coffre, de la place à l'arrière et une conduite posée : le choix naturel pour les longs trajets.", "A large boot, rear space and composed handling: the natural choice for long journeys."], ["Élégante sans en faire trop, elle vous dépose frais et disponible à l'arrivée.", "Elegant without overdoing it, it delivers you fresh and ready on arrival."]],
    features: [["Sièges chauffants", "Heated seats"], ["Navigation intégrée", "Built-in navigation"], ["Régulateur adaptatif", "Adaptive cruise control"], ["Grand coffre", "Large boot"], ["Climatisation bizone", "Dual-zone air conditioning"], ["Caméra de recul", "Reversing camera"]],
    ideal: [["Les déplacements professionnels et les longs trajets", "Business travel and long journeys"]],
  },
  suv: {
    taglines: [["De la plage à la montagne.", "From the beach to the mountains."], ["De la hauteur, et de la place.", "Height, and space."], ["Toute la famille, tous les bagages.", "The whole family, all the luggage."], ["Serein quand la route se complique.", "Calm when the road gets tricky."], ["Prêt pour le week-end.", "Ready for the weekend."]],
    descriptions: [["De la place pour tout le monde et pour les bagages. Il prend de la hauteur et reste serein quand la route se complique.", "Room for everyone and all the luggage. It sits high and stays calm when the road gets tricky."], ["Une position de conduite dominante, un grand coffre et l'assurance d'arriver partout, même sur les routes de l'arrière-pays.", "A commanding driving position, a large boot and the confidence to get anywhere, even on hinterland roads."], ["Le compagnon des vacances en famille : spacieux, sûr et à l'aise sur tous les trajets.", "The family holiday companion: spacious, safe and at ease on every trip."]],
    features: [["Grand coffre", "Large boot"], ["Barres de toit", "Roof bars"], ["Caméra de recul", "Reversing camera"], ["Régulateur adaptatif", "Adaptive cruise control"], ["Navigation intégrée", "Built-in navigation"], ["Aide à la descente", "Hill descent control"]],
    ideal: [["Les familles et les routes de montagne", "Families and mountain roads"]],
  },
  sport: {
    taglines: [["Pour le plaisir des virages.", "For the joy of bends."], ["L'exception, à la journée.", "The exception, by the day."], ["Le son, d'abord.", "The sound, first."], ["Un trajet qu'on n'oublie pas.", "A drive you won't forget."], ["Parce que vous en avez envie.", "Because you feel like it."]],
    descriptions: [["Une ligne basse, un moteur qui répond et la corniche devant vous. Elle transforme un simple trajet en souvenir.", "A low stance, a responsive engine and the coast road ahead. It turns a simple trip into a memory."], ["Pour une occasion qui compte, ou simplement parce que vous en avez envie. Une voiture qui se conduit autant qu'elle se regarde.", "For an occasion that matters, or simply because you feel like it. A car as good to drive as it is to look at."], ["Précise, puissante et expressive : le genre de voiture qu'on rêve de conduire au moins une fois.", "Precise, powerful and expressive: the kind of car you dream of driving at least once."]],
    features: [["Mode sport", "Sport mode"], ["Sièges sport", "Sports seats"], ["Système audio premium", "Premium audio system"], ["Jantes alliage", "Alloy wheels"], ["Freinage haute performance", "High-performance brakes"], ["Livraison possible", "Delivery available"]],
    ideal: [["Une escapade à deux et les grandes occasions", "A getaway for two and special occasions"]],
  },
  cabriolet: {
    taglines: [["Le toit s'ouvre, tout change.", "The roof opens, everything changes."], ["Les cheveux au vent, enfin.", "Finally, wind in your hair."], ["La corniche, à ciel ouvert.", "The coast road, under open skies."], ["Le soleil en plus.", "With added sunshine."], ["Fait pour la Côte d'Azur.", "Made for the French Riviera."]],
    descriptions: [["Sur la Côte d'Azur, peu de choses valent une route en bord de mer, toit ouvert. Celui-ci est fait pour ça.", "On the French Riviera, little beats a seaside road with the roof down. This one is made for it."], ["Le plaisir de rouler au grand air, avec le confort d'une voiture de tous les jours.", "The pleasure of driving in the open air, with the comfort of an everyday car."], ["Une heure de route avec lui, et le trajet devient la meilleure partie de la journée.", "One hour on the road with it, and the drive becomes the best part of the day."]],
    features: [["Toit ouvrant électrique", "Electric folding roof"], ["Sièges chauffants", "Heated seats"], ["Bluetooth", "Bluetooth"], ["Jantes alliage", "Alloy wheels"], ["Système audio premium", "Premium audio system"], ["Filet anti-remous", "Wind deflector"]],
    ideal: [["Les routes de bord de mer et les escapades à deux", "Seaside roads and getaways for two"]],
  },
  electrique: {
    taglines: [["Le silence, et rien d'autre.", "Silence, and nothing else."], ["Zéro passage à la pompe.", "No trips to the pump."], ["L'accélération sans le bruit.", "Acceleration without the noise."], ["Essayez, vous verrez.", "Try it and see."], ["La route, autrement.", "The road, differently."]],
    descriptions: [["Accélération douce, aucun bruit de moteur et zéro passage à la pompe. Nos conseillers vous expliquent la recharge au départ.", "Smooth acceleration, no engine noise and no trips to the pump. Our advisers explain charging at pick-up."], ["Une conduite apaisante et réactive à la fois. Un bon moyen de découvrir l'électrique le temps d'un séjour.", "A calm yet responsive drive. A great way to try electric for the length of a stay."], ["Silencieuse en ville et à l'aise sur la route, elle change vraiment la façon de conduire.", "Silent in town and at ease on the road, it really changes the way you drive."]],
    features: [["100 % électrique", "100% electric"], ["Câble de recharge fourni", "Charging cable provided"], ["Planificateur de trajet", "Trip planner"], ["Aide à la conduite", "Driver assistance"], ["Écran tactile", "Touchscreen"], ["Climatisation automatique", "Automatic air conditioning"]],
    ideal: [["Les trajets urbains et les conducteurs curieux", "City trips and curious drivers"]],
  },
  van: { taglines: [], descriptions: [], features: [], ideal: [] },
  "van-util": {
    taglines: [["Le déménagement devient simple.", "Moving made simple."], ["Tout rentre.", "Everything fits."], ["Le volume qu'il vous faut.", "The space you need."]],
    descriptions: [["Un grand volume de chargement et une conduite accessible : pour un déménagement, un chantier ou une livraison.", "A large load space and easy handling: for a move, a job or a delivery."], ["Facile à charger et simple à conduire, avec un permis B classique.", "Easy to load and simple to drive with a standard car licence."]],
    features: [["Grand volume de chargement", "Large load space"], ["Porte latérale coulissante", "Sliding side door"], ["Sangles d'arrimage", "Tie-down straps"], ["Caméra de recul", "Reversing camera"], ["Bluetooth", "Bluetooth"], ["Conduite avec permis B", "Standard car licence"]],
    ideal: [["Les déménagements et les transports de matériel", "House moves and carrying equipment"]],
  },
  "van-pass": {
    taglines: [["Personne ne reste à la maison.", "Nobody stays at home."], ["De la place pour toute la bande.", "Room for the whole gang."], ["Tout le monde au même endroit.", "Everyone in the same place."]],
    descriptions: [["De la place pour tout le groupe et pour les bagages : parfait pour un séjour en famille ou entre amis.", "Room for the whole group and the luggage: perfect for a family or friends' trip."], ["Spacieux et simple à vivre, il rend les grands trajets à plusieurs vraiment agréables.", "Spacious and easy to live with, it makes long group trips truly pleasant."]],
    features: [["Portes latérales coulissantes", "Sliding side doors"], ["Sièges modulables", "Flexible seating"], ["Climatisation à l'arrière", "Rear air conditioning"], ["Grand coffre", "Large boot"], ["Caméra de recul", "Reversing camera"], ["Prises USB à chaque rang", "USB sockets in each row"]],
    ideal: [["Les familles nombreuses et les groupes d'amis", "Large families and groups of friends"]],
  },
  "van-loisir": {
    taglines: [["Partir sans savoir où dormir.", "Leave without knowing where you'll sleep."], ["La liberté, à votre rythme.", "Freedom, at your own pace."], ["Votre maison sur la route.", "Your home on the road."]],
    descriptions: [["Un van au charme intact, avec tout ce qu'il faut pour vivre dehors et s'arrêter où l'on veut.", "A van with its charm intact and everything you need to live outdoors and stop wherever you like."], ["Pour un road trip sans itinéraire : on roule, on s'arrête, on repart quand on veut.", "For a road trip with no plan: drive, stop and set off again whenever you like."]],
    features: [["Couchage 2 places", "Sleeps two"], ["Coin cuisine", "Kitchenette"], ["Glacière", "Cool box"], ["Table et chaises", "Table and chairs"], ["Rideaux occultants", "Blackout curtains"], ["Kit de camping", "Camping kit"]],
    ideal: [["Les road trips et les amateurs de grand air", "Road trips and lovers of the great outdoors"]],
  },
};

export type Vehicle = {
  slug: string;
  name: string;
  category: CategoryKey;
  categoryLabel: string;
  pricePerDay: number;
  seats: number;
  doors: number;
  bags: number;
  transmission: "Automatique" | "Manuelle";
  energy: "Essence" | "Hybride" | "Électrique" | "Diesel";
  minAge: number;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  features: string[];
  idealFor: string;
};

const LEISURE_VANS = new Set(["volkswagen-grand-california", "volkswagen-t3-vintage"]);
const profileOf = (category: CategoryKey, slug: string, seats: number) => {
  if (category !== "van") return PROFILES[category];
  if (LEISURE_VANS.has(slug)) return PROFILES["van-loisir"];
  return seats <= 3 ? PROFILES["van-util"] : PROFILES["van-pass"];
};
const minAgeOf = (category: CategoryKey, price: number) => {
  if (price >= 200) return 25;
  if (category === "sport" || category === "cabriolet") return 23;
  if (category === "berline" || category === "suv" || category === "van") return 23;
  return 21;
};

export const vehicles: Vehicle[] = FLEET_ROWS.map((row, i) => {
  const category = row.category as CategoryKey;
  const profile = profileOf(category, row.slug, row.seats);
  const pick = (list: Pair[], offset = 0) => list[(i + offset) % list.length][0];
  const features = [0, 1, 2, 3].map((k) => pick(profile.features, k));
  if (row.energy === "Hybride" && !features.includes("Motorisation hybride")) features[0] = "Motorisation hybride";
  return {
    slug: row.slug,
    name: row.name,
    category,
    categoryLabel: categories.find((c) => c.key === category)?.label ?? "",
    pricePerDay: row.pricePerDay,
    seats: row.seats,
    doors: row.doors,
    bags: row.bags,
    transmission: row.transmission as Vehicle["transmission"],
    energy: row.energy as Vehicle["energy"],
    minAge: minAgeOf(category, row.pricePerDay),
    image: photo(row.slug),
    imageAlt: `${row.name}, photo du modèle`,
    tagline: pick(profile.taglines),
    description: pick(profile.descriptions),
    features,
    idealFor: pick(profile.ideal),
  };
});

export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);

/** Une voiture phare par catégorie : la vitrine de l'accueil. */
export const featured: Vehicle[] = ["renault-clio", "audi-a3", "mercedes-classe-s", "porsche-cayenne", "ferrari-488", "bentley-continental-gtc", "tesla-model-3", "volkswagen-transporter-t6"].map((s) => getVehicle(s)).filter((v): v is Vehicle => Boolean(v));

export const locations = [
  { key: "saint-raphael", name: "Saint-Raphaël Gare", city: "Saint-Raphaël", hint: "Face à la gare", hours: "7 h – 21 h, tous les jours", text: "Entre le vieux port et la basilique, le point de départ idéal pour la corniche de l'Estérel.", image: "/orea-drive/villes/saint-raphael.webp", imageAlt: "Le vieux port de Saint-Raphaël et sa basilique en soirée" },
  { key: "frejus", name: "Fréjus Plage", city: "Fréjus", hint: "Près du front de mer", hours: "8 h – 20 h, tous les jours", text: "Récupérez votre voiture à deux pas de la grande plage, puis filez vers l'arrière-pays.", image: "/orea-drive/villes/frejus.webp", imageAlt: "Le front de mer et la grande plage de Fréjus" },
  { key: "cannes", name: "Cannes Centre", city: "Cannes", hint: "En centre-ville", hours: "8 h – 20 h, du lundi au samedi", text: "Au coeur de la ville, à quelques minutes de la Croisette et des grands hôtels.", image: "/orea-drive/villes/cannes.webp", imageAlt: "La plage et le boulevard de la Croisette à Cannes" },
  { key: "nice", name: "Nice Aéroport", city: "Nice", hint: "Navette depuis le terminal", hours: "6 h – 23 h, tous les jours", text: "Atterrissez, prenez la navette et partez : la Promenade des Anglais commence juste à côté.", image: "/orea-drive/villes/nice.webp", imageAlt: "La baie des Anges et la Promenade des Anglais à Nice" },
  { key: "saint-tropez", name: "Saint-Tropez Port", city: "Saint-Tropez", hint: "À deux pas du port", hours: "9 h – 19 h, d'avril à octobre", text: "Pour la saison, entre le port et les plages de la presqu'île.", image: "/orea-drive/villes/saint-tropez.webp", imageAlt: "Le port de Saint-Tropez et ses façades colorées" },
];

export const extras = [
  { key: "serenite", label: "Assurance Sérénité", hint: "Franchise à zéro en cas d'accident", perDay: 15 },
  { key: "conducteur", label: "Conducteur supplémentaire", hint: "Une deuxième personne au volant", perDay: 8 },
  { key: "siege", label: "Siège enfant", hint: "Installé avant votre arrivée", perDay: 6 },
  { key: "gps", label: "GPS hors ligne", hint: "Même sans réseau dans l'arrière-pays", perDay: 5 },
] as const;

export const included = [
  { title: "Kilométrage illimité", text: "Roulez autant que vous voulez, sans compter." },
  { title: "Assurance de base", text: "Responsabilité civile et assistance 24 h/24 incluses." },
  { title: "Annulation gratuite", text: "Jusqu'à 48 h avant votre départ." },
  { title: "Prix affiché, prix payé", text: "Le total est calculé avant de réserver, sans surprise." },
];

export const journey = [
  { n: "01", title: "Choisissez", text: "Votre lieu, vos dates, et comparez les véhicules disponibles avec le prix total affiché." },
  { n: "02", title: "Réservez", text: "Quelques informations, moins de trois minutes, et votre véhicule vous attend." },
  { n: "03", title: "Récupérez", text: "Présentez votre permis en agence, on vous remet les clés et c'est parti." },
  { n: "04", title: "Rendez", text: "Déposez la voiture dans n'importe quelle agence ORÉA. Rien d'autre à faire." },
];

export const destinations = [
  { slug: "corniche", title: "La corniche de l'Estérel", duration: "Une demi-journée", text: "Des roches rouges qui plongent dans la mer et une route qui suit chaque crique, de Saint-Raphaël à Mandelieu.", image: "/orea-drive/villes/corniche.webp", imageAlt: "Les roches rouges du massif de l'Estérel au bord de la mer", vehicle: "mazda-mx-5" },
  { slug: "saint-tropez", title: "Saint-Tropez et ses plages", duration: "Une journée", text: "Le port, les ruelles et les grandes plages de la presqu'île. Partez tôt, et profitez de la route avant la foule.", image: "/orea-drive/villes/plages.webp", imageAlt: "La plage de Pampelonne vue depuis les hauteurs", vehicle: "fiat-500" },
  { slug: "villages", title: "Les villages de l'arrière-pays", duration: "Une journée", text: "Fayence, Seillans, Bargemon : des villages perchés, des places ombragées et des routes où l'on croise peu de monde.", image: "/orea-drive/villes/villages.webp", imageAlt: "Les toits du village de Fayence", vehicle: "volkswagen-golf" },
  { slug: "verdon", title: "Cap sur le Verdon", duration: "Un week-end", text: "Des falaises, une eau turquoise et des routes spectaculaires. Prenez votre temps et dormez sur place.", image: "/orea-drive/villes/verdon.webp", imageAlt: "Les gorges du Verdon vues depuis la route des Crêtes", vehicle: "volkswagen-t3-vintage" },
];

export const faq = [
  { q: "Quels documents faut-il pour louer une voiture ?", a: "Votre permis de conduire valide, une pièce d'identité et une carte bancaire au nom du conducteur principal." },
  { q: "Quel âge faut-il avoir ?", a: "À partir de 21 ans pour la plupart des véhicules. L'âge minimum est indiqué sur chaque fiche, jusqu'à 25 ans pour les modèles les plus puissants." },
  { q: "Le kilométrage est-il limité ?", a: "Non, le kilométrage est illimité sur tous nos véhicules." },
  { q: "Puis-je rendre la voiture dans une autre agence ?", a: "Oui, vous pouvez la déposer dans n'importe quelle agence ORÉA, sans supplément." },
  { q: "Puis-je annuler ma réservation ?", a: "Oui, l'annulation est gratuite jusqu'à 48 h avant le départ." },
  { q: "Y a-t-il une réduction pour une longue durée ?", a: "Oui, une remise de 10 % s'applique automatiquement à partir de 7 jours de location." },
];

export const DEMO_NOTICE = "Démonstration : entreprise et tarifs fictifs. Aucune réservation ni aucun paiement n'est possible.";

export const formatEuro = (n: number) => `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n).replace(/ /g, " ")} €`;

/** Nombre de jours facturés : au moins un. */
export function daysBetween(start: string, end: string) {
  const a = new Date(start).getTime(), b = new Date(end).getTime();
  if (!Number.isFinite(a) || !Number.isFinite(b) || b <= a) return 1;
  return Math.max(1, Math.ceil((b - a) / 86400000));
}

/** Prix total : remise de 10 % à partir de 7 jours sur la location, options au tarif journalier. */
export function quote(pricePerDay: number, days: number, extrasPerDay = 0) {
  const base = pricePerDay * days;
  const discount = days >= 7 ? Math.round(base * 0.1) : 0;
  return { base, discount, extras: extrasPerDay * days, total: base - discount + extrasPerDay * days };
}
