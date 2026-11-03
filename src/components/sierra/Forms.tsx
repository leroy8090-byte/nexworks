"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { locations } from "@/data/sierra";

const input =
  "w-full border-0 border-b border-[#D8D2C8] bg-transparent px-0 py-3 text-[15px] text-[#231F31] outline-none transition-colors placeholder:text-[#7A7684]/60 focus:border-[#A68936]";
const labelCls = "block text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#7A7684]";

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
const submitCls =
  "inline-flex items-center justify-center bg-[#A68936] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#231F31]";

function Success({ onReset, title }: { onReset: () => void; title: string }) {
  return (
    <div role="status" className="border border-[#A68936]/40 bg-white p-8">
      <p className="text-[1.5rem] font-semibold text-[#231F31]">{title}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-[#7A7684]">
        Formulaire de démonstration : aucune donnée n&apos;a été envoyée. Contact officiel : 04 98 11 04 04 ou sierra-immo.fr.
      </p>
      <button type="button" onClick={onReset} className="mt-6 text-[12px] font-bold uppercase tracking-[0.18em] text-[#A68936] underline underline-offset-4">
        Remplir à nouveau
      </button>
    </div>
  );
}

function useDemoForm(validate: (d: FormData) => Errors) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) {
      setDone(true);
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
    if (d.get("consent") !== "on") e.consent = "Veuillez confirmer le caractère démonstratif du formulaire.";
    return e;
  });
  if (f.done) return <Success onReset={f.reset} title="Merci, votre saisie est validée." />;
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
      <Field id="c-phone" label="Téléphone (facultatif)">
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" className={input} />
      </Field>
      <Field id="c-bien" label="Bien concerné (facultatif)">
        <input id="c-bien" name="bien" defaultValue={bien ?? ""} className={input} placeholder="Référence ou titre" />
      </Field>
      <Field id="c-message" label="Message" error={f.errors.message}>
        <textarea id="c-message" name="message" rows={5} className={input} aria-invalid={!!f.errors.message} />
      </Field>
      <div>
        <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-[#7A7684]">
          <input type="checkbox" name="consent" className="mt-1 size-4 accent-[#A68936]" />
          Je comprends qu&apos;il s&apos;agit d&apos;une démonstration : mon message ne sera pas envoyé.
        </label>
        {f.errors.consent && (
          <p role="alert" className="mt-1.5 text-[12.5px] text-[#9a4a3a]">
            {f.errors.consent}
          </p>
        )}
      </div>
      <button type="submit" className={submitCls}>
        Envoyer (démonstration)
      </button>
    </form>
  );
}

export function EstimationWizard() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [values, setValues] = useState({
    type: "",
    location: "",
    surface: "",
    rooms: "",
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const steps = ["Type de bien", "Localisation", "Surface", "Pièces", "Coordonnées"];

  function next() {
    const e: Errors = {};
    if (step === 0 && !values.type) e.type = "Choisissez un type.";
    if (step === 1 && !values.location) e.location = "Choisissez une localisation.";
    if (step === 2 && (!values.surface || Number(values.surface) < 10)) e.surface = "Indiquez une surface valide.";
    if (step === 3 && !values.rooms) e.rooms = "Indiquez le nombre de pièces.";
    if (step === 4) {
      if (values.name.trim().length < 2) e.name = "Indiquez votre nom.";
      if (!emailOk(values.email)) e.email = "E-mail invalide.";
    }
    setErrors(e);
    if (Object.keys(e).length) return;
    if (step === 4) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  }

  if (done) {
    return (
      <Success
        onReset={() => {
          setDone(false);
          setStep(0);
          setValues({ type: "", location: "", surface: "", rooms: "", name: "", email: "", phone: "" });
        }}
        title="Demande d'estimation enregistrée (démonstration)."
      />
    );
  }

  return (
    <div className="border border-[#E8E4DE] bg-white p-6 sm:p-10">
      <p className="text-[12.5px] leading-relaxed text-[#7A7684]">
        Demande d&apos;estimation à étudier par l&apos;agence — aucune estimation automatique de prix n&apos;est fournie.
      </p>
      <ol className="mt-8 flex flex-wrap gap-2" aria-label="Progression">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] ${
              i === step ? "bg-[#A68936] text-white" : i < step ? "bg-[#231F31] text-white" : "bg-[#F4F2F0] text-[#7A7684]"
            }`}
          >
            {i + 1}. {s}
          </li>
        ))}
      </ol>
      <div className="mt-10 space-y-6">
        {step === 0 && (
          <Field id="e-type" label="Type de bien" error={errors.type}>
            <select
              id="e-type"
              className={input}
              value={values.type}
              onChange={(e) => setValues((v) => ({ ...v, type: e.target.value }))}
            >
              <option value="">Sélectionner</option>
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
              <option value="villa">Villa</option>
              <option value="local">Local</option>
            </select>
          </Field>
        )}
        {step === 1 && (
          <Field id="e-loc" label="Localisation" error={errors.location}>
            <select
              id="e-loc"
              className={input}
              value={values.location}
              onChange={(e) => setValues((v) => ({ ...v, location: e.target.value }))}
            >
              <option value="">Sélectionner</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
        )}
        {step === 2 && (
          <Field id="e-surf" label="Surface (m²)" error={errors.surface}>
            <input
              id="e-surf"
              type="number"
              min={10}
              className={input}
              value={values.surface}
              onChange={(e) => setValues((v) => ({ ...v, surface: e.target.value }))}
            />
          </Field>
        )}
        {step === 3 && (
          <Field id="e-rooms" label="Nombre de pièces" error={errors.rooms}>
            <select id="e-rooms" className={input} value={values.rooms} onChange={(e) => setValues((v) => ({ ...v, rooms: e.target.value }))}>
              <option value="">Sélectionner</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        )}
        {step === 4 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="e-name" label="Nom" error={errors.name}>
              <input id="e-name" className={input} value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} />
            </Field>
            <Field id="e-email" label="E-mail" error={errors.email}>
              <input
                id="e-email"
                type="email"
                className={input}
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              />
            </Field>
            <Field id="e-phone" label="Téléphone (facultatif)">
              <input id="e-phone" type="tel" className={input} value={values.phone} onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))} />
            </Field>
          </div>
        )}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="border border-[#222421] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em]">
            Retour
          </button>
        )}
        <button type="button" onClick={next} className={submitCls}>
          {step === 4 ? "Envoyer la demande (démo)" : "Continuer"}
        </button>
      </div>
    </div>
  );
}
