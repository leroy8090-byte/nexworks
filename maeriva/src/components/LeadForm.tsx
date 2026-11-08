"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { sendLead, type LeadResult } from "@/app/actions";
import { agencyFor } from "@/data/localized";
import { localePath, type Lang } from "@/i18n/config";

type Choice = { name: string; label: string; options: string[] };

const T = {
  fr: {
    name: "Nom", namePh: "Prénom et nom", email: "Email", emailPh: "vous@exemple.com", phone: "Téléphone", optional: "Facultatif", date: "Date souhaitée",
    message: "Message", messagePh: "Votre message (facultatif)", choose: "Choisir", website: "Site web",
    consent: "J'accepte que mes coordonnées soient utilisées uniquement pour répondre à ma demande.", privacy: "Confidentialité",
    consentNeeded: "Merci d'accepter que vos coordonnées soient utilisées pour vous répondre.", check: "Vérifiez les champs.",
    notConfigured: "Ce site de démonstration n'envoie pas encore les demandes. Une fois en service, elles arriveront directement à l'agence. En attendant :",
    error: "L'envoi n'a pas abouti. Réessayez dans un instant, ou appelez le", sent: "Merci, votre demande est bien partie.",
    sentText: "Un conseiller vous recontacte rapidement, par email ou par téléphone.", sending: "Envoi…", submit: "Envoyer la demande",
  },
  en: {
    name: "Name", namePh: "First and last name", email: "Email", emailPh: "you@example.com", phone: "Phone", optional: "Optional", date: "Preferred date",
    message: "Message", messagePh: "Your message (optional)", choose: "Select", website: "Website",
    consent: "I agree that my details will be used solely to respond to my request.", privacy: "Privacy",
    consentNeeded: "Please agree that your details may be used to respond to you.", check: "Please check the fields.",
    notConfigured: "This demonstration website does not send requests yet. Once live, they will go straight to the agency. In the meantime:",
    error: "Your request could not be sent. Please try again in a moment, or call", sent: "Thank you, your request has been sent.",
    sentText: "An advisor will get back to you shortly, by email or by phone.", sending: "Sending…", submit: "Send request",
  },
};

/**
 * Formulaire de demande : visite privée, dossier, estimation, alerte, contact, accès à la collection privée.
 * Il n'invente aucune réponse : si l'envoi n'est pas configuré, il le dit et propose d'appeler.
 * La version courte (minimal) ne demande que le nom, l'email et les choix : moins de champs, plus de demandes.
 * `kind` (l'objet de l'email reçu par l'agence) reste en français ; la langue du visiteur est précisée.
 */
export function LeadForm({ kind, lang, details = {}, choices = [], date, minimal, submit, messagePlaceholder }: {
  kind: string; lang: Lang; details?: Record<string, string>; choices?: Choice[]; date?: boolean; minimal?: boolean; submit?: string; messagePlaceholder?: string;
}) {
  const t = T[lang];
  const agency = agencyFor(lang);
  const id = useId();
  const started = useRef(0);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const field = "field placeholder:text-muted/60";
  const label = "caps text-[9.5px] text-pave-dark";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "");
    if (!get("consent")) { setResult({ status: "invalid", message: t.consentNeeded }); return; }
    setBusy(true);
    const extra: Record<string, string> = { "Langue du visiteur": lang === "fr" ? "français" : "anglais", ...details };
    for (const c of choices) extra[c.label] = get(c.name);
    if (date) extra["Date souhaitée"] = get("date");
    const res = await sendLead({ kind, lang, name: get("name"), email: get("email"), phone: get("phone"), message: get("message"), details: extra, website: get("website"), elapsed: started.current ? Date.now() - started.current : 0 });
    setBusy(false);
    setResult(res);
  }

  if (result?.status === "sent") {
    return (
      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} role="status" className="border-l border-gold py-2 pl-6">
        <p className="serif text-[1.9rem] leading-tight text-ink">{t.sent}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{t.sentText}</p>
      </m.div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={() => { if (!started.current) started.current = Date.now(); }} noValidate className="relative grid gap-7 text-ink">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="grid gap-1"><span className={label}>{t.name}</span><input name="name" autoComplete="name" required minLength={2} className={field} placeholder={t.namePh} /></label>
        <label className="grid gap-1"><span className={label}>{t.email}</span><input name="email" type="email" autoComplete="email" required className={field} placeholder={t.emailPh} /></label>
        {!minimal && <label className="grid gap-1"><span className={label}>{t.phone}</span><input name="phone" type="tel" autoComplete="tel" className={field} placeholder={t.optional} /></label>}
        {date && <label className="grid gap-1"><span className={label}>{t.date}</span><input name="date" type="date" lang={lang} className={field} /></label>}
        {choices.map((c) => (
          <label key={c.name} className="grid gap-1"><span className={label}>{c.label}</span>
            <select name={c.name} className={field} defaultValue=""><option value="" disabled>{t.choose}</option>{c.options.map((o) => <option key={o}>{o}</option>)}</select>
          </label>
        ))}
      </div>
      {!minimal && <label className="grid gap-1"><span className={label}>{t.message}</span><textarea name="message" rows={3} className={field} placeholder={messagePlaceholder ?? t.messagePh} /></label>}
      {/* Champ piège, invisible pour les personnes */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden"><label>{t.website}<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label htmlFor={`${id}-consent`} className="flex items-start gap-3 text-[13px] leading-relaxed text-muted">
        <input id={`${id}-consent`} name="consent" type="checkbox" value="oui" className="mt-1 size-4 accent-[var(--color-ink)]" />
        <span>{t.consent} <Link href={localePath(lang, "/confidentialite")} className="underline underline-offset-2">{t.privacy}</Link></span>
      </label>
      <AnimatePresence>
        {result && (
          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alert" className={`border-l py-1 pl-4 text-[14.5px] leading-relaxed text-ink ${result.status === "invalid" ? "border-ochre" : "border-gold"}`}>
            {result.status === "invalid" && (result.message ?? t.check)}
            {result.status === "not_configured" && <>{t.notConfigured} <a href={`tel:${agency.phoneHref}`} className="underline">{agency.phone}</a>.</>}
            {result.status === "error" && <>{t.error} <a href={`tel:${agency.phoneHref}`} className="underline">{agency.phone}</a>.</>}
          </m.p>
        )}
      </AnimatePresence>
      <div>
        <button type="submit" disabled={busy} className="group/b inline-flex min-h-[3.4rem] items-center justify-center gap-3 bg-ink px-9 text-[11.5px] font-medium tracking-[0.24em] text-white uppercase transition-colors hover:bg-sea disabled:opacity-60">
          {busy ? t.sending : submit ?? t.submit}<span aria-hidden className="text-[15px] tracking-normal transition-transform duration-300 group-hover/b:translate-x-1">→</span>
        </button>
      </div>
    </form>
  );
}
