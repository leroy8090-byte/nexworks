import { Btn, Wrap } from "@/components/orea/ui";
import { orea } from "@/data/orea";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-or-ink pt-24 text-white">
      <Wrap>
        <p className="font-[family-name:var(--font-orea-display)] text-[clamp(7rem,24vw,20rem)] font-black leading-[0.8] text-or-flame">404</p>
        <h1 className="mt-4 text-6xl">Vous avez raté la sortie.</h1>
        <p className="mt-3 text-lg text-white/75">Cette page n&apos;existe pas. Faisons demi-tour.</p>
        <Btn href={orea.basePath} className="mt-6" arrow>Retour à l&apos;accueil</Btn>
      </Wrap>
    </section>
  );
}
