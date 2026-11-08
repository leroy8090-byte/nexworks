"use server";

/**
 * Envoi d'une demande (visite, brochure, estimation, accès privé, contact) par email avec Resend,
 * seulement si l'adresse de réception est configurée. Sinon, le formulaire le dit clairement : rien n'est simulé.
 */
export type LeadInput = { kind: string; lang?: "fr" | "en"; name: string; email: string; phone: string; message: string; details: Record<string, string>; website?: string; elapsed?: number };
export type LeadResult = { status: "sent" | "not_configured" | "invalid" | "error"; message?: string };

const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendLead(input: LeadInput): Promise<LeadResult> {
  // Champ piège et envoi trop rapide : un robot, pas une personne. On ne dit rien de plus.
  if (input.website || (input.elapsed ?? 99999) < 2500) return { status: "sent" };
  const kind = clean(input.kind, 60) || "Demande", name = clean(input.name, 120), email = clean(input.email, 200).toLowerCase(), phone = clean(input.phone, 40), message = clean(input.message, 4000);
  if (name.length < 2 || !EMAIL.test(email)) return { status: "invalid", message: input.lang === "en" ? "Please enter your name and a valid email address." : "Indiquez votre nom et une adresse email valide." };
  const details = Object.entries(input.details ?? {}).slice(0, 24).map(([k, v]) => `${clean(k, 60)} : ${clean(v, 300)}`).filter((l) => !l.endsWith(": "));
  const key = process.env.RESEND_API_KEY, from = process.env.CONTACT_FROM, to = process.env.CONTACT_TO;
  if (!key || !from || !to) return { status: "not_configured" };
  const text = [`${kind} depuis le site`, "", `Nom : ${name}`, `Email : ${email}`, phone ? `Téléphone : ${phone}` : null, "", ...details, "", "Message :", message || "(aucun)"].filter((l): l is string => l !== null).join("\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `${kind} : ${name}`, text }),
    });
    return res.ok ? { status: "sent" } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}
