import { STATS_LS_KEY } from "@/lib/sierra-client-store";

type DayStats = { pageViews: number; propertyViews: number; propertyClicks: number };
type PropStats = { views: number; clicks: number; title?: string };

export type ClientStatsDb = {
  updatedAt: string;
  days: Record<string, DayStats>;
  properties: Record<string, PropStats>;
  totals: DayStats;
};

function empty(): ClientStatsDb {
  return {
    updatedAt: new Date().toISOString(),
    days: {},
    properties: {},
    totals: { pageViews: 0, propertyViews: 0, propertyClicks: 0 },
  };
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function readLocalStats(): ClientStatsDb {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(STATS_LS_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as ClientStatsDb;
    return {
      ...empty(),
      ...parsed,
      days: parsed.days || {},
      properties: parsed.properties || {},
      totals: parsed.totals || empty().totals,
    };
  } catch {
    return empty();
  }
}

function writeLocalStats(db: ClientStatsDb) {
  db.updatedAt = new Date().toISOString();
  localStorage.setItem(STATS_LS_KEY, JSON.stringify(db));
}

export function trackLocal(event: {
  type: "page_view" | "property_view" | "property_click";
  slug?: string;
  title?: string;
}) {
  if (typeof window === "undefined") return;
  const db = readLocalStats();
  const day = todayKey();
  if (!db.days[day]) db.days[day] = { pageViews: 0, propertyViews: 0, propertyClicks: 0 };
  if (event.type === "page_view") {
    db.days[day].pageViews += 1;
    db.totals.pageViews += 1;
  } else if (event.type === "property_view" && event.slug) {
    db.days[day].propertyViews += 1;
    db.totals.propertyViews += 1;
    const cur = db.properties[event.slug] || { views: 0, clicks: 0 };
    cur.views += 1;
    if (event.title) cur.title = event.title;
    db.properties[event.slug] = cur;
  } else if (event.type === "property_click" && event.slug) {
    db.days[day].propertyClicks += 1;
    db.totals.propertyClicks += 1;
    const cur = db.properties[event.slug] || { views: 0, clicks: 0 };
    cur.clicks += 1;
    if (event.title) cur.title = event.title;
    db.properties[event.slug] = cur;
  }
  writeLocalStats(db);
}

function sumDays(db: ClientStatsDb, keys: string[]): DayStats {
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

function lastN(n: number) {
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now);
    d.setUTCDate(now.getUTCDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export function summarizeLocal(db: ClientStatsDb) {
  const today = todayKey();
  const y = new Date();
  y.setUTCDate(y.getUTCDate() - 1);
  const yesterday = y.toISOString().slice(0, 10);
  const last7 = lastN(7);
  const last30 = lastN(30);
  const monthPrefix = today.slice(0, 7);
  const monthKeys = Object.keys(db.days).filter((k) => k.startsWith(monthPrefix));
  return {
    today: db.days[today] || { pageViews: 0, propertyViews: 0, propertyClicks: 0 },
    yesterday: db.days[yesterday] || { pageViews: 0, propertyViews: 0, propertyClicks: 0 },
    last7: sumDays(db, last7),
    last30: sumDays(db, last30),
    month: sumDays(db, monthKeys),
    totals: db.totals,
    topProperties: Object.entries(db.properties)
      .map(([slug, s]) => ({ slug, title: s.title || slug, views: s.views || 0, clicks: s.clicks || 0 }))
      .sort((a, b) => b.views + b.clicks * 2 - (a.views + a.clicks * 2))
      .slice(0, 12),
    daily: lastN(14)
      .reverse()
      .map((date) => ({ date, ...(db.days[date] || { pageViews: 0, propertyViews: 0, propertyClicks: 0 }) })),
    updatedAt: db.updatedAt,
  };
}

export function mergeSummaries(
  api: ReturnType<typeof summarizeLocal> | null,
  local: ReturnType<typeof summarizeLocal>,
) {
  if (!api) return local;
  const propMap = new Map<string, { slug: string; title: string; views: number; clicks: number }>();
  for (const p of [...api.topProperties, ...local.topProperties]) {
    const cur = propMap.get(p.slug) || { slug: p.slug, title: p.title, views: 0, clicks: 0 };
    cur.views = Math.max(cur.views, p.views);
    cur.clicks = Math.max(cur.clicks, p.clicks);
    if (p.title) cur.title = p.title;
    propMap.set(p.slug, cur);
  }
  const dailyMap = new Map<string, DayStats & { date: string }>();
  for (const d of [...api.daily, ...local.daily]) {
    const cur = dailyMap.get(d.date) || { date: d.date, pageViews: 0, propertyViews: 0, propertyClicks: 0 };
    dailyMap.set(d.date, {
      date: d.date,
      pageViews: Math.max(cur.pageViews, d.pageViews),
      propertyViews: Math.max(cur.propertyViews, d.propertyViews),
      propertyClicks: Math.max(cur.propertyClicks, d.propertyClicks),
    });
  }
  const maxDay = (x: DayStats, y: DayStats): DayStats => ({
    pageViews: Math.max(x.pageViews, y.pageViews),
    propertyViews: Math.max(x.propertyViews, y.propertyViews),
    propertyClicks: Math.max(x.propertyClicks, y.propertyClicks),
  });
  return {
    today: maxDay(api.today, local.today),
    yesterday: maxDay(api.yesterday, local.yesterday),
    last7: maxDay(api.last7, local.last7),
    last30: maxDay(api.last30, local.last30),
    month: maxDay(api.month, local.month),
    totals: maxDay(api.totals, local.totals),
    topProperties: [...propMap.values()].sort((a, b) => b.views + b.clicks * 2 - (a.views + a.clicks * 2)).slice(0, 12),
    daily: [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date)),
    updatedAt: Date.parse(local.updatedAt) > Date.parse(api.updatedAt) ? local.updatedAt : api.updatedAt,
  };
}
