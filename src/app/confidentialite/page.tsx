import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Container, PageHero } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: "Comment NEXWORKS AGENCY traite les informations transmises via son formulaire de contact : données recueillies, utilisation, conservation et droits.",
  path: "/confidentialite",
});

export default function PrivacyPage() {
  const h2 = "mt-10 font-display text-xl font-semibold text-white";
  const p = "mt-3 text-[15px] leading-relaxed text-mist";
  return (
    <>
      <PageHero
        eyebrow="Confidentialité"
        title="Vos données, *simplement.*"
        text="Cette page décrit les informations collectées par ce site et l'usage qui en est fait."
      />
      <section className="pb-24">
        <Container className="max-w-3xl">
          <h2 className={h2}>Informations collectées</h2>
          <p className={p}>
            Lorsque vous utilisez le formulaire de contact, nous recueillons les informations que vous saisissez : nom,
            entreprise, adresse e-mail, téléphone (facultatif), type de projet et
            description de votre besoin.
          </p>
          <h2 className={h2}>Finalité</h2>
          <p className={p}>
            Ces informations servent uniquement à répondre à votre demande et à échanger sur votre projet. Elles ne sont
            ni vendues ni utilisées à des fins publicitaires.
          </p>
          <h2 className={h2}>Protection et anti-spam</h2>
          <p className={p}>
            Les échanges avec le formulaire sont validés côté serveur. Des mesures anti-spam (champ invisible, délai
            minimal, limitation du nombre d&apos;envois) protègent le formulaire sans collecter de données
            supplémentaires. Ce site ne dépose pas de cookies publicitaires.
          </p>
          <h2 className={h2}>Vos droits</h2>
          <p className={p}>
            Conformément au RGPD, vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données.
            {siteConfig.contactEmail ? (
              <>
                {" "}Écrivez-nous à{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-sky underline-offset-4 hover:underline">
                  {siteConfig.contactEmail}
                </a>
                .
              </>
            ) : (
              " Les coordonnées de contact seront indiquées ici dès leur configuration."
            )}
          </p>
          <p className="mt-10 text-[15px] leading-relaxed text-mist">
            L&apos;éditeur du site et son hébergeur sont indiqués dans les{" "}
            <Link href="/mentions-legales" className="font-bold text-white underline-offset-4 hover:underline">
              mentions légales
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
