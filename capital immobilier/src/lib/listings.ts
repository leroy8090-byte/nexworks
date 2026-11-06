import "server-only";
import snapshot from "@/data/listings.snapshot.json";
import type { Card, Transaction } from "./filter";

/**
 * Source des annonces. Pour le concept : annonces et photos transférées depuis le site public de l'agence.
 * Pour la mise en production : brancher ici le flux La Boîte Immo (logiciel actuel de l'agence) ou l'API
 * de NEXWORKS ESTATE. Le reste du site ne dépend que de ce fichier.
 */
export type Listing = {
  id: string; slug: string; ref: string | null; title: string; type: string; transaction: string; commune: string; postalCode: string | null;
  price: number | null; surface: number | null; rooms: number | null; bedrooms: number | null; features: string[]; description: string;
  facts: Record<string, string>; energy: string | null; photos: string[]; dpe?: string | null; ges?: string | null;
};

const all = snapshot.listings as unknown as Listing[];
const positive = (v?: string) => /^(oui|[1-9])/i.test(v ?? "");

/** Les prestations se déduisent des caractéristiques publiées par l'agence. */
function features(r: Listing): string[] {
  const f = r.facts;
  const extra = [positive(f["Nombre de garage"]) && "Garage", positive(f["Nombre de parking"]) && "Parking"].filter(Boolean) as string[];
  return [...new Set([...r.features, ...extra])];
}

const toCard = (r: Listing): Card => ({
  id: r.id, slug: r.slug, ref: r.ref, title: r.title, type: r.type, transaction: r.transaction as Transaction, commune: r.commune, postalCode: r.postalCode,
  price: r.price, surface: r.surface, rooms: r.rooms, bedrooms: r.bedrooms, features: features(r), ht: "Loyer HT" in r.facts, photos: r.photos.slice(0, 5),
  haystack: `${r.title} ${r.description} ${r.facts["Quartier"] ?? ""}`.toLowerCase(),
});

export const getCards = (): Card[] => all.map(toCard);
export const capturedAt = snapshot.capturedAt;
export const coverOf = (id: string) => all.find((l) => l.id === id)?.photos[0] ?? null;
export const getListing = (slug: string) => { const l = all.find((x) => x.slug === slug); return l ? { ...l, features: features(l) } : null; };
export const allSlugs = () => all.map((l) => l.slug);

export function similarTo(l: Listing, n = 3): Card[] {
  const score = (x: Listing) => (x.commune === l.commune ? 2 : 0) + (x.type === l.type ? 1 : 0);
  return all.filter((x) => x.id !== l.id && x.transaction === l.transaction).sort((a, b) => score(b) - score(a) || Math.abs((a.price ?? 0) - (l.price ?? 0)) - Math.abs((b.price ?? 0) - (l.price ?? 0))).slice(0, n).map(toCard);
}

const ACCENTS: Record<string, string> = { SEPAREE: "Séparée", EQUIPEE: "Équipée", AMERICAINE: "Américaine", OUVERTE: "Ouverte", "NON EQUIPEE": "Non équipée", INDEPENDANTE: "Indépendante", KITCHENETTE: "Kitchenette" };
const LABELS: Record<string, string> = { "Surface habitable (m²)": "Surface habitable", "Surface loi Carrez (m²)": "Surface loi Carrez", "Surface loi Boutin (m²)": "Surface loi Boutin", "surface terrain": "Terrain", "Nombre de chambre(s)": "Chambres", "Nombre de pièces": "Pièces", Etage: "Étage", "Nombre de niveaux": "Niveaux", "Nb de salle de bains": "Salles de bains", "Nb de salle d'eau": "Salles d’eau", "Type de cuisine": "Équipement de la cuisine", "Mode de chauffage": "Chauffage", "Type de chauffage": "Type de chauffage", "Format de chauffage": "Chauffage collectif ou individuel", "Nombre de garage": "Garage", "Nombre de parking": "Parking", "Surface cave (m²)": "Surface de la cave", "Année de construction": "Année de construction", "nombre de lots": "Nombre de lots", "Quote Part annuelle des charges": "Quote-part annuelle des charges", "plan de sauvegarde": "Plan de sauvegarde", "statut du syndic": "Statut du syndic", "Lot n°": "Lot n°", "Prix de vente honoraires TTC inclus": "Prix, honoraires TTC inclus", "Honoraires TTC à la charge acquéreur": "Honoraires TTC à la charge de l’acquéreur", "Charges": "Charges", "Taxe foncière annuelle": "Taxe foncière annuelle", "Loyer CC* / mois": "Loyer charges comprises, par mois", "Honoraires TTC charge locataire": "Honoraires TTC à la charge du locataire", "Dont état des lieux": "Dont état des lieux", "Dépôt de garantie TTC": "Dépôt de garantie TTC", Loyer: "Loyer par mois", "Loyer HT": "Loyer HT par mois", "Honoraires charge locataire": "Honoraires à la charge du locataire", "Honoraires HT charge locataire": "Honoraires HT à la charge du locataire", "Terrain Viabilisé": "Terrain viabilisé" };
const BUILDING = ["Copropriété", "nombre de lots", "Quote Part annuelle des charges", "plan de sauvegarde", "statut du syndic", "Lot n°"];
const MONEY = ["Prix de vente honoraires TTC inclus", "Honoraires TTC à la charge acquéreur", "Charges", "Taxe foncière annuelle", "Loyer CC* / mois", "Loyer", "Loyer HT", "Honoraires TTC charge locataire", "Honoraires charge locataire", "Honoraires HT charge locataire", "Dont état des lieux", "Dépôt de garantie TTC", "Dépôt de garantie"];
const HIDDEN = ["Code postal", "Prix de vente", "Type de transac", "Superficie (m²)"];
const KEEP_NO = ["plan de sauvegarde", "Copropriété", "Meublé"];

function value(k: string, raw: string): string | null {
  const v = raw.trim();
  if (/^non renseign/i.test(v)) return null;
  if (/^non$/i.test(v)) return KEEP_NO.includes(k) ? "Non" : null;
  if (/^oui$/i.test(v)) return "Oui";
  if (ACCENTS[v]) return ACCENTS[v];
  if (/m²\)$/.test(k) && !/m²/.test(v)) return `${v} m²`;
  return /^[A-Z\s'-]{3,}$/.test(v) ? v.charAt(0) + v.slice(1).toLowerCase() : v.charAt(0).toUpperCase() + v.slice(1);
}

/** Les caractéristiques publiées, regroupées et lisibles. Une information absente n'est pas affichée. */
export function factGroups(l: Listing) {
  const label = (k: string) => (k === "Surface habitable (m²)" && l.type === "Local commercial" ? "Surface" : LABELS[k] ?? k);
  const row = (k: string) => { const v = value(k, l.facts[k]); return v ? ([label(k), v] as [string, string]) : null; };
  const keys = Object.keys(l.facts).filter((k) => !HIDDEN.includes(k));
  const pick = (test: (k: string) => boolean) => keys.filter(test).map(row).filter((r): r is [string, string] => r !== null);
  return {
    home: pick((k) => !BUILDING.includes(k) && !MONEY.includes(k)),
    building: l.facts["Copropriété"] && /oui/i.test(l.facts["Copropriété"]) ? pick((k) => BUILDING.includes(k)) : [],
    money: pick((k) => MONEY.includes(k)),
  };
}
