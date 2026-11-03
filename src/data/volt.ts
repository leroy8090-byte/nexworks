/**
 * VOLT FITNESS CLUB — club de sport FICTIF, site de démonstration réalisé par NEXWORKS AGENCY.
 * Aucun tarif, horaire, coach ou coordonnée n'est réel. Aucun faux avis client.
 */
const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : "");

export const volt = {
  name: "VOLT FITNESS CLUB",
  short: "VOLT",
  basePath: "/volt-fitness",
  slogan: "PUSH YOUR LIMITS. DEFINE YOURSELF.",
  location: "Saint-Raphaël",
  region: "Côte d'Azur",
  description:
    "VOLT FITNESS CLUB — club de fitness et de performance fictif à Saint-Raphaël, Côte d'Azur. Site de démonstration réalisé par NEXWORKS AGENCY.",
  promise: "Un club pensé pour ceux qui s'entraînent avec intention : espace force, cardio, cours collectifs et coaching.",
  phone: clean(process.env.NEXT_PUBLIC_VOLT_PHONE),
  email: clean(process.env.NEXT_PUBLIC_VOLT_EMAIL),
};

export const voltNav = [
  { label: "Accueil", href: "/volt-fitness" },
  { label: "Club", href: "/volt-fitness/club" },
  { label: "Programmes", href: "/volt-fitness/programmes" },
  { label: "Planning", href: "/volt-fitness/planning" },
  { label: "Abonnements", href: "/volt-fitness/abonnements" },
  { label: "Contact", href: "/volt-fitness/contact" },
];

/** Chiffres illustratifs — fictifs. */
export const voltStats = [
  { value: 1400, suffix: " m²", label: "d'espace d'entraînement" },
  { value: 120, suffix: "+", label: "machines et stations" },
  { value: 40, suffix: "", label: "cours par semaine" },
  { value: 7, suffix: "j/7", label: "club ouvert (démo)" },
];

export const voltUnivers = [
  {
    key: "strength",
    title: "STRENGTH",
    tag: "01",
    text: "Racks, barres, haltères jusqu'à 60 kg et plateformes. L'espace des charges lourdes et de la technique.",
    image: "/volt/strength.webp",
    alt: "Espace force du club avec barres et racks dans une lumière sombre",
  },
  {
    key: "performance",
    title: "PERFORMANCE",
    tag: "02",
    text: "Zone fonctionnelle, traîneaux, cordes et sacs : un terrain pour la condition physique et l'explosivité.",
    image: "/volt/performance.webp",
    alt: "Zone d'entraînement fonctionnel avec traîneau et cordes",
  },
  {
    key: "energy",
    title: "ENERGY",
    tag: "03",
    text: "Cours collectifs rythmés, cardio et studio : l'énergie du groupe pour aller plus loin.",
    image: "/volt/energy.webp",
    alt: "Studio de cours collectifs en pleine session cardio",
  },
];

export const voltSpaces = [
  { slug: "force", title: "Plateau force", text: "Racks, plateformes d'haltérophilie, machines guidées.", image: "/volt/space-force.webp", size: "lg" },
  { slug: "cardio", title: "Plateau cardio", text: "Tapis, rameurs, vélos et skis ergomètres.", image: "/volt/space-cardio.webp", size: "sm" },
  { slug: "studio", title: "Studio collectif", text: "Sol amorti, sonorisation, éclairage modulable.", image: "/volt/space-studio.webp", size: "sm" },
  { slug: "functional", title: "Zone fonctionnelle", text: "Traîneaux, kettlebells, cordes, caisses.", image: "/volt/space-functional.webp", size: "md" },
  { slug: "recovery", title: "Récupération", text: "Étirements, rouleaux, espace calme (imaginé).", image: "/volt/space-recovery.webp", size: "md" },
];

export const voltDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"] as const;
export type VoltDay = (typeof voltDays)[number];
export type VoltLevel = "Tous niveaux" | "Intermédiaire" | "Avancé";
export const voltLevels: VoltLevel[] = ["Tous niveaux", "Intermédiaire", "Avancé"];

export type VoltClass = {
  id: string;
  day: VoltDay;
  time: string;
  name: string;
  duration: string;
  level: VoltLevel;
  coach: string;
  room: string;
};

