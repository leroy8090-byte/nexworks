import type { Metadata } from "next";
import { PageIntro, Wrap } from "@/components/volt/ui";

export const metadata: Metadata = { title: "Mentions légales" };

const h2 = "font-[family-name:var(--font-volt-display)] text-[2.2rem] uppercase leading-none text-[#F5F5F0]";

export default function MentionsPage() {
  return (
    <>
      <PageIntro eyebrow="Informations" title="Mentions légales" />
      <Wrap className="max-w-3xl space-y-10 py-16 text-[15.5px] leading-[1.9] text-[#F5F5F0]/65">
        <section>
          <h2 className={h2}>Nature du site</h2>
          <p className="mt-3">
            VOLT FITNESS CLUB est un club de sport fictif. Ce site est une démonstration réalisée par NEXWORKS AGENCY pour son portfolio. Les tarifs, horaires, programmes, coachs et textes sont imaginaires et n&apos;ont aucune valeur d&apos;offre.
          </p>
        </section>
        <section>
          <h2 className={h2}>Éditeur</h2>
          <p className="mt-3">
            Site édité à titre de démonstration par NEXWORKS AGENCY. Aucune société, certification, partenaire ni label n&apos;est associé à « VOLT FITNESS CLUB ».
          </p>
        </section>
        <section>
          <h2 className={h2}>Santé et résultats</h2>
          <p className="mt-3">
            Les contenus ne constituent pas un avis médical et ne garantissent aucun résultat. Avant toute activité physique, consultez un professionnel de santé en cas de doute.
          </p>
        </section>
        <section>
          <h2 className={h2}>Images</h2>
          <p className="mt-3">Les photographies sont utilisées à titre d&apos;illustration et ne représentent pas un établissement réel.</p>
        </section>
      </Wrap>
    </>
  );
}
