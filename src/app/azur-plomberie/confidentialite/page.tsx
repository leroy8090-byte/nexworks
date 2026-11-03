import type { Metadata } from "next";
import { Wrap } from "@/components/azur/ui";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: false },
};

export default function ConfidentialitePage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Wrap className="max-w-3xl">
        <h1 className="font-[family-name:var(--font-azur-display)] text-3xl font-bold text-[#002D72]">Politique de confidentialité</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#536273]">
          Sur ce site de démonstration, le formulaire de contact <strong>ne transmet aucune donnée</strong> à un serveur externe. Les informations saisies restent dans votre navigateur le temps de la simulation.
        </p>
        <h2 className="mt-8 text-xl font-bold text-[#002D72]">Données concernées (site réel)</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#536273]">
          Lorsqu&apos;un backend sera branché, les données typiques seront : nom, e-mail, téléphone, commune, type de prestation et message. Elles devront être traitées uniquement pour répondre à la demande, avec une base légale et une durée de conservation définies.
        </p>
        <h2 className="mt-8 text-xl font-bold text-[#002D72]">Vos droits</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#536273]">
          Accès, rectification, effacement, limitation, opposition et portabilité : à préciser avec l&apos;entreprise réelle et le DPO ou le contact RGPD désigné.
        </p>
        <h2 className="mt-8 text-xl font-bold text-[#002D72]">Cookies</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#536273]">
          Ce concept n&apos;installe pas de cookies publicitaires. Un bandeau de consentement pourra être ajouté si des traceurs non essentiels sont introduits.
        </p>
      </Wrap>
    </section>
  );
}
