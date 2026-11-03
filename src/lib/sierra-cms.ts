import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { PropertyType, SierraProperty } from "@/data/sierra";
import { sierraProperties as seedProperties } from "@/data/sierra";

export type CmsProperty = Omit<SierraProperty, "realListing"> & {
  realListing?: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

export type SierraCmsDb = {
  version: number;
  updatedAt: string;
  properties: CmsProperty[];
};

const SEED_PATH = join(process.cwd(), "data", "sierra-cms.json");
const TMP_PATH = join("/tmp", "sierra-cms.json");

function withIds(list: SierraProperty[]): CmsProperty[] {
  const now = new Date().toISOString();
  return list.map((p, i) => ({
    ...p,
    id: p.slug || `prop-${i + 1}`,
    createdAt: now,
    updatedAt: now,
    published: true,
    realListing: p.realListing ?? true,
  }));
}

function emptyDb(): SierraCmsDb {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    properties: withIds(seedProperties as SierraProperty[]),
  };
}

function readJson(path: string): SierraCmsDb | null {
  try {
    if (!existsSync(path)) return null;
    const raw = JSON.parse(readFileSync(path, "utf8")) as SierraCmsDb;
    if (!Array.isArray(raw.properties)) return null;
    return raw;
  } catch {
    return null;
  }
}

function canWrite(path: string) {
  try {
    mkdirSync(join(path, ".."), { recursive: true });
    writeFileSync(path, readFileSync(path, "utf8"));
    return true;
  } catch {
    return false;
  }
}

/** Lecture : /tmp (Vercel runtime) > data/sierra-cms.json > seed code */
export function readCms(): SierraCmsDb {
  return readJson(TMP_PATH) || readJson(SEED_PATH) || emptyDb();
}

export function writeCms(db: SierraCmsDb): { ok: boolean; where: string } {
  const payload: SierraCmsDb = {
    ...db,
    version: 1,
    updatedAt: new Date().toISOString(),
  };
  const json = JSON.stringify(payload, null, 2);

  // Prefer project data file (local / persistent Node host)
  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    writeFileSync(SEED_PATH, json, "utf8");
    // mirror to tmp for serverless warm instances
    try {
      writeFileSync(TMP_PATH, json, "utf8");
    } catch {
      /* ignore */
    }
    return { ok: true, where: "data/sierra-cms.json" };
  } catch {
    /* fall through */
  }

  try {
    writeFileSync(TMP_PATH, json, "utf8");
    return { ok: true, where: "/tmp/sierra-cms.json" };
  } catch {
    return { ok: false, where: "none" };
  }
}

export function listPublished(): CmsProperty[] {
  return readCms().properties.filter((p) => p.published !== false);
}

export function listAll(): CmsProperty[] {
  return readCms().properties;
}

export function getBySlug(slug: string): CmsProperty | undefined {
  return listPublished().find((p) => p.slug === slug);
}

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export type PropertyInput = {
  title: string;
  city: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms?: number;
  type: PropertyType;
  transaction: "achat" | "location";
  tagline?: string;
  features?: string[];
  description?: string[];
  images?: string[];
  officialUrl?: string;
  exclusif?: boolean;
  coupDeCoeur?: boolean;
  published?: boolean;
  slug?: string;
};

export function createProperty(input: PropertyInput): CmsProperty {
  const db = readCms();
  const now = new Date().toISOString();
  let slug = input.slug?.trim() || slugify(input.title);
  if (!slug) slug = `bien-${Date.now()}`;
  if (db.properties.some((p) => p.slug === slug)) slug = `${slug}-${Date.now().toString().slice(-4)}`;

  const prop: CmsProperty = {
    id: slug,
    slug,
    title: input.title.trim(),
    city: input.city.trim() || "Saint-Raphaël",
    price: Number(input.price) || 0,
    surface: Number(input.surface) || 0,
    rooms: Number(input.rooms) || 0,
    bedrooms: Number(input.bedrooms ?? Math.max(0, (input.rooms || 1) - 1)),
    type: input.type || "appartement",
    transaction: input.transaction || "achat",
    tagline: input.tagline?.trim() || "Annonce Sierra Immobilier",
    features: input.features?.filter(Boolean) || [],
    description: input.description?.filter(Boolean) || ["Description à compléter."],
    images: input.images?.filter(Boolean).length
      ? input.images.filter(Boolean)
      : ["/sierra-immobilier/agency.webp"],
    officialUrl: input.officialUrl?.trim() || "",
    exclusif: !!input.exclusif,
    coupDeCoeur: !!input.coupDeCoeur,
    realListing: false,
    createdAt: now,
    updatedAt: now,
    published: input.published !== false,
  };

  db.properties.unshift(prop);
  writeCms(db);
  return prop;
}

export function updateProperty(id: string, input: Partial<PropertyInput>): CmsProperty | null {
  const db = readCms();
  const idx = db.properties.findIndex((p) => p.id === id || p.slug === id);
  if (idx < 0) return null;
  const prev = db.properties[idx];
  const next: CmsProperty = {
    ...prev,
    title: input.title?.trim() ?? prev.title,
    city: input.city?.trim() ?? prev.city,
    price: input.price !== undefined ? Number(input.price) : prev.price,
    surface: input.surface !== undefined ? Number(input.surface) : prev.surface,
    rooms: input.rooms !== undefined ? Number(input.rooms) : prev.rooms,
    bedrooms: input.bedrooms !== undefined ? Number(input.bedrooms) : prev.bedrooms,
    type: input.type ?? prev.type,
    transaction: input.transaction ?? prev.transaction,
    tagline: input.tagline?.trim() ?? prev.tagline,
    features: input.features ?? prev.features,
    description: input.description ?? prev.description,
    images: input.images ?? prev.images,
    officialUrl: input.officialUrl !== undefined ? input.officialUrl.trim() : prev.officialUrl,
    exclusif: input.exclusif ?? prev.exclusif,
    coupDeCoeur: input.coupDeCoeur ?? prev.coupDeCoeur,
    published: input.published ?? prev.published,
    updatedAt: new Date().toISOString(),
  };
  if (input.slug && input.slug !== prev.slug) {
    const s = slugify(input.slug);
    if (s && !db.properties.some((p, i) => i !== idx && p.slug === s)) {
      next.slug = s;
      next.id = s;
    }
  }
  db.properties[idx] = next;
  writeCms(db);
  return next;
}

export function deleteProperty(id: string): boolean {
  const db = readCms();
  const before = db.properties.length;
  db.properties = db.properties.filter((p) => p.id !== id && p.slug !== id);
  if (db.properties.length === before) return false;
  writeCms(db);
  return true;
}

export function replaceAll(properties: CmsProperty[]): SierraCmsDb {
  const db: SierraCmsDb = {
    version: 1,
    updatedAt: new Date().toISOString(),
    properties,
  };
  writeCms(db);
  return db;
}

export function storageInfo() {
  return {
    seedExists: existsSync(SEED_PATH),
    tmpExists: existsSync(TMP_PATH),
    writableSeed: (() => {
      try {
        mkdirSync(join(process.cwd(), "data"), { recursive: true });
        const probe = join(process.cwd(), "data", ".write-probe");
        writeFileSync(probe, "ok");
        return true;
      } catch {
        return false;
      }
    })(),
  };
}

// silence unused in some builds
void canWrite;
