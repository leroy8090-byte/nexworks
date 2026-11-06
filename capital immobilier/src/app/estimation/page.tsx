import { EstimateWizard } from "@/components/EstimateWizard";
import { Container, JsonLd, PageHero } from "@/components/ui";
import { pageMeta, serviceLd } from "@/lib/seo";

const DESC = "Demandez l’estimation de votre appartement, maison ou villa à Saint-Raphaël et alentour. Votre demande est étudiée par l’agence, qui vous recontacte.";
export const metadata = pageMeta({ title: "Estimation immobilière à Saint-Raphaël", description: DESC, path: "/estimation", image: "/media/vieux-port.webp" });

export default function Estimation() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Estimation immobilière", description: DESC, path: "/estimation" })} />
      <PageHero crumbs={[{ name: "Vendre", path: "/vendre" }, { name: "Estimation", path: "/estimation" }]} eyebrow="Estimation" title="Chaque projet immobilier commence par une bonne estimation." text="Quatre étapes pour présenter votre bien. L’agence l’étudie et vous recontacte : aucune valeur n’est calculée automatiquement." image="/media/vieux-port.webp" alt="Le Vieux-Port de Saint-Raphaël, ses bateaux et ses façades" />
      <section className="pb-24 sm:pb-32">
        <Container><div className="relative z-10 -mt-14 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(0,0,0,.5)] sm:p-12"><EstimateWizard /></div></Container>
      </section>
    </>
  );
}
