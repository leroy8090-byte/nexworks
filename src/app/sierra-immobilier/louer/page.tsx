import type { Metadata } from "next";
import { PageIntro, SierraButton, Wrap } from "@/components/sierra/ui";
import { sierra } from "@/data/sierra";

export const metadata: Metadata = {
  title: "Louer",
  description: "Location immobilière à Saint-Raphaël et environs — proposition de refonte Sierra Immobilier.",
};

export default function LouerPage() {
  return (
    <>
      <PageIntro
        eyebrow="Louer"
        title="Trouver une location adaptée à votre projet."
        text="Recherche de location sur le littoral varois, avec un parcours clair entre critères et contact."
      />
      <Wrap className="py-16">
        <p className="max-w-2xl text-[16px] leading-[1.85] text-[#77766F]">
          Les annonces de location présentées dans cette démonstration sont fictives. Pour les disponibilités réelles, consultez le site
          officiel ou contactez l&apos;agence.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <SierraButton href={`${sierra.basePath}/biens?transaction=location`}>Locations (démo)</SierraButton>
          <SierraButton href={sierra.officialSite} variant="secondary">
            Site officiel
          </SierraButton>
        </div>
      </Wrap>
    </>
  );
}
