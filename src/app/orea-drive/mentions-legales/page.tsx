import type { Metadata } from "next";
import Link from "next/link";
import { PageTop, Wrap } from "@/components/orea/ui";

export const metadata: Metadata = { title: "Mentions légales" };

export default function LegalPage() {
  return (
    <>
      <PageTop sign="Informations" title="Mentions légales" />
      <section className="bg-or-sand py-14 text-or-ink sm:py-20">
        <Wrap className="space-y-8">
          <div className="max-w-3xl space-y-8 text-lg leading-relaxed">
            <div>
              <h2 className="text-4xl">Nature du site</h2>
              <p className="mt-2">ORÉA DRIVE est une entreprise fictive. Ce site est une démonstration réalisée par NEXWORKS AGENCY pour son portfolio. Les prix, les disponibilités, les agences et les conditions sont imaginaires et ne constituent pas une offre.</p>
            </div>
            <div>
              <h2 className="text-4xl">Éditeur</h2>
              <p className="mt-2">Site édité à titre de démonstration par NEXWORKS AGENCY. Voir les <Link href="/mentions-legales" className="font-bold underline underline-offset-2">mentions légales de NEXWORKS AGENCY</Link>.</p>
            </div>
            <div>
              <h2 className="text-4xl">Images</h2>
              <p className="mt-2">Les photographies sont utilisées à titre d&apos;illustration : voir les crédits photos pour leurs auteurs et leurs licences. Les marques et modèles cités appartiennent à leurs propriétaires, sans aucun lien ni partenariat avec ce site.</p>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
