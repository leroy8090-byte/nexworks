"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { sendLead, type LeadResult } from "@/app/actions";
import { agencyFor } from "@/data/localized";
import { localePath, type Lang } from "@/i18n/config";
import { EASE } from "./Motion";
import { PLACES } from "./SearchBar";

/** Les valeurs envoyées à l'agence restent en français ; seul l'affichage change de langue. */
const TYPES = { fr: ["Villa", "Bastide", "Maison de village", "Appartement", "Domaine", "Terrain"], en: ["Villa", "Bastide", "Village house", "Apartment", "Estate", "Land"] };
const ASSETS = { fr: ["Vue mer", "Piscine", "Pieds dans l'eau", "Calme absolu", "Proche du village", "Vignes ou oliviers", "Dépendance", "Accès plage à pied"], en: ["Sea view", "Pool", "Waterfront", "Total tranquillity", "Close to the village", "Vines or olive trees", "Outbuilding", "Beach within walking distance"] };
const DELAYS = { fr: ["Dès que possible", "Dans les six mois", "Dans l'année", "Je me renseigne"], en: ["As soon as possible", "Within six months", "Within the year", "Just enquiring"] };
const MODES = {
  fr: [{ v: "Publique", t: "Diffusion choisie", s: "Sur notre site et auprès de notre réseau d'acquéreurs." }, { v: "Confidentielle", t: "Vente confidentielle", s: "Présentée uniquement en rendez-vous, jamais publiée." }],
  en: [{ v: "Publique", t: "Selective marketing", s: "On our website and to our network of buyers." }, { v: "Confidentielle", t: "Confidential sale", s: "Presented by appointment only, never listed." }],
};
const OTHER = { fr: "Autre commune du Var", en: "Another town in the Var" };

const T = {
  fr: {
    steps: ["Le bien", "L'emplacement", "Les atouts", "Votre projet", "Vos coordonnées"], stepsAria: "Étapes", stepOf: (i: number, n: number) => `Étape ${i} sur ${n}`,
    questions: ["Quel type de bien souhaitez-vous estimer ?", "Où se situe-t-il ?", "Qu'est-ce qui le rend unique ?", "Quel est votre projet ?", "Comment vous joindre ?"],
    errors: ["Choisissez le type de bien.", "Indiquez la commune.", "", "Indiquez votre délai et le mode de diffusion souhaité.", "Indiquez votre nom, un email valide, et acceptez l'utilisation de vos coordonnées."],
    sector: "Quartier ou adresse (facultatif, confidentiel)", sectorPh: "Par exemple : les Salins, route des Plages…",
    surface: "Surface habitable (m²)", land: "Terrain (m²)", rooms: "Chambres", delay: "Délai", mode: "Diffusion souhaitée",
    name: "Nom", namePh: "Prénom et nom", email: "Email", emailPh: "vous@exemple.com", phone: "Téléphone", message: "Message", optional: "Facultatif", website: "Site web",
    consent: "J'accepte que mes coordonnées soient utilisées uniquement pour répondre à ma demande.", privacy: "Confidentialité",
    recap: { prop: "Bien", town: "Commune", surface: "Surface", land: "Terrain", assets: "Atouts", project: "Projet" },
    sent: "Merci, votre demande d'estimation est bien partie.", sentText: "Un conseiller vous recontacte pour convenir d'une visite : c'est sur place que la valeur d'une maison se précise.",
    notConfigured: "Ce site de démonstration n'envoie pas encore les demandes. Une fois en service, elles arriveront directement à l'agence. En attendant :", error: "L'envoi n'a pas abouti. Réessayez, ou appelez le",
    back: "← Retour", next: "Continuer", submit: "Demander mon estimation", sending: "Envoi…", note: "Aucun prix n'est calculé automatiquement : la valeur d'une maison d'exception se précise lors d'une visite.",
  },
  en: {
    steps: ["The property", "Location", "Assets", "Your project", "Your details"], stepsAria: "Steps", stepOf: (i: number, n: number) => `Step ${i} of ${n}`,
    questions: ["What type of property would you like valued?", "Where is it located?", "What makes it unique?", "What is your project?", "How can we reach you?"],
    errors: ["Please choose the type of property.", "Please indicate the town.", "", "Please indicate your timeframe and preferred marketing.", "Please enter your name, a valid email, and agree to the use of your details."],
    sector: "Neighbourhood or address (optional, confidential)", sectorPh: "For example: Les Salins, route des Plages…",
    surface: "Living area (m²)", land: "Plot (m²)", rooms: "Bedrooms", delay: "Timeframe", mode: "Preferred marketing",
    name: "Name", namePh: "First and last name", email: "Email", emailPh: "you@example.com", phone: "Phone", message: "Message", optional: "Optional", website: "Website",
    consent: "I agree that my details will be used solely to respond to my request.", privacy: "Privacy",
    recap: { prop: "Property", town: "Town", surface: "Living area", land: "Plot", assets: "Assets", project: "Project" },
    sent: "Thank you, your valuation request has been sent.", sentText: "An advisor will contact you to arrange a visit: it is on site that the value of a home becomes clear.",
    notConfigured: "This demonstration website does not send requests yet. Once live, they will go straight to the agency. In the meantime:", error: "Your request could not be sent. Please try again, or call",
    back: "← Back", next: "Continue", submit: "Request my valuation", sending: "Sending…", note: "No price is calculated automatically: the value of an exceptional home becomes clear during a visit.",
  },
};

