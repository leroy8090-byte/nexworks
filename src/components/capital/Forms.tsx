"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { communeNames, propertyTypeLabel } from "@/data/capital";

/**
 * Formulaires en MODE DÉMONSTRATION (même principe que MAISON RIVIERA) : validation côté client, champ piège,
 * confirmation. RIEN n'est transmis ni stocké, et rien ne part vers contact@capitalimmobilier.fr.
 * À connecter par l'agence : envoi (API / CRM / logiciel immobilier), anti-spam serveur, consentement RGPD définitif.
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
        Votre saisie est valide, mais il s&apos;agit d&apos;une démonstration : <strong>aucun message n&apos;a été envoyé</strong> et aucune donnée n&apos;a été enregistrée. Pour joindre l&apos;agence, utilisez ses coordonnées réelles.
      </p>
      <button type="button" onClick={onReset} className="mt-6 text-[13px] font-semibold text-[#183B50] underline underline-offset-4">
        Remplir à nouveau
      </button>
    </div>
  );
}

function useDemoForm(validate: (d: FormData) => Errors) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const prefix = form.dataset.prefix;
    const data = new FormData(form);
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
    window.setTimeout(() => {
      setPending(false);
      setDone(true);
    }, 500);
  }
  return { errors, done, pending, onSubmit, reset: () => (setDone(false), setErrors({})) };
}

const consentText = "Je comprends qu'il s'agit d'une démonstration : mon message ne sera pas envoyé à l'agence.";

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
      {pending ? "Validation…" : children}
    </button>
  );
}

export function ContactForm({ bien, idPrefix = "c" }: { bien?: string; idPrefix?: string }) {
  const f = useDemoForm((d) => {
    const e: Errors = {};
    if (str(d, "name").length < 2) e.name = "Indiquez votre nom.";
    if (!emailOk(str(d, "email"))) e.email = "Indiquez une adresse e-mail valide.";
    if (str(d, "phone") && !phoneOk(str(d, "phone"))) e.phone = "Indiquez un numéro de téléphone valide.";
    if (str(d, "message").length < 10) e.message = "Votre message doit contenir au moins 10 caractères.";
    if (d.get("consent") !== "on") e.consent = "Cochez la case pour confirmer avoir compris le caractère démonstratif du formulaire.";
    return e;
  });
  const p = idPrefix;
  if (f.done) return <Success title="Merci, votre demande est bien validée." onReset={f.reset} />;
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
      <Submit pending={f.pending}>Envoyer (démonstration)</Submit>
    </form>
  );
}

export function EstimateForm() {
  const f = useDemoForm((d) => {
    const e: Errors = {};
    if (str(d, "name").length < 2) e.name = "Indiquez votre nom.";
    if (!emailOk(str(d, "email"))) e.email = "Indiquez une adresse e-mail valide.";
    if (str(d, "phone") && !phoneOk(str(d, "phone"))) e.phone = "Indiquez un numéro de téléphone valide.";
    if (!str(d, "commune")) e.commune = "Choisissez une localisation.";
    if (!str(d, "type")) e.type = "Choisissez un type de bien.";
    const s = Number(str(d, "surface"));
    if (!s || s < 8) e.surface = "Indiquez une surface valide (8 m² minimum).";
    if (d.get("consent") !== "on") e.consent = "Cochez la case pour confirmer avoir compris le caractère démonstratif du formulaire.";
    return e;
  });
  if (f.done) return <Success title="Merci, votre demande d'estimation est bien validée." onReset={f.reset} />;
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
      <Submit pending={f.pending}>Demander une estimation (démonstration)</Submit>
    </form>
  );
}
