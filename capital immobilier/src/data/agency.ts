/**
 * Informations reprises du site officiel https://www.capitalimmobilier.fr/ (relevé du 06/11/2026).
 * Rien n'est inventé : ni avis, ni chiffres d'activité, ni années d'expérience, ni certification.
 */
export const LIVE = process.env.NEXT_PUBLIC_CAPITAL_LIVE === "1";

export const agency = {
  name: "CAPITAL IMMOBILIER",
  officialSite: "https://www.capitalimmobilier.fr/",
  phone: "04 94 40 86 44",
  phoneHref: "+33494408644",
  fax: "04 94 44 05 86",
  email: "contact@capitalimmobilier.fr",
  street: "129 Avenue du Général-Leclerc",
  /** Code indiqué par le site officiel. À confirmer par l'agence : le centre de Saint-Raphaël est en 83700. */
  postalCode: "83530",
  city: "Saint-Raphaël",
  region: "Var",
  description: "CAPITAL IMMOBILIER est une agence immobilière située au cœur de Saint-Raphaël : transaction, location, location de vacances, gestion locative, syndic de petites et moyennes copropriétés, gestion d'ASL et d'ASA.",
  /** Liens présents sur le site officiel et qui répondent. Le lien Twitter du site officiel est mort et n'est pas repris. */
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/CapitalImmobilier83" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UC8GY0Gu-58uGdjcwuDu_u4A" },
    { label: "Dailymotion", href: "https://www.dailymotion.com/Capitalimmobilier83" },
  ],
} as const;

export const nav = [
  { label: "Acheter", href: "/acheter", children: [
    { label: "Acheter avec l’agence", href: "/acheter" },
    { label: "Tous les biens à vendre", href: "/biens?transaction=vente" },
    { label: "Appartements à Saint-Raphaël", href: "/annonces/appartements-a-vendre-saint-raphael" },
    { label: "Appartements à Fréjus", href: "/annonces/appartements-a-vendre-frejus" },
    { label: "Maisons et villas", href: "/annonces/maisons-a-vendre-saint-raphael" },
  ] },
  { label: "Louer", href: "/louer", children: [
    { label: "Louer avec l’agence", href: "/louer" },
    { label: "Toutes les locations", href: "/biens?transaction=location" },
    { label: "Appartements à louer", href: "/annonces/location-appartement-saint-raphael" },
    { label: "Locaux commerciaux", href: "/annonces/locaux-commerciaux-a-louer" },
    { label: "Location de vacances", href: "/location-vacances" },
  ] },
  { label: "Vendre", href: "/vendre", children: [
    { label: "Vendre avec l’agence", href: "/vendre" },
    { label: "Estimer mon bien", href: "/estimation" },
  ] },
  { label: "Gestion immobilière", href: "/gestion-locative" },
  { label: "Syndic", href: "/syndic", children: [
    { label: "Syndic de copropriété", href: "/syndic" },
    { label: "ASL et ASA", href: "/asl-asa" },
  ] },
  { label: "L’agence", href: "/agence", children: [
    { label: "Découvrir l’agence", href: "/agence" },
    { label: "Nos secteurs", href: "/secteurs" },
    { label: "Conseils", href: "/conseils" },
    { label: "Questions fréquentes", href: "/questions" },
  ] },
  { label: "Contact", href: "/contact" },
];

export const services = [
  { title: "Transaction immobilière", text: "Vendre ou acheter un appartement, une maison ou une villa, accompagné de bout en bout.", href: "/acheter", image: "listing:832", alt: "Vue sur la baie d’Agay depuis un appartement à vendre" },
  { title: "Location immobilière", text: "Des appartements et des maisons à l’année, de Fréjus au pays de Fayence.", href: "/louer", image: "listing:858", alt: "Une maison à louer et son jardin à Fayence" },
  { title: "Location de vacances", text: "Des séjours sur la Côte d’Azur, à demander directement à l’agence.", href: "/location-vacances", image: "/media/plage-veillat.webp", alt: "La plage du Veillat et la baie de Saint-Raphaël" },
  { title: "Gestion locative", text: "Garantie des loyers, compte rendu mensuel, gestion comptable et juridique de la location.", href: "/gestion-locative", image: "/media/cap-esterel-allee.webp", alt: "Une allée de résidences et de palmiers à Cap Estérel" },
  { title: "Syndic de copropriété", text: "La spécialité de l’agence : les petites et moyennes copropriétés, et le démarrage des copropriétés neuves.", href: "/syndic", image: "/media/frejus-residences.webp", alt: "Des résidences de Port-Fréjus au bord de l’eau" },
  { title: "Gestion des ASL et ASA", text: "L’administration des associations syndicales de propriétaires, expliquée simplement.", href: "/asl-asa", image: "/media/cap-esterel.webp", alt: "Cap Estérel et ses résidences, au pied du massif" },
];

