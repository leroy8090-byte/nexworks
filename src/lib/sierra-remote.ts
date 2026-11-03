/** Persistance distante via GitHub Gist (partagée entre instances Vercel). */

const GIST_ID = process.env.SIERRA_GIST_ID || "cf20075da5ce402db2a04aafea9b2fea";
const TOKEN = process.env.SIERRA_GIST_TOKEN || process.env.GITHUB_TOKEN || "";

export function remoteConfigured() {
  return Boolean(GIST_ID && TOKEN);
}

export function remoteReadable() {
  return Boolean(GIST_ID);
}

export function remoteInfo() {
  return { gistId: GIST_ID, hasToken: Boolean(TOKEN), readable: remoteReadable() };
}

function authHeaders(extra?: HeadersInit): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return { ...h, ...(extra || {}) };
}

async function gistApi(path: string, init?: RequestInit) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      ...authHeaders({ "Content-Type": "application/json" }),
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gist API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

export async function readRemoteFile(filename: string): Promise<string | null> {
  if (!GIST_ID) return null;
  // Raw URL (works for public gists without token; with token also for private)
  const rawUrl = `https://gist.githubusercontent.com/raw/${GIST_ID}/${filename}?t=${Date.now()}`;
  try {
    const raw = await fetch(rawUrl, {
      headers: authHeaders({ Accept: "text/plain" }),
      cache: "no-store",
    });
    if (raw.ok) return raw.text();
  } catch {
    /* fall through */
  }

  if (!TOKEN) return null;
  try {
    const gist = await gistApi(`/gists/${GIST_ID}`);
    const file = gist.files?.[filename];
    if (!file) return null;
    if (file.content != null && !file.truncated) return file.content as string;
    if (file.raw_url) {
      const r = await fetch(`${file.raw_url}?t=${Date.now()}`, {
        headers: authHeaders({ Accept: "application/vnd.github.raw" }),
        cache: "no-store",
      });
      if (!r.ok) return null;
      return r.text();
    }
    return null;
  } catch {
    return null;
  }
}

export async function writeRemoteFile(filename: string, content: string): Promise<boolean> {
  if (!remoteConfigured()) return false;
  try {
    await gistApi(`/gists/${GIST_ID}`, {
      method: "PATCH",
      body: JSON.stringify({ files: { [filename]: { content } } }),
    });
    return true;
  } catch {
    return false;
  }
}
