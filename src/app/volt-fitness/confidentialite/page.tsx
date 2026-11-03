import type { Metadata } from "next";
import { PageIntro, Wrap } from "@/components/volt/ui";

export const metadata: Metadata = { title: "Confidentialité" };

const h2 = "font-[family-name:var(--font-volt-display)] text-[2.2rem] uppercase leading-none text-[#F5F5F0]";

export default function ConfidentialitePage() {
  return (
    <>
      <PageIntro eyebrow="Informations" title="Confidentialité" />
      <Wrap className="max-w-3xl space-y-10 py-16 text-[15.5px] leading-[1.9] text-[#F5F5F0]/65">
        <section>
          <h2 className={h2}>Formulaires de démonstration</h2>
          <p className="mt-3">
            Les formulaires de ce site sont fictifs : la validation s&apos;effectue dans votre navigateur, rien n&apos;est transmis, aucune donnée n&apos;est enregistrée ni partagée.
          </p>
        </section>
        <section>
          <h2 className={h2}>Cookies et traceurs</h2>
          <p className="mt-3">Ce site de démonstration ne dépose pas de cookie publicitaire ni de traceur d&apos;analyse.</p>
        </section>
        <section>
          <h2 className={h2}>Réservations</h2>
          <p className="mt-3">Les boutons « Réserver » illustrent un parcours : aucune réservation n&apos;est créée.</p>
        </section>
        <section>
          <h2 className={h2}>Contact</h2>
          <p className="mt-3">Pour toute question sur cette démonstration, rapprochez-vous de NEXWORKS AGENCY via son site officiel.</p>
        </section>
      </Wrap>
    </>
  );
}
