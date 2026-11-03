"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { locations } from "@/data/riviera";

const input =
  "w-full border-0 border-b border-[#D9CBB7] bg-transparent px-0 py-3 text-[15px] text-[#24251F] outline-none transition-colors placeholder:text-[#858178]/60 focus:border-[#68715B]";
const labelCls = "block text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#858178]";

type Errors = Record<string, string>;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-[12.5px] text-[#9a4a3a]">
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

function Success({ onReset }: { onReset: () => void }) {
  return (
    <div role="status" className="border border-[#68715B]/40 bg-[#FFFEFA] p-8">
      <p className="font-[family-name:var(--font-riviera-display)] text-[1.9rem] font-light text-[#24251F]">Merci, votre saisie est validée.</p>
      <p className="mt-3 text-[15px] leading-relaxed text-[#858178]">
        Ceci est un formulaire de démonstration : votre message n&apos;a pas été envoyé et aucune donnée n&apos;a été enregistrée. MAISON RIVIERA est une agence fictive.
      </p>
      <button type="button" onClick={onReset} className="mt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#68715B] underline underline-offset-4">
        Remplir à nouveau
      </button>
    </div>
  );
}

const submitCls =
  "inline-flex items-center justify-center bg-[#24251F] px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#FFFEFA] transition-colors hover:bg-[#68715B]";

function useDemoForm(validate: (d: FormData) => Errors) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) {
      setDone(true); // honeypot : on fait semblant
      return;
    }
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  }
  return { errors, done, onSubmit, reset: () => (setDone(false), setErrors({})) };
}

const str = (d: FormData, k: string) => String(d.get(k) ?? "").trim();

export function ContactForm({ bien }: { bien?: string }) {
  const f = useDemoForm((d) => {
    const e: Errors = {};
    if (str(d, "name").length < 2) e.name = "Indiquez votre nom.";
    if (!emailOk(str(d, "email"))) e.email = "Indiquez une adresse e-mail valide.";
    if (str(d, "message").length < 10) e.message = "Votre message doit contenir au moins 10 caractères.";
    if (d.get("consent") !== "on") e.consent = "Veuillez confirmer avoir compris le caractère démonstratif du formulaire.";
    return e;
  });
  if (f.done) return <Success onReset={f.reset} />;
  return (
    <form onSubmit={f.onSubmit} noValidate className="relative space-y-7">
      <Honeypot />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="c-name" label="Nom" error={f.errors.name}>
          <input id="c-name" name="name" autoComplete="name" className={input} aria-invalid={!!f.errors.name} />
        </Field>
        <Field id="c-email" label="E-mail" error={f.errors.email}>
          <input id="c-email" name="email" type="email" autoComplete="email" className={input} aria-invalid={!!f.errors.email} />
        </Field>
      </div>
      <Field id="c-bien" label="Bien concerné (facultatif)">
        <input id="c-bien" name="bien" defaultValue={bien ?? ""} className={input} placeholder="Référence ou titre du bien" />
      </Field>
      <Field id="c-message" label="Message" error={f.errors.message}>
        <textarea id="c-message" name="message" rows={5} className={input} aria-invalid={!!f.errors.message} />
      </Field>
      <div>
        <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-[#858178]">
          <input type="checkbox" name="consent" className="mt-1 size-4 accent-[#68715B]" />
          Je comprends qu&apos;il s&apos;agit d&apos;une démonstration : mon message ne sera pas envoyé.
        </label>
        {f.errors.consent && <p role="alert" className="mt-1.5 text-[12.5px] text-[#9a4a3a]">{f.errors.consent}</p>}
      </div>
      <button type="submit" className={submitCls}>Envoyer (démonstration)</button>
    </form>
  );
}

export function EstimateForm() {
  const f = useDemoForm((d) => {
    const e: Errors = {};
    if (str(d, "name").length < 2) e.name = "Indiquez votre nom.";
    if (!emailOk(str(d, "email"))) e.email = "Indiquez une adresse e-mail valide.";
    if (!str(d, "city")) e.city = "Choisissez une localisation.";
    if (!str(d, "type")) e.type = "Choisissez un type de bien.";
    const s = Number(str(d, "surface"));
    if (!s || s < 10) e.surface = "Indiquez une surface valide (10 m² minimum).";
    if (d.get("consent") !== "on") e.consent = "Veuillez confirmer avoir compris le caractère démonstratif du formulaire.";
    return e;
  });
  if (f.done) return <Success onReset={f.reset} />;
  return (
    <form onSubmit={f.onSubmit} noValidate className="relative space-y-7">
      <Honeypot />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="e-name" label="Nom" error={f.errors.name}>
          <input id="e-name" name="name" autoComplete="name" className={input} aria-invalid={!!f.errors.name} />
        </Field>
        <Field id="e-email" label="E-mail" error={f.errors.email}>
          <input id="e-email" name="email" type="email" autoComplete="email" className={input} aria-invalid={!!f.errors.email} />
        </Field>
        <Field id="e-city" label="Localisation du bien" error={f.errors.city}>
          <select id="e-city" name="city" defaultValue="" className={input} aria-invalid={!!f.errors.city}>
            <option value="" disabled>Choisir…</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
            <option value="Autre">Autre commune</option>
          </select>
        </Field>
        <Field id="e-type" label="Type de bien" error={f.errors.type}>
          <select id="e-type" name="type" defaultValue="" className={input} aria-invalid={!!f.errors.type}>
            <option value="" disabled>Choisir…</option>
            <option value="villa">Villa</option>
            <option value="maison">Maison</option>
            <option value="appartement">Appartement</option>
          </select>
        </Field>
        <Field id="e-surface" label="Surface approximative (m²)" error={f.errors.surface}>
          <input id="e-surface" name="surface" type="number" min={0} inputMode="numeric" className={input} aria-invalid={!!f.errors.surface} />
        </Field>
        <Field id="e-delay" label="Calendrier envisagé (facultatif)">
          <select id="e-delay" name="delay" defaultValue="" className={input}>
            <option value="">Non défini</option>
            <option>Dans les 3 mois</option>
            <option>Dans l&apos;année</option>
            <option>Je me renseigne</option>
          </select>
        </Field>
      </div>
      <Field id="e-message" label="Précisions (facultatif)">
        <textarea id="e-message" name="message" rows={4} className={input} />
      </Field>
      <div>
        <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-[#858178]">
          <input type="checkbox" name="consent" className="mt-1 size-4 accent-[#68715B]" />
          Je comprends qu&apos;il s&apos;agit d&apos;une démonstration : aucune estimation ne sera réalisée ni transmise.
        </label>
        {f.errors.consent && <p role="alert" className="mt-1.5 text-[12.5px] text-[#9a4a3a]">{f.errors.consent}</p>}
      </div>
      <button type="submit" className={submitCls}>Demander une estimation (démonstration)</button>
    </form>
  );
}
