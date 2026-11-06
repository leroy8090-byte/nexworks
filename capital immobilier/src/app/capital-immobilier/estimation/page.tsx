import Image from "next/image";
import { EstimateForm } from "@/components/capital/Forms";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro, Wrap, serif } from "@/components/capital/ui";

export const metadata = capitalMeta("Demander une estimation de son bien", "Demandez l'estimation de votre appartement, maison ou villa autour de Saint-Raphaël.", "/estimation");

export default function Estimation() {
  return (
    <>
      <PageIntro eyebrow="Estimation" title="Connaître la valeur de votre bien." text="Renseignez quelques informations : l'agence vous recontacte pour échanger sur votre bien. Aucune valeur n'est calculée automatiquement : une estimation sérieuse suppose l'étude du bien." />
      <section className="py-16 sm:py-24">
        <Wrap className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="bg-white p-7 shadow-[0_30px_70px_-45px_rgba(24,59,80,.4)] sm:p-10">
            <EstimateForm />
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F0E4CE]">
              <Image src="/capital-immobilier/villa-pool.webp" alt="Villa contemporaine face à sa piscine (photographie d'illustration)" fill sizes="(min-width:1024px) 35vw, 100vw" className="object-cover" />
            </div>
            <h2 className={`${serif} mt-8 text-[1.9rem] leading-tight`}>Pour préparer l&apos;échange</h2>
            <ul className="mt-5 space-y-3 text-[15.5px] leading-relaxed text-[#1F2D33]/72">
              {["Adresse ou quartier du bien", "Type de bien, surface approximative, nombre de pièces", "Travaux récents ou à prévoir", "Votre calendrier et vos attentes"].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#0E4F68]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Wrap>
      </section>
    </>
  );
}
