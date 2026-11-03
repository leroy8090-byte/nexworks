/**
 * Configuration centrale du site NEXWORKS AGENCY.
 * Modifiez ici (ou via .env.local) les informations de contact. Rien n'est inventé :
 * les champs non renseignés ne sont tout simplement pas affichés.
 */
export const siteConfig = {
  name: "NEXWORKS AGENCY",
  shortName: "NEXWORKS",
  tagline: "Concevoir. Optimiser. Développer.",
  promise: "Nous transformons votre présence digitale en un véritable levier de croissance.",
  description:
    "NEXWORKS AGENCY est une agence digitale spécialisée dans la création de sites web, le design UX/UI, le référencement SEO et l'optimisation GEO pour la visibilité dans les moteurs de réponse IA.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "fr_FR",
  language: "fr",

  /** Adresse e-mail de contact (variable NEXT_PUBLIC_CONTACT_EMAIL). Vide = non affichée. */
  contactEmail: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim(),

  /** Réseaux sociaux : laisser vide tant qu'ils n'existent pas. */
  social: {
    linkedin: (process.env.NEXT_PUBLIC_LINKEDIN_URL || "").trim(),
    instagram: (process.env.NEXT_PUBLIC_INSTAGRAM_URL || "").trim(),
  },
} as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Nos réalisations", href: "/realisations" },
  { label: "Notre approche", href: "/notre-approche" },
  { label: "Contact", href: "/contact" },
] as const;

export const quoteHref = "/contact?objet=devis";
