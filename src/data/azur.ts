/**
 * AZUR PLOMBERIE : artisan FICTIF, site de démonstration NEXWORKS AGENCY.
 * Aucun faux avis, aucune ancienneté ni certification inventée, aucun numéro réel.
 * Le téléphone et l'e-mail ne s'affichent que s'ils sont fournis par variable d'environnement.
 */

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : "");

export const azur = {
  name: "AZUR PLOMBERIE",
  shortName: "Azur",
  location: "Saint-Raphaël",
  region: "Côte d'Azur",
  description:
    "AZUR PLOMBERIE est un artisan plombier fictif à Saint-Raphaël : dépannage, recherche de fuite, chauffe-eau et salle de bain. Site de démonstration réalisé par NEXWORKS AGENCY.",
  phone: env(process.env.NEXT_PUBLIC_AZUR_PHONE),
  email: env(process.env.NEXT_PUBLIC_AZUR_EMAIL),
  hours: "Du lundi au samedi, de 8 h à 19 h",
  basePath: "/azur-plomberie",
} as const;

export const DEMO_NOTICE = "Démonstration : entreprise fictive. Aucune demande n'est transmise.";

export const azurNav = [
  { label: "Services", href: "/azur-plomberie/services" },
  { label: "Salle de bain", href: "/azur-plomberie/salle-de-bain" },
  { label: "Secteur", href: "/azur-plomberie/zone-d-intervention" },
  { label: "L'artisan", href: "/azur-plomberie/a-propos" },
] as const;

export const quoteHref = (prestation?: string, urgent?: boolean) => {
  const q = new URLSearchParams();
  if (prestation) q.set("prestation", prestation);
  if (urgent) q.set("urgence", "1");
  const s = q.toString();
  return `/azur-plomberie/contact${s ? `?${s}` : ""}`;
};

export type PictoKey = "wrench" | "drop" | "drain" | "tap" | "heater" | "shower";

export type AzurService = {
  slug: string;
  n: string;
  title: string;
  short: string;
  picto: PictoKey;
  /** Valeur du formulaire de demande */
  prestation: string;
  intro: string;
  includes: string[];
  steps: string[];
  tips: string[];
  href?: string;
  /** Photo de la fiche. Sans photo, la fiche affiche le pictogramme. */
  photo?: { src: string; alt: string };
};

const photo = (slug: string, alt: string) => ({ src: `/azur/photos/${slug}.webp`, alt });

