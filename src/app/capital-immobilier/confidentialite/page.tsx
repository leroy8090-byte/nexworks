import { ToComplete } from "@/components/capital/Blocks";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro, Wrap } from "@/components/capital/ui";

export const metadata = capitalMeta("Confidentialité", "Politique de confidentialité du concept de refonte CAPITAL IMMOBILIER (démonstration).", "/confidentialite");

export default function Confidentialite() {
  return (
    <>
      <PageIntro eyebrow="Informations" title="Confidentialité." />
      <section className="py-14 sm:py-20">
        <Wrap className="max-w-3xl space-y-8 text-[16px] leading-[1.85] text-[#252A2D]/75">
          <div>
            <h2 className="font-[family-name:var(--font-cap-serif)] text-[1.8rem] text-[#252A2D]">Formulaires de démonstration</h2>
            <p className="mt-3">Les formulaires de ce concept (contact, visite, estimation) ne transmettent et n&apos;enregistrent aucune donnée : la saisie est validée dans votre navigateur puis oubliée. Aucun message n&apos;est envoyé à l&apos;agence.</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-cap-serif)] text-[1.8rem] text-[#252A2D]">Cookies et mesure d&apos;audience</h2>
            <p className="mt-3">Ce concept ne dépose pas de cookie de suivi et ne contient aucun outil de mesure d&apos;audience.</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-cap-serif)] text-[1.8rem] text-[#252A2D]">Version définitive</h2>
            <p className="mt-3">
              Si le site est mis en production, une politique complète (responsable de traitement, finalités, durées de conservation, droits d&apos;accès) devra être rédigée avec l&apos;agence : <ToComplete>à compléter par l&apos;agence</ToComplete>.
            </p>
          </div>
        </Wrap>
      </section>
    </>
  );
}
