"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendRequest } from "@/app/actions";
import { agency } from "@/data/agency";

const KINDS = [["infos", "Demander des informations"], ["visite", "Organiser une visite"], ["message", "Envoyer un message"]] as const;
type Kind = (typeof KINDS)[number][0];
const EVENT = "capital-kind";
const input = "w-full rounded-none border-0 border-b border-night/30 bg-transparent py-3 text-[16.5px] text-night outline-none transition-colors focus:border-night";
const ask = (k: Kind) => window.dispatchEvent(new CustomEvent(EVENT, { detail: k }));

/** Le panneau du haut de fiche : chaque bouton ouvre le formulaire sur la bonne demande. */
export function ContactActions() {
  return (
    <div className="mt-6 grid gap-2">
      <a href="#demande" onClick={() => ask("visite")} className="fill grid min-h-[3.3rem] place-items-center bg-sea text-[15px] font-semibold text-white [--f:var(--color-night)]">Organiser une visite</a>
      <a href="#demande" onClick={() => ask("infos")} className="fill grid min-h-[3.3rem] place-items-center border border-night/35 text-[15px] font-medium text-night [--f:var(--color-night)] hover:text-white">Demander des informations</a>
      <a href={`tel:${agency.phoneHref}`} className="fill grid min-h-[3.3rem] place-items-center border border-night/35 text-[15px] font-medium text-night [--f:var(--color-night)] hover:text-white">Appeler le {agency.phone}</a>
      <a href="#demande" onClick={() => ask("message")} className="line-link mx-auto mt-1 text-[15px] text-muted">Envoyer un message</a>
    </div>
  );
}

/** Sur téléphone : le prix reste visible et la visite est à un geste. */
export function ActionBar({ price }: { price: string }) {
  return (
    <div data-fiche-bar className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-rule bg-white px-4 py-2 sm:hidden">
      <p className="text-[1.35rem] leading-tight text-night [font-family:var(--font-display)]">{price}</p>
      <div className="flex gap-2">
        <a href={`tel:${agency.phoneHref}`} className="grid h-11 place-items-center border border-night/35 px-4 text-[14.5px] text-night">Appeler</a>
        <a href="#demande" onClick={() => ask("visite")} className="grid h-11 place-items-center bg-sea px-4 text-[14.5px] font-semibold text-white">Visiter</a>
      </div>
    </div>
  );
}

