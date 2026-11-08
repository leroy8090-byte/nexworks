/**
 * Langues du site. Le français est à la racine (/proprietes), l'anglais sous /en avec des adresses traduites
 * (/en/properties). En interne, toutes les pages vivent sous app/[lang]/ avec les noms de dossier français :
 * le fichier proxy.ts fait la correspondance.
 */
export const LOCALES = ["fr", "en"] as const;
export type Lang = (typeof LOCALES)[number];
export const isLang = (v: string): v is Lang => (LOCALES as readonly string[]).includes(v);
export const asLang = (v: string): Lang => (isLang(v) ? v : "fr");

/** Premier segment d'adresse : nom du dossier (français) → adresse anglaise */
const EN_SEGMENTS: Record<string, string> = {
  proprietes: "properties", vendre: "sell", "collection-privee": "private-collection", agence: "agency",
  selection: "my-selection", "mentions-legales": "legal-notice", confidentialite: "privacy", "credits-photos": "photo-credits",
};
const FR_SEGMENTS = Object.fromEntries(Object.entries(EN_SEGMENTS).map(([fr, en]) => [en, fr]));

const split = (path: string) => { const i = path.search(/[?#]/); return i < 0 ? [path, ""] : [path.slice(0, i), path.slice(i)]; };

/** Adresse publique d'une page dans une langue, à partir de son adresse française (« /proprietes/x?y »). */
export function localePath(lang: Lang, frPath: string): string {
  if (lang === "fr" || /^(https?:|tel:|mailto:|#)/.test(frPath)) return frPath;
  const [p, rest] = split(frPath);
  const parts = p.split("/").filter(Boolean);
  if (parts[0]) parts[0] = EN_SEGMENTS[parts[0]] ?? parts[0];
  return `/en${parts.length ? `/${parts.join("/")}` : ""}${rest}`;
}

/** Adresse française correspondant à une adresse affichée dans le navigateur, quelle que soit sa langue. */
export function frenchPath(browserPath: string): string {
  const [p, rest] = split(browserPath);
  if (!(p === "/en" || p.startsWith("/en/"))) return browserPath;
  const parts = p.slice(3).split("/").filter(Boolean);
  if (parts[0]) parts[0] = FR_SEGMENTS[parts[0]] ?? parts[0];
  return `/${parts.join("/")}${rest}`;
}

/** Langue d'une adresse affichée dans le navigateur. */
export const langOf = (browserPath: string): Lang => (browserPath === "/en" || browserPath.startsWith("/en/") ? "en" : "fr");

/** Chemin interne (dossiers de app/[lang]) pour une adresse anglaise : /en/properties/x → /en/proprietes/x */
export function internalEnPath(enPath: string): string {
  const parts = enPath.slice(3).split("/").filter(Boolean);
  if (parts[0]) parts[0] = FR_SEGMENTS[parts[0]] ?? parts[0];
  return `/en${parts.length ? `/${parts.join("/")}` : ""}`;
}
