/**
 * Configuration centrale du site NEXWORKS AGENCY.
 * Modifiez ici (ou via .env.local) les informations de contact. Rien n'est inventé :
 * les champs non renseignés ne sont tout simplement pas affichés.
 */
const PRODUCTION_URL = "https://www.nexworks.agency";

/** En production, jamais d'adresse locale : Google la prendrait pour l'adresse officielle du site. */
function resolveSiteUrl() {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/$/, "");
  if (process.env.NODE_ENV !== "production") return configured || "http://localhost:3000";
  return !configured || /localhost|127\.0\.0\.1/.test(configured) ? PRODUCTION_URL : configured;
}

const env = (v: string | undefined) => (v || "").trim();

export const siteConfig = {
  name: "NEXWORKS AGENCY",
  shortName: "NEXWORKS",
  tagline: "Concevoir. Optimiser. Développer.",
  promise: "Nous transformons votre présence digitale en un véritable levier de croissance.",
  description:
    "NEXWORKS AGENCY est une agence web spécialisée dans la création de sites internet sur mesure, la refonte et le design UX/UI, le référencement naturel (SEO) et l'optimisation pour les assistants IA (GEO). Tous les projets sont réalisés sur devis.",
  url: resolveSiteUrl(),
  locale: "fr_FR",
  language: "fr",

  /** Version anglaise */
  en: {
    tagline: "Design. Optimise. Build.",
    promise: "We turn your digital presence into a real growth lever.",
    description:
      "NEXWORKS AGENCY is a web agency specialising in custom website creation, redesign and UX/UI design, search engine optimisation (SEO) and optimisation for AI assistants (GEO). Every project is quoted individually.",
  },

  /** Adresse e-mail de contact (variable NEXT_PUBLIC_CONTACT_EMAIL). Vide = non affichée. */
  contactEmail: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim(),

  /** Code fourni par Google Search Console (facultatif si le domaine est vérifié par DNS). */
  googleVerification: env(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
  bingVerification: env(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION),

  /** Mentions légales : rien n'est inventé, seuls les champs renseignés sont affichés. */
  legal: {
    company: env(process.env.NEXT_PUBLIC_LEGAL_COMPANY),
    form: env(process.env.NEXT_PUBLIC_LEGAL_FORM),
    capital: env(process.env.NEXT_PUBLIC_LEGAL_CAPITAL),
    address: env(process.env.NEXT_PUBLIC_LEGAL_ADDRESS),
    city: env(process.env.NEXT_PUBLIC_LEGAL_CITY),
    postalCode: env(process.env.NEXT_PUBLIC_LEGAL_POSTAL_CODE),
    siren: env(process.env.NEXT_PUBLIC_LEGAL_SIREN),
    vat: env(process.env.NEXT_PUBLIC_LEGAL_VAT),
    director: env(process.env.NEXT_PUBLIC_LEGAL_DIRECTOR),
    phone: env(process.env.NEXT_PUBLIC_LEGAL_PHONE),
  },

  /** Réseaux sociaux : laisser vide tant qu'ils n'existent pas. */
  social: {
    linkedin: (process.env.NEXT_PUBLIC_LINKEDIN_URL || "").trim(),
    instagram: (process.env.NEXT_PUBLIC_INSTAGRAM_URL || "").trim(),
  },
} as const;

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Méthode", href: "/notre-approche" },
  { label: "Contact", href: "/contact" },
] as const;

/** Menu dans la langue demandée */
export const navigationFor = (lang: "fr" | "en") =>
  lang === "en"
    ? ([
        { label: "Services", href: "/en/services" },
        { label: "Work", href: "/en/work" },
        { label: "Approach", href: "/en/approach" },
        { label: "Contact", href: "/en/contact" },
      ] as const)
    : navigation;

export const quoteHref = "/contact?objet=devis";
export const quoteHrefFor = (lang: "fr" | "en") => (lang === "en" ? "/en/contact?objet=quote" : quoteHref);