export function ListingForm({ title, reference, commune }: { title: string; reference: string | null; commune: string }) {
  const [kind, setKind] = useState<Kind>("infos");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "pending" | "sent" | "not_configured" | "error">("idle");
  const first = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const on = (e: Event) => { setKind((e as CustomEvent<Kind>).detail); setTimeout(() => first.current?.focus({ preventScroll: true }), 700); };
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  const defaults: Record<Kind, string> = {
    infos: `Bonjour, je souhaite des informations sur ce bien : ${title}, ${commune}${reference ? `, réf. ${reference}` : ""}.`,
    visite: `Bonjour, je souhaite visiter ce bien : ${title}, ${commune}${reference ? `, réf. ${reference}` : ""}. Mes disponibilités :`,
    message: "",
  };
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const str = (k: string) => String(d.get(k) ?? "").trim();
    const errs: Record<string, string> = {};
    if (str("name").length < 2) errs.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str("email"))) errs.email = "Indiquez une adresse e-mail valide.";
    if (str("phone") && !/^[\d\s.\-+()]{9,}$/.test(str("phone"))) errs.phone = "Indiquez un numéro de téléphone valide.";
    if (str("message").length < 10) errs.message = "Votre message doit contenir au moins 10 caractères.";
    if (d.get("consent") !== "on") errs.consent = "Cochez la case pour envoyer votre demande.";
    setErrors(errs);
    if (Object.keys(errs).length) { const k = Object.keys(errs)[0]; requestAnimationFrame(() => document.getElementById(`b-${k}`)?.focus()); return; }
    setStatus("pending");
    const res = await sendRequest({ kind: KINDS.find(([k]) => k === kind)![1], name: str("name"), email: str("email"), phone: str("phone"), website: str("website"), details: { Bien: `${title}, ${commune}`, Référence: reference ?? "", Message: str("message") } }).catch(() => ({ status: "error" as const }));
    setStatus(res.status === "sent" ? "sent" : res.status === "not_configured" ? "not_configured" : "error");
  }
  if (status === "sent") return <div role="status"><p className="text-[2.2rem] leading-tight text-night [font-family:var(--font-display)]">Merci, votre demande est bien envoyée.</p><p className="mt-3 text-[17px] text-muted">L’agence revient vers vous.</p></div>;
  return (
    <form onSubmit={submit} noValidate className="relative">
      <div role="tablist" aria-label="Votre demande" className="flex flex-wrap gap-2">
        {KINDS.map(([k, l]) => <button key={k} type="button" role="tab" aria-selected={kind === k} onClick={() => setKind(k)} className={`min-h-10 rounded-full border px-4 text-[14.5px] transition-colors duration-300 ${kind === k ? "border-night bg-night text-white" : "border-night/20 text-night hover:border-night"}`}>{l}</button>)}
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Ne pas remplir<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="mt-7 grid gap-6 sm:grid-cols-3">
        <div><label htmlFor="b-name" className="block text-[14.5px] font-medium text-night">Nom</label><input ref={first} id="b-name" name="name" autoComplete="name" aria-invalid={!!errors.name} className={input} />{errors.name && <p role="alert" className="mt-1.5 text-[14px] text-[#9A2B1B]">{errors.name}</p>}</div>
        <div><label htmlFor="b-email" className="block text-[14.5px] font-medium text-night">E-mail</label><input id="b-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={input} />{errors.email && <p role="alert" className="mt-1.5 text-[14px] text-[#9A2B1B]">{errors.email}</p>}</div>
        <div><label htmlFor="b-phone" className="block text-[14.5px] font-medium text-night">Téléphone (facultatif)</label><input id="b-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} className={input} />{errors.phone && <p role="alert" className="mt-1.5 text-[14px] text-[#9A2B1B]">{errors.phone}</p>}</div>
      </div>
      <div className="mt-6"><label htmlFor="b-message" className="block text-[14.5px] font-medium text-night">Votre message</label><textarea key={kind} id="b-message" name="message" rows={4} defaultValue={defaults[kind]} aria-invalid={!!errors.message} className={input} />{errors.message && <p role="alert" className="mt-1.5 text-[14px] text-[#9A2B1B]">{errors.message}</p>}</div>
      <label className="mt-6 flex items-start gap-3 text-[14.5px] leading-relaxed text-muted"><input type="checkbox" id="b-consent" name="consent" className="mt-1 size-4 accent-[#d90416]" />J’accepte que mes coordonnées servent à traiter ma demande. Voir la politique de confidentialité.</label>
      {errors.consent && <p role="alert" className="mt-1.5 text-[14px] text-[#9A2B1B]">{errors.consent}</p>}
      {status === "not_configured" && <p role="alert" className="mt-5 bg-sand/50 p-4 text-[15.5px] leading-relaxed text-night">Cette démonstration n’est pas encore reliée à la boîte mail de l’agence : votre demande n’a pas été envoyée. Appelez le <a href={`tel:${agency.phoneHref}`} className="underline">{agency.phone}</a>.</p>}
      {status === "error" && <p role="alert" className="mt-5 text-[15px] text-[#9A2B1B]">L’envoi a échoué. Réessayez, ou appelez l’agence au {agency.phone}.</p>}
      <button type="submit" disabled={status === "pending"} className="fill mt-7 min-h-[3.3rem] bg-sea px-8 text-[15px] font-semibold text-white [--f:var(--color-night)] disabled:opacity-60">{status === "pending" ? "Envoi…" : "Envoyer ma demande"}</button>
    </form>
  );
}
