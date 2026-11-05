import { capital } from "@/data/capital";
import { CapButton, Wrap, serif } from "@/components/capital/ui";

export const metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <Wrap className="py-28 text-center">
      <p className={`${serif} text-[6rem] leading-none text-[#183B50]`}>404</p>
      <h1 className={`${serif} mt-4 text-[2.4rem]`}>Cette page ou ce bien n&apos;existe pas.</h1>
      <p className="mx-auto mt-4 max-w-md text-[16px] text-[#252A2D]/70">Le lien est peut-être incorrect, ou le bien n&apos;est plus en ligne.</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <CapButton href={`${capital.basePath}/biens`}>Voir nos biens</CapButton>
        <CapButton href={capital.basePath} variant="secondary" arrow={false}>
          Retour à l&apos;accueil
        </CapButton>
      </div>
    </Wrap>
  );
}
