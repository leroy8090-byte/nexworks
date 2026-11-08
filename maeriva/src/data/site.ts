/**
 * MAÉRIVA est une agence fictive, créée pour le portfolio de NEXWORKS AGENCY.
 * Les biens, les prix et les coordonnées sont fictifs ; les lieux et les faits sur les communes sont réels.
 * Le numéro de téléphone appartient à la tranche réservée par l'ARCEP aux œuvres de fiction (04 65 71 xx xx).
 */
export const LIVE = process.env.NEXT_PUBLIC_MAERIVA_LIVE === "1";

export const agency = {
  name: "MAÉRIVA",
  short: "Maériva",
  tagline: "Real Estate",
  baseline: "L'immobilier d'exception du golfe de Saint-Tropez",
  description: "MAÉRIVA, agence immobilière de prestige : villas, bastides et maisons d'exception à Saint-Tropez, Ramatuelle, Gassin, Sainte-Maxime et Saint-Raphaël. Vente, location saisonnière et accompagnement sur mesure.",
  phone: "04 65 71 20 26",
  phoneHref: "+33465712026",
  city: "Saint-Tropez",
  region: "Var",
  hours: "Du lundi au samedi, sur rendez-vous",
};

export const nav = [
  { href: "/proprietes", label: "Propriétés" },
  { href: "/destinations", label: "Destinations" },
  { href: "/vendre", label: "Vendre" },
  { href: "/collection-privee", label: "Collection privée" },
  { href: "/agence", label: "L'agence" },
  { href: "/contact", label: "Contact" },
];

export type Destination = {
  slug: string; name: string; kicker: string; title: string; lead: string; image: string; alt: string; image2: string; alt2: string; image3: string; alt3: string;
  communes: string[]; intro: string[]; highlights: { t: string; d: string }[]; access: string[]; living: string;
};

/** Les faits cités sont publics et vérifiables ; aucune statistique de marché n'est inventée. */
export const destinations: Destination[] = [
  {
    slug: "saint-tropez",
    name: "Saint-Tropez",
    kicker: "La presqu'île",
    title: "Saint-Tropez, le village devenu légende.",
    lead: "Un port, une citadelle, des ruelles pavées aux façades ocre, et tout autour la presqu'île : Ramatuelle, Gassin, les vignes et les plages de Pampelonne.",
    image: "/photos/hero-port.webp", alt: "Vue aérienne du vieux port de Saint-Tropez et du clocher",
    image2: "/photos/ponche-aerien.webp", alt2: "Vue aérienne de la plage de la Ponche à Saint-Tropez",
    image3: "/photos/lices.webp", alt3: "Joueurs de pétanque sous les platanes de la place des Lices",
    communes: ["Saint-Tropez", "Ramatuelle", "Gassin", "Grimaud"],
    intro: [
      "Ancien village de pêcheurs, Saint-Tropez a gardé son échelle : le vieux port, le quartier de la Ponche, les ruelles qui montent vers la citadelle du XVIIᵉ siècle. Les peintres l'ont rendu célèbre bien avant les plages, et le musée de l'Annonciade en garde la trace.",
      "Autour du village, la presqu'île change de visage : collines boisées, domaines viticoles de Ramatuelle, village perché de Gassin, et la longue baie de Pampelonne, sur la commune de Ramatuelle.",
    ],
    highlights: [
      { t: "La place des Lices", d: "Marché provençal le mardi et le samedi matin, parties de pétanque sous les platanes." },
      { t: "La citadelle", d: "Elle domine le golfe et abrite un musée d'histoire maritime." },
      { t: "Pampelonne", d: "Plusieurs kilomètres de sable face à l'est, sur la commune de Ramatuelle." },
      { t: "Les villages perchés", d: "Gassin et Ramatuelle, leurs ruelles, leurs points de vue sur la mer et les vignes." },
    ],
    access: ["Aéroport du golfe de Saint-Tropez à La Môle, pour l'aviation d'affaires", "Aéroports de Toulon-Hyères et de Nice Côte d'Azur", "Liaisons maritimes avec Sainte-Maxime"],
    living: "Villas sur les collines, bastides au milieu des vignes, maisons de village à quelques pas du port : la presqu'île réunit des biens très différents, souvent rares.",
  },
  {
    slug: "sainte-maxime",
    name: "Sainte-Maxime",
    kicker: "Face au golfe",
    title: "Sainte-Maxime, Saint-Tropez en face.",
    lead: "De l'autre côté du golfe, une ville ensoleillée, ses plages exposées au sud et une vue imprenable sur Saint-Tropez.",
    image: "/photos/sainte-maxime-baie.webp", alt: "Vue sur le golfe de Saint-Tropez depuis les hauteurs de Sainte-Maxime",
    image2: "/photos/sainte-maxime-golfe.webp", alt2: "Villas et pins sur les hauteurs de Sainte-Maxime, face à la mer",
    image3: "/photos/sainte-maxime-cote.webp", alt3: "Le littoral de Sainte-Maxime et ses criques",
    communes: ["Sainte-Maxime", "Les Issambres", "Grimaud"],
    intro: [
      "Sainte-Maxime regarde Saint-Tropez de l'autre côté du golfe. Ses collines boisées offrent certaines des plus belles vues sur la presqu'île, et ses plages, tournées vers le sud, restent au soleil toute la journée.",
      "La ville vit à l'année, avec son port de plaisance, son golf et ses commerces, tout en restant reliée à Saint-Tropez par la mer.",
    ],
    highlights: [
      { t: "La vue sur le golfe", d: "Depuis les hauteurs, Saint-Tropez et la presqu'île se découvrent en face." },
      { t: "Les plages au sud", d: "Ensoleillées du matin au soir, à quelques minutes du centre." },
      { t: "Le golf", d: "Un parcours sur les collines, avec la mer en toile de fond." },
      { t: "La liaison maritime", d: "Des navettes traversent le golfe vers Saint-Tropez." },
    ],
    access: ["Navettes maritimes vers Saint-Tropez", "Aéroports de Toulon-Hyères et de Nice Côte d'Azur", "Gare TGV de Saint-Raphaël à proximité"],
    living: "Villas avec vue sur le golfe, propriétés sur les collines et programmes neufs : un marché recherché pour la vue et la vie à l'année.",
  },
  {
    slug: "saint-raphael",
    name: "Saint-Raphaël",
    kicker: "Entre mer et Estérel",
    title: "Saint-Raphaël, la mer au pied de l'Estérel.",
    lead: "Des roches rouges qui plongent dans la mer, des criques, des quartiers résidentiels sous les pins : Valescure, Boulouris, Agay.",
    image: "/photos/esterel.webp", alt: "Les roches rouges du massif de l'Estérel au bord de la mer",
    image2: "/photos/saint-raphael-port.webp", alt2: "Le port de Saint-Raphaël et la basilique Notre-Dame-de-la-Victoire",
    image3: "/photos/terrasse-mer.webp", alt3: "Terrasse ouverte sur la mer Méditerranée",
    communes: ["Saint-Raphaël", "Valescure", "Boulouris", "Agay"],
    intro: [
      "Saint-Raphaël s'étend entre la mer et le massif de l'Estérel, dont les roches rouges plongent dans des criques turquoise le long de la corniche d'Or.",
      "Ses quartiers résidentiels offrent des ambiances très différentes : les pins et le golf de Valescure, les villas de Boulouris en bord de mer, la baie d'Agay au pied du massif.",
    ],
    highlights: [
      { t: "Le massif de l'Estérel", d: "Des sentiers, des roches rouges et des criques à quelques minutes." },
      { t: "La corniche d'Or", d: "Une route en bord de mer, parmi les plus belles de la côte." },
      { t: "Valescure", d: "Un quartier sous les pins, autour de l'un des plus anciens golfs de la région." },
      { t: "La gare TGV", d: "Saint-Raphaël est desservie directement par le TGV." },
    ],
    access: ["Gare TGV de Saint-Raphaël-Valescure", "Aéroport de Nice Côte d'Azur", "Autoroute A8 à proximité"],
    living: "Villas les pieds dans l'eau, maisons sous les pins de Valescure, appartements face au port : des biens accessibles toute l'année.",
  },
];
export const destinationBySlug = (slug: string) => destinations.find((d) => d.slug === slug);

