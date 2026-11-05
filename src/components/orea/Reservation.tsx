"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { daysBetween, extras, formatEuro, locations, orea, quote, type Vehicle } from "@/data/orea";
import { cn, ease } from "@/lib/utils";
import { Arrow, btnCls } from "./ui";

const STEPS = ["Trajet et options", "Conducteur", "Vérification"];
const input = "h-14 w-full rounded-lg border-2 border-or-ink/15 bg-white px-3 text-base font-semibold outline-none transition-colors hover:border-or-ink/40 focus:border-or-flame-deep aria-[invalid=true]:border-or-flame-deep";
const iso = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

type Errors = Partial<Record<"dates" | "name" | "email" | "phone" | "age", string>>;

const Err = ({ id, text }: { id: string; text?: string }) => (text ? <p id={id} role="alert" className="mt-1.5 text-[15px] font-semibold text-or-flame-deep">{text}</p> : null);

/** Parcours de réservation complet. Démonstration : rien n'est envoyé ni enregistré, aucun paiement n'existe. */
export function Reservation({ vehicle, initial }: { vehicle: Vehicle; initial: { lieu?: string; depart?: string; retour?: string } }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [lieu, setLieu] = useState(initial.lieu && locations.some((l) => l.key === initial.lieu) ? initial.lieu : locations[0].key);
  const [depart, setDepart] = useState(initial.depart ?? "");
  const [retour, setRetour] = useState(initial.retour ?? "");
  const [today, setToday] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [driver, setDriver] = useState({ name: "", email: "", phone: "", age: false });
  const [errors, setErrors] = useState<Errors>({});
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = Date.now();
    setToday(iso(new Date(now)));
    setDepart((d) => d || iso(new Date(now + 86400000)));
    setRetour((r) => r || iso(new Date(now + 4 * 86400000)));
  }, []);

  const days = daysBetween(depart, retour);
  const perDay = extras.filter((x) => picked.includes(x.key)).reduce((s, x) => s + x.perDay, 0);
  const q = quote(vehicle.pricePerDay, days, perDay);
  const place = locations.find((l) => l.key === lieu) ?? locations[0];

  const goTo = (n: number) => {
    setStep(n);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    top.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  };

  function next(e: FormEvent) {
    e.preventDefault();
    const err: Errors = {};
    if (step === 0 && (!depart || !retour || retour <= depart)) err.dates = "La date de retour doit être après la date de départ.";
    if (step === 1) {
      if (driver.name.trim().length < 2) err.name = "Indiquez votre nom.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(driver.email.trim())) err.email = "Indiquez une adresse e-mail valide.";
      if (driver.phone.replace(/\D/g, "").length < 6) err.phone = "Indiquez un numéro de téléphone.";
      if (!driver.age) err.age = `Il faut avoir au moins ${vehicle.minAge} ans pour ce véhicule.`;
    }
    setErrors(err);
    if (Object.keys(err).length) return;
    if (step < 2) goTo(step + 1);
    else {
      setDone(true);
      goTo(2);
    }
  }

  if (done) {
    return (
      <div ref={top} className="scroll-mt-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} role="status" className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center sm:p-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }} className="mx-auto flex size-20 items-center justify-center rounded-full bg-or-flame">
            <svg viewBox="0 0 24 24" className="size-10" fill="none" stroke="#131518" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
          </motion.div>
          <h2 className="mt-6 text-6xl">Parcours terminé</h2>
          <p className="mt-4 text-lg leading-relaxed text-or-ink/80">Voici ce que verrait un vrai client. <strong>Ceci est une démonstration : aucune réservation n&apos;a été créée, aucune donnée n&apos;a été envoyée et aucun paiement n&apos;existe sur ce site.</strong></p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={orea.basePath} className={btnCls("flame")}>Retour à l&apos;accueil</Link>
            <Link href="/contact?objet=devis" className={btnCls("line")}>Je veux un site comme celui-ci</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={top} className="grid scroll-mt-24 items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-12">
      <div>
        <ol aria-label="Étapes de la réservation" className="grid grid-cols-3 gap-2">
          {STEPS.map((s, i) => (
            <li key={s} aria-current={i === step ? "step" : undefined}>
              <span className="block h-1.5 overflow-hidden rounded bg-or-ink/15">
                <motion.span initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.5, ease }} className="block h-full origin-left bg-or-flame-deep" />
              </span>
              <span className={cn("mt-2 block text-sm font-bold sm:text-[15px]", i === step ? "text-or-ink" : "text-or-ink/70")}>{i + 1}. {s}</span>
            </li>
          ))}
        </ol>

        <form onSubmit={next} noValidate className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: 0.3, ease }}>
              {step === 0 && (
                <div>
                  <h2 className="text-5xl">Votre trajet</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className="mb-1.5 block text-sm font-bold">Agence de départ</span>
                      <select value={lieu} onChange={(e) => setLieu(e.target.value)} className={input}>
                        {locations.map((l) => <option key={l.key} value={l.key}>{l.name}</option>)}
                      </select>
                    </label>
                    <label className="block sm:col-span-1">
                      <span className="mb-1.5 block text-sm font-bold">Départ</span>
                      <input type="date" value={depart} min={today} onChange={(e) => setDepart(e.target.value)} aria-invalid={Boolean(errors.dates)} className={input} />
                    </label>
                    <label className="block sm:col-span-1">
                      <span className="mb-1.5 block text-sm font-bold">Retour</span>
                      <input type="date" value={retour} min={depart || today} onChange={(e) => setRetour(e.target.value)} aria-invalid={Boolean(errors.dates)} className={input} />
                    </label>
                  </div>
                  <Err id="err-dates" text={errors.dates} />
                  <h2 className="mt-10 text-5xl">Vos options</h2>
                  <ul className="mt-4 space-y-3">
                    {extras.map((x) => {
                      const on = picked.includes(x.key);
                      return (
                        <li key={x.key}>
                          <label className={cn("flex cursor-pointer items-center gap-4 rounded-xl border-2 bg-white p-4 transition-colors", on ? "border-or-flame-deep" : "border-transparent hover:border-or-ink/25")}>
                            <input type="checkbox" checked={on} onChange={() => setPicked((p) => (on ? p.filter((k) => k !== x.key) : [...p, x.key]))} className="size-5 shrink-0 accent-[#c73d08]" />
                            <span className="min-w-0 flex-1">
                              <span className="block text-base font-bold">{x.label}</span>
                              <span className="block text-[15px] text-or-ink/70">{x.hint}</span>
                            </span>
                            <span className="shrink-0 text-right text-[15px] font-bold">{formatEuro(x.perDay)}<span className="block text-xs font-medium">par jour</span></span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-5xl">Le conducteur</h2>
                  <p className="mt-2 rounded-lg bg-or-flame/15 px-3 py-2 text-[15px] font-semibold">Démonstration : ces informations ne sont ni envoyées ni enregistrées.</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className="mb-1.5 block text-sm font-bold">Nom complet</span>
                      <input value={driver.name} autoComplete="name" onChange={(e) => setDriver({ ...driver, name: e.target.value })} aria-invalid={Boolean(errors.name)} aria-describedby="err-name" className={input} />
                      <Err id="err-name" text={errors.name} />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-bold">E-mail</span>
                      <input type="email" inputMode="email" autoComplete="email" value={driver.email} onChange={(e) => setDriver({ ...driver, email: e.target.value })} aria-invalid={Boolean(errors.email)} aria-describedby="err-email" className={input} />
                      <Err id="err-email" text={errors.email} />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-bold">Téléphone</span>
                      <input type="tel" inputMode="tel" autoComplete="tel" value={driver.phone} onChange={(e) => setDriver({ ...driver, phone: e.target.value })} aria-invalid={Boolean(errors.phone)} aria-describedby="err-phone" className={input} />
                      <Err id="err-phone" text={errors.phone} />
                    </label>
                  </div>
                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-base font-semibold">
                    <input type="checkbox" checked={driver.age} onChange={(e) => setDriver({ ...driver, age: e.target.checked })} aria-describedby="err-age" className="mt-0.5 size-5 shrink-0 accent-[#c73d08]" />
                    J&apos;ai au moins {vehicle.minAge} ans et un permis de conduire valide.
                  </label>
                  <Err id="err-age" text={errors.age} />
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-5xl">Tout est bon ?</h2>
                  <dl className="mt-5 divide-y-2 divide-or-ink/10 rounded-xl bg-white px-5">
                    {[
                      ["Véhicule", vehicle.name],
                      ["Agence", place.name],
                      ["Période", `Du ${depart} au ${retour} (${days} ${days === 1 ? "jour" : "jours"})`],
                      ["Conducteur", driver.name],
                      ["Contact", `${driver.email} · ${driver.phone}`],
                      ["Options", extras.filter((x) => picked.includes(x.key)).map((x) => x.label).join(", ") || "Aucune"],
                    ].map(([k, val]) => (
                      <div key={k} className="grid gap-1 py-3 sm:grid-cols-[140px_1fr]">
                        <dt className="text-[15px] text-or-ink/70">{k}</dt>
                        <dd className="break-words text-base font-bold">{val}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-[15px] font-semibold">En confirmant, vous terminez la démonstration : aucune réservation n&apos;est créée et aucun paiement n&apos;est demandé.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {step > 0 ? (
              <button type="button" onClick={() => goTo(step - 1)} className={btnCls("line")}>Retour</button>
            ) : (
              <Link href={`${orea.basePath}/vehicules/${vehicle.slug}`} className={btnCls("line")}>Revoir le véhicule</Link>
            )}
            <button type="submit" className={btnCls("flame")}>
              {step === 2 ? "Confirmer (démonstration)" : "Continuer"}
              <Arrow />
            </button>
          </div>
        </form>
      </div>

      <aside className="overflow-hidden rounded-2xl bg-or-ink text-white lg:sticky lg:top-24">
        <div className="relative aspect-[16/9]">
          <Image src={vehicle.image} alt={vehicle.imageAlt} fill sizes="(max-width: 1024px) 92vw, 420px" className="object-cover" />
        </div>
        <div className="p-6">
          <h2 className="text-4xl">{vehicle.name}</h2>
          <p className="mt-1 text-[15px] text-white/75">{place.name}</p>
          <dl className="mt-5 space-y-2 border-t border-white/15 pt-4 text-[15px]">
            <div className="flex justify-between gap-4"><dt>{formatEuro(vehicle.pricePerDay)} × {days} {days === 1 ? "jour" : "jours"}</dt><dd className="font-bold">{formatEuro(q.base)}</dd></div>
            {q.discount > 0 && <div className="flex justify-between gap-4 text-or-flame"><dt>Remise longue durée</dt><dd className="font-bold">− {formatEuro(q.discount)}</dd></div>}
            {q.extras > 0 && <div className="flex justify-between gap-4"><dt>Options</dt><dd className="font-bold">{formatEuro(q.extras)}</dd></div>}
          </dl>
          <p className="mt-4 flex items-end justify-between gap-4 border-t border-white/15 pt-4">
            <span className="text-base font-bold">Total</span>
            <span aria-live="polite" className="font-[family-name:var(--font-orea-display)] text-6xl font-black leading-none">{formatEuro(q.total)}</span>
          </p>
          <p className="mt-3 text-sm text-white/70">Kilométrage illimité et annulation gratuite inclus. Tarifs fictifs.</p>
        </div>
      </aside>
    </div>
  );
}
