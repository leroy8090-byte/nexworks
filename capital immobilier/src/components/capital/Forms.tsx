"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { sendInquiry, type InquiryInput } from "@/app/capital-immobilier/actions";
import { capital, communeNames, propertyTypeLabel } from "@/data/capital";

/**
 * Formulaires reliés à la messagerie du logiciel NEXWORKS ESTATE, via une action serveur qui garde la clé.
 * Site de test : rien ne part vers contact@capitalimmobilier.fr, et le texte de consentement le dit.
 */

const input =
  "w-full rounded-none border-0 border-b border-[#183B50]/25 bg-transparent px-0 py-3 text-[15px] text-[#252A2D] outline-none transition-colors placeholder:text-[#252A2D]/40 focus:border-[#183B50]";
const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#183B50]/70";

type Errors = Record<string, string>;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-[12.5px] text-[#9a3b2e]">
          {error}
        </p>
      )}
    </div>
  );
}

function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Ne pas remplir
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const phoneOk = (s: string) => s.replace(/[\s.\-+()]/g, "").length >= 9 && /^[\d\s.\-+()]+$/.test(s);
const str = (d: FormData, k: string) => String(d.get(k) ?? "").trim();

function Success({ title, onReset }: { title: string; onReset: () => void }) {
  return (
    <div role="status" className="border border-[#183B50]/30 bg-[#F8F7F3] p-8">
      <p className="font-[family-name:var(--font-cap-serif)] text-[1.9rem] leading-tight text-[#252A2D]">{title}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-[#252A2D]/70">
        Votre demande est enregistrée dans le logiciel de test NEXWORKS ESTATE. Pour joindre l&apos;agence elle-même, utilisez ses coordonnées réelles.
      </p>
      <button type="button" onClick={onReset} className="mt-6 text-[13px] font-semibold text-[#183B50] underline underline-offset-4">
        Remplir à nouveau
      </button>
    </div>
  );
}

function SendError() {
  return (
    <p role="alert" className="text-[13.5px] leading-relaxed text-[#9a3b2e]">
      L&apos;envoi a échoué. Réessayez, ou appelez l&apos;agence au {capital.phone}.
    </p>
  );
}

function useInquiryForm(validate: (d: FormData) => Errors, build: (d: FormData) => InquiryInput) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState(false);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const prefix = form.dataset.prefix;
    const data = new FormData(form);
    // Champ piège rempli : un robot voit un succès, rien n'est envoyé.
    if (data.get("website")) {
      setDone(true);
      return;
    }
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      requestAnimationFrame(() => (document.getElementById(first === "consent" ? "consent" : `${prefix}-${first}`) as HTMLElement | null)?.focus());
      return;
    }
    setPending(true);
    setFailed(false);
    const input = build(data);
    const { ok } = await sendInquiry(input).catch(() => ({ ok: false }));
    setPending(false);
    if (!ok) {
      setFailed(true);
      return;
    }
    const tracker = (window as unknown as { nexworksEstate?: { track: (t: string, extra?: object) => void } }).nexworksEstate;
    tracker?.track("form_submit", input.propertyReference ? { property: input.propertyReference } : {});
    setDone(true);
  }
  return { errors, done, failed, pending, onSubmit, reset: () => (setDone(false), setFailed(false), setErrors({})) };
}

const consentText = "Site de test : j'accepte que ma demande soit enregistrée dans le logiciel de test NEXWORKS ESTATE. Elle n'est pas transmise à CAPITAL IMMOBILIER.";

function Consent({ error }: { error?: string }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-[#252A2D]/70">
        <input type="checkbox" name="consent" id="consent" className="mt-1 size-4 accent-[#183B50]" />
        {consentText}
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-[12.5px] text-[#9a3b2e]">
          {error}
        </p>
      )}
    </div>
  );
}

