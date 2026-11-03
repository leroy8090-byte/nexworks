import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { PropertyType, SierraProperty } from "@/data/sierra";
import { sierraProperties as seedProperties } from "@/data/sierra";
import { readRemoteFile, remoteConfigured, remoteInfo, writeRemoteFile } from "@/lib/sierra-remote";

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
const REMOTE_FILE = "sierra-cms.json";

type GlobalCms = {
  cache: SierraCmsDb | null;
  cacheAt: number;
};

const g = globalThis as typeof globalThis & { __sierraCms?: GlobalCms };
function mem(): GlobalCms {
  if (!g.__sierraCms) g.__sierraCms = { cache: null, cacheAt: 0 };
  return g.__sierraCms;
}

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

function normalizeDb(raw: unknown): SierraCmsDb | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as { properties?: unknown; updatedAt?: string; version?: number };
  if (!Array.isArray(obj.properties)) return null;
  const now = new Date().toISOString();
  const properties: CmsProperty[] = obj.properties.map((item, i) => {
    const p = item as Partial<CmsProperty> & SierraProperty;
    const slug = p.slug || `prop-${i + 1}`;
    return {
      ...p,
      slug,
      id: p.id || slug,
      title: p.title || "Sans titre",
      city: p.city || "Saint-Raphaël",
      price: Number(p.price) || 0,
      surface: Number(p.surface) || 0,
      rooms: Number(p.rooms) || 0,
      bedrooms: Number(p.bedrooms ?? 0),
      type: (p.type || "appartement") as PropertyType,
      transaction: p.transaction === "location" ? "location" : "achat",
      tagline: p.tagline || "",
      features: Array.isArray(p.features) ? p.features : [],
      description: Array.isArray(p.description) ? p.description : [],
      images: Array.isArray(p.images) && p.images.length ? p.images : ["/sierra-immobilier/agency.webp"],
      officialUrl: p.officialUrl || "",
      exclusif: !!p.exclusif,
      coupDeCoeur: !!p.coupDeCoeur,
      realListing: p.realListing,
      createdAt: p.createdAt || now,
      updatedAt: p.updatedAt || now,
      published: p.published !== false,
    };
  });
  return {
    version: 1,
    updatedAt: obj.updatedAt || now,
    properties,
  };
}

function readJsonFile(path: string): SierraCmsDb | null {
  try {
    if (!existsSync(path)) return null;
    return normalizeDb(JSON.parse(readFileSync(path, "utf8")));
  } catch {
    return null;
  }
}

function writeLocal(db: SierraCmsDb) {
  const json = JSON.stringify(db, null, 2);
  let where = "none";
  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    writeFileSync(SEED_PATH, json, "utf8");
    where = "data/sierra-cms.json";
  } catch {
    /* ignore */
  }
  try {
    writeFileSync(TMP_PATH, json, "utf8");
    if (where === "none") where = "/tmp/sierra-cms.json";
  } catch {
    /* ignore */
  }
  return where;
}

function setCache(db: SierraCmsDb) {
  const m = mem();
  m.cache = db;
  m.cacheAt = Date.now();
}

export async function readCms(): Promise<SierraCmsDb> {
  const m = mem();
  // Cache très court pour éviter de spammer l'API Gist pendant une même requête
  if (m.cache && Date.now() - m.cacheAt < 1500) return m.cache;

  {
    const remote = await readRemoteFile(REMOTE_FILE);
    if (remote) {
      try {
        const parsed = normalizeDb(JSON.parse(remote));
        if (parsed) {
          setCache(parsed);
          writeLocal(parsed);
          return parsed;
        }
      } catch {
        /* ignore bad remote */
      }
    }
  }

  const local = readJsonFile(TMP_PATH) || readJsonFile(SEED_PATH) || emptyDb();
  setCache(local);
  return local;
}

export async function writeCms(db: SierraCmsDb): Promise<{ ok: boolean; where: string }> {
  const payload: SierraCmsDb = {
    ...db,
    version: 1,
    updatedAt: new Date().toISOString(),
  };
  setCache(payload);
  const json = JSON.stringify(payload, null, 2);
  const localWhere = writeLocal(payload);

  if (remoteConfigured()) {
    const ok = await writeRemoteFile(REMOTE_FILE, json);
    if (ok) return { ok: true, where: "gist+local" };
  }

  return { ok: localWhere !== "none", where: localWhere };
}

export async function listPublished(): Promise<CmsProperty[]> {
  return (await readCms()).properties.filter((p) => p.published !== false);
}

export async function listAll(): Promise<CmsProperty[]> {
  return (await readCms()).properties;
}

export async function getBySlug(slug: string): Promise<CmsProperty | undefined> {
  return (await listPublished()).find((p) => p.slug === slug);
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

export async function createProperty(input: PropertyInput): Promise<CmsProperty> {
  const db = await readCms();
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
  await writeCms(db);
  return prop;
}

export async function updateProperty(id: string, input: Partial<PropertyInput>): Promise<CmsProperty | null> {
  const db = await readCms();
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
  await writeCms(db);
  return next;
}

export async function deleteProperty(id: string): Promise<boolean> {
  const db = await readCms();
  const before = db.properties.length;
  db.properties = db.properties.filter((p) => p.id !== id && p.slug !== id);
  if (db.properties.length === before) return false;
  await writeCms(db);
  return true;
}

export async function replaceAll(properties: CmsProperty[]): Promise<SierraCmsDb> {
  const db: SierraCmsDb = {
    version: 1,
    updatedAt: new Date().toISOString(),
    properties: normalizeDb({ properties })?.properties || [],
  };
  await writeCms(db);
  return db;
}

export async function storageInfo() {
  let writableSeed = false;
  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    writeFileSync(join(process.cwd(), "data", ".write-probe"), "ok");
    writableSeed = true;
  } catch {
    writableSeed = false;
  }
  return {
    seedExists: existsSync(SEED_PATH),
    tmpExists: existsSync(TMP_PATH),
    writableSeed,
    remote: remoteInfo(),
    persistent: remoteConfigured(),
  };
}
