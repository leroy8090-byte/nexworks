import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { readRemoteFile, remoteConfigured, writeRemoteFile } from "@/lib/sierra-remote";

export type DayStats = {
  pageViews: number;
  propertyViews: number;
  propertyClicks: number;
};

export type PropertyStats = {
  views: number;
  clicks: number;
  title?: string;
};

export type SierraStatsDb = {
  version: number;
  updatedAt: string;
  days: Record<string, DayStats>;
  properties: Record<string, PropertyStats>;
  totals: DayStats;
};

const LOCAL = join(process.cwd(), "data", "sierra-stats.json");
const TMP = join("/tmp", "sierra-stats.json");
const REMOTE_FILE = "sierra-stats.json";

type GlobalStats = { cache: SierraStatsDb | null; cacheAt: number; lock: Promise<void> };
const g = globalThis as typeof globalThis & { __sierraStats?: GlobalStats };
function mem(): GlobalStats {
  if (!g.__sierraStats) g.__sierraStats = { cache: null, cacheAt: 0, lock: Promise.resolve() };
  return g.__sierraStats;
}

function emptyStats(): SierraStatsDb {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    days: {},
    properties: {},
    totals: { pageViews: 0, propertyViews: 0, propertyClicks: 0 },
  };
}

function normalize(raw: unknown): SierraStatsDb {
  if (!raw || typeof raw !== "object") return emptyStats();
  const o = raw as Partial<SierraStatsDb>;
  return {
    version: 1,
    updatedAt: o.updatedAt || new Date().toISOString(),
    days: o.days && typeof o.days === "object" ? o.days : {},
    properties: o.properties && typeof o.properties === "object" ? o.properties : {},
    totals: {
      pageViews: Number(o.totals?.pageViews) || 0,
      propertyViews: Number(o.totals?.propertyViews) || 0,
      propertyClicks: Number(o.totals?.propertyClicks) || 0,
    },
  };
}

function readLocal(): SierraStatsDb | null {
  try {
    if (existsSync(/*turbopackIgnore: true*/ TMP)) {
      return normalize(JSON.parse(readFileSync(/*turbopackIgnore: true*/ TMP, "utf8")));
    }
  } catch {
    /* ignore */
  }
  try {
    if (existsSync(LOCAL)) {
      return normalize(JSON.parse(readFileSync(LOCAL, "utf8")));
    }
  } catch {
    /* ignore */
  }
  return null;
}

function writeLocal(db: SierraStatsDb) {
  const json = JSON.stringify(db, null, 2);
  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    writeFileSync(LOCAL, json, "utf8");
  } catch {
    /* ignore */
  }
  try {
    writeFileSync(TMP, json, "utf8");
  } catch {
    /* ignore */
  }
}

export function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export async function readStats(): Promise<SierraStatsDb> {
  const m = mem();
  if (m.cache && Date.now() - m.cacheAt < 800) return m.cache;

  {
    const remote = await readRemoteFile(REMOTE_FILE);
    if (remote) {
      try {
        const db = normalize(JSON.parse(remote));
        m.cache = db;
        m.cacheAt = Date.now();
        writeLocal(db);
        return db;
      } catch {
        /* ignore */
      }
    }
  }

  const local = readLocal() || emptyStats();
  m.cache = local;
  m.cacheAt = Date.now();
  return local;
}

async function persist(db: SierraStatsDb) {
  db.updatedAt = new Date().toISOString();
  const m = mem();
  m.cache = db;
  m.cacheAt = Date.now();
  writeLocal(db);
  if (remoteConfigured()) {
    await writeRemoteFile(REMOTE_FILE, JSON.stringify(db, null, 2));
  }
}

function ensureDay(db: SierraStatsDb, day: string): DayStats {
  if (!db.days[day]) db.days[day] = { pageViews: 0, propertyViews: 0, propertyClicks: 0 };
  return db.days[day];
}

export type TrackEvent =
  | { type: "page_view"; path?: string }
  | { type: "property_view"; slug: string; title?: string }
  | { type: "property_click"; slug: string; title?: string };

export async function trackEvent(event: TrackEvent): Promise<SierraStatsDb> {
  const m = mem();
  const run = m.lock.then(async () => {
    const db = await readStats();
    const day = ensureDay(db, todayKey());
    if (event.type === "page_view") {
      day.pageViews += 1;
      db.totals.pageViews += 1;
    } else if (event.type === "property_view") {
      day.propertyViews += 1;
      db.totals.propertyViews += 1;
      const cur = db.properties[event.slug] || { views: 0, clicks: 0 };
      cur.views += 1;
      if (event.title) cur.title = event.title;
      db.properties[event.slug] = cur;
    } else if (event.type === "property_click") {
      day.propertyClicks += 1;
      db.totals.propertyClicks += 1;
      const cur = db.properties[event.slug] || { views: 0, clicks: 0 };
      cur.clicks += 1;
      if (event.title) cur.title = event.title;
      db.properties[event.slug] = cur;
    }
    await persist(db);
    return db;
  });
  m.lock = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export type StatsSummary = {
  today: DayStats;
  yesterday: DayStats;
  last7: DayStats;
  last30: DayStats;
  month: DayStats;
  totals: DayStats;
  topProperties: Array<{ slug: string; title: string; views: number; clicks: number }>;
  daily: Array<{ date: string } & DayStats>;
  updatedAt: string;
};

function sumDays(db: SierraStatsDb, keys: string[]): DayStats {
  return keys.reduce(
    (acc, k) => {
      const d = db.days[k];
      if (!d) return acc;
      return {
        pageViews: acc.pageViews + d.pageViews,
        propertyViews: acc.propertyViews + d.propertyViews,
        propertyClicks: acc.propertyClicks + d.propertyClicks,
      };
    },
    { pageViews: 0, propertyViews: 0, propertyClicks: 0 },
  );
}

function lastNDates(n: number): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now);
    d.setUTCDate(now.getUTCDate() - i);
    out.push(todayKey(d));
  }
  return out;
}

export async function getStatsSummary(): Promise<StatsSummary> {
  const db = await readStats();
  const today = todayKey();
  const y = new Date();
  y.setUTCDate(y.getUTCDate() - 1);
  const yesterday = todayKey(y);
  const last7Keys = lastNDates(7);
  const last30Keys = lastNDates(30);
  const monthPrefix = today.slice(0, 7);
  const monthKeys = Object.keys(db.days).filter((k) => k.startsWith(monthPrefix));

  const topProperties = Object.entries(db.properties)
    .map(([slug, s]) => ({
      slug,
      title: s.title || slug,
      views: s.views || 0,
      clicks: s.clicks || 0,
    }))
    .sort((a, b) => b.views + b.clicks * 2 - (a.views + a.clicks * 2))
    .slice(0, 12);

  const daily = lastNDates(14)
    .reverse()
    .map((date) => ({
      date,
      ...(db.days[date] || { pageViews: 0, propertyViews: 0, propertyClicks: 0 }),
    }));

  return {
    today: db.days[today] || { pageViews: 0, propertyViews: 0, propertyClicks: 0 },
    yesterday: db.days[yesterday] || { pageViews: 0, propertyViews: 0, propertyClicks: 0 },
    last7: sumDays(db, last7Keys),
    last30: sumDays(db, last30Keys),
    month: sumDays(db, monthKeys),
    totals: db.totals,
    topProperties,
    daily,
    updatedAt: db.updatedAt,
  };
}
