"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { pagePath } from "@/i18n/lang";
import { useLang } from "@/i18n/use-lang";
import {
  emptyContact,
  limits,
  projectTypeLabels,
  projectTypes,
  validateContact,
  type ContactApiResponse,
  type ContactErrors,
  type ContactValues,
} from "@/lib/validation";
import { cn, ease } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Check, Mail } from "@/components/ui/Icons";
import { Turnstile } from "./Turnstile";

type Status = "idle" | "submitting" | "sent" | "demo" | "error";

const T = {
  fr: {
    optional: "Facultatif",
    name: "Nom",
    namePh: "Votre nom",
    company: "Entreprise",
    companyPh: "Nom de votre entreprise",
    email: "Adresse e-mail",
    emailPh: "nom@entreprise.fr",
    phone: "Téléphone",
    phonePh: "Votre numéro",
    type: "Type de projet",
    choose: "Sélectionnez…",
    message: "Description du besoin",
    messagePh: "Votre activité, vos objectifs, ce que vous souhaitez améliorer ou créer…",
    count: (n: number, max: number, min: number) => `${n} / ${max} caractères (minimum ${min})`,
    consentBefore: "J'accepte que mes informations soient utilisées pour répondre à ma demande, conformément à la ",
    consentLink: "politique de confidentialité",
    form: "Formulaire de contact",
    demoTitle: "Mode démonstration.",
    demoText: " Aucun service d'envoi n'est encore configuré : vous pouvez tester le formulaire, mais votre demande ne sera pas transmise.",
    honeypot: "Ne pas remplir ce champ",
    captchaLabel: "Vérification anti-robot",
    captchaWait: "Vérification anti-robot en cours…",
    captchaMissing: "Merci de valider la vérification anti-robot avant d'envoyer.",
    captchaDown: "La vérification anti-robot n'a pas pu se charger. Rechargez la page, puis réessayez.",
    error: "Une erreur est survenue. Réessayez dans un instant.",
    network: "Connexion impossible. Vérifiez votre réseau puis réessayez.",
    sending: "Envoi en cours…",
    send: "Envoyer ma demande",
    required: "Champs obligatoires",
    demoDone: "Mode démonstration : demande non transmise",
    sent: "Votre demande a bien été transmise.",
    demoBodyA: "Le formulaire fonctionne, mais aucun service d'envoi n'est encore configuré sur ce site : ",
    demoBodyB: "votre message n'a pas été envoyé ni enregistré.",
    demoBodyC: " Vous pouvez nous écrire directement par e-mail :",
    thanks: "Merci. Nous avons bien reçu votre message et reviendrons vers vous pour échanger sur votre projet.",
    back: "Revenir au formulaire",
    again: "Envoyer une autre demande",
  },
  en: {
    optional: "Optional",
    name: "Name",
    namePh: "Your name",
    company: "Company",
    companyPh: "Your company name",
    email: "Email address",
    emailPh: "name@company.com",
    phone: "Phone",
    phonePh: "Your number",
    type: "Project type",
    choose: "Select…",
    message: "What do you need?",
    messagePh: "Your business, your goals, what you would like to improve or create…",
    count: (n: number, max: number, min: number) => `${n} / ${max} characters (minimum ${min})`,
    consentBefore: "I agree that my details may be used to answer my request, in line with the ",
    consentLink: "privacy policy",
    form: "Contact form",
    demoTitle: "Demo mode.",
    demoText: " No sending service is configured yet: you can try the form, but your request will not be passed on.",
    honeypot: "Do not fill in this field",
    captchaLabel: "Anti-robot check",
    captchaWait: "Anti-robot check in progress…",
    captchaMissing: "Please complete the anti-robot check before sending.",
    captchaDown: "The anti-robot check could not load. Please reload the page and try again.",
    error: "Something went wrong. Please try again in a moment.",
    network: "Couldn't connect. Please check your network and try again.",
    sending: "Sending…",
    send: "Send my request",
    required: "Required fields",
    demoDone: "Demo mode: request not sent",
    sent: "Your request has been sent.",
    demoBodyA: "The form works, but no sending service is configured on this site yet: ",
    demoBodyB: "your message has not been sent or saved.",
    demoBodyC: " You can write to us directly by email:",
    thanks: "Thank you. We have received your message and will get back to you to talk about your project.",
    back: "Back to the form",
    again: "Send another request",
  },
} as const;

const fieldCls =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder:text-mist/50 transition focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-sky/40";

const captchaKey = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "").trim();

