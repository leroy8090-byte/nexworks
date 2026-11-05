"use client";

import { useState, type FormEvent } from "react";
import { Arrow, btnCls } from "./ui";

const input = "w-full rounded-lg border-2 border-or-ink/15 bg-white px-3 py-3.5 text-base font-semibold outline-none transition-colors hover:border-or-ink/40 focus:border-or-flame-deep aria-[invalid=true]:border-or-flame-deep";

/** Formulaire de démonstration : la validation se fait dans le navigateur, rien n'est envoyé. */
export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    const err: typeof errors = {};
    if (values.name.trim().length < 2) err.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) err.email = "Indiquez une adresse e-mail valide.";
    if (values.message.trim().length < 10) err.message = "Votre message doit contenir au moins 10 caractères.";
    setErrors(err);
    if (!Object.keys(err).length) setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="rounded-2xl bg-white p-8">
        <h2 className="text-5xl">Message reçu… pour de faux</h2>
        <p className="mt-3 text-lg leading-relaxed text-or-ink/80">Ce formulaire est une démonstration : votre message n&apos;a pas été envoyé et aucune donnée n&apos;a été enregistrée.</p>
        <button type="button" onClick={() => { setValues({ name: "", email: "", message: "" }); setDone(false); }} className={btnCls("line", "mt-6")}>Écrire un autre message</button>
      </div>
    );
  }
  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl bg-white p-6 sm:p-8">
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold">Nom</span>
        <input value={values.name} autoComplete="name" onChange={(e) => setValues({ ...values, name: e.target.value })} aria-invalid={Boolean(errors.name)} className={input} />
        {errors.name && <span role="alert" className="mt-1.5 block text-[15px] font-semibold text-or-flame-deep">{errors.name}</span>}
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold">E-mail</span>
        <input type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} aria-invalid={Boolean(errors.email)} className={input} />
        {errors.email && <span role="alert" className="mt-1.5 block text-[15px] font-semibold text-or-flame-deep">{errors.email}</span>}
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold">Message</span>
        <textarea rows={5} value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} aria-invalid={Boolean(errors.message)} className={input} />
        {errors.message && <span role="alert" className="mt-1.5 block text-[15px] font-semibold text-or-flame-deep">{errors.message}</span>}
      </label>
      <button type="submit" className={btnCls("flame", "w-full sm:w-auto")}>Envoyer (démonstration)<Arrow /></button>
      <p className="text-sm text-or-ink/70">Démonstration : rien n&apos;est envoyé ni enregistré.</p>
    </form>
  );
}
