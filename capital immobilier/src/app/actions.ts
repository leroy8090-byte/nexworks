"use server";

export type RequestInput = { kind: string; name: string; email: string; phone?: string; website?: string; elapsed?: number; details: Record<string, string> };
export type RequestResult = { status: "sent" | "not_configured" | "invalid" | "error" };

const clean = (s: unknown, max = 500) => String(s ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

/**
 * Envoie une demande à l'agence par e-mail. Sans destination configurée, le formulaire le dit honnêtement :
 * il ne prétend jamais avoir envoyé quoi que ce soit.
 */
export async function sendRequest(i: RequestInput): Promise<RequestResult> {
  // Champ piège rempli : un robot croit avoir réussi, rien n'est envoyé.
  if (i.website) return { status: "sent" };
  // Envoyé en moins de 2 secondes : ce n'est pas un humain.
  if (typeof i.elapsed === "number" && i.elapsed < 2000) return { status: "sent" };
  const name = clean(i.name, 120);
  const email = clean(i.email, 160);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { status: "invalid" };
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!key || !to || !from) return { status: "not_configured" };
  const lines = Object.entries(i.details).filter(([, v]) => v).map(([k, v]) => `${clean(k, 40)} : ${clean(v, 1000)}`);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: email, subject: `${clean(i.kind, 60)} : ${name}`, text: [`De : ${name}`, `E-mail : ${email}`, `Téléphone : ${clean(i.phone, 40) || "non indiqué"}`, "", ...lines].join("\n") }),
      cache: "no-store",
    });
    return { status: res.ok ? "sent" : "error" };
  } catch {
    return { status: "error" };
  }
}