export const services = [
  { k: "01", t: "Recherche sur mesure", d: "Vous décrivez la maison que vous imaginez ; nous sélectionnons les biens qui y répondent, publiés ou non.", href: "/proprietes", image: "/photos/villa-moderne.webp" },
  { k: "02", t: "Vente et estimation", d: "Une estimation argumentée, une présentation à la hauteur du bien, des visites réservées aux acquéreurs qualifiés.", href: "/vendre", image: "/photos/bastide-vignes.webp" },
  { k: "03", t: "Location saisonnière", d: "Des villas choisies pour l'été, avec un accompagnement avant et pendant le séjour.", href: "/proprietes?transaction=location", image: "/photos/piscine-palmiers.webp" },
  { k: "04", t: "Gestion et suivi", d: "Entretien, accueil, prestataires : la maison est suivie toute l'année, même en votre absence.", href: "/contact", image: "/photos/piscine-jardin.webp" },
];

export const values = [
  { t: "Discrétion", d: "Certains biens ne sont jamais publiés. Les adresses précises ne sont communiquées qu'aux acquéreurs reçus en rendez-vous." },
  { t: "Exigence", d: "Chaque maison est présentée avec soin : photographies, descriptif précis, informations vérifiées avant toute visite." },
  { t: "Connaissance du golfe", d: "Les quartiers, l'exposition, le vent, la vue, l'accès à la mer : ce qui fait la valeur d'une maison ici." },
  { t: "Accompagnement complet", d: "De la première visite à la signature chez le notaire, avec les bons interlocuteurs à chaque étape." },
];

export const lifestyle = [
  { src: "/photos/port-voiliers.webp", alt: "Voiliers amarrés dans le port de Saint-Tropez", t: "Le vieux port", p: "Saint-Tropez" },
  { src: "/photos/lices.webp", alt: "Pétanque sous les platanes de la place des Lices", t: "La place des Lices", p: "Saint-Tropez" },
  { src: "/photos/pampelonne.webp", alt: "Vue aérienne de la baie de Pampelonne", t: "Pampelonne", p: "Ramatuelle" },
  { src: "/photos/vignes.webp", alt: "Rangs de vignes sur la presqu'île de Saint-Tropez", t: "Les vignes", p: "Ramatuelle" },
  { src: "/photos/citadelle-canons.webp", alt: "Canons de la citadelle face au golfe", t: "La citadelle", p: "Saint-Tropez" },
  { src: "/photos/bougainvillier.webp", alt: "Ruelle fleurie de bougainvilliers à Gassin", t: "Les ruelles fleuries", p: "Gassin" },
  { src: "/photos/ponton.webp", alt: "Ponton en bois au-dessus d'une eau turquoise", t: "Les pontons", p: "Pampelonne" },
  { src: "/photos/yacht.webp", alt: "Grand yacht naviguant au large", t: "Au large", p: "En mer" },
];
