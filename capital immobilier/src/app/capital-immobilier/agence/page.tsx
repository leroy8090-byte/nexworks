import Link from "next/link";
import { CtaBand, Split, ToComplete } from "@/components/capital/Blocks";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro } from "@/components/capital/ui";
import { capital, expertises } from "@/data/capital";

export const metadata = capitalMeta("L'agence CAPITAL IMMOBILIER à Saint-Raphaël", "Qui est CAPITAL IMMOBILIER ? Une agence installée avenue du Général-Leclerc à Saint-Raphaël : transaction, location, gestion et syndic.", "/agence");

export default function Agence() {
  const b = capital.basePath;
  return (
    <>
      <PageIntro eyebrow="L'agence" title="Une agence locale, des métiers complets." text="CAPITAL IMMOBILIER est installée à Saint-Raphaël, dans le Var. Elle accompagne particuliers, propriétaires et copropriétaires." />
      <Split eyebrow="Qui sommes-nous" title="Où et comment nous trouver." image="/capital-immobilier/agence.webp" alt="Salon lumineux devant un rideau de lin (photographie d'illustration)">
        <p>
          L&apos;agence se situe au {capital.address.street}, {capital.address.postalCode} {capital.address.city}. Vous pouvez la joindre au{" "}
          <a href={`tel:${capital.phoneHref}`} className="font-semibold text-[#183B50] underline underline-offset-4">
            {capital.phone}
          </a>{" "}
          ou à <a href={`mailto:${capital.email}`} className="font-semibold text-[#183B50] underline underline-offset-4 break-all">{capital.email}</a>.
        </p>
        <p>
          Historique, équipe, horaires d&apos;ouverture : <ToComplete>à compléter par l&apos;agence</ToComplete>. Aucune date, aucun chiffre ni aucun nom n&apos;est affiché tant qu&apos;il n&apos;est pas confirmé.
        </p>
      </Split>
      <section className="bg-[#E8E0D4]/55 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-14">
          <h2 className="font-[family-name:var(--font-cap-serif)] text-[2.3rem] sm:text-[3rem]">Ses expertises</h2>
          <ul className="mt-10 grid gap-x-10 border-t border-[#183B50]/20 md:grid-cols-2">
            {expertises.map((e) => (
              <li key={e.title} className="border-b border-[#183B50]/20 py-5">
                <Link href={e.href} className="group flex items-baseline justify-between gap-4">
                  <span>
                    <span className="block font-[family-name:var(--font-cap-serif)] text-[1.5rem]">{e.title}</span>
                    <span className="mt-1 block text-[14.5px] text-[#252A2D]/65">{e.text}</span>
                  </span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Rencontrons-nous." primary={{ label: "Contacter l'agence", href: `${b}/contact` }} secondary={{ label: "Découvrir nos biens", href: `${b}/biens` }} />
    </>
  );
}
