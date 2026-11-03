"use client";

import { useState, type FormEvent } from "react";
import { azurPrestationOptions } from "@/data/azur";
import { AzurButton } from "./ui";
import { AzurIcons } from "./Icons";

/**
 * Formulaire de devis — mode démonstration.
 * Aucun envoi réel tant qu'un backend n'est pas branché.
 */
export function QuoteForm({ compact }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [startedAt] = useState(() => Date.now());

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Honeypot
    if (String(fd.get("website") || "").trim()) return;
    // Temps minimum de remplissage
    if (Date.now() - startedAt < 2500) {
      setErrors({ form: "Veuillez patienter quelques secondes avant d'envoyer." });
      return;
    }

    const next: Record<string, string> = {};
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const city = String(fd.get("city") || "").trim();
    const type = String(fd.get("type") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (name.length < 2) next.name = "Indiquez votre nom et prénom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Adresse e-mail invalide.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Numéro de téléphone invalide.";
    if (city.length < 2) next.city = "Indiquez votre commune.";
    if (!type) next.type = "Choisissez un type de prestation.";
    if (message.length < 20) next.message = "Décrivez votre besoin (20 caractères minimum).";

    setErrors(next);
    if (Object.keys(next).length) return;

    // Démonstration : pas de transmission réelle
    setSent(true);
  };

  const field =
    "mt-1.5 w-full rounded-xl border border-[#D5DEE7] bg-white px-3.5 py-3 text-[15px] text-[#002D72] outline-none transition focus:border-[#4FC3F7] focus:ring-4 focus:ring-[#4FC3F7]/20";

  if (sent) {
    return (
      <div role="status" className="rounded-2xl border border-[#D5DEE7] bg-white p-7 text-center shadow-[0_24px_50px_-30px_rgba(16,42,67,.35)]">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#E3F6FD] text-[#0077C2]">
          <AzurIcons.check className="size-6" />
        </div>
        <h3 className="mt-4 font-[family-name:var(--font-azur-display)] text-2xl font-bold text-[#002D72]">Demande enregistrée (démonstration)</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#536273]">
          Sur un site réel, votre message serait transmis à l&apos;entreprise. Ici, aucune donnée n&apos;a été envoyée.
        </p>
        <button type="button" onClick={() => setSent(false)} className="mt-5 text-sm font-semibold text-[#0077C2] underline underline-offset-4">
          Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-[#D5DEE7] bg-white p-6 shadow-[0_24px_50px_-30px_rgba(16,42,67,.35)] sm:p-8"
    >
      {!compact && (
        <>
          <h2 className="font-[family-name:var(--font-azur-display)] text-2xl font-bold text-[#002D72]">Demander un devis</h2>
          <p className="mt-1.5 text-[14px] text-[#536273]">Décrivez votre besoin. Réponse après étude de votre demande.</p>
        </>
      )}

      {/* Honeypot anti-spam */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <label htmlFor="azur-website">Site web</label>
        <input id="azur-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={`grid gap-4 ${compact ? "" : "mt-6"} sm:grid-cols-2`}>
        <div className="sm:col-span-2 sm:col-auto">
          <label htmlFor="azur-name" className="text-[13px] font-semibold text-[#002D72]">
            Nom et prénom
          </label>
          <input id="azur-name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-[12.5px] text-[#c0392b]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="azur-email" className="text-[13px] font-semibold text-[#002D72]">
            Adresse e-mail
          </label>
          <input id="azur-email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-[12.5px] text-[#c0392b]">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="azur-phone" className="text-[13px] font-semibold text-[#002D72]">
            Téléphone
          </label>
          <input id="azur-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} />
          {errors.phone && <p className="mt-1 text-[12.5px] text-[#c0392b]">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="azur-city" className="text-[13px] font-semibold text-[#002D72]">
            Commune
          </label>
          <input id="azur-city" name="city" autoComplete="address-level2" className={field} aria-invalid={!!errors.city} />
          {errors.city && <p className="mt-1 text-[12.5px] text-[#c0392b]">{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="azur-type" className="text-[13px] font-semibold text-[#002D72]">
            Type de prestation
          </label>
          <select id="azur-type" name="type" defaultValue="" className={field} aria-invalid={!!errors.type}>
            <option value="" disabled>
              Choisir…
            </option>
            {azurPrestationOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.type && <p className="mt-1 text-[12.5px] text-[#c0392b]">{errors.type}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="azur-message" className="text-[13px] font-semibold text-[#002D72]">
            Description du problème ou du projet
          </label>
          <textarea id="azur-message" name="message" rows={4} className={field} aria-invalid={!!errors.message} />
          {errors.message && <p className="mt-1 text-[12.5px] text-[#c0392b]">{errors.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="azur-photo" className="text-[13px] font-semibold text-[#002D72]">
            Photo (facultatif — non transmise en démonstration)
          </label>
          <input id="azur-photo" name="photo" type="file" accept="image/*" className={`${field} file:mr-3 file:rounded-full file:border-0 file:bg-[#F3F6F8] file:px-3 file:py-1 file:text-[13px]`} />
        </div>
      </div>

      {errors.form && <p className="mt-3 text-[13px] text-[#c0392b]">{errors.form}</p>}

      <AzurButton type="submit" className="mt-6 w-full">
        Envoyer ma demande <AzurIcons.arrow className="size-4" />
      </AzurButton>
      <p className="mt-3 text-center text-[12px] leading-relaxed text-[#536273]">
        Mode démonstration : aucune donnée n&apos;est transmise. Voir aussi la{" "}
        <a href="/azur-plomberie/confidentialite" className="font-semibold text-[#0077C2] underline-offset-2 hover:underline">
          politique de confidentialité
        </a>
        .
      </p>
    </form>
  );
}
