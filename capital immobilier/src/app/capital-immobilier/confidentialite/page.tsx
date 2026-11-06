import { ToComplete } from "@/components/capital/Blocks";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro, Wrap } from "@/components/capital/ui";

export const metadata = capitalMeta("Confidentialité", "Politique de confidentialité du concept de refonte CAPITAL IMMOBILIER (démonstration).", "/confidentialite");

export default function Confidentialite() {
  return (
    <>
      <PageIntro eyebrow="Informations" title="Confidentialité." />
      <section className="py-14 sm:py-20">
        <Wrap className="max-w-3xl space-y-8 text-[16px] leading-[1.85] text-[#1F2D33]/75">
          <div>
            <h2 className="font-[family-name:var(--font-cap-serif)] text-[1.8rem] text-[#1F2D33]">Formulaires</h2>
            <p className="mt-3">Les formulaires de ce concept (contact, visite, estimation) enregistrent votre nom, vos coordonnées et votre message dans le logiciel de test NEXWORKS ESTATE. Ils ne sont pas transmis à l&apos;agence et ne servent qu&apos;à vérifier le parcours.</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-cap-serif)] text-[1.8rem] text-[#1F2D33]">Cookies et mesure d&apos;audience</h2>
            <p className="mt-3">Ce concept ne dépose pas de cookie de suivi. La mesure d&apos;audience de NEXWORKS ESTATE compte les visites sans cookie et sans conserver votre adresse IP. Les fiches de biens intègrent des cartes Google Maps et des vidéos YouTube ou Vimeo : ces services tiers reçoivent votre visite et peuvent déposer leurs propres cookies.</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-cap-serif)] text-[1.8rem] text-[#1F2D33]">Version définitive</h2>
            <p className="mt-3">
              Si le site est mis en production, une politique complète (responsable de traitement, finalités, durées de conservation, droits d&apos;accès) devra être rédigée avec l&apos;agence : <ToComplete>à compléter par l&apos;agence</ToComplete>.
            </p>
          </div>
        </Wrap>
      </section>
    </>
  );
}