/**
 * Estimation en cinq étapes. Aucune fourchette de prix n'est calculée automatiquement :
 * une estimation sérieuse se fait après une visite, et le formulaire le dit.
 */
export function Estimation({ lang }: { lang: Lang }) {
  const t = T[lang];
  const agency = agencyFor(lang);
  const show = (list: Record<Lang, string[]>, frValue: string) => list[lang][list.fr.indexOf(frValue)] ?? frValue;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [d, setD] = useState({ type: "", place: "", sector: "", surface: "", land: "", rooms: "", assets: [] as string[], delay: "", mode: "", name: "", email: "", phone: "", message: "", consent: false, website: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<LeadResult | null>(null);
  const started = useRef(0);
  const set = (patch: Partial<typeof d>) => { setErr(""); setD((x) => ({ ...x, ...patch })); };
  const STEPS = t.steps;

  const valid = [d.type !== "", d.place !== "", true, d.delay !== "" && d.mode !== "", d.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) && d.consent];
  const go = async (to: number) => {
    if (to > step && !valid[step]) { setErr(t.errors[step]); return; }
    if (to === STEPS.length) {
      setBusy(true);
      const r = await sendLead({ kind: "Demande d'estimation", lang, name: d.name, email: d.email, phone: d.phone, message: d.message, website: d.website, elapsed: started.current ? Date.now() - started.current : 0,
        details: { "Langue du visiteur": lang === "fr" ? "français" : "anglais", "Type de bien": d.type, Commune: d.place, Quartier: d.sector, Surface: d.surface && `${d.surface} m²`, Terrain: d.land && `${d.land} m²`, Chambres: d.rooms, Atouts: d.assets.join(", "), Délai: d.delay, Diffusion: d.mode } });
      setBusy(false); setRes(r);
      if (r.status !== "sent") setErr("");
      return;
    }
    setDir(to > step ? 1 : -1); setStep(to); setErr("");
  };

  const chip = (on: boolean) => `min-h-12 border px-5 text-left text-[15px] transition-all duration-300 ${on ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`;
  const label = "caps text-[10px] text-pave-dark";
  const modes = MODES[lang];
  const placeLabel = (p: string) => (p === OTHER.fr ? OTHER[lang] : p);

  if (res?.status === "sent") {
    return (
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} role="status" className="border-l border-gold py-3 pl-7">
        <p className="serif text-[2.4rem] leading-tight text-ink">{t.sent}</p>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-muted">{t.sentText}</p>
      </m.div>
    );
  }

  return (
    <div onFocus={() => { if (!started.current) started.current = Date.now(); }}>
      {/* Progression */}
      <ol className="grid grid-cols-5 gap-2" aria-label={t.stepsAria}>
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span className="block h-px overflow-hidden bg-line"><m.span className="block h-full origin-left bg-gold" initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.7, ease: EASE }} /></span>
            <span className={`mt-3 hidden text-[11px] tracking-[0.18em] uppercase sm:block ${i === step ? "text-ink" : "text-muted/70"}`}>{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[13px] text-muted sm:hidden">{t.stepOf(step + 1, STEPS.length)} : {STEPS[step]}</p>

      <div className="relative mt-10 min-h-[22rem]">
        <AnimatePresence mode="wait" custom={dir}>
          <m.fieldset key={step} custom={dir} initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.5, ease: EASE }}>
            <legend className="serif text-[2.2rem] leading-tight text-ink sm:text-[2.8rem]">{t.questions[step]}</legend>
            <div className="mt-8">
              {step === 0 && <div className="grid gap-3 sm:grid-cols-3">{TYPES.fr.map((v) => <button key={v} type="button" aria-pressed={d.type === v} onClick={() => set({ type: v })} className={chip(d.type === v)}>{show(TYPES, v)}</button>)}</div>}
              {step === 1 && (
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="grid gap-3 sm:col-span-2 sm:grid-cols-3">{[...PLACES, OTHER.fr].map((p) => <button key={p} type="button" aria-pressed={d.place === p} onClick={() => set({ place: p })} className={chip(d.place === p)}>{placeLabel(p)}</button>)}</div>
                  <label className="grid gap-1 sm:col-span-2"><span className={label}>{t.sector}</span><input value={d.sector} onChange={(e) => set({ sector: e.target.value })} className="field" placeholder={t.sectorPh} autoComplete="street-address" /></label>
                </div>
              )}
              {step === 2 && (
                <div className="grid gap-8">
                  <div className="grid gap-8 sm:grid-cols-3">
                    <label className="grid gap-1"><span className={label}>{t.surface}</span><input inputMode="numeric" value={d.surface} onChange={(e) => set({ surface: e.target.value.replace(/\D/g, "") })} className="field" placeholder="250" /></label>
                    <label className="grid gap-1"><span className={label}>{t.land}</span><input inputMode="numeric" value={d.land} onChange={(e) => set({ land: e.target.value.replace(/\D/g, "") })} className="field" placeholder={lang === "fr" ? "2 000" : "2,000"} /></label>
                    <label className="grid gap-1"><span className={label}>{t.rooms}</span><input inputMode="numeric" value={d.rooms} onChange={(e) => set({ rooms: e.target.value.replace(/\D/g, "") })} className="field" placeholder="5" /></label>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{ASSETS.fr.map((a) => { const on = d.assets.includes(a); return <button key={a} type="button" aria-pressed={on} onClick={() => set({ assets: on ? d.assets.filter((x) => x !== a) : [...d.assets, a] })} className={chip(on)}>{show(ASSETS, a)}</button>; })}</div>
                </div>
              )}
              {step === 3 && (
                <div className="grid gap-10">
                  <div><p className={label}>{t.delay}</p><div className="mt-3 grid gap-3 sm:grid-cols-4">{DELAYS.fr.map((x) => <button key={x} type="button" aria-pressed={d.delay === x} onClick={() => set({ delay: x })} className={chip(d.delay === x)}>{show(DELAYS, x)}</button>)}</div></div>
                  <div><p className={label}>{t.mode}</p><div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {modes.map((o) => (
                      <button key={o.v} type="button" aria-pressed={d.mode === o.v} onClick={() => set({ mode: o.v })} className={`${chip(d.mode === o.v)} py-4`}><span className="serif block text-[1.5rem]">{o.t}</span><span className={`mt-1 block text-[14px] ${d.mode === o.v ? "text-white/70" : "text-muted"}`}>{o.s}</span></button>
                    ))}
                  </div></div>
                </div>
              )}
              {step === 4 && (
                <div className="relative grid gap-7 sm:grid-cols-2">
                  <label className="grid gap-1"><span className={label}>{t.name}</span><input value={d.name} onChange={(e) => set({ name: e.target.value })} className="field" autoComplete="name" placeholder={t.namePh} /></label>
                  <label className="grid gap-1"><span className={label}>{t.email}</span><input type="email" value={d.email} onChange={(e) => set({ email: e.target.value })} className="field" autoComplete="email" placeholder={t.emailPh} /></label>
                  <label className="grid gap-1"><span className={label}>{t.phone}</span><input type="tel" value={d.phone} onChange={(e) => set({ phone: e.target.value })} className="field" autoComplete="tel" placeholder={t.optional} /></label>
                  <label className="grid gap-1"><span className={label}>{t.message}</span><input value={d.message} onChange={(e) => set({ message: e.target.value })} className="field" placeholder={t.optional} /></label>
                  <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden"><label>{t.website}<input tabIndex={-1} autoComplete="off" value={d.website} onChange={(e) => set({ website: e.target.value })} /></label></div>
                  <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-muted sm:col-span-2"><input type="checkbox" checked={d.consent} onChange={(e) => set({ consent: e.target.checked })} className="mt-1 size-4 accent-[var(--color-ink)]" /><span>{t.consent} <Link href={localePath(lang, "/confidentialite")} className="underline underline-offset-2">{t.privacy}</Link></span></label>
                  {/* Récapitulatif */}
                  <dl className="grid gap-x-8 gap-y-2 bg-paper p-6 text-[14.5px] sm:col-span-2 sm:grid-cols-2">
                    {[[t.recap.prop, d.type && show(TYPES, d.type)], [t.recap.town, d.place && placeLabel(d.place)], [t.recap.surface, d.surface && `${d.surface} m²`], [t.recap.land, d.land && `${d.land} m²`], [t.recap.assets, d.assets.map((a) => show(ASSETS, a)).join(", ")], [t.recap.project, [d.delay && show(DELAYS, d.delay), modes.find((o) => o.v === d.mode)?.t].filter(Boolean).join(" · ")]].filter(([, v]) => v).map(([k, v]) => <div key={k} className="flex gap-3"><dt className="text-muted">{k} :</dt><dd className="text-ink">{v}</dd></div>)}
                  </dl>
                </div>
              )}
            </div>
          </m.fieldset>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {(err || res) && (
          <m.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-6 border-l border-ochre py-1 pl-4 text-[14.5px] leading-relaxed text-ink">
            {err || (res?.status === "not_configured"
              ? <>{t.notConfigured} <a href={`tel:${agency.phoneHref}`} className="underline">{agency.phone}</a>.</>
              : res?.status === "invalid" ? res.message : <>{t.error} <a href={`tel:${agency.phoneHref}`} className="underline">{agency.phone}</a>.</>)}
          </m.p>
        )}
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-8">
        <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="text-[12px] tracking-[0.22em] text-ink uppercase transition-opacity disabled:opacity-0">{t.back}</button>
        <button type="button" onClick={() => go(step + 1)} disabled={busy} className="group/b inline-flex min-h-[3.4rem] items-center gap-3 bg-ink px-9 text-[11.5px] font-medium tracking-[0.24em] text-white uppercase transition-colors hover:bg-sea disabled:opacity-60">
          {busy ? t.sending : step === STEPS.length - 1 ? t.submit : t.next}<span aria-hidden className="text-[15px] tracking-normal transition-transform duration-500 group-hover/b:translate-x-1.5">→</span>
        </button>
      </div>
      <p className="mt-6 text-[13px] leading-relaxed text-muted">{t.note}</p>
    </div>
  );
}
