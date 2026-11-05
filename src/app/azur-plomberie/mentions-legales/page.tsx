import type { Metadata } from "next";
import Link from "next/link";
import { PageTop, Wrap } from "@/components/azur/ui";
import { azurPhotoCredits } from "@/data/azur-credits";

export const metadata: Metadata = { title: "Mentions légales" };

export default function LegalPage() {
  return (
    <>
      <PageTop sign="Informations" title="Mentions légales" />
      <section className="bg-az-tile py-14 sm:py-20">
        <Wrap>
          <div className="max-w-3xl space-y-8 text-lg leading-relaxed">
            <div>
              <h2 className="text-[2.3rem]">Nature du site</h2>
              <p className="mt-2">AZUR PLOMBERIE est une entreprise fictive. Ce site est une démonstration réalisée par NEXWORKS AGENCY pour son portfolio. Les services, les communes, les horaires et les engagements sont imaginaires et ne constituent pas une offre.</p>
            </div>
            <div>
              <h2 className="text-[2.3rem]">Éditeur</h2>
              <p className="mt-2">Site édité à titre de démonstration par NEXWORKS AGENCY. Voir les <Link href="/mentions-legales" className="font-bold underline underline-offset-2">mentions légales de NEXWORKS AGENCY</Link>.</p>
            </div>
            <div>
              <h2 className="text-[2.3rem]">Conseils</h2>
              <p className="mt-2">Les conseils affichés sont généraux et ne remplacent pas l&apos;avis d&apos;un professionnel sur place. En cas de danger, contactez les services de secours.</p>
            </div>
            <div>
              <h2 className="text-[2.3rem]">Images</h2>
              <p className="mt-2">Les photographies sont utilisées à titre d&apos;illustration et ne montrent pas de réalisations de l&apos;entreprise. Les illustrations ont été dessinées pour ce site.</p>
            </div>
            <div>
              <h2 className="text-[2.3rem]">Crédits des photos</h2>
              <p className="mt-2">Photos de Wikimedia Commons, recadrées et converties en WebP. Leurs auteurs n&apos;ont aucun lien avec ce site et ne l&apos;approuvent pas.</p>
              <ul className="mt-4 divide-y-2 divide-az-ink/10 border-y-2 border-az-ink/10 text-[16px]">
                {Object.entries(azurPhotoCredits).map(([key, c]) => {
                  const url = "licenseUrl" in c ? c.licenseUrl : "";
                  return (
                    <li key={key} className="flex flex-wrap justify-between gap-x-5 py-3">
                      <span><strong>{c.label}</strong>, {c.author}</span>
                      <span className="flex gap-3">
                        {url ? <a href={url} target="_blank" rel="noopener noreferrer license" className="underline underline-offset-2">{c.license}</a> : <span>{c.license}</span>}
                        <a href={c.page} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2">Source</a>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
