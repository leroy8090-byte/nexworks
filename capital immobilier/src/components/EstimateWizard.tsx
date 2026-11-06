"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendRequest } from "@/app/actions";
import { agency } from "@/data/agency";

const TYPES = ["Appartement", "Maison", "Villa", "Studio", "Terrain", "Local commercial"];
const PLACES = ["Saint-Raphaël", "Fréjus", "Agay", "Anthéor", "Boulouris", "Valescure", "Santa Lucia", "Pays de Fayence", "Autre secteur"];
const STATES = ["À rénover", "À rafraîchir", "Bon état", "Refait à neuf"];
const OWNERS = ["Je suis propriétaire", "Je représente le propriétaire", "Autre situation"];
const STEPS = ["Le bien", "Sa localisation", "Ses caractéristiques", "Vos coordonnées"];
const input = "w-full rounded-none border-0 border-b border-night/30 bg-transparent py-3 text-[16.5px] text-night outline-none transition-colors focus:border-night";

function Choice({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)} className={`min-h-12 border px-5 text-[15.5px] transition-colors duration-300 ${value === o ? "border-night bg-night text-white" : "border-night/20 text-night hover:border-night"}`}>{o}</button>)}
    </div>
  );
}

/** Une demande d'estimation envoyée à l'agence, une question à la fois. Aucune valeur n'est calculée. */
export function EstimateWizard() {
  const [step, setStep] = useState(0);
  const [v, setV] = useState({ type: "", place: "", address: "", complement: "", surface: 80, rooms: 3, state: "", owner: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "pending" | "sent" | "not_configured" | "error">("idle");
  const title = useRef<HTMLHeadingElement>(null);
  const shown = useRef(0);
  useEffect(() => {
    if (shown.current === step) return;
    shown.current = step;
    title.current?.focus({ preventScroll: true });
  }, [step]);
  const canNext = step === 0 ? Boolean(v.type) : step === 1 ? Boolean(v.place) && v.address.trim().length >= 5 : step === 2 ? Boolean(v.state) : true;
  const set = <K extends keyof typeof v>(k: K, value: (typeof v)[K]) => setV((s) => ({ ...s, [k]: value }));
  const h2 = "text-[2.4rem] leading-tight text-night sm:text-[3rem]";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const str = (k: string) => String(d.get(k) ?? "").trim();
    const errs: Record<string, string> = {};
    if (str("name").length < 2) errs.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str("email"))) errs.email = "Indiquez une adresse e-mail valide.";
    if (str("phone") && !/^[\d\s.\-+()]{9,}$/.test(str("phone"))) errs.phone = "Indiquez un numéro de téléphone valide.";
    if (!v.owner) errs.owner = "Précisez votre situation.";
    if (d.get("consent") !== "on") errs.consent = "Cochez la case pour envoyer votre demande.";
    setErrors(errs);
    if (Object.keys(errs).length) { const k = Object.keys(errs)[0]; requestAnimationFrame(() => document.getElementById(`e-${k}`)?.focus()); return; }
    setStatus("pending");
    const res = await sendRequest({ kind: "Demande d’estimation", name: str("name"), email: str("email"), phone: str("phone"), website: str("website"), details: { Bien: v.type, Secteur: v.place, "Adresse du bien": v.address.trim(), Complément: v.complement.trim(), Surface: `${v.surface} m²`, Pièces: String(v.rooms), État: v.state, Situation: v.owner, Précisions: str("message") } }).catch(() => ({ status: "error" as const }));
    setStatus(res.status === "sent" ? "sent" : res.status === "not_configured" ? "not_configured" : "error");
  }

  if (status === "sent") return <div role="status" className="py-6"><p className={h2}>Merci, votre demande est bien envoyée.</p><p className="mt-4 text-[17px] leading-relaxed text-muted">L’agence revient vers vous pour en parler.</p></div>;

  return (
    <div>
      <ol aria-label="Étapes de la demande" className="grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span aria-hidden className="block h-[2px] overflow-hidden bg-rule"><span className={`block h-full bg-night transition-all duration-700 ${i <= step ? "w-full" : "w-0"}`} /></span>
            <span className={`mt-2 hidden text-[14px] sm:block ${i === step ? "text-night" : "text-muted"}`}>{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-[14.5px] text-muted">{`Étape ${step + 1} sur ${STEPS.length}`}</p>
      <div key={step} className="cookie-in mt-2">
        {step === 0 && <><h2 ref={title} tabIndex={-1} style={{ outline: "none" }} className={h2}>Quel bien souhaitez-vous faire estimer ?</h2><div className="mt-7"><Choice options={TYPES} value={v.type} onChange={(x) => set("type", x)} /></div></>}
        {step === 1 && <><h2 ref={title} tabIndex={-1} style={{ outline: "none" }} className={h2}>Où se situe-t-il ?</h2>
          <div className="mt-7"><p className="mb-3 text-[16px] text-muted">Secteur</p><Choice options={PLACES} value={v.place} onChange={(x) => set("place", x)} /></div>
          <div className="mt-8 grid max-w-3xl gap-7 sm:grid-cols-[2fr_1fr]">
            <div><label htmlFor="e-address" className="mb-1.5 block text-[14.5px] font-medium text-night">Adresse précise du bien</label><input id="e-address" required autoComplete="street-address" value={v.address} onChange={(e) => set("address", e.target.value)} placeholder="Numéro, rue, code postal et commune" className={input} /></div>
            <div><label htmlFor="e-complement" className="mb-1.5 block text-[14.5px] font-medium text-night">Résidence, bâtiment, étage (facultatif)</label><input id="e-complement" value={v.complement} onChange={(e) => set("complement", e.target.value)} className={input} /></div>
          </div>
          <p className="mt-3 text-[14.5px] leading-relaxed text-muted">L’adresse sert uniquement à l’agence pour étudier votre bien.</p></>}
        {step === 2 && (
          <>
            <h2 ref={title} tabIndex={-1} style={{ outline: "none" }} className={h2}>Décrivez-le en quelques mots.</h2>
            <div className="mt-8 max-w-2xl space-y-8">
              <div><div className="flex items-baseline justify-between"><label htmlFor="e-surface" className="text-[16px] text-muted">Surface approximative</label><output htmlFor="e-surface" className="text-[2rem] leading-none tabular-nums text-night [font-family:var(--font-display)]">{`${v.surface} m²`}</output></div><input id="e-surface" type="range" min={10} max={400} step={5} value={v.surface} onChange={(e) => set("surface", Number(e.target.value))} className="range mt-2" style={{ "--fill": `${((v.surface - 10) / 390) * 100}%` } as React.CSSProperties} /></div>
              <div><div className="flex items-baseline justify-between"><label htmlFor="e-rooms" className="text-[16px] text-muted">Nombre de pièces</label><output htmlFor="e-rooms" className="text-[2rem] leading-none tabular-nums text-night [font-family:var(--font-display)]">{v.rooms}</output></div><input id="e-rooms" type="range" min={1} max={10} step={1} value={v.rooms} onChange={(e) => set("rooms", Number(e.target.value))} className="range mt-2" style={{ "--fill": `${((v.rooms - 1) / 9) * 100}%` } as React.CSSProperties} /></div>
              <div><p className="mb-3 text-[16px] text-muted">État général</p><Choice options={STATES} value={v.state} onChange={(x) => set("state", x)} /></div>
            </div>
          </>
        )}
        <form onSubmit={submit} noValidate className={step === 3 ? "relative" : "hidden"}>
          <h2 ref={step === 3 ? title : undefined} tabIndex={-1} style={{ outline: "none" }} className={h2}>À qui l’agence doit-elle répondre ?</h2>
          <p className="mt-3 border-l-2 border-sea pl-4 text-[15.5px] text-muted">{`${v.type} · ${v.address.trim()}${v.complement.trim() ? `, ${v.complement.trim()}` : ""} · ${v.surface} m² · ${v.rooms} ${v.rooms > 1 ? "pièces" : "pièce"} · ${v.state}`}</p>
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Ne pas remplir<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="mt-6"><p id="e-owner" tabIndex={-1} className="mb-3 text-[15px] font-medium text-night">Votre situation</p><Choice options={OWNERS} value={v.owner} onChange={(x) => set("owner", x)} />{errors.owner && <p role="alert" className="mt-1.5 text-[14px] text-[#9A2B1B]">{errors.owner}</p>}</div>
          <div className="mt-7 grid gap-7 sm:grid-cols-2">
            {([["name", "Nom", "text", "name"], ["email", "E-mail", "email", "email"], ["phone", "Téléphone (facultatif)", "tel", "tel"]] as const).map(([k, l, t, a]) => (
              <div key={k}><label htmlFor={`e-${k}`} className="block text-[14.5px] font-medium text-night">{l}</label><input id={`e-${k}`} name={k} type={t} autoComplete={a} aria-invalid={!!errors[k]} className={input} />{errors[k] && <p role="alert" className="mt-1.5 text-[14px] text-[#9A2B1B]">{errors[k]}</p>}</div>
            ))}
            <div><label htmlFor="e-message" className="block text-[14.5px] font-medium text-night">Précisions (facultatif)</label><input id="e-message" name="message" className={input} /></div>
          </div>
          <label className="mt-7 flex items-start gap-3 text-[14.5px] leading-relaxed text-muted"><input type="checkbox" name="consent" id="e-consent" className="mt-1 size-4 accent-[#d90416]" />J’accepte que mes coordonnées et l’adresse du bien servent à traiter ma demande d’estimation. Voir la politique de confidentialité.</label>
          {errors.consent && <p role="alert" className="mt-1.5 text-[14px] text-[#9A2B1B]">{errors.consent}</p>}
          {status === "not_configured" && <p role="alert" className="mt-5 bg-sand/50 p-4 text-[15.5px] leading-relaxed text-night">Cette démonstration n’est pas encore reliée à la boîte mail de l’agence : votre demande n’a pas été envoyée. Appelez le <a href={`tel:${agency.phoneHref}`} className="underline">{agency.phone}</a>.</p>}
          {status === "error" && <p role="alert" className="mt-5 text-[15px] text-[#9A2B1B]">L’envoi a échoué. Réessayez, ou appelez l’agence au {agency.phone}.</p>}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <button type="button" onClick={() => setStep(2)} className="line-on text-[15px] text-muted hover:text-night">Retour</button>
            <button type="submit" disabled={status === "pending"} className="min-h-[3.3rem] bg-night px-8 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-sea disabled:opacity-60">{status === "pending" ? "Envoi…" : "Envoyer ma demande"}</button>
          </div>
        </form>
      </div>
      {step < 3 && (
        <div className="mt-9 flex flex-wrap items-center gap-5">
          {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="line-on text-[15px] text-muted hover:text-night">Retour</button>}
          <button type="button" disabled={!canNext} onClick={() => setStep(step + 1)} className="min-h-[3.3rem] bg-night px-8 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-sea disabled:cursor-not-allowed disabled:opacity-35">Continuer</button>
        </div>
      )}
    </div>
  );
}
