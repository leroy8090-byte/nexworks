import type { Metadata } from "next";
import { PageTop, Wrap } from "@/components/orea/ui";

export const metadata: Metadata = { title: "Confidentialité" };

export default function PrivacyPage() {
  return (
    <>
      <PageTop sign="Informations" title="Confidentialité" />
      <section className="bg-or-sand py-14 text-or-ink sm:py-20">
        <Wrap>
          <div className="max-w-3xl space-y-8 text-lg leading-relaxed">
            <div>
              <h2 className="text-4xl">Formulaires de démonstration</h2>
              <p className="mt-2">Le parcours de réservation et le formulaire de contact sont fictifs : la vérification se fait dans votre navigateur, rien n&apos;est envoyé et aucune donnée n&apos;est enregistrée.</p>
            </div>
            <div>
              <h2 className="text-4xl">Paiement</h2>
              <p className="mt-2">Aucun paiement n&apos;est possible sur ce site, et aucune information bancaire n&apos;est demandée.</p>
            </div>
            <div>
              <h2 className="text-4xl">Cookies</h2>
              <p className="mt-2">Ce site de démonstration ne dépose pas de cookies publicitaires ni de traceurs d&apos;analyse. Votre choix de langue est conservé uniquement dans votre navigateur.</p>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
