/** Types et filtres partagés entre le serveur et le navigateur. */
export type Transaction = "vente" | "location" | "vacances";

export type Card = {
  id: string;
  slug: string;
  ref: string | null;
  title: string;
  type: string;
  transaction: Transaction;
  commune: string;
  postalCode: string | null;
  price: number | null;
  surface: number | null;
  rooms: number | null;
  bedrooms: number | null;
  features: string[];
  /** Loyer annoncé hors taxes. */
  ht?: boolean;
  photos: string[];
  /** Texte de recherche : titre et description, en minuscules. */
  haystack: string;
};

export type Criteria = {
  transaction?: string;
  commune?: string;
  type?: string;
  min?: string;
  max?: string;
  pieces?: string;
  surface?: string;
  secteur?: string;
  sort?: string;
};

const n = (s?: string) => { const v = Number(s); return Number.isFinite(v) && v > 0 ? v : undefined; };

export const sectorMatches = (c: Pick<Card, "commune" | "haystack">, match: string) =>
  match.startsWith("^") ? c.commune.startsWith(match.slice(1)) : match.startsWith("@") ? new RegExp(match.slice(1), "i").test(c.commune) : new RegExp(match, "i").test(c.haystack);

/** « Villa » regroupe aussi les maisons : le visiteur cherche une maison individuelle, quel que soit le mot de l'annonce. */
const sameType = (card: string, wanted: string) => wanted === "Villa" || wanted === "Maison" ? card === "Villa" || card === "Maison" : card === wanted;

export function applyCriteria(all: Card[], c: Criteria, sectorMatch?: string): Card[] {
  const out = all.filter((p) =>
    (!c.transaction || p.transaction === c.transaction) &&
    (!c.commune || p.commune === c.commune) &&
    (!c.type || sameType(p.type, c.type)) &&
    (!n(c.min) || (p.price != null && p.price >= n(c.min)!)) &&
    (!n(c.max) || (p.price != null && p.price <= n(c.max)!)) &&
    (!n(c.pieces) || (p.rooms != null && p.rooms >= n(c.pieces)!)) &&
    (!n(c.surface) || (p.surface != null && p.surface >= n(c.surface)!)) &&
    (!sectorMatch || sectorMatches(p, sectorMatch)),
  );
  const price = (p: Card) => p.price ?? 0;
  if (c.sort === "prix-asc") return out.sort((a, b) => price(a) - price(b));
  if (c.sort === "surface-desc") return out.sort((a, b) => (b.surface ?? 0) - (a.surface ?? 0));
  if (c.sort === "surface-asc") return out.sort((a, b) => (a.surface ?? 0) - (b.surface ?? 0));
  return out.sort((a, b) => price(b) - price(a));
}

export const euro = (v: number) => `${new Intl.NumberFormat("fr-FR").format(v).replace(/ /g, " ")} €`;
/** Les types proposés par la recherche, dans cet ordre. */
export const TYPES = ["Appartement", "Villa", "Studio", "Terrain", "Local commercial"];

export const priceLabel = (p: Pick<Card, "price" | "transaction" | "ht">) =>
  p.price == null ? "Prix sur demande" : p.transaction === "vente" ? euro(p.price) : `${euro(p.price)}${p.ht ? " HT" : ""} / mois`;
export const surfaceLabel = (v: number) => `${Math.round(v)} m²`;

export const BUDGETS: Record<string, number[]> = {
  vente: [100000, 150000, 200000, 300000, 400000, 500000, 750000],
  location: [500, 700, 900, 1200, 1500, 2000],
  vacances: [500, 1000, 1500, 2000],
};
