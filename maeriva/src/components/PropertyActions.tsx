"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { agencyFor, priceText } from "@/data/localized";
import { type Property } from "@/data/properties";
import type { Lang } from "@/i18n/config";
import { LeadForm } from "./LeadForm";
import { Icon } from "./ui";

const T = {
  fr: { rent: "Location saisonnière", sale: "Prix de vente", fees: "Honoraires à la charge du vendeur", share: "Partager cette propriété", copied: "Lien copié", kind: "Type de demande", visit: "Visite privée", file: "Recevoir le dossier", askVisit: "Demander une visite", askFile: "Recevoir le dossier", visitPh: "Vos disponibilités, vos questions", filePh: "Plans, diagnostics, informations complémentaires…" },
  en: { rent: "Seasonal rental", sale: "Asking price", fees: "Agency fees paid by the seller", share: "Share this property", copied: "Link copied", kind: "Type of request", visit: "Private viewing", file: "Receive the brochure", askVisit: "Request a viewing", askFile: "Receive the brochure", visitPh: "Your availability, your questions", filePh: "Floor plans, surveys, further information…" },
};

/** La carte de contact d'une annonce : demander une visite privée ou recevoir le dossier, partager. */
export function PropertyActions({ p, lang }: { p: Property; lang: Lang }) {
  const t = T[lang];
  const agency = agencyFor(lang);
  const [tab, setTab] = useState<"visite" | "brochure">("visite");
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: `${p.name}, ${agency.name}`, url });
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2200); }
    } catch { /* partage annulé */ }
  };
  const price = priceText(p, lang);
  const details = { Bien: `${p.name} (${p.ref})`, Commune: p.city, Prix: priceText(p, "fr") };
  return (
    <div className="border border-line bg-white p-7 sm:p-9">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="caps text-[9.5px] text-pave-dark">{p.transaction === "location" ? t.rent : t.sale}</p>
          <p className="serif tabular mt-2 text-[2.2rem] leading-none text-ink">{price}</p>
          {p.transaction === "vente" && p.price !== null && <p className="mt-2 text-[12.5px] text-muted">{t.fees}</p>}
        </div>
        <button type="button" onClick={share} aria-label={t.share} className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-ink uppercase"><Icon name="share" className="size-[18px]" />{copied ? t.copied : ""}</button>
      </div>
      <div role="tablist" aria-label={t.kind} className="mt-8 grid grid-cols-2 border-b border-line">
        {(["visite", "brochure"] as const).map((k) => (
          <button key={k} role="tab" type="button" aria-selected={tab === k} onClick={() => setTab(k)} className={`relative pb-3 text-[11px] tracking-[0.22em] uppercase transition-colors ${tab === k ? "text-ink" : "text-muted hover:text-ink"}`}>
            {k === "visite" ? t.visit : t.file}
            {tab === k && <m.span layoutId="tab" className="absolute inset-x-0 -bottom-px h-px bg-ink" />}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <m.div key={tab} role="tabpanel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-7">
          {tab === "visite"
            ? <LeadForm lang={lang} kind="Demande de visite" details={details} date submit={t.askVisit} messagePlaceholder={t.visitPh} />
            : <LeadForm lang={lang} kind="Demande de dossier" details={details} submit={t.askFile} messagePlaceholder={t.filePh} />}
        </m.div>
      </AnimatePresence>
      <a href={`tel:${agency.phoneHref}`} className="mt-8 flex items-center justify-center gap-2 border-t border-line pt-6 text-[12.5px] tracking-[0.18em] text-ink uppercase"><Icon name="phone" className="size-4" />{agency.phone}</a>
    </div>
  );
}
