/**
 * Pages de recherche à adresse propre. Les annonces viennent toujours du catalogue réel :
 * si le secteur n'a rien en ligne, la page le dit, et montre les biens les plus proches.
 */
export type Landing = {
  slug: string; title: string; description: string; h1: string; eyebrow: string; intro: string; image: string; alt: string;
  transaction: "vente" | "location"; types: string[]; communes?: RegExp; nearby?: RegExp;
  none: string; nearbyTitle?: string; filter: string; parent: { name: string; path: string };
  links: { label: string; href: string }[];
};

export const landings: Landing[] = [
  {
    slug: "appartements-a-vendre-saint-raphael", title: "Appartement à vendre à Saint-Raphaël", h1: "Appartements à vendre à Saint-Raphaël", eyebrow: "Acheter à Saint-Raphaël",
    description: "Les appartements et studios à vendre à Saint-Raphaël proposés par CAPITAL IMMOBILIER : photos, surfaces, prix, charges et performance énergétique.",
    intro: "Du centre-ville aux roches rouges d’Agay, voici les appartements et studios à vendre que l’agence propose sur la commune de Saint-Raphaël.",
    image: "/media/vieux-port.webp", alt: "Le Vieux-Port de Saint-Raphaël, ses bateaux et ses façades", transaction: "vente", types: ["Appartement", "Studio"], communes: /^Saint-Raphaël/, none: "Aucun appartement à vendre n’est en ligne à Saint-Raphaël pour le moment.",
    filter: "/biens?transaction=vente&commune=Saint-Rapha%C3%ABl", parent: { name: "Acheter", path: "/acheter" },
    links: [{ label: "Acheter un appartement à Saint-Raphaël : les étapes", href: "/conseils/acheter-appartement-saint-raphael" }, { label: "Les quartiers de Saint-Raphaël", href: "/conseils/quartiers-saint-raphael" }, { label: "Appartements à vendre à Fréjus", href: "/annonces/appartements-a-vendre-frejus" }],
  },
  {
    slug: "maisons-a-vendre-saint-raphael", title: "Maison à vendre à Saint-Raphaël et alentour", h1: "Maisons et villas à vendre à Saint-Raphaël et alentour", eyebrow: "Acheter une maison",
    description: "Maisons et villas à vendre à Saint-Raphaël et dans les communes voisines avec CAPITAL IMMOBILIER, et dépôt de votre recherche auprès de l’agence.",
    intro: "Une maison à Valescure, à Boulouris ou dans l’arrière-pays ? Voici ce que l’agence propose aujourd’hui. Si rien ne correspond, confiez-lui votre recherche.",
    image: "/media/boulouris.webp", alt: "Pins parasols et mer à Boulouris", transaction: "vente", types: ["Villa", "Maison"], communes: /^Saint-Raphaël/, nearby: /./, none: "Aucune maison n’est en ligne sur la commune de Saint-Raphaël pour le moment.", nearbyTitle: "À proximité",
    filter: "/biens?transaction=vente&type=Villa", parent: { name: "Acheter", path: "/acheter" },
    links: [{ label: "Déposer ma recherche", href: "/acheter#demande" }, { label: "Valescure, les hauteurs de Saint-Raphaël", href: "/secteurs/valescure" }, { label: "Boulouris, entre pins et petites plages", href: "/secteurs/boulouris" }],
  },
  {
    slug: "appartements-a-vendre-frejus", title: "Appartement à vendre à Fréjus", h1: "Appartements à vendre à Fréjus", eyebrow: "Acheter à Fréjus",
    description: "Les appartements à vendre à Fréjus proposés par CAPITAL IMMOBILIER, agence voisine installée à Saint-Raphaël : photos, surfaces, prix et charges.",
    intro: "Port-Fréjus, centre historique, plages : voici les appartements à vendre à Fréjus que propose l’agence, installée dans la commune voisine de Saint-Raphaël.",
    image: "/media/frejus-port.webp", alt: "Port-Fréjus et la vieille ville de Fréjus", transaction: "vente", types: ["Appartement", "Studio"], communes: /^Fréjus/, none: "Aucun appartement à vendre n’est en ligne à Fréjus pour le moment.",
    filter: "/biens?transaction=vente&commune=Fr%C3%A9jus", parent: { name: "Acheter", path: "/acheter" },
    links: [{ label: "L’immobilier à Fréjus", href: "/secteurs/frejus" }, { label: "Acheter : les étapes", href: "/conseils/acheter-appartement-saint-raphael" }, { label: "Appartements à vendre à Saint-Raphaël", href: "/annonces/appartements-a-vendre-saint-raphael" }],
  },
  {
    slug: "location-appartement-saint-raphael", title: "Location d’appartement à Saint-Raphaël et alentour", h1: "Appartements à louer autour de Saint-Raphaël", eyebrow: "Louer à l’année",
    description: "Appartements à louer à l’année à Saint-Raphaël, à Fréjus et dans les communes voisines : les locations de CAPITAL IMMOBILIER et le dépôt de votre recherche.",
    intro: "Les appartements à louer à l’année que propose l’agence, à Saint-Raphaël quand il y en a, et dans les communes voisines. Le loyer affiché est celui de l’annonce.",
    image: "/media/plage-veillat.webp", alt: "La plage du Veillat et la baie de Saint-Raphaël", transaction: "location", types: ["Appartement", "Studio"], communes: /^Saint-Raphaël/, nearby: /./, none: "Aucun appartement à louer n’est en ligne sur la commune de Saint-Raphaël pour le moment.", nearbyTitle: "Dans les communes voisines",
    filter: "/biens?transaction=location&type=Appartement", parent: { name: "Louer", path: "/louer" },
    links: [{ label: "Déposer ma recherche de location", href: "/louer#demande" }, { label: "Louer avec l’agence", href: "/louer" }, { label: "Le pays de Fayence", href: "/secteurs/pays-de-fayence" }],
  },
  {
    slug: "locaux-commerciaux-a-louer", title: "Local commercial à louer dans le Var", h1: "Locaux commerciaux et professionnels à louer", eyebrow: "Louer un local",
    description: "Les locaux commerciaux et professionnels à louer proposés par CAPITAL IMMOBILIER à Saint-Raphaël et dans le Var : surfaces, loyers et conditions du bail.",
    intro: "Un local pour installer votre activité : voici ceux que l’agence propose à la location, avec leur surface, leur loyer et les conditions publiées.",
    image: "/media/saint-raphael-port.webp", alt: "Le port de plaisance de Saint-Raphaël et sa grande roue", transaction: "location", types: ["Local commercial"], none: "Aucun local n’est en ligne pour le moment.",
    filter: "/biens?transaction=location&type=Local%20commercial", parent: { name: "Louer", path: "/louer" },
    links: [{ label: "Contacter l’agence", href: "/contact" }, { label: "Confier la gestion d’un local", href: "/gestion-locative" }],
  },
];
