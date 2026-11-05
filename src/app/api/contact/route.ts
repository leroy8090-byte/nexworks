import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { validateContact, type ContactApiResponse, type ContactValues } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ *
 * Sécurité & anti-spam :
 *  - corps limité en taille, JSON uniquement
 *  - contrôle de l'en-tête Origin (même site uniquement)
 *  - champ piège (honeypot) + délai minimal de remplissage
 *  - limitation de débit par IP (en mémoire — à remplacer par Redis/KV en multi-instances)
 *  - validation stricte côté serveur, échappement HTML des e-mails
 *  - aucune donnée personnelle n'est journalisée ni stockée
 * ------------------------------------------------------------------ */

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 3_000;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // nettoyage opportuniste
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return false;
}

const json = (body: ContactApiResponse, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

const clean = (s: unknown, max: number) =>
  String(s ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  return apiKey && to && from ? { apiKey, to, from } : null;
}

export async function POST(req: NextRequest) {
  // Origin
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.get("host")) return json({ status: "error", message: "Requête refusée." }, 403);
    } catch {
      return json({ status: "error", message: "Requête refusée." }, 403);
    }
  }

  if (!(req.headers.get("content-type") || "").includes("application/json"))
    return json({ status: "error", message: "Format de requête invalide." }, 415);

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ status: "error", message: "Message trop volumineux." }, 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ status: "error", message: "Requête illisible." }, 400);
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip))
    return json({ status: "error", message: "Trop de demandes en peu de temps. Réessayez dans quelques minutes." }, 429);

  // Honeypot : un robot remplit ce champ. On répond comme si de rien n'était, sans rien envoyer.
  if (clean(body.website, 200)) return json({ status: "demo" });

  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS)
    return json({ status: "error", message: "Envoi trop rapide. Patientez un instant puis réessayez." }, 400);

  const values: ContactValues = {
    name: clean(body.name, 200),
    company: clean(body.company, 300),
    email: clean(body.email, 300),
    phone: clean(body.phone, 60),
    projectType: clean(body.projectType, 200),
    message: String(body.message ?? "").replace(/\r\n/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, 5000),
    consent: body.consent === true,
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length) return json({ status: "invalid", errors }, 422);

  const cfg = emailConfig();
  if (!cfg) {
    // Mode démo : rien n'est transmis, rien n'est stocké.
    return json({ status: "demo" });
  }

  const subject = `[${siteConfig.shortName}] Nouvelle demande — ${values.projectType} — ${values.name}`.replace(/[\r\n]+/g, " ").slice(0, 200);
  const rows: [string, string][] = [
    ["Nom", values.name],
    ["Entreprise", values.company],
    ["E-mail", values.email],
    ["Téléphone", values.phone || "—"],
    ["Type de projet", values.projectType],
  ];
  const html = `<div style="font-family:Arial,sans-serif;color:#111;max-width:640px">
<h2 style="margin:0 0 16px">Nouvelle demande depuis le site ${escapeHtml(siteConfig.name)}</h2>
<table style="border-collapse:collapse;width:100%">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#555;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("")}</table>
<h3 style="margin:20px 0 8px">Description du besoin</h3>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(values.message)}</p>
</div>`;
  const text = `${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\nDescription du besoin :\n${values.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: cfg.from, to: [cfg.to], reply_to: values.email, subject, html, text }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[contact] Le service d'envoi a répondu ${res.status}`);
      return json({ status: "error", message: "Votre demande n'a pas pu être transmise. Réessayez dans un instant." }, 502);
    }
    return json({ status: "sent" });
  } catch (err) {
    console.error("[contact] Échec de l'envoi :", err instanceof Error ? err.name : "erreur inconnue");
    return json({ status: "error", message: "Votre demande n'a pas pu être transmise. Réessayez dans un instant." }, 502);
  }
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
