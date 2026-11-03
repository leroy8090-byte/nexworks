import type { Metadata } from "next";
import { PageIntro, Wrap } from "@/components/riviera/ui";

export const metadata: Metadata = { title: "Confidentialité" };

export default function ConfidentialitePage() {
  return (
    <>
      <PageIntro eyebrow="Informations" title="Politique de confidentialité" />
      <Wrap className="max-w-3xl space-y-8 py-16 text-[15.5px] leading-[1.9] text-[#858178]">
        <section>
          <h2 className="font-[family-name:var(--font-riviera-display)] text-[1.8rem] text-[#24251F]">Formulaires de démonstration</h2>
          <p className="mt-3">
            Les formulaires de contact et d&apos;estimation de ce site sont des démonstrations. Les informations saisies sont uniquement contrôlées dans votre navigateur : elles ne sont ni envoyées, ni enregistrées, ni transmises à un tiers.
          </p>
        </section>
        <section>
          <h2 className="font-[family-name:var(--font-riviera-display)] text-[1.8rem] text-[#24251F]">Cookies et suivi</h2>
          <p className="mt-3">Ce site de démonstration n&apos;utilise pas de traceur publicitaire.</p>
        </section>
        <section>
          <h2 className="font-[family-name:var(--font-riviera-display)] text-[1.8rem] text-[#24251F]">Une question ?</h2>
          <p className="mt-3">Pour en savoir plus sur le site ou sur la création d&apos;un site équivalent, contactez NEXWORKS AGENCY via son site principal.</p>
        </section>
      </Wrap>
    </>
  );
}
