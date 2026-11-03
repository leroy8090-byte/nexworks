import type { Metadata } from "next";
import { Wrap } from "@/components/azur/ui";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: false },
};

export default function MentionsPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Wrap className="prose prose-slate max-w-3xl">
        <h1 className="font-[family-name:var(--font-azur-display)] text-3xl font-bold text-[#002D72]">Mentions légales</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#536273]">
          AZUR PLOMBERIE est un <strong>projet de démonstration fictif</strong> réalisé pour le portfolio de NEXWORKS AGENCY. Il ne correspond à aucune entreprise réellement immatriculée.
        </p>
        <h2 className="mt-8 text-xl font-bold text-[#002D72]">Éditeur du concept</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#536273]">
          Les informations d&apos;éditeur, SIRET, adresse et responsable de publication seront complétées lorsque ce modèle sera adapté à une entreprise réelle.
        </p>
        <h2 className="mt-8 text-xl font-bold text-[#002D72]">Hébergement</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#536273]">À compléter selon l&apos;hébergeur choisi pour une mise en ligne réelle.</p>
        <h2 className="mt-8 text-xl font-bold text-[#002D72]">Propriété intellectuelle</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#536273]">
          Les textes, la structure et les composants de ce site de démonstration appartiennent à NEXWORKS AGENCY, sous réserve des photographies tierces utilisées à titre illustratif.
        </p>
      </Wrap>
    </section>
  );
}
