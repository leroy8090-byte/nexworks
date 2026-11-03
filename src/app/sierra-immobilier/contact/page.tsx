import type { Metadata } from "next";
import { ContactForm } from "@/components/sierra/Forms";
import { ContactHint, PageIntro, Wrap } from "@/components/sierra/ui";
import { sierra } from "@/data/sierra";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter Sierra Immobilier à Saint-Raphaël — 04 98 11 04 04. Formulaire en mode démonstration sur cette proposition.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Parlons de votre projet."
        text="Téléphone et adresse de l'agence. Le formulaire ci-dessous est une démonstration sans envoi réel."
      />
      <Wrap className="grid gap-14 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-[family-name:var(--font-sierra-display)] text-[2rem] font-light text-[#222421]">{sierra.name}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#77766F]">
            {sierra.address}
            <br />
            {sierra.postalCode} {sierra.city}
          </p>
          <a href={sierra.phoneHref} className="mt-6 inline-block text-[1.5rem] text-[#263B48] hover:underline">
            {sierra.phone}
          </a>
          <div className="mt-6 flex flex-wrap gap-4 text-[13px] font-semibold uppercase tracking-[0.14em]">
            <a href={sierra.phoneHref} className="underline underline-offset-4">
              Appeler
            </a>
            <a href={sierra.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Itinéraire
            </a>
            <a href={sierra.officialSite} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Site officiel
            </a>
          </div>
          <ContactHint className="mt-6" />
          <div className="mt-8 overflow-hidden border border-[#D8C9B5]">
            <iframe
              title="Carte — Sierra Immobilier"
              src="https://maps.google.com/maps?q=6%20avenue%20du%20Commandant%20Guilbaud%2083700%20Saint-Raphael&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[280px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="border border-[#D8C9B5] bg-[#FCFBF8] p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-sierra-display)] text-[1.9rem] font-light">Envoyer un message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </Wrap>
    </>
  );
}
