"use client";

import { useRef, useState, type FormEvent } from "react";
import { sendRequest } from "@/app/actions";
import { agency } from "@/data/agency";

export type Field = { name: string; label: string; type?: "text" | "select" | "textarea" | "number"; options?: string[]; required?: boolean; placeholder?: string; wide?: boolean };

const input = "w-full rounded-none border-0 border-b border-night/30 bg-transparent py-3 text-[16.5px] text-night outline-none transition-colors focus:border-sea";
const label = "block text-[14.5px] font-semibold text-night";

/**
 * Le formulaire de toutes les pages. Vérification avant envoi, protection anti-robots, message clair en cas d'échec.
 * Sans boîte mail configurée, il le dit : il n'annonce jamais un envoi qui n'a pas eu lieu.
 */
export function RequestForm({ kind, fields = [], message = "Votre message", messageRequired = true, submit = "Envoyer ma demande", id = "f" }: { kind: string; fields?: Field[]; message?: string; messageRequired?: boolean; submit?: string; id?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "pending" | "sent" | "not_configured" | "error">("idle");
  const started = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const str = (k: string) => String(d.get(k) ?? "").trim();
    const errs: Record<string, string> = {};
    if (str("name").length < 2) errs.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str("email"))) errs.email = "Indiquez une adresse e-mail valide.";
    if (str("phone") && !/^[\d\s.\-+()]{9,}$/.test(str("phone"))) errs.phone = "Indiquez un numéro de téléphone valide.";
    fields.forEach((f) => { if (f.required && !str(f.name)) errs[f.name] = `Renseignez : ${f.label.toLowerCase()}.`; });
    if (messageRequired && str("message").length < 10) errs.message = "Votre message doit contenir au moins 10 caractères.";
    if (d.get("consent") !== "on") errs.consent = "Cochez la case pour envoyer votre demande.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const k = Object.keys(errs)[0];
      requestAnimationFrame(() => document.getElementById(`${id}-${k}`)?.focus());
      return;
    }
    setStatus("pending");
    const details: Record<string, string> = {};
    fields.forEach((f) => { details[f.label] = str(f.name); });
    details.Message = str("message");
    const res = await sendRequest({ kind, name: str("name"), email: str("email"), phone: str("phone"), website: str("website"), elapsed: Date.now() - started.current, details }).catch(() => ({ status: "error" as const }));
    setStatus(res.status === "sent" ? "sent" : res.status === "not_configured" ? "not_configured" : "error");
  }

  if (status === "sent") {
    return (
      <div role="status" className="cookie-in">
        <p className="text-[2.2rem] leading-tight text-night [font-family:var(--font-display)]">Merci, votre demande est bien envoyée.</p>
        <p className="mt-3 text-[17px] leading-relaxed text-muted">L’agence revient vers vous. Pour une question urgente : {agency.phone}.</p>
      </div>
    );
  }
  const err = (k: string) => errors[k] && <p id={`${id}-${k}-err`} role="alert" className="mt-1.5 text-[14px] font-medium text-sea">{errors[k]}</p>;
  const a = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined });
  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Ne pas remplir<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div><label htmlFor={`${id}-name`} className={label}>Nom</label><input id={`${id}-name`} name="name" autoComplete="name" className={input} {...a("name")} />{err("name")}</div>
        <div><label htmlFor={`${id}-email`} className={label}>E-mail</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" className={input} {...a("email")} />{err("email")}</div>
        <div><label htmlFor={`${id}-phone`} className={label}>Téléphone (facultatif)</label><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={input} {...a("phone")} />{err("phone")}</div>
        {fields.map((f) => (
          <div key={f.name} className={f.wide ? "sm:col-span-2" : ""}>
            <label htmlFor={`${id}-${f.name}`} className={label}>{f.label}{f.required ? "" : " (facultatif)"}</label>
            {f.type === "select"
              ? <select id={`${id}-${f.name}`} name={f.name} defaultValue="" className={`select ${input}`} {...a(f.name)}><option value="">Choisir…</option>{f.options?.map((o) => <option key={o}>{o}</option>)}</select>
              : <input id={`${id}-${f.name}`} name={f.name} type={f.type === "number" ? "number" : "text"} min={f.type === "number" ? 0 : undefined} placeholder={f.placeholder} className={input} {...a(f.name)} />}
            {err(f.name)}
          </div>
        ))}
      </div>
      <div className="mt-6"><label htmlFor={`${id}-message`} className={label}>{message}{messageRequired ? "" : " (facultatif)"}</label><textarea id={`${id}-message`} name="message" rows={4} className={input} {...a("message")} />{err("message")}</div>
      <label className="mt-6 flex items-start gap-3 text-[14.5px] leading-relaxed text-muted"><input type="checkbox" id={`${id}-consent`} name="consent" className="mt-1 size-4 accent-[#d90416]" />J’accepte que mes coordonnées servent à traiter ma demande. Voir la politique de confidentialité.</label>
      {err("consent")}
      {status === "not_configured" && <p role="alert" className="mt-5 border-l-4 border-sea bg-sand/50 p-4 text-[15.5px] leading-relaxed text-night">Cette démonstration n’est pas encore reliée à la boîte mail de l’agence : votre demande n’a pas été envoyée. Appelez le <a href={`tel:${agency.phoneHref}`} className="font-semibold underline">{agency.phone}</a>.</p>}
      {status === "error" && <p role="alert" className="mt-5 text-[15px] font-medium text-sea">L’envoi a échoué. Réessayez, ou appelez l’agence au {agency.phone}.</p>}
      <button type="submit" disabled={status === "pending"} className="fill mt-7 min-h-[3.3rem] bg-sea px-8 text-[15px] font-semibold text-white [--f:var(--color-night)] disabled:opacity-60">{status === "pending" ? "Envoi…" : submit}</button>
    </form>
  );
}