function Submit({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-[#183B50] px-8 py-4 text-[13.5px] font-semibold text-[#F8F7F3] transition-colors hover:bg-[#252A2D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183B50] disabled:opacity-60"
    >
      {pending ? "Envoi…" : children}
    </button>
  );
}

export function ContactForm({ bien, reference, idPrefix = "c" }: { bien?: string; reference?: string; idPrefix?: string }) {
  const f = useInquiryForm((d) => {
    const e: Errors = {};
    if (str(d, "name").length < 2) e.name = "Indiquez votre nom.";
    if (!emailOk(str(d, "email"))) e.email = "Indiquez une adresse e-mail valide.";
    if (str(d, "phone") && !phoneOk(str(d, "phone"))) e.phone = "Indiquez un numéro de téléphone valide.";
    if (str(d, "message").length < 10) e.message = "Votre message doit contenir au moins 10 caractères.";
    if (d.get("consent") !== "on") e.consent = "Cochez la case pour envoyer votre demande.";
    return e;
  }, (d) => {
    const about = str(d, "bien");
    return {
      type: reference ? "property" : "general",
      name: str(d, "name"),
      email: str(d, "email"),
      phone: str(d, "phone"),
      message: about && !reference ? `Bien concerné : ${about}\n\n${str(d, "message")}` : str(d, "message"),
      propertyReference: reference,
      origin: reference ? `Site Capital Immobilier, fiche ${reference}` : "Site Capital Immobilier, formulaire de contact",
    };
  });
  const p = idPrefix;
  if (f.done) return <Success title="Merci, votre demande est bien enregistrée." onReset={f.reset} />;
  return (
    <form onSubmit={f.onSubmit} noValidate data-prefix={p} className="relative space-y-7">
      <Honeypot />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id={`${p}-name`} label="Nom" error={f.errors.name}>
          <input id={`${p}-name`} name="name" autoComplete="name" className={input} aria-invalid={!!f.errors.name} aria-describedby={f.errors.name ? `${p}-name-err` : undefined} />
        </Field>
        <Field id={`${p}-email`} label="E-mail" error={f.errors.email}>
          <input id={`${p}-email`} name="email" type="email" autoComplete="email" className={input} aria-invalid={!!f.errors.email} aria-describedby={f.errors.email ? `${p}-email-err` : undefined} />
        </Field>
        <Field id={`${p}-phone`} label="Téléphone (facultatif)" error={f.errors.phone}>
          <input id={`${p}-phone`} name="phone" type="tel" autoComplete="tel" className={input} aria-invalid={!!f.errors.phone} />
        </Field>
        <Field id={`${p}-bien`} label="Bien concerné (facultatif)">
          <input id={`${p}-bien`} name="bien" defaultValue={bien ?? ""} className={input} placeholder="Référence ou titre du bien" />
        </Field>
      </div>
      <Field id={`${p}-message`} label="Votre message" error={f.errors.message}>
        <textarea id={`${p}-message`} name="message" rows={5} className={input} aria-invalid={!!f.errors.message} aria-describedby={f.errors.message ? `${p}-message-err` : undefined} />
      </Field>
      <Consent error={f.errors.consent} />
      {f.failed && <SendError />}
      <Submit pending={f.pending}>Envoyer</Submit>
    </form>
  );
}

export function EstimateForm() {
  const f = useInquiryForm((d) => {
    const e: Errors = {};
    if (str(d, "name").length < 2) e.name = "Indiquez votre nom.";
    if (!emailOk(str(d, "email"))) e.email = "Indiquez une adresse e-mail valide.";
    if (str(d, "phone") && !phoneOk(str(d, "phone"))) e.phone = "Indiquez un numéro de téléphone valide.";
    if (!str(d, "commune")) e.commune = "Choisissez une localisation.";
    if (!str(d, "type")) e.type = "Choisissez un type de bien.";
    const s = Number(str(d, "surface"));
    if (!s || s < 8) e.surface = "Indiquez une surface valide (8 m² minimum).";
    if (d.get("consent") !== "on") e.consent = "Cochez la case pour envoyer votre demande.";
    return e;
  }, (d) => ({
    type: "estimation",
    name: str(d, "name"),
    email: str(d, "email"),
    phone: str(d, "phone"),
    message: [`Estimation : ${propertyTypeLabel[str(d, "type")] ?? str(d, "type")} à ${str(d, "commune")}, environ ${str(d, "surface")} m².`, str(d, "message")].filter(Boolean).join("\n\n"),
    origin: "Site Capital Immobilier, formulaire d'estimation",
  }));
  if (f.done) return <Success title="Merci, votre demande d'estimation est bien enregistrée." onReset={f.reset} />;
  return (
    <form onSubmit={f.onSubmit} noValidate data-prefix="e" className="relative space-y-7">
      <Honeypot />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="e-name" label="Nom" error={f.errors.name}>
          <input id="e-name" name="name" autoComplete="name" className={input} aria-invalid={!!f.errors.name} />
        </Field>
        <Field id="e-email" label="E-mail" error={f.errors.email}>
          <input id="e-email" name="email" type="email" autoComplete="email" className={input} aria-invalid={!!f.errors.email} />
        </Field>
        <Field id="e-phone" label="Téléphone (facultatif)" error={f.errors.phone}>
          <input id="e-phone" name="phone" type="tel" autoComplete="tel" className={input} aria-invalid={!!f.errors.phone} />
        </Field>
        <Field id="e-commune" label="Localisation du bien" error={f.errors.commune}>
          <select id="e-commune" name="commune" defaultValue="" className={input} aria-invalid={!!f.errors.commune}>
            <option value="" disabled>
              Choisir…
            </option>
            {communeNames.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="Autre">Autre commune</option>
          </select>
        </Field>
        <Field id="e-type" label="Type de bien" error={f.errors.type}>
          <select id="e-type" name="type" defaultValue="" className={input} aria-invalid={!!f.errors.type}>
            <option value="" disabled>
              Choisir…
            </option>
            {Object.entries(propertyTypeLabel).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field id="e-surface" label="Surface approximative (m²)" error={f.errors.surface}>
          <input id="e-surface" name="surface" type="number" min={0} inputMode="numeric" className={input} aria-invalid={!!f.errors.surface} />
        </Field>
      </div>
      <Field id="e-message" label="Précisions (facultatif)">
        <textarea id="e-message" name="message" rows={4} className={input} />
      </Field>
      <Consent error={f.errors.consent} />
      {f.failed && <SendError />}
      <Submit pending={f.pending}>Demander une estimation</Submit>
    </form>
  );
}
