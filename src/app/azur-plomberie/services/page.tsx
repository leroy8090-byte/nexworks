import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { azurServices } from "@/data/azur";
import { AzurCtaBand } from "@/components/azur/PageBlocks";
import { PageHero } from "@/components/azur/Shell";
import { AzurIcons } from "@/components/azur/Icons";
import { Reveal, SectionHead, Wrap } from "@/components/azur/ui";

export const metadata: Metadata = {
  title: "Nos services de plomberie",
  description:
    "Dépannage, recherche de fuite, débouchage, installation sanitaire, chauffe-eau et rénovation de salle de bain. Concept fictif AZUR PLOMBERIE à Saint-Raphaël.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Des solutions pour tous vos besoins en plomberie."
        text="Chaque prestation dispose de sa propre page : description, déroulé, conseils et accès au formulaire de devis."
        image="/azur/service-sanitaire.webp"
        alt="Équipements sanitaires modernes"
      />

      <section className="bg-white py-16 sm:py-20">
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="Catalogue"
              title="Six prestations détaillées"
              text="Choisissez une page pour comprendre concrètement ce qui est présenté, sans faux délais ni tarifs inventés."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {azurServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.04}>
                <Link
                  href={s.href ?? `/azur-plomberie/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E4EBF1] bg-white shadow-[0_16px_40px_-30px_rgba(16,42,67,.4)] transition hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgba(16,42,67,.45)]"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image src={s.image} alt={s.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-[family-name:var(--font-azur-display)] text-[1.25rem] font-bold text-[#002D72]">{s.title}</h2>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[#536273]">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0077C2]">
                      Ouvrir la page <AzurIcons.arrow className="size-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="bg-[#F3F6F8] py-16 sm:py-20">
        <Wrap className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHead
              eyebrow="Comment choisir"
              title="Pas sûr de la prestation ?"
              text="Décrivez simplement le problème dans le formulaire : fuite, écoulement, manque d'eau chaude ou projet de rénovation. Nous rattachons votre demande à la bonne catégorie."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[1.5rem] border border-[#E4EBF1] bg-white p-8">
              <ul className="space-y-4 text-[15px] text-[#002D72]">
                {[
                  "Fuite ou robinet → Dépannage ou recherche de fuite",
                  "Évier / douche qui s'écoule mal → Débouchage",
                  "Nouvel équipement → Installation sanitaire",
                  "Plus d'eau chaude → Chauffe-eau",
                  "Refonte complète → Salle de bain",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#4FC3F7] text-[#002D72]">
                      <AzurIcons.check className="size-3.5" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Wrap>
      </section>

      <AzurCtaBand title="Une intervention à préparer ?" text="Le formulaire de contact centralise toutes les demandes de devis du site." />
    </>
  );
}
