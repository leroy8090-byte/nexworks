import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import type { Lang } from "@/i18n/lang";
import { validateContact, type ContactApiResponse, type ContactValues } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ *
 * Sécurité & anti-spam :
 *  - corps limité en taille, JSON uniquement
 *  - contrôle de l'en-tête Origin (même site uniquement)
 *  - champ piège (honeypot) + délai minimal de remplissage
 *  - vérification anti-robot Cloudflare Turnstile (active dès que TURNSTILE_SECRET_KEY est renseignée)
 *  - limitation de débit par IP (en mémoire — à remplacer par Redis/KV en multi-instances)
 *  - validation stricte côté serveur, échappement HTML des e-mails
 *  - aucune donnée personnelle n'est journalisée ni stockée
 * ------------------------------------------------------------------ */

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 3_000;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

const M = {
  fr: {
    refused: "Requête refusée.",
    format: "Format de requête invalide.",
    big: "Message trop volumineux.",
    unreadable: "Requête illisible.",
    rate: "Trop de demandes en peu de temps. Réessayez dans quelques minutes.",
    fast: "Envoi trop rapide. Patientez un instant puis réessayez.",
    captcha: "La vérification anti-robot a échoué. Réessayez.",
    failed: "Votre demande n'a pas pu être transmise. Réessayez dans un instant.",
    subject: "Nouvelle demande",
    title: "Nouvelle demande depuis le site",
    labels: ["Nom", "Entreprise", "E-mail", "Téléphone", "Type de projet", "Langue du site"],
    needs: "Description du besoin",
    langName: "Français",
  },
  en: {
    refused: "Request refused.",
    format: "Invalid request format.",
    big: "Message too large.",
    unreadable: "Unreadable request.",
    rate: "Too many requests in a short time. Please try again in a few minutes.",
    fast: "Sent too quickly. Please wait a moment and try again.",
    captcha: "The anti-robot check failed. Please try again.",
    failed: "Your request could not be sent. Please try again in a moment.",
    subject: "New request",
    title: "New request from the site",
    labels: ["Name", "Company", "Email", "Phone", "Project type", "Site language"],
    needs: "What they need",
    langName: "English",
  },
} as const;

/** Vérifie le jeton Turnstile auprès de Cloudflare. Sans clé secrète, la vérification est désactivée. */
async function captchaOk(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true;
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") form.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(8_000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

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
  let lang: Lang = "fr";
  // Origin
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.get("host")) return json({ status: "error", message: M.fr.refused }, 403);
    } catch {
      return json({ status: "error", message: M.fr.refused }, 403);
    }
  }

  if (!(req.headers.get("content-type") || "").includes("application/json"))
    return json({ status: "error", message: M.fr.format }, 415);

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ status: "error", message: M.fr.big }, 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ status: "error", message: M.fr.unreadable }, 400);
  }
  lang = body.lang === "en" ? "en" : "fr";
  const m = M[lang];

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip))
    return json({ status: "error", message: m.rate }, 429);

  // Honeypot : un robot remplit ce champ. On répond comme si de rien n'était, sans rien envoyer.
  if (clean(body.website, 200)) return json({ status: "demo" });

  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS)
    return json({ status: "error", message: m.fast }, 400);

  if (!(await captchaOk(body.captcha, ip))) return json({ status: "error", message: m.captcha }, 400);

  const values: ContactValues = {
    name: clean(body.name, 200),
    company: clean(body.company, 300),
    email: clean(body.email, 300),
    phone: clean(body.phone, 60),
    projectType: clean(body.projectType, 200),
    message: String(body.message ?? "").replace(/\r\n/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, 5000),
    consent: body.consent === true,
  };

  const errors = validateContact(values, lang);
  if (Object.keys(errors).length) return json({ status: "invalid", errors }, 422);

  const cfg = emailConfig();
  if (!cfg) {
    // Mode démo : rien n'est transmis, rien n'est stocké.
    return json({ status: "demo" });
  }

  const subject = `[${siteConfig.shortName}${lang === "en" ? " EN" : ""}] ${m.subject} — ${values.projectType} — ${values.name}`.replace(/[\r\n]+/g, " ").slice(0, 200);
  const rows: [string, string][] = [
    [m.labels[0], values.name],
    [m.labels[1], values.company],
    [m.labels[2], values.email],
    [m.labels[3], values.phone || "—"],
    [m.labels[4], values.projectType],
    [m.labels[5], m.langName],
  ];
  const html = `<div style="font-family:Arial,sans-serif;color:#111;max-width:640px">
<h2 style="margin:0 0 16px">${m.title} ${escapeHtml(siteConfig.name)}</h2>
<table style="border-collapse:collapse;width:100%">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#555;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("")}</table>
<h3 style="margin:20px 0 8px">${m.needs}</h3>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(values.message)}</p>
</div>`;
  const text = `${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${m.needs} :\n${values.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: cfg.from, to: [cfg.to], reply_to: values.email, subject, html, text }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[contact] Le service d'envoi a répondu ${res.status}`);
      return json({ status: "error", message: m.failed }, 502);
    }
    return json({ status: "sent" });
  } catch (err) {
    console.error("[contact] Échec de l'envoi :", err instanceof Error ? err.name : "erreur inconnue");
    return json({ status: "error", message: m.failed }, 502);
  }
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