/** Planning fictif — coachs imaginaires (prénoms seuls). */
export const voltSchedule: VoltClass[] = [
  { id: "lun-1", day: "Lundi", time: "07:00", name: "Strength Base", duration: "60 min", level: "Tous niveaux", coach: "Coach Léo", room: "Plateau force" },
  { id: "lun-2", day: "Lundi", time: "12:30", name: "HIIT Express", duration: "30 min", level: "Intermédiaire", coach: "Coach Maya", room: "Studio" },
  { id: "lun-3", day: "Lundi", time: "18:30", name: "Power Circuit", duration: "45 min", level: "Avancé", coach: "Coach Noé", room: "Zone fonctionnelle" },
  { id: "mar-1", day: "Mardi", time: "07:30", name: "Mobility Flow", duration: "45 min", level: "Tous niveaux", coach: "Coach Inès", room: "Studio" },
  { id: "mar-2", day: "Mardi", time: "12:15", name: "Cardio Burst", duration: "40 min", level: "Intermédiaire", coach: "Coach Maya", room: "Plateau cardio" },
  { id: "mar-3", day: "Mardi", time: "19:00", name: "Heavy Lifts", duration: "75 min", level: "Avancé", coach: "Coach Léo", room: "Plateau force" },
  { id: "mer-1", day: "Mercredi", time: "07:00", name: "Core & Posture", duration: "30 min", level: "Tous niveaux", coach: "Coach Inès", room: "Studio" },
  { id: "mer-2", day: "Mercredi", time: "12:30", name: "Functional Train", duration: "45 min", level: "Intermédiaire", coach: "Coach Noé", room: "Zone fonctionnelle" },
  { id: "mer-3", day: "Mercredi", time: "18:30", name: "Energy Beat", duration: "50 min", level: "Tous niveaux", coach: "Coach Maya", room: "Studio" },
  { id: "jeu-1", day: "Jeudi", time: "07:00", name: "Strength Base", duration: "60 min", level: "Tous niveaux", coach: "Coach Léo", room: "Plateau force" },
  { id: "jeu-2", day: "Jeudi", time: "12:30", name: "HIIT Express", duration: "30 min", level: "Intermédiaire", coach: "Coach Noé", room: "Studio" },
  { id: "jeu-3", day: "Jeudi", time: "19:00", name: "Athlete Conditioning", duration: "60 min", level: "Avancé", coach: "Coach Noé", room: "Zone fonctionnelle" },
  { id: "ven-1", day: "Vendredi", time: "07:30", name: "Mobility Flow", duration: "45 min", level: "Tous niveaux", coach: "Coach Inès", room: "Studio" },
  { id: "ven-2", day: "Vendredi", time: "12:15", name: "Power Circuit", duration: "45 min", level: "Intermédiaire", coach: "Coach Léo", room: "Zone fonctionnelle" },
  { id: "ven-3", day: "Vendredi", time: "18:00", name: "Energy Beat", duration: "50 min", level: "Tous niveaux", coach: "Coach Maya", room: "Studio" },
  { id: "sam-1", day: "Samedi", time: "09:00", name: "Team WOD", duration: "60 min", level: "Intermédiaire", coach: "Coach Noé", room: "Zone fonctionnelle" },
  { id: "sam-2", day: "Samedi", time: "10:30", name: "Strength Base", duration: "60 min", level: "Tous niveaux", coach: "Coach Léo", room: "Plateau force" },
  { id: "sam-3", day: "Samedi", time: "11:45", name: "Stretch & Reset", duration: "30 min", level: "Tous niveaux", coach: "Coach Inès", room: "Studio" },
  { id: "dim-1", day: "Dimanche", time: "10:00", name: "Open Sunday Flow", duration: "45 min", level: "Tous niveaux", coach: "Coach Inès", room: "Studio" },
  { id: "dim-2", day: "Dimanche", time: "11:00", name: "Cardio Burst", duration: "40 min", level: "Intermédiaire", coach: "Coach Maya", room: "Plateau cardio" },
];

export type VoltPlan = {
  slug: string;
  name: string;
  price: number;
  tagline: string;
  highlight: boolean;
  features: string[];
};

/** Tarifs fictifs, à titre d'illustration. */
export const voltPlans: VoltPlan[] = [
  {
    slug: "start",
    name: "START",
    price: 29,
    tagline: "L'essentiel pour s'entraîner régulièrement.",
    highlight: false,
    features: ["Accès plateaux force et cardio", "Vestiaires et douches", "Application planning", "Sans engagement (démo)"],
  },
  {
    slug: "performance",
    name: "PERFORMANCE",
    price: 49,
    tagline: "Le plein accès pour progresser avec méthode.",
    highlight: true,
    features: ["Tout START", "Tous les cours collectifs", "Zone fonctionnelle", "1 bilan de départ offert", "Invité 1 fois / mois"],
  },
  {
    slug: "elite",
    name: "ELITE",
    price: 79,
    tagline: "L'accompagnement le plus complet.",
    highlight: false,
    features: ["Tout PERFORMANCE", "2 séances de coaching / mois", "Programme personnalisé", "Accès prioritaire aux cours", "Espace récupération"],
  },
];

export const voltCompare: { label: string; values: (boolean | string)[] }[] = [
  { label: "Plateaux force & cardio", values: [true, true, true] },
  { label: "Cours collectifs", values: ["2 / sem.", "Illimités", "Illimités"] },
  { label: "Zone fonctionnelle", values: [false, true, true] },
  { label: "Bilan de départ", values: [false, true, true] },
  { label: "Coaching individuel", values: [false, false, "2 / mois"] },
  { label: "Programme personnalisé", values: [false, false, true] },
  { label: "Espace récupération", values: [false, false, true] },
  { label: "Invité", values: [false, "1 / mois", "2 / mois"] },
];