export const azurServices: AzurService[] = [
  {
    slug: "depannage",
    n: "1",
    title: "Dépannage",
    short: "Un robinet qui goutte, un joint fatigué, une chasse d'eau qui coule : on répare.",
    picto: "wrench",
    photo: photo("depannage", "Un plombier au travail sur une installation de cuivre et de PVC"),
    prestation: "Dépannage",
    intro: "Une panne de plomberie arrive toujours au mauvais moment. On trouve ce qui ne va pas, on sécurise l'installation si besoin, puis on répare ce qui doit l'être, sans en faire plus.",
    includes: [
      "Fuite sur un robinet, un flexible ou un joint",
      "Remplacement de joints, de flexibles et de petits accessoires",
      "Chasse d'eau qui coule ou qui ne se remplit plus",
      "Remise en service d'un équipement après réparation",
    ],
    steps: ["Vous décrivez la panne, avec une photo si possible.", "On vous dit quoi faire en attendant.", "On annonce le prix avant de commencer.", "On répare, on teste, on nettoie."],
    tips: ["Si l'eau coule, fermez le robinet d'arrêt le plus proche.", "N'utilisez plus l'équipement concerné.", "Prenez une photo : elle nous fait gagner du temps."],
  },
  {
    slug: "recherche-fuite",
    n: "2",
    title: "Recherche de fuite",
    short: "Une tache au plafond, un mur humide, une facture d'eau qui grimpe : on trouve d'où ça vient.",
    picto: "drop",
    photo: photo("recherche-fuite", "Un robinet d'arrêt à volant rouge"),
    prestation: "Fuite d'eau",
    intro: "Une fuite cachée ne se répare pas au hasard. Avant d'ouvrir quoi que ce soit, on écoute ce que vous avez remarqué et on cherche l'origine, pour intervenir au bon endroit.",
    includes: [
      "Analyse de ce que vous observez : humidité, bruit, consommation",
      "Contrôle des points accessibles : sous les éviers, joints, regards",
      "Explication claire de ce qui a été trouvé",
      "Proposition de réparation une fois l'origine connue",
    ],
    steps: ["Vous nous dites où et depuis quand.", "On vous pose quelques questions.", "On recherche l'origine sur place.", "On vous propose la réparation adaptée."],
    tips: ["Notez depuis quand le problème est apparu.", "Relevez votre compteur le soir, puis le matin sans utiliser d'eau.", "Ne percez et n'ouvrez aucune cloison avant le diagnostic."],
  },
  {
    slug: "debouchage",
    n: "3",
    title: "Débouchage",
    short: "L'évier se vide mal, la douche stagne, les WC refoulent : on rétablit l'écoulement.",
    picto: "drain",
    photo: photo("debouchage", "Deux robinets chromés au-dessus d'un évier en inox"),
    prestation: "Débouchage",
    intro: "Un écoulement lent finit souvent par se boucher complètement. On traite l'obstruction, on vérifie que tout s'écoule normalement et on vous explique comment éviter que ça revienne.",
    includes: ["Évier de cuisine et lave-vaisselle", "Lavabo, douche et baignoire", "WC et regards accessibles", "Conseils d'entretien après l'intervention"],
    steps: ["Vous nous indiquez le point d'eau concerné.", "On vérifie si un seul point d'eau est touché.", "On débouche avec la bonne méthode.", "On contrôle l'écoulement avec vous."],
    tips: ["Évitez les produits chimiques agressifs : ils compliquent l'intervention.", "Ne forcez pas avec un objet qui pourrait casser dans le tuyau.", "Dites-nous si plusieurs points d'eau sont touchés."],
  },
  {
    slug: "installation-sanitaire",
    n: "4",
    title: "Sanitaires",
    short: "Lavabo, robinetterie, WC : on pose ou on remplace, avec des finitions propres.",
    picto: "tap",
    photo: photo("installation-sanitaire", "Lavabo et douche vitrée habillée de faïence blanche"),
    prestation: "Installation sanitaire",
    intro: "Changer un lavabo ou installer de nouveaux WC paraît simple, jusqu'aux raccordements. On vous aide à choisir, on pose proprement et on vérifie que tout fonctionne avant de partir.",
    includes: ["Lavabo, vasque et robinetterie", "WC et mécanismes de chasse", "Raccordements d'eau chaude et d'eau froide", "Finitions autour de l'équipement posé"],
    steps: ["Vous nous dites ce que vous voulez poser.", "Une photo de l'existant nous suffit pour commencer.", "On vous envoie un devis clair.", "On pose, on teste, on nettoie."],
    tips: ["Donnez-nous la marque et le modèle si vous avez déjà choisi.", "Précisez si le meuble ou le carrelage reste en place.", "Photographiez les raccordements actuels."],
  },
  {
    slug: "chauffe-eau",
    n: "5",
    title: "Chauffe-eau",
    short: "Plus d'eau chaude, un ballon en fin de vie : on répare ou on remplace.",
    picto: "heater",
    prestation: "Chauffe-eau",
    intro: "Plus d'eau chaude, c'est vite un problème pour toute la maison. On regarde d'abord si l'appareil se répare, sinon on vous conseille un modèle adapté à votre logement et à votre famille.",
    includes: ["Diagnostic d'un manque d'eau chaude", "Remplacement d'un ballon électrique", "Conseils sur le volume adapté à votre foyer", "Mise en service et contrôle des raccordements"],
    steps: ["Vous nous décrivez le problème ou le projet.", "On regarde l'emplacement et le type d'appareil.", "On vous propose la solution adaptée.", "On installe et on vérifie."],
    tips: ["En cas de fuite, coupez le disjoncteur du ballon et fermez son arrivée d'eau.", "Notez la marque et le volume, indiqués sur l'étiquette.", "Dites-nous combien de personnes vivent chez vous."],
  },
  {
    slug: "renovation-salle-de-bain",
    n: "6",
    title: "Salle de bain",
    short: "Remplacer la baignoire par une douche, tout refaire : on s'occupe de la plomberie du projet.",
    picto: "shower",
    photo: photo("renovation-salle-de-bain", "Douche de plain-pied en faïence blanche"),
    prestation: "Rénovation salle de bain",
    href: "/azur-plomberie/salle-de-bain",
    intro: "Rénover une salle de bain, c'est d'abord une question d'arrivées et d'évacuations. On étudie votre pièce, puis on vous dit ce qui est possible, à quel prix et dans quel ordre.",
    includes: ["Remplacement d'une baignoire par une douche", "Douche à l'italienne, selon votre pièce", "Lavabo, robinetterie et WC", "Reprise des arrivées et des évacuations"],
    steps: ["Vous nous décrivez votre projet.", "On étudie la pièce telle qu'elle est.", "On vous envoie un devis détaillé.", "On réalise les travaux aux dates prévues."],
    tips: ["Dites-nous si vous gardez le carrelage.", "Précisez l'étage et les contraintes d'accès.", "Envoyez quelques photos de la pièce."],
  },
];

export const getAzurService = (slug: string) => azurServices.find((s) => s.slug === slug);

