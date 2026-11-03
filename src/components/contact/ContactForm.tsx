"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import {
  budgets,
  emptyContact,
  limits,
  projectTypes,
  validateContact,
  type ContactApiResponse,
  type ContactErrors,
  type ContactValues,
} from "@/lib/validation";
import { cn, ease } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Check, Mail } from "@/components/ui/Icons";

type Status = "idle" | "submitting" | "sent" | "demo" | "error";

const fieldCls =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder:text-mist/50 transition focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-sky/40";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-white">
        <span>
          {label}
          {!optional && <span className="ml-1 text-sky" aria-hidden>*</span>}
        </span>
        {optional && <span className="text-xs font-normal text-mist/70">Facultatif</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-mist/70">{hint}</p>}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1.5 overflow-hidden text-[13px] leading-snug text-[#ff8d8d]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm({
  demoMode,
  defaultProjectType = "",
}: {
  /** true = aucun service d'envoi configuré côté serveur */
  demoMode: boolean;
  defaultProjectType?: string;
}) {
  const [values, setValues] = useState<ContactValues>({ ...emptyContact, projectType: defaultProjectType });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactValues, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Après envoi, recentre la vue sur le résultat (le formulaire se réduit)
  useEffect(() => {
    if (status !== "sent" && status !== "demo") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    wrap.current?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  }, [status]);

  const set = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) {
      const e = validateContact(next);
      setErrors((prev) => ({ ...prev, [key]: e[key] }));
    }
  };

  const blur = (key: keyof ContactValues) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateContact(values)[key] }));
  };

  const bind = (key: Exclude<keyof ContactValues, "consent">) => ({
    id: key,
    name: key,
    value: values[key],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => set(key, e.target.value),
    onBlur: () => blur(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: cn(fieldCls, errors[key] ? "border-[#ff8d8d]/60" : "border-white/12 hover:border-white/25 focus:border-sky/60"),
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    const errs = validateContact(values);
    setErrors(errs);
    setTouched({ name: true, company: true, email: true, phone: true, projectType: true, budget: true, message: true, consent: true });
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      });
      const data = (await res.json()) as ContactApiResponse;
      if (data.status === "sent") setStatus("sent");
      else if (data.status === "demo") setStatus("demo");
      else if (data.status === "invalid") {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setServerMessage(data.status === "error" ? data.message : "");
        setStatus("error");
      }
    } catch {
      setServerMessage("Connexion impossible. Vérifiez votre réseau puis réessayez.");
      setStatus("error");
    }
  }

  const reset = () => {
    setValues({ ...emptyContact, projectType: defaultProjectType });
    setErrors({});
    setTouched({});
    setStatus("idle");
    startedAt.current = Date.now();
  };

  const msgLen = values.message.trim().length;

  if (status === "sent" || status === "demo") {
    const isDemo = status === "demo";
    return (
      <motion.div
        ref={wrap}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        role="status"
        className="py-6 text-center sm:py-10"
      >
        <div
          className={cn(
            "mx-auto flex size-16 items-center justify-center rounded-full border",
            isDemo ? "border-white/20 bg-white/[0.04] text-mist" : "border-sky/50 bg-sky/10 text-sky shadow-[0_0_40px_-6px_rgba(85,189,242,0.7)]",
          )}
        >
          {isDemo ? <Mail className="size-7" /> : <Check className="size-8" strokeWidth={2} />}
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-white">
          {isDemo ? "Mode démonstration : demande non transmise" : "Votre demande a bien été transmise."}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-mist">
          {isDemo ? (
            <>
              Le formulaire fonctionne, mais aucun service d&apos;envoi n&apos;est encore configuré sur ce site :{" "}
              <strong className="font-semibold text-white">votre message n&apos;a pas été envoyé ni enregistré.</strong>
              {siteConfig.contactEmail ? " Vous pouvez nous écrire directement par e-mail :" : ""}
            </>
          ) : (
            "Merci. Nous avons bien reçu votre message et reviendrons vers vous pour échanger sur votre projet."
          )}
        </p>
        {isDemo && siteConfig.contactEmail && (
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-4 inline-block font-semibold text-sky underline-offset-4 hover:underline"
          >
            {siteConfig.contactEmail}
          </a>
        )}
        <div className="mt-8">
          <Button type="button" variant="secondary" onClick={reset}>
            {isDemo ? "Revenir au formulaire" : "Envoyer une autre demande"}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6" aria-label="Formulaire de contact">
      {demoMode && (
        <div className="flex gap-3 rounded-xl border border-amber-300/25 bg-amber-300/[0.06] p-4 text-[13px] leading-relaxed text-amber-100/90">
          <span className="mt-0.5 size-2 shrink-0 rounded-full bg-amber-300" aria-hidden />
          <p>
            <strong className="font-semibold">Mode démonstration.</strong> Aucun service d&apos;envoi n&apos;est encore
            configuré : vous pouvez tester le formulaire, mais votre demande ne sera pas transmise.
          </p>
        </div>
      )}

      {/* Champ piège anti-spam : invisible pour les humains */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir ce champ
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Nom" error={errors.name}>
          <input type="text" autoComplete="name" placeholder="Votre nom" maxLength={limits.name + 20} {...bind("name")} />
        </Field>
        <Field id="company" label="Entreprise" error={errors.company}>
          <input type="text" autoComplete="organization" placeholder="Nom de votre entreprise" maxLength={limits.company + 20} {...bind("company")} />
        </Field>
        <Field id="email" label="Adresse e-mail" error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" placeholder="nom@entreprise.fr" {...bind("email")} />
        </Field>
        <Field id="phone" label="Téléphone" optional error={errors.phone}>
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder="Votre numéro" {...bind("phone")} />
        </Field>
        <Field id="projectType" label="Type de projet" error={errors.projectType}>
          <select {...bind("projectType")} className={cn(bind("projectType").className, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2355BDF2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
            <option value="" className="bg-ink-2">Sélectionnez…</option>
            {projectTypes.map((t) => (
              <option key={t} value={t} className="bg-ink-2">
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Budget indicatif" optional error={errors.budget}>
          <select {...bind("budget")} className={cn(bind("budget").className, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2355BDF2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
            <option value="" className="bg-ink-2">Je préfère ne pas préciser</option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-ink-2">
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="message"
        label="Description du besoin"
        error={errors.message}
        hint={`${msgLen} / ${limits.message.max} caractères (minimum ${limits.message.min})`}
      >
        <textarea
          rows={6}
          placeholder="Votre activité, vos objectifs, ce que vous souhaitez améliorer ou créer…"
          maxLength={limits.message.max + 200}
          {...bind("message")}
          className={cn(bind("message").className, "resize-y")}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mist">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            onBlur={() => blur("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-4 shrink-0 cursor-pointer accent-[#55BDF2]"
          />
          <span>
            J&apos;accepte que mes informations soient utilisées pour répondre à ma demande, conformément à la{" "}
            <Link href="/confidentialite" className="text-sky underline-offset-4 hover:underline" target="_blank">
              politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-1.5 text-[13px] text-[#ff8d8d]">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-[#ff8d8d]/30 bg-[#ff8d8d]/[0.07] p-4 text-sm leading-relaxed text-[#ffb3b3]">
          {serverMessage || "Une erreur est survenue. Réessayez dans un instant."}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" arrow disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Envoi en cours…" : "Envoyer ma demande"}
        </Button>
        <p className="text-xs text-mist/70">
          <span className="text-sky">*</span> Champs obligatoires
        </p>
      </div>
    </form>
  );
}