export const voltProgrammes = [
  {
    slug: "force-fondations",
    title: "Force & Fondations",
    category: "Strength",
    level: "Tous niveaux",
    duration: "8 semaines",
    frequency: "3 séances / semaine",
    summary: "Apprendre les mouvements de base, structurer sa technique et progresser par paliers.",
    details: ["Squat, développé, soulevé de terre, tirage", "Progression de charge encadrée", "Bilan technique à mi-parcours"],
    image: "/volt/programme-force.webp",
  },
  {
    slug: "conditioning",
    title: "Conditioning Lab",
    category: "Performance",
    level: "Intermédiaire",
    duration: "6 semaines",
    frequency: "3 séances / semaine",
    summary: "Circuits, intervalles et travail fonctionnel pour développer sa condition physique générale.",
    details: ["Intervalles courts et longs", "Traîneaux, cordes, kettlebells", "Suivi des performances"],
    image: "/volt/programme-conditioning.webp",
  },
  {
    slug: "energy-cardio",
    title: "Energy Cardio",
    category: "Energy",
    level: "Tous niveaux",
    duration: "4 semaines",
    frequency: "4 séances / semaine",
    summary: "Un parcours rythmé mêlant cours collectifs et cardio pour reprendre le sport avec plaisir.",
    details: ["Cours collectifs variés", "Cardio progressif", "Étirements guidés"],
    image: "/volt/programme-energy.webp",
  },
  {
    slug: "athlete",
    title: "Athlete Track",
    category: "Performance",
    level: "Avancé",
    duration: "12 semaines",
    frequency: "4–5 séances / semaine",
    summary: "Un cycle exigeant, structuré en blocs, pour les pratiquants déjà expérimentés.",
    details: ["Périodisation en blocs", "Force et puissance", "Séances de coaching incluses (ELITE)"],
    image: "/volt/programme-athlete.webp",
  },
  {
    slug: "mobility",
    title: "Mobility & Reset",
    category: "Energy",
    level: "Tous niveaux",
    duration: "4 semaines",
    frequency: "2–3 séances / semaine",
    summary: "Mobilité, posture et récupération active pour mieux bouger entre deux séances intenses.",
    details: ["Routines de mobilité", "Travail de gainage", "Techniques de relâchement"],
    image: "/volt/programme-mobility.webp",
  },
  {
    slug: "reprise",
    title: "Reprise en douceur",
    category: "Strength",
    level: "Tous niveaux",
    duration: "6 semaines",
    frequency: "2–3 séances / semaine",
    summary: "Un retour progressif à l'activité physique, à votre rythme. Ne remplace pas un avis médical.",
    details: ["Intensité adaptable", "Accompagnement pas à pas", "Objectifs réalistes et mesurables"],
    image: "/volt/programme-reprise.webp",
  },
];

export const voltFaq = [
  {
    q: "Ce club existe-t-il vraiment ?",
    a: "Non. VOLT FITNESS CLUB est un club fictif imaginé par NEXWORKS AGENCY pour son portfolio. Tarifs, horaires et coachs sont purement illustratifs.",
  },
  {
    q: "Puis-je réserver un cours ?",
    a: "Les boutons de réservation sont une démonstration : ils illustrent le parcours, mais aucune place n'est réellement réservée.",
  },
  {
    q: "Les abonnements sont-ils avec engagement ?",
    a: "Dans ce concept, START est présenté sans engagement. Les conditions détaillées d'un vrai club seraient précisées dans ses conditions générales.",
  },
  {
    q: "Faut-il être sportif pour commencer ?",
    a: "Le concept propose des cours « tous niveaux » et des programmes de reprise. En cas de doute sur votre santé, demandez l'avis d'un professionnel de santé.",
  },
  {
    q: "Les résultats sont-ils garantis ?",
    a: "Aucun résultat n'est garanti : la progression dépend de chacun. Le site ne fait aucune promesse médicale ou esthétique.",
  },
  {
    q: "Comment contacter le club ?",
    a: "Via le formulaire de démonstration. Aucune coordonnée réelle n'est affichée tant qu'elle n'est pas renseignée dans la configuration du site.",
  },
];

/** Citations de philosophie du club — texte de marque, PAS des avis clients. */
export const voltQuotes = [
  { text: "La régularité bat l'intensité d'un jour.", label: "Philosophie VOLT" },
  { text: "Mesurez-vous à vous-même, pas aux autres.", label: "Philosophie VOLT" },
  { text: "La technique d'abord. La charge ensuite.", label: "Philosophie VOLT" },
  { text: "Se reposer fait partie de l'entraînement.", label: "Philosophie VOLT" },
  { text: "Un petit pas chaque semaine vaut mieux qu'un grand saut.", label: "Philosophie VOLT" },
];

export const voltManifesto = [
  "Pas de promesse miracle.",
  "Du travail, de la méthode, du rythme.",
  "Un lieu où l'on vient pour soi.",
];
