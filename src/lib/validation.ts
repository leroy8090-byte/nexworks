/** Validation du formulaire de contact — partagée entre le client et l'API (source de vérité unique). */

export const projectTypes = [
  "Création de site web",
  "Design & refonte",
  "Référencement SEO",
  "Optimisation GEO",
  "Plusieurs services / accompagnement global",
  "Autre ou je ne sais pas encore",
] as const;

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

export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  const name = v.name.trim();
  const company = v.company.trim();
  const email = v.email.trim();
  const phone = v.phone.trim();
  const message = v.message.trim();

  if (!name) e.name = "Indiquez votre nom.";
  else if (name.length < 2) e.name = "Votre nom semble trop court.";
  else if (name.length > limits.name) e.name = `Votre nom ne peut pas dépasser ${limits.name} caractères.`;

  if (!company) e.company = "Indiquez le nom de votre entreprise (ou « Indépendant »).";
  else if (company.length > limits.company) e.company = `Ce champ ne peut pas dépasser ${limits.company} caractères.`;

  if (!email) e.email = "Indiquez votre adresse e-mail.";
  else if (!EMAIL_RE.test(email) || email.length > limits.email)
    e.email = "Cette adresse e-mail semble invalide (exemple : nom@entreprise.fr).";

  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!PHONE_RE.test(phone) || digits.length < 6 || digits.length > 15 || phone.length > limits.phone)
      e.phone = "Ce numéro semble invalide. Vous pouvez laisser ce champ vide.";
  }

  if (!v.projectType) e.projectType = "Choisissez le type de projet.";
  else if (!(projectTypes as readonly string[]).includes(v.projectType))
    e.projectType = "Type de projet non reconnu. Choisissez une option de la liste.";

  if (!message) e.message = "Décrivez-nous votre besoin en quelques lignes.";
  else if (message.length < limits.message.min)
    e.message = `Quelques détails de plus nous aideraient (${limits.message.min} caractères minimum, ${message.length} actuellement).`;
  else if (message.length > limits.message.max)
    e.message = `Votre message est trop long (${limits.message.max} caractères maximum).`;

  if (!v.consent) e.consent = "Merci d'accepter l'utilisation de vos données pour traiter votre demande.";

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
