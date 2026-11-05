import type { Metadata } from "next";
import { PageTop, Wrap } from "@/components/azur/ui";

export const metadata: Metadata = { title: "Confidentialité" };

export default function PrivacyPage() {
  return (
    <>
      <PageTop sign="Informations" title="Confidentialité" />
      <section className="bg-az-tile py-14 sm:py-20">
        <Wrap>
          <div className="max-w-3xl space-y-8 text-lg leading-relaxed">
            <div>
              <h2 className="text-[2.3rem]">Vos données</h2>
              <p className="mt-2">Le formulaire de ce site de démonstration n&apos;envoie rien. Ce que vous saisissez et la photo que vous choisissez restent dans votre navigateur, et disparaissent quand vous quittez la page.</p>
            </div>
            <div>
              <h2 className="text-[2.3rem]">Votre langue</h2>
              <p className="mt-2">Si vous choisissez l&apos;anglais, ce choix est retenu par votre navigateur. Il n&apos;est transmis à personne.</p>
            </div>
            <div>
              <h2 className="text-[2.3rem]">Sur un vrai site</h2>
              <p className="mt-2">Un artisan devrait préciser ici quelles données il collecte, pourquoi, combien de temps il les garde et comment exercer vos droits.</p>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
