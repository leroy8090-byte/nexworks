import type { Metadata } from "next";
import { azur, azurFaq, azurPrestationOptions } from "@/data/azur";
import { QuoteForm } from "@/components/azur/QuoteForm";
import { PageHero } from "@/components/azur/Shell";
import { AzurIcons } from "@/components/azur/Icons";
import { ContactHint, Reveal, SectionHead, Wrap } from "@/components/azur/ui";

export const metadata: Metadata = {
  title: "Contact / Demande de devis",
  description: "Demandez un devis pour un dépannage, une installation ou une rénovation de salle de bain. Formulaire en mode démonstration.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Besoin d'un plombier ? Parlons de votre projet."
        text="Décrivez votre besoin et transmettez-nous les informations nécessaires pour étudier votre demande."
        image="/azur/service-depannage.webp"
        alt="Intervention de plomberie"
      />

      <section className="bg-[#F3F6F8] py-16 sm:py-20">
        <Wrap className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHead
              eyebrow="Devis"
              title="Envoyez votre demande"
              text="Plus votre description est précise (commune, type de prestation, photos), plus l'étude du besoin est efficace."
            />
            <ul className="mt-8 space-y-4 text-[15px] text-[#002D72]">
              <li className="flex items-start gap-3 rounded-2xl border border-[#E4EBF1] bg-white p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E3F6FD] text-[#0077C2]">
                  <AzurIcons.pin className="size-5" />
                </span>
                <span>
                  <b className="block font-bold">Zone indicative</b>
                  Saint-Raphaël et communes environnantes (concept fictif)
                </span>
              </li>
              {azur.phone && (
                <li className="flex items-start gap-3 rounded-2xl border border-[#E4EBF1] bg-white p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E3F6FD] text-[#0077C2]">
                    <AzurIcons.phone className="size-5" />
                  </span>
                  <span>
                    <b className="block font-bold">Téléphone</b>
                    <a href={`tel:${azur.phone.replace(/\s/g, "")}`} className="text-[#0077C2]">
                      {azur.phone}
                    </a>
                  </span>
                </li>
              )}
              {azur.email && (
                <li className="flex items-start gap-3 rounded-2xl border border-[#E4EBF1] bg-white p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E3F6FD] text-[#0077C2]">
                    <AzurIcons.mail className="size-5" />
                  </span>
                  <span>
                    <b className="block font-bold">E-mail</b>
                    <a href={`mailto:${azur.email}`} className="text-[#0077C2]">
                      {azur.email}
                    </a>
                  </span>
                </li>
              )}
              <li className="rounded-2xl border border-[#E4EBF1] bg-white p-4">
                <b className="block font-bold">Types de demande acceptés dans le formulaire</b>
                <p className="mt-2 text-[14px] leading-relaxed text-[#536273]">{azurPrestationOptions.join(" · ")}</p>
              </li>
            </ul>
            <div className="mt-6">
              <ContactHint />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <QuoteForm />
          </Reveal>
        </Wrap>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Avant d'envoyer" title="Questions fréquentes liées au contact" />
          </Reveal>
          <div className="mt-10 divide-y divide-[#E4EBF1] overflow-hidden rounded-2xl border border-[#E4EBF1]">
            {azurFaq.slice(0, 4).map((f) => (
              <details key={f.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold text-[#002D72]">
                  {f.q}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E3F6FD] text-[#0077C2] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#536273]">{f.a}</p>
              </details>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  );
}
