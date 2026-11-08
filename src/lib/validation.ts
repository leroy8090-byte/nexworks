/** Validation du formulaire de contact — partagée entre le client et l'API (source de vérité unique). */
import type { Lang } from "@/i18n/lang";

/** Valeurs envoyées (et reçues par e-mail) : toujours en français, quelle que soit la langue du site */
export const projectTypes = [
  "Création de site web",
  "Design & refonte",
  "Référencement SEO",
  "Optimisation GEO",
  "Plusieurs services / accompagnement global",
  "Autre ou je ne sais pas encore",
] as const;

/** Libellés affichés dans la liste déroulante */
export const projectTypeLabels: Record<Lang, readonly string[]> = {
  fr: projectTypes,
  en: [
    "Website creation",
    "Design & redesign",
    "SEO",
    "GEO optimisation",
    "Several services / full support",
    "Something else, or not sure yet",
  ],
};

export type ContactValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  consent: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const limits = { message: { min: 20, max: 3000 }, name: 100, company: 120, email: 254, phone: 30 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d][\d\s().\-+]{5,}$/;

const messages = {
  fr: {
    name: "Indiquez votre nom.",
    nameShort: "Votre nom semble trop court.",
    nameLong: (n: number) => `Votre nom ne peut pas dépasser ${n} caractères.`,
    company: "Indiquez le nom de votre entreprise (ou « Indépendant »).",
    companyLong: (n: number) => `Ce champ ne peut pas dépasser ${n} caractères.`,
    email: "Indiquez votre adresse e-mail.",
    emailBad: "Cette adresse e-mail semble invalide (exemple : nom@entreprise.fr).",
    phone: "Ce numéro semble invalide. Vous pouvez laisser ce champ vide.",
    type: "Choisissez le type de projet.",
    typeBad: "Type de projet non reconnu. Choisissez une option de la liste.",
    message: "Décrivez-nous votre besoin en quelques lignes.",
    messageShort: (min: number, now: number) => `Quelques détails de plus nous aideraient (${min} caractères minimum, ${now} actuellement).`,
    messageLong: (n: number) => `Votre message est trop long (${n} caractères maximum).`,
    consent: "Merci d'accepter l'utilisation de vos données pour traiter votre demande.",
  },
  en: {
    name: "Please enter your name.",
    nameShort: "Your name looks too short.",
    nameLong: (n: number) => `Your name can't be longer than ${n} characters.`,
    company: "Please enter your company name (or “Freelance”).",
    companyLong: (n: number) => `This field can't be longer than ${n} characters.`,
    email: "Please enter your email address.",
    emailBad: "This email address looks invalid (example: name@company.com).",
    phone: "This number looks invalid. You can leave this field empty.",
    type: "Please choose a project type.",
    typeBad: "Unknown project type. Please choose an option from the list.",
    message: "Tell us what you need in a few lines.",
    messageShort: (min: number, now: number) => `A few more details would help us (${min} characters minimum, ${now} so far).`,
    messageLong: (n: number) => `Your message is too long (${n} characters maximum).`,
    consent: "Please agree to the use of your data so we can handle your request.",
  },
} as const;

export function validateContact(v: ContactValues, lang: Lang = "fr"): ContactErrors {
  const m = messages[lang];
  const e: ContactErrors = {};
  const name = v.name.trim();
  const company = v.company.trim();
  const email = v.email.trim();
  const phone = v.phone.trim();
  const message = v.message.trim();

  if (!name) e.name = m.name;
  else if (name.length < 2) e.name = m.nameShort;
  else if (name.length > limits.name) e.name = m.nameLong(limits.name);

  if (!company) e.company = m.company;
  else if (company.length > limits.company) e.company = m.companyLong(limits.company);

  if (!email) e.email = m.email;
  else if (!EMAIL_RE.test(email) || email.length > limits.email) e.email = m.emailBad;

  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!PHONE_RE.test(phone) || digits.length < 6 || digits.length > 15 || phone.length > limits.phone) e.phone = m.phone;
  }

  if (!v.projectType) e.projectType = m.type;
  else if (!(projectTypes as readonly string[]).includes(v.projectType)) e.projectType = m.typeBad;

  if (!message) e.message = m.message;
  else if (message.length < limits.message.min) e.message = m.messageShort(limits.message.min, message.length);
  else if (message.length > limits.message.max) e.message = m.messageLong(limits.message.max);

  if (!v.consent) e.consent = m.consent;

  return e;
}

export const emptyContact: ContactValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
  consent: false,
};

export type ContactApiResponse =
  | { status: "sent" }
  | { status: "demo" }
  | { status: "invalid"; errors: ContactErrors }
  | { status: "error"; message: string };