function Field({
  id,
  label,
  optional,
  optionalLabel,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  optionalLabel: string;
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
        {optional && <span className="text-xs font-normal text-mist/70">{optionalLabel}</span>}
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
  const lang = useLang();
  const t = T[lang];
  const [values, setValues] = useState<ContactValues>({ ...emptyContact, projectType: defaultProjectType });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactValues, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [captchaActive, setCaptchaActive] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [captchaIssue, setCaptchaIssue] = useState<"" | "missing" | "down">("");
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
      const e = validateContact(next, lang);
      setErrors((prev) => ({ ...prev, [key]: e[key] }));
    }
  };

  const blur = (key: keyof ContactValues) => {
    setTouched((s) => ({ ...s, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateContact(values, lang)[key] }));
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
    const errs = validateContact(values, lang);
    setErrors(errs);
    setTouched({ name: true, company: true, email: true, phone: true, projectType: true, message: true, consent: true });
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (captchaKey && !captchaToken) {
      setCaptchaIssue((i) => i || "missing");
      setCaptchaActive(true);
      return;
    }
    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, lang, captcha: captchaToken, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
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
      setServerMessage(t.network);
      setStatus("error");
    }
    // Un jeton Turnstile ne sert qu'une fois : on en demande un nouveau
    if (captchaKey) {
      setCaptchaToken("");
      setCaptchaReset((n) => n + 1);
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
        <h3 className="mt-6 font-display text-2xl font-semibold text-white">{isDemo ? t.demoDone : t.sent}</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-mist">
          {isDemo ? (
            <>
              {t.demoBodyA}
              <strong className="font-semibold text-white">{t.demoBodyB}</strong>
              {siteConfig.contactEmail ? t.demoBodyC : ""}
            </>
          ) : (
            t.thanks
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
            {isDemo ? t.back : t.again}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="space-y-6"
      aria-label={t.form}
      onFocusCapture={() => captchaKey && setCaptchaActive(true)}
    >
      {demoMode && (
        <div className="flex gap-3 rounded-xl border border-amber-300/25 bg-amber-300/[0.06] p-4 text-[13px] leading-relaxed text-amber-100/90">
          <span className="mt-0.5 size-2 shrink-0 rounded-full bg-amber-300" aria-hidden />
          <p>
            <strong className="font-semibold">{t.demoTitle}</strong>
            {t.demoText}
          </p>
        </div>
      )}

      {/* Champ piège anti-spam : invisible pour les humains */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          {t.honeypot}
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label={t.name} optionalLabel={t.optional} error={errors.name}>
          <input type="text" autoComplete="name" placeholder={t.namePh} maxLength={limits.name + 20} {...bind("name")} />
        </Field>
        <Field id="company" label={t.company} optionalLabel={t.optional} error={errors.company}>
          <input type="text" autoComplete="organization" placeholder={t.companyPh} maxLength={limits.company + 20} {...bind("company")} />
        </Field>
        <Field id="email" label={t.email} optionalLabel={t.optional} error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" placeholder={t.emailPh} {...bind("email")} />
        </Field>
        <Field id="phone" label={t.phone} optionalLabel={t.optional} optional error={errors.phone}>
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder={t.phonePh} {...bind("phone")} />
        </Field>
        <div className="sm:col-span-2">
        <Field id="projectType" label={t.type} optionalLabel={t.optional} error={errors.projectType}>
          <select {...bind("projectType")} className={cn(bind("projectType").className, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2355BDF2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
            <option value="" className="bg-ink-2">{t.choose}</option>
            {projectTypes.map((value, i) => (
              <option key={value} value={value} className="bg-ink-2">
                {projectTypeLabels[lang][i]}
              </option>
            ))}
          </select>
        </Field>
        </div>
      </div>

      <Field
        id="message"
        label={t.message}
        optionalLabel={t.optional}
        error={errors.message}
        hint={t.count(msgLen, limits.message.max, limits.message.min)}
      >
        <textarea
          rows={6}
          placeholder={t.messagePh}
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
            {t.consentBefore}
            <Link href={pagePath(lang, "privacy")} className="text-sky underline-offset-4 hover:underline" target="_blank">
              {t.consentLink}
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

      {captchaKey && (
        <div role="group" aria-label={t.captchaLabel}>
          <Turnstile
            siteKey={captchaKey}
            lang={lang}
            active={captchaActive}
            resetKey={captchaReset}
            onToken={(tok) => {
              setCaptchaToken(tok);
              if (tok) setCaptchaIssue("");
            }}
            onUnavailable={() => setCaptchaIssue("down")}
          />
          {captchaIssue && (
            <p role="alert" className="mt-1.5 text-[13px] text-[#ff8d8d]">
              {captchaIssue === "down" ? t.captchaDown : t.captchaMissing}
            </p>
          )}
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-[#ff8d8d]/30 bg-[#ff8d8d]/[0.07] p-4 text-sm leading-relaxed text-[#ffb3b3]">
          {serverMessage || t.error}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" arrow disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? t.sending : t.send}
        </Button>
        <p className="text-xs text-mist/70">
          <span className="text-sky">*</span> {t.required}
        </p>
      </div>
    </form>
  );
}
