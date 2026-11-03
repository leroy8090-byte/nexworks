import type { Metadata } from "next";
import { PageIntro, Wrap } from "@/components/riviera/ui";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsPage() {
  return (
    <>
      <PageIntro eyebrow="Informations" title="Mentions légales" />
      <Wrap className="max-w-3xl space-y-8 py-16 text-[15.5px] leading-[1.9] text-[#858178]">
        <section>
          <h2 className="font-[family-name:var(--font-riviera-display)] text-[1.8rem] text-[#24251F]">Nature du site</h2>
          <p className="mt-3">
            MAISON RIVIERA est une agence immobilière fictive. Ce site est une démonstration réalisée par NEXWORKS AGENCY pour son portfolio. Les biens, prix, descriptions et textes sont imaginaires et n&apos;ont aucune valeur d&apos;offre.
          </p>
        </section>
        <section>
          <h2 className="font-[family-name:var(--font-riviera-display)] text-[1.8rem] text-[#24251F]">Éditeur</h2>
          <p className="mt-3">
            Site édité à titre de démonstration par NEXWORKS AGENCY. Aucune société, carte professionnelle ni garantie financière n&apos;est associée à « MAISON RIVIERA ».
          </p>
        </section>
        <section>
          <h2 className="font-[family-name:var(--font-riviera-display)] text-[1.8rem] text-[#24251F]">Images</h2>
          <p className="mt-3">Les photographies sont utilisées à titre d&apos;illustration et ne représentent pas de biens réellement proposés à la vente.</p>
        </section>
      </Wrap>
    </>
  );
}