/** Secteurs : descriptions factuelles, sans aucune statistique. Le filtre retrouve les annonces réelles du secteur. */
export const sectors = [
  { slug: "saint-raphael", name: "Saint-Raphaël", h1: "Immobilier à Saint-Raphaël", metaTitle: "Immobilier et agence immobilière à Saint-Raphaël",
    description: "Immobilier à Saint-Raphaël : le centre, le port, les quartiers et les annonces de CAPITAL IMMOBILIER, agence installée avenue du Général-Leclerc.",
    image: "/media/saint-raphael-port.webp", alt: "Le port de plaisance de Saint-Raphaël et sa grande roue", image2: "/media/basilique.webp", alt2: "Le dôme de la basilique Notre-Dame-de-la-Victoire, à Saint-Raphaël",
    text: "Le port, le centre-ville et la basilique : c’est ici que l’agence est installée.", match: "^Saint-Raphaël",
    lead: "Saint-Raphaël s’étire le long de la Méditerranée, entre Fréjus et le massif de l’Estérel, du Vieux-Port jusqu’aux roches rouges d’Anthéor.",
    body: ["Commune du Var, Saint-Raphaël réunit plusieurs visages : le centre-ville et sa basilique, le port Santa Lucia, puis des quartiers résidentiels comme Boulouris, Valescure, Agay et Anthéor.", "On y trouve surtout des appartements en résidence près du centre et du front de mer, et davantage de maisons sur les hauteurs. CAPITAL IMMOBILIER y est installée, au 129 avenue du Général-Leclerc."],
    points: ["La distance à pied jusqu’à la mer, aux commerces et à la gare", "Le stationnement, surtout en été", "Les charges et les équipements de la résidence", "Les travaux votés en assemblée générale"] },
  { slug: "frejus", name: "Fréjus", h1: "Immobilier à Fréjus", metaTitle: "Agence immobilière pour Fréjus : annonces et services",
    description: "Immobilier à Fréjus : le centre historique, Port-Fréjus, les plages, et les annonces de CAPITAL IMMOBILIER, agence voisine installée à Saint-Raphaël.",
    image: "/media/frejus-port.webp", alt: "Port-Fréjus et la vieille ville de Fréjus", image2: "/media/frejus-residences.webp", alt2: "Des résidences de Port-Fréjus, avec leurs bateaux au pied des immeubles",
    text: "Un centre historique marqué par son passé romain, un port et de grandes plages.", match: "^Fréjus",
    lead: "Voisine de Saint-Raphaël, Fréjus associe un centre historique hérité de la cité romaine à un port moderne et à de grandes plages.",
    body: ["Ses arènes et son groupe épiscopal rappellent le passé de la ville. Port-Fréjus et le front de mer offrent un tout autre décor, avec des résidences au bord de l’eau.", "CAPITAL IMMOBILIER est installée à Saint-Raphaël, la commune voisine. Elle propose des biens à Fréjus, et peut vous renseigner sur ses services de gestion et de syndic."],
    points: ["Le quartier : centre historique, port ou bord de mer", "Le stationnement et les accès en saison", "L’état des risques, à lire pour chaque adresse", "Les charges des résidences avec services ou espaces communs"] },
  { slug: "boulouris", name: "Boulouris", h1: "Immobilier à Boulouris", metaTitle: "Immobilier à Boulouris, quartier de Saint-Raphaël",
    description: "Boulouris, quartier résidentiel de Saint-Raphaël entre pins parasols et petites plages : ses atouts, ce qu’il faut vérifier et les annonces de l’agence.",
    image: "/media/boulouris.webp", alt: "Pins parasols et mer à Boulouris", image2: "/media/ile-or.webp", alt2: "L’île d’Or et sa tour, au large du Dramont",
    text: "Un quartier résidentiel de Saint-Raphaël, entre pins et petites plages.", match: "boulouris",
    lead: "À l’est du centre de Saint-Raphaël, Boulouris est un quartier résidentiel, entre pins parasols et petites plages.",
    body: ["Le quartier a sa propre gare et garde une ambiance plus calme que le centre-ville, dont il reste proche. La route du bord de mer mène vers le Dramont et Agay.", "Le bas du quartier, près de la mer, et ses hauteurs n’offrent pas la même ambiance, ni les mêmes trajets jusqu’à la plage."],
    points: ["La distance réelle à la plage, à pied", "La présence d’une place de stationnement", "L’entretien du jardin et des pins, pour une maison", "Les services ouverts toute l’année"] },
  { slug: "valescure", name: "Valescure", h1: "Immobilier à Valescure", metaTitle: "Immobilier à Valescure, hauteurs de Saint-Raphaël",
    description: "Valescure, secteur résidentiel et boisé sur les hauteurs de Saint-Raphaël, connu pour son golf : son caractère et les annonces de CAPITAL IMMOBILIER.",
    image: "/media/massif-esterel.webp", alt: "Les hauteurs de Saint-Raphaël au pied du massif de l’Estérel", image2: "/media/corniche.webp", alt2: "La corniche d’Or et les roches rouges de l’Estérel",
    text: "Les hauteurs de Saint-Raphaël, résidentielles et boisées, au pied de l’Estérel.", match: "valescure",
    lead: "Sur les hauteurs de Saint-Raphaël, en direction de l’Estérel, Valescure est un secteur résidentiel et boisé, connu pour son golf.",
    body: ["On y vient pour l’espace, la végétation et le calme, à quelques minutes en voiture du centre et de la mer. Le secteur compte des maisons et des résidences entourées de verdure.", "La voiture y est le plus souvent nécessaire au quotidien. Pour une maison, regardez bien le terrain et les obligations liées à la végétation."],
    points: ["Les trajets quotidiens en voiture", "Le débroussaillement et l’état des risques", "Le coût d’entretien d’un terrain ou d’une piscine", "Les règles de l’association ou du domaine, s’il y en a"] },
  { slug: "santa-lucia", name: "Santa Lucia", h1: "Immobilier à Santa Lucia", metaTitle: "Immobilier à Santa Lucia, port de Saint-Raphaël",
    description: "Santa Lucia, à Saint-Raphaël : le port de plaisance, le front de mer et la pointe aux roches rouges, avec les annonces de CAPITAL IMMOBILIER dans le secteur.",
    image: "/media/santa-lucia.webp", alt: "Les roches rouges de la pointe de Santa Lucia, à Saint-Raphaël", image2: "/media/port-soir.webp", alt2: "Le port de Saint-Raphaël et sa basilique, le soir",
    text: "Le port de plaisance et son front de mer, à l’est du centre de Saint-Raphaël.", match: "santa lucia",
    lead: "À l’est du centre de Saint-Raphaël, Santa Lucia vit autour de son port de plaisance et de son front de mer.",
    body: ["La pointe et ses roches rouges sont tout près, et le centre-ville reste accessible. Beaucoup de logements y sont des appartements en résidence, tournés vers le port ou la mer.", "Le secteur plaît pour la vue et l’accès à la mer. L’animation du port et de la route varie beaucoup selon la saison et l’orientation de l’appartement."],
    points: ["L’orientation et la vue, vérifiées sur place", "Le bruit du port et de la route en été", "Les charges de la résidence", "L’accès et le stationnement"] },
  { slug: "agay", name: "Agay", h1: "Immobilier à Agay", metaTitle: "Immobilier à Agay, rade de l’Estérel à Saint-Raphaël",
    description: "Agay, quartier de Saint-Raphaël : une rade abritée sous les roches rouges de l’Estérel, ce qu’il faut savoir et les annonces de CAPITAL IMMOBILIER.",
    image: "/media/agay.webp", alt: "La rade d’Agay vue du Dramont", image2: "/media/agay-roches.webp", alt2: "Les roches rouges d’Agay plongeant dans une eau claire",
    text: "Une rade abritée, dominée par les roches rouges de l’Estérel.", match: "agay",
    lead: "Rattachée à Saint-Raphaël, Agay s’ouvre sur une rade abritée, dominée par les roches rouges de l’Estérel.",
    body: ["Le secteur a sa gare, ses plages et une vraie vie de saison. Le Dramont, tout proche, regarde l’île d’Or, et Cap Estérel n’est pas loin.", "On y cherche d’abord le cadre et la vue. Pour y vivre à l’année, regardez aussi les services ouverts toute l’année et le temps de trajet vers le centre."],
    points: ["La vue et l’exposition, à vérifier à différentes heures", "L’accès en voiture, surtout en été", "Les services ouverts hors saison", "L’état des risques, près du massif et du littoral"] },
  { slug: "antheor", name: "Anthéor", h1: "Immobilier à Anthéor", metaTitle: "Immobilier à Anthéor, sur la corniche d’Or",
    description: "Anthéor, sur la corniche d’Or à Saint-Raphaël : le viaduc, les calanques et la mer, ce qu’il faut vérifier et les annonces de CAPITAL IMMOBILIER.",
    image: "/media/antheor.webp", alt: "Le viaduc d’Anthéor et sa plage", image2: "/media/calanque.webp", alt2: "Une calanque de la corniche d’Or, entre roches rouges et eau turquoise",
    text: "La corniche d’Or, entre le viaduc, les calanques et la mer.", match: "anth[ée]or",
    lead: "Sur la corniche d’Or, Anthéor s’accroche entre le massif de l’Estérel et la mer, avec son viaduc et ses calanques.",
    body: ["Ce quartier de Saint-Raphaël est l’un des plus éloignés du centre. La route de la corniche est spectaculaire, mais le trajet est plus long qu’il n’y paraît sur une carte.", "C’est un choix de cadre avant tout. Avant d’acheter, essayez le trajet et le quartier aussi en dehors de l’été."],
    points: ["Le temps de trajet vers le centre et les écoles", "Le stationnement sur un terrain en pente", "L’état des risques, entre massif et littoral", "L’entretien des accès et des extérieurs"] },
  { slug: "pays-de-fayence", name: "Pays de Fayence", h1: "Immobilier dans le pays de Fayence", metaTitle: "Immobilier dans le pays de Fayence",
    description: "Fayence, Callian, Montauroux, Seillans, Tourrettes : l’immobilier dans le pays de Fayence, villages perchés de l’arrière-pays, avec les annonces de l’agence.",
    image: "/media/fayence.webp", alt: "Le village perché de Fayence, ses façades et sa tour", image2: "/media/massif-esterel.webp", alt2: "Le massif de l’Estérel, entre l’arrière-pays et la mer",
    text: "Des villages perchés dans l’arrière-pays, de Fayence à Montauroux.", match: "@Fayence|Callian|Montauroux|Seillans|Tourrettes|Saint-Paul-en-Forêt|Bagnols-en-Forêt",
    lead: "Dans l’arrière-pays varois, le pays de Fayence réunit des villages perchés, des collines et le lac de Saint-Cassien tout proche.",
    body: ["Fayence, Callian, Montauroux, Seillans ou Tourrettes : ces communes offrent un autre rythme que le littoral. L’agence y propose aujourd’hui une grande partie de ses locations, ainsi que des biens à vendre.", "La vie de village y est réelle, mais la voiture reste nécessaire pour la plupart des trajets. Regardez aussi la distance à l’autoroute et aux services."],
    points: ["La distance à l’autoroute et au travail", "Le chauffage et la performance énergétique, en hiver", "Le débroussaillement pour une maison", "L’assainissement, individuel ou collectif"] },
];

/** Réassurance : uniquement ce que l'agence annonce elle-même sur son site. */
export const proofs = [
  { t: "Au cœur de Saint-Raphaël", d: "Une agence de proximité, au 129 avenue du Général-Leclerc." },
  { t: "Spécialiste des copropriétés à taille humaine", d: "Petites et moyennes copropriétés, ASL, ASA et démarrage de copropriétés neuves." },
  { t: "Un numéro dédié aux urgences", d: "Pour les appels prioritaires des copropriétés suivies." },
  { t: "Un espace client 24 h/24", d: "Compte copropriétaire personnel et archivage en ligne, personnalisé et sécurisé." },
  { t: "Une salle de réunion à l’agence", d: "Pour accueillir les assemblées générales et les conseils syndicaux." },
  { t: "Un compte rendu de gestion mensuel", d: "Pour suivre le versement du loyer et la vie du bien confié." },
];