/** La maison en coupe. x et y : position du point cliquable, dans le dessin de 960 × 720. */
export type Fixture = {
  key: string;
  label: string;
  x: number;
  y: number;
  /** Trajet de l'eau depuis le compteur */
  pipe: string;
  title: string;
  symptoms: string[];
  reflex: string;
  service: string;
  urgent?: boolean;
};

export const fixtures: Fixture[] = [
  {
    key: "douche",
    label: "Douche",
    x: 170,
    y: 270,
    pipe: "M250 650H540V205H150",
    title: "La douche",
    symptoms: ["L'eau met du temps à s'évacuer", "Le mitigeur goutte", "Le joint du receveur noircit"],
    reflex: "Arrêtez d'utiliser la douche si l'eau stagne ou passe sous le receveur : le plafond du dessous peut en souffrir.",
    service: "debouchage",
  },
  {
    key: "lavabo",
    label: "Lavabo",
    x: 322,
    y: 300,
    pipe: "M250 650H540V345H322",
    title: "Le lavabo",
    symptoms: ["Le robinet goutte sans arrêt", "Ça coule sous le meuble", "L'eau s'évacue lentement"],
    reflex: "Fermez les deux petits robinets d'arrêt sous le lavabo, s'il y en a, et placez une bassine en dessous.",
    service: "depannage",
  },
  {
    key: "wc",
    label: "WC",
    x: 450,
    y: 300,
    pipe: "M250 650H540V345H470",
    title: "Les WC",
    symptoms: ["La chasse d'eau coule en continu", "La cuvette se vide mal ou déborde", "Une odeur persiste"],
    reflex: "Fermez le petit robinet d'arrêt à côté de la chasse d'eau, et ne tirez plus la chasse si la cuvette monte.",
    service: "debouchage",
  },
  {
    key: "plafond",
    label: "Tache au plafond",
    x: 310,
    y: 402,
    pipe: "M250 650H540V384H310",
    title: "Une tache au plafond",
    symptoms: ["Une auréole qui grandit", "De la peinture qui cloque", "Des gouttes qui tombent"],
    reflex: "Si l'eau approche d'une lampe ou d'une prise, coupez le courant au disjoncteur. Puis fermez l'eau au compteur.",
    service: "recherche-fuite",
    urgent: true,
  },
  {
    key: "evier",
    label: "Évier",
    x: 210,
    y: 470,
    pipe: "M250 650H540V545H210",
    title: "L'évier de la cuisine",
    symptoms: ["L'eau remonte ou s'écoule lentement", "Le siphon goutte dans le meuble", "Le lave-vaisselle refoule"],
    reflex: "N'ajoutez pas de déboucheur chimique. Videz le meuble et placez une bassine sous le siphon.",
    service: "debouchage",
  },
  {
    key: "ballon",
    label: "Chauffe-eau",
    x: 720,
    y: 628,
    pipe: "M250 650H700",
    title: "Le chauffe-eau",
    symptoms: ["Plus d'eau chaude du tout", "De l'eau au pied du ballon", "Le disjoncteur saute"],
    reflex: "En cas de fuite, coupez le disjoncteur du ballon puis fermez son arrivée d'eau froide.",
    service: "chauffe-eau",
    urgent: true,
  },
  {
    key: "vanne",
    label: "Vanne d'arrêt",
    x: 250,
    y: 628,
    pipe: "M60 650H250",
    title: "La vanne d'arrêt",
    symptoms: ["Vous ne savez pas où couper l'eau", "La vanne est bloquée", "Elle ne ferme plus complètement"],
    reflex: "Elle se trouve souvent près du compteur d'eau. Repérez-la dès aujourd'hui : c'est le premier geste en cas de fuite.",
    service: "depannage",
  },
];

export const reflexSteps = [
  { title: "Coupez l'eau", text: "Fermez le robinet d'arrêt le plus proche. Si la fuite continue, fermez la vanne près du compteur." },
  { title: "Protégez ce qui compte", text: "Si l'eau approche des prises ou des appareils, coupez le courant au disjoncteur." },
  { title: "Prenez une photo", text: "Une image de la fuite et de l'installation nous aide à préparer la bonne intervention." },
  { title: "Prévenez-nous", text: "Décrivez ce que vous voyez dans le formulaire : on s'occupe de la suite." },
];

export const azurSteps = [
  { n: "1", title: "Vous décrivez", text: "Le problème ou le projet, en quelques mots, avec une photo si vous pouvez." },
  { n: "2", title: "On regarde", text: "On étudie votre demande et on vous pose les bonnes questions." },
  { n: "3", title: "On annonce le prix", text: "Vous savez ce qui sera fait et combien ça coûte, avant le début des travaux." },
  { n: "4", title: "On intervient", text: "On répare, on teste devant vous et on laisse la pièce propre." },
];

