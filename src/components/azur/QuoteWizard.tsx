"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { azur, azurPrestationOptions, azurZones } from "@/data/azur";
import { cn, ease } from "@/lib/utils";
import { Arrow, Check, Picto, btnCls } from "./ui";

const STEPS = ["Votre besoin", "Les détails", "Vos coordonnées"];
const input = "mt-1.5 w-full rounded-xl border-2 border-az-ink/20 bg-white px-4 py-3.5 text-[17px] outline-none transition-colors focus:border-az-cobalt";

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-base font-bold">{label}</label>
      {hint && <p className="text-[15px] text-az-ink/70">{hint}</p>}
      {children}
      {error && <p id={`${id}-erreur`} className="mt-1.5 text-[15px] font-semibold text-az-hot-deep">{error}</p>}
    </div>
  );
}

/**
 * La demande, en trois étapes courtes. Rien ne quitte le navigateur : c'est un site de démonstration.
 * Le service et l'urgence peuvent être préremplis depuis la maison ou les pages de service.
 */
export function QuoteWizard({ prestation, urgent }: { prestation?: string; urgent?: boolean }) {
  const known = azurPrestationOptions.some((o) => o.value === prestation);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [need, setNeed] = useState(known ? prestation! : "");
  const [isUrgent, setIsUrgent] = useState(Boolean(urgent));
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const top = useRef<HTMLDivElement>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !need) e.need = "Choisissez ce qui correspond à votre besoin.";
    if (step === 1) {
      if (city.trim().length < 2) e.city = "Indiquez votre commune.";
      if (message.trim().length < 10) e.message = "Dites-nous en quelques mots ce qui se passe.";
    }
    if (step === 2) {
      if (name.trim().length < 2) e.name = "Indiquez votre nom.";
      if (phone.replace(/\D/g, "").length < 10) e.phone = "Indiquez un numéro à 10 chiffres.";
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Cette adresse e-mail semble incomplète.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const scrollTop = () => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    top.current?.scrollIntoView({ block: "start", behavior: calm ? "auto" : "smooth" });
  };
  const next = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      requestAnimationFrame(() => top.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    if (step === STEPS.length - 1) setDone(true);
    else setStep(step + 1);
    scrollTop();
  };
  const needLabel = azurPrestationOptions.find((o) => o.value === need)?.label;

  if (done) {
    return (
      <div ref={top} role="status" className="scroll-mt-24 rounded-2xl border-2 border-az-ink bg-white p-6 sm:p-10">
        <span className="flex size-14 items-center justify-center rounded-full bg-az-brass"><Check className="size-7" /></span>
        <h2 className="mt-5 text-[clamp(2.4rem,5vw,3.8rem)]">Le parcours s&apos;arrête ici.</h2>
        <p className="mt-3 max-w-xl text-lg leading-relaxed">Azur Plomberie est une entreprise fictive : votre demande n&apos;a été envoyée à personne et rien n&apos;a été enregistré. Sur un vrai site, l&apos;artisan la recevrait maintenant.</p>
        <dl className="mt-6 grid gap-x-8 gap-y-3 border-t-2 border-az-ink/15 pt-5 text-[17px] sm:grid-cols-2">
          <div><dt className="font-bold">Votre besoin</dt><dd>{needLabel}</dd></div>
          <div><dt className="font-bold">Délai</dt><dd>{isUrgent ? "C'est urgent" : "Ça peut attendre"}</dd></div>
          <div><dt className="font-bold">Commune</dt><dd>{city}</dd></div>
          <div><dt className="font-bold">Contact</dt><dd>{name}</dd></div>
        </dl>
        <Link href={azur.basePath} className={btnCls("cobalt", "mt-7")}>Retour à l&apos;accueil<Arrow /></Link>
      </div>
    );
  }

  return (
    <div ref={top} className="scroll-mt-24 overflow-hidden rounded-2xl border-2 border-az-ink bg-white">
      {/* La progression : le tuyau se remplit */}
      <div className="border-b-2 border-az-ink/10 p-5 sm:p-7">
        <p className="text-base font-bold" aria-live="polite">{`Étape ${step + 1} sur ${STEPS.length} : ${STEPS[step]}`}</p>
        <div aria-hidden className="mt-3 h-3 overflow-hidden rounded-full bg-az-copper">
          <motion.div initial={false} animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} transition={{ duration: 0.6, ease }} className="h-full rounded-full bg-az-water" />
        </div>
      </div>

      <form onSubmit={next} noValidate className="p-5 sm:p-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25, ease }}>
            {step === 0 && (
              <>
                <fieldset>
                  <legend className="az-display text-[2.3rem]">De quoi avez-vous besoin ?</legend>
                  <div className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-3">
                    {azurPrestationOptions.map((o) => (
                      <label key={o.value} className={cn("relative flex min-h-28 cursor-pointer flex-col justify-between rounded-xl border-2 p-3.5 font-bold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-az-cobalt", need === o.value ? "border-az-cobalt bg-az-cobalt text-white" : "border-az-ink/20 hover:border-az-ink")}>
                        <input type="radio" name="need" value={o.value} checked={need === o.value} onChange={() => setNeed(o.value)} aria-invalid={!!errors.need} className="sr-only" />
                        <Picto name={o.picto} className="size-9" />
                        <span className="mt-2 text-[16px] leading-tight">{o.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.need && <p className="mt-2 text-[15px] font-semibold text-az-hot-deep">{errors.need}</p>}
                </fieldset>
                <fieldset className="mt-7">
                  <legend className="text-base font-bold">Est-ce urgent ?</legend>
                  <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                    {[{ v: true, l: "C'est urgent", h: "L'eau coule ou je n'ai plus d'eau chaude" }, { v: false, l: "Ça peut attendre", h: "Je prépare un projet ou une réparation" }].map((o) => (
                      <label key={o.l} className={cn("cursor-pointer rounded-xl border-2 p-3.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-az-cobalt", isUrgent === o.v ? (o.v ? "border-az-hot-deep bg-az-hot-deep text-white" : "border-az-ink bg-az-ink text-white") : "border-az-ink/20 hover:border-az-ink")}>
                        <input type="radio" name="urgent" checked={isUrgent === o.v} onChange={() => setIsUrgent(o.v)} className="sr-only" />
                        <span className="block font-bold">{o.l}</span>
                        <span className="mt-0.5 block text-[15px] opacity-90">{o.h}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            )}

            {step === 1 && (
              <div className="grid gap-5">
                <h3 className="text-[2.3rem]">Que se passe-t-il ?</h3>
                <Field id="az-city" label="Votre commune" error={errors.city}>
                  <input id="az-city" list="az-communes" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" aria-invalid={!!errors.city} aria-describedby={errors.city ? "az-city-erreur" : undefined} className={input} />
                  <datalist id="az-communes">{azurZones.map((z) => <option key={z.key} value={z.name} />)}</datalist>
                </Field>
                <Field id="az-message" label="En quelques mots" hint="Depuis quand ? Dans quelle pièce ?" error={errors.message}>
                  <textarea id="az-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "az-message-erreur" : undefined} className={input} />
                </Field>
                <div>
                  <label htmlFor="az-photo" className="flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-az-ink/35 px-4 py-3 text-center font-bold transition-colors hover:border-az-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-az-cobalt">
                    {photo ? `Photo choisie : ${photo}` : "Ajouter une photo (facultatif)"}
                    <input id="az-photo" type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0]?.name ?? "")} className="sr-only" />
                  </label>
                  <p className="mt-1.5 text-[15px] text-az-ink/70">La photo reste sur votre appareil : rien n&apos;est envoyé sur cette démonstration.</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <h3 className="text-[2.3rem] sm:col-span-2">Comment vous joindre ?</h3>
                <div className="sm:col-span-2">
                  <Field id="az-name" label="Votre nom" error={errors.name}>
                    <input id="az-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "az-name-erreur" : undefined} className={input} />
                  </Field>
                </div>
                <Field id="az-phone" label="Téléphone" error={errors.phone}>
                  <input id="az-phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "az-phone-erreur" : undefined} className={input} />
                </Field>
                <Field id="az-email" label="E-mail (facultatif)" error={errors.email}>
                  <input id="az-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "az-email-erreur" : undefined} className={input} />
                </Field>
                <p className="text-[15px] text-az-ink/70 sm:col-span-2">Démonstration : aucune donnée n&apos;est envoyée. Voir la <Link href={`${azur.basePath}/confidentialite`} className="font-bold underline underline-offset-2">politique de confidentialité</Link>.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => { setErrors({}); setStep(step - 1); scrollTop(); }} className={btnCls("line")}>Retour</button>
          ) : <span />}
          <button type="submit" className={btnCls(isUrgent ? "hot" : "cobalt")}>
            {step === STEPS.length - 1 ? "Terminer ma demande" : "Continuer"}
            <Arrow />
          </button>
        </div>
      </form>
    </div>
  );
}
