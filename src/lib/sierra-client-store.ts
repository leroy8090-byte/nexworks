/** Sync navigateur (même machine) entre back-office et site public. */

export const CMS_LS_KEY = "sierra-cms-db-v1";
export const STATS_LS_KEY = "sierra-stats-db-v1";

export type ClientCmsDb = {
  updatedAt: string;
  properties: unknown[];
};

export function readLocalCms(): ClientCmsDb | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CMS_LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ClientCmsDb;
    if (!Array.isArray(parsed.properties)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeLocalCms(properties: unknown[], updatedAt = new Date().toISOString()) {
  if (typeof window === "undefined") return;
  const db: ClientCmsDb = { updatedAt, properties };
  localStorage.setItem(CMS_LS_KEY, JSON.stringify(db));
}

export function pickNewerCms<T extends { updatedAt?: string; properties?: unknown[] }>(
  a: T | null | undefined,
  b: T | null | undefined,
): T | null {
  if (!a) return b || null;
  if (!b) return a;
  const ta = Date.parse(a.updatedAt || "") || 0;
  const tb = Date.parse(b.updatedAt || "") || 0;
  return tb > ta ? b : a;
}
