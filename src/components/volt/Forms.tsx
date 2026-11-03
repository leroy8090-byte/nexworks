"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const input =
  "w-full border-0 border-b border-[#F5F5F0]/25 bg-transparent px-0 py-3 text-[15px] text-[#F5F5F0] outline-none transition-colors placeholder:text-[#858585] focus:border-[#C6FF3D] [&>option]:bg-[#1B1B1B]";
const labelCls = "block text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-[#858585]";
const errCls = "mt-1.5 text-[12.5px] text-[#ff8a7a]";

type Errors = Record<string, string>;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className={errCls}>
          {error}
        </p>
      )}
    </div>
  );
}

const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const str = (d: FormData, k: string) => String(d.get(k) ?? "").trim();

export function ContactForm({ cours, formule }: { cours?: string; formule?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    if (d.get("website")) {
      setDone(true); // honeypot : on fait semblant
      return;
    }
    const errs: Errors = {};
    if (str(d, "name").length < 2) errs.name = "Indiquez votre nom.";
    if (!emailOk(str(d, "email"))) errs.email = "Indiquez une adresse e-mail valide.";
    const phone = str(d, "phone");
    if (phone && !/^[\d\s+().-]{6,20}$/.test(phone)) errs.phone = "Numéro de téléphone invalide.";
    if (str(d, "message").length < 10) errs.message = "Votre message doit contenir au moins 10 caractères.";
    if (d.get("consent") !== "on") errs.consent = "Veuillez confirmer avoir compris le caractère démonstratif du formulaire.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="border border-[#C6FF3D]/50 bg-[#1B1B1B] p-8">
        <p className="font-[family-name:var(--font-volt-display)] text-[2.6rem] uppercase leading-none text-[#C6FF3D]">Saisie validée</p>
        <p className="mt-4 text-[15px] leading-relaxed text-[#F5F5F0]/70">
          Ceci est un formulaire de démonstration : votre message n&apos;a pas été envoyé et aucune donnée n&apos;a été enregistrée. VOLT FITNESS CLUB est un club fictif.
        </p>
        <button
          type="button"
          onClick={() => (setDone(false), setErrors({}))}
          className="mt-6 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#C6FF3D] underline underline-offset-4"
        >
          Remplir à nouveau
        </button>
      </div>
    );
  }

  const subject = cours ? `Cours / essai : ${cours}` : formule ? `Formule : ${formule.toUpperCase()}` : "";

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-7">
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="v-name" label="Nom" error={errors.name}>
          <input id="v-name" name="name" autoComplete="name" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "v-name-err" : undefined} />
        </Field>
        <Field id="v-email" label="E-mail" error={errors.email}>
          <input id="v-email" name="email" type="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? "v-email-err" : undefined} />
        </Field>
        <Field id="v-phone" label="Téléphone (facultatif)" error={errors.phone}>
          <input id="v-phone" name="phone" type="tel" autoComplete="tel" className={input} aria-invalid={!!errors.phone} />
        </Field>
        <Field id="v-subject" label="Sujet (facultatif)">
          <input id="v-subject" name="subject" defaultValue={subject} className={input} placeholder="Essai, abonnement, cours…" />
        </Field>
      </div>
      <Field id="v-message" label="Message" error={errors.message}>
        <textarea id="v-message" name="message" rows={5} className={input} aria-invalid={!!errors.message} aria-describedby={errors.message ? "v-message-err" : undefined} />
      </Field>
      <div>
        <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-[#F5F5F0]/65">
          <input type="checkbox" name="consent" className="mt-1 size-4 accent-[#C6FF3D]" />
          Je comprends qu&apos;il s&apos;agit d&apos;une démonstration : mon message ne sera pas envoyé.
        </label>
        {errors.consent && (
          <p role="alert" className={errCls}>
            {errors.consent}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center bg-[#C6FF3D] px-8 py-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#101010] transition-colors hover:bg-[#F5F5F0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF3D]"
      >
        Envoyer (démonstration)
      </button>
    </form>
  );
}