export const azurPromises = [
  { title: "Le prix avant les travaux", text: "Rien ne commence sans votre accord sur le devis." },
  { title: "Des mots simples", text: "On vous explique le problème et les solutions, sans jargon." },
  { title: "Le strict nécessaire", text: "On répare ce qui doit l'être. Pas de remplacement inutile." },
  { title: "Une pièce propre", text: "Bâche, aspirateur et chiffon : on repart sans laisser de trace." },
];

/** Le réseau du secteur. Schéma volontairement simplifié, comme un plan de tuyauterie. */
export const azurZones = [
  { key: "saint-raphael", name: "Saint-Raphaël", text: "Notre atelier est ici.", x: 640, y: 96, pipe: "" },
  { key: "frejus", name: "Fréjus", text: "Juste à côté, du centre historique à la plage.", x: 480, y: 96, pipe: "M640 96H480" },
  { key: "puget", name: "Puget-sur-Argens", text: "Le long de l'Argens, maisons et résidences.", x: 320, y: 96, pipe: "M640 96H320" },
  { key: "roquebrune", name: "Roquebrune-sur-Argens", text: "Du village jusqu'aux quartiers de la plaine.", x: 160, y: 96, pipe: "M640 96H160" },
  { key: "issambres", name: "Les Issambres", text: "Villas et appartements en bord de mer.", x: 470, y: 300, pipe: "M640 96V300H470" },
  { key: "sainte-maxime", name: "Sainte-Maxime", text: "De l'autre côté du golfe, sur demande.", x: 250, y: 300, pipe: "M640 96V300H250" },
];

export const azurSdbItems = [
  { title: "La baignoire devient une douche", text: "On libère de la place et on reprend les évacuations si nécessaire." },
  { title: "La douche à l'italienne", text: "Un espace ouvert et de plain-pied, étudié selon la pente disponible." },
  { title: "Lavabo et robinetterie", text: "Des équipements choisis avec vous, et posés proprement." },
  { title: "Les WC", text: "Un modèle posé au sol ou suspendu, selon la configuration de la pièce." },
  { title: "Une nouvelle organisation", text: "On vérifie ce qui peut bouger, avant que vous ne choisissiez." },
  { title: "Les réseaux", text: "Les arrivées et les évacuations sont reprises pour durer." },
];

export const azurGallery = [
  { src: "/azur/hero.webp", alt: "Baignoire îlot et vasque dans une salle de bain lumineuse", wide: true },
  { src: "/azur/service-debouchage.webp", alt: "Douche vitrée et meuble double vasque" },
  { src: "/azur/service-chauffe-eau.webp", alt: "Salle de bain avec baignoire, WC suspendu et bois clair" },
  { src: "/azur/sdb-hero.webp", alt: "Lavabo sur colonne près d'une fenêtre, dans une salle de bain blanche" },
];

export const azurFaq = [
  { q: "Que faire en premier en cas de fuite ?", a: "Fermez le robinet d'arrêt le plus proche, ou la vanne située près du compteur. Si l'eau approche d'une prise, coupez aussi le courant au disjoncteur." },
  { q: "Comment obtenir un devis ?", a: "Décrivez votre besoin dans le formulaire, avec une photo si vous pouvez. On vous envoie ensuite un devis clair, à valider avant le début des travaux." },
  { q: "Vous déplacez-vous pour une petite réparation ?", a: "Oui. Un joint, un robinet ou une chasse d'eau, ça compte aussi." },
  { q: "Pouvez-vous rénover toute une salle de bain ?", a: "On s'occupe de la plomberie du projet : douche, lavabo, WC, arrivées et évacuations. On étudie d'abord votre pièce." },
  { q: "Comment se passe une recherche de fuite ?", a: "On part de ce que vous avez remarqué, puis on contrôle les points accessibles pour trouver l'origine avant d'ouvrir quoi que ce soit." },
  { q: "Dans quelles communes intervenez-vous ?", a: "À Saint-Raphaël, Fréjus, Puget-sur-Argens, Roquebrune-sur-Argens et Les Issambres. Sainte-Maxime sur demande." },
];

export const azurPrestationOptions = azurServices.map((s) => ({ value: s.prestation, label: s.title, picto: s.picto }));

export const azurValues = [
  { title: "On explique", text: "Vous devez comprendre ce qui se passe chez vous. On vous montre le problème, et on vous dit ce qui peut attendre et ce qui ne le peut pas." },
  { title: "On annonce", text: "Le prix est fixé avant de commencer. Si on découvre autre chose en cours de route, on s'arrête et on vous en parle d'abord." },
  { title: "On range", text: "Une bonne réparation ne laisse pas de trace. On protège le sol, on nettoie et on vérifie tout avec vous avant de partir." },
];
