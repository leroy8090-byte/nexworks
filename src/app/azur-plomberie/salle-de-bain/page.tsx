import type { Metadata } from "next";
import Image from "next/image";
import { PipeSteps } from "@/components/azur/PipeSteps";
import { Btn, EndCta, Sign, Wrap } from "@/components/azur/ui";
import { Reveal } from "@/components/ui/Reveal";
import { azurGallery, azurSdbItems, getAzurService, quoteHref } from "@/data/azur";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Rénovation de salle de bain" };

export default function BathroomPage() {
  const steps = getAzurService("renovation-salle-de-bain")?.steps ?? [];
  return (
    <>
      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-az-ink pb-16 pt-32 text-white sm:pb-24">
        <Image src="/azur/service-chauffe-eau.webp" alt="Salle de bain avec baignoire, WC suspendu et bois clair" fill preload sizes="100vw" className="-z-20 object-cover" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-az-ink/90 via-az-ink/45 to-az-ink/35" />
        <Wrap>
          <div className="az-rise"><Sign tone="light">Salle de bain</Sign></div>
          <h1 className="az-rise mt-5 max-w-5xl text-[clamp(3.2rem,8.5vw,7.8rem)]" style={{ animationDelay: ".08s" }}>La pièce qu&apos;on utilise chaque matin.</h1>
          <p className="az-rise mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl" style={{ animationDelay: ".16s" }}>On s&apos;occupe de la plomberie de votre rénovation : la douche, le lavabo, les WC et tout ce qui passe derrière les murs.</p>
          <div className="az-rise mt-8" style={{ animationDelay: ".24s" }}><Btn href={quoteHref("Rénovation salle de bain")} variant="white" arrow>Parler de mon projet</Btn></div>
        </Wrap>
      </section>

      <section className="bg-az-tile py-20 sm:py-28">
        <Wrap>
          <Sign>Ce qu&apos;on peut faire</Sign>
          <h2 className="mt-4 max-w-4xl text-[clamp(2.7rem,6.5vw,5.8rem)]">Tout, ou seulement ce qui vous gêne.</h2>
          <ul className="mt-10 grid gap-x-8 md:grid-cols-2">
            {azurSdbItems.map((x, i) => (
              <li key={x.title}>
                <Reveal delay={(i % 2) * 0.06} y={18} className="flex gap-5 border-t-2 border-az-ink py-5">
                  <span className="az-display text-[2.4rem] text-az-cobalt">{i + 1}</span>
                  <div>
                    <h3 className="text-[2rem]">{x.title}</h3>
                    <p className="mt-1.5 text-lg text-az-ink/80">{x.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Wrap>
          <h2 className="max-w-4xl text-[clamp(2.7rem,6.5vw,5.8rem)]">Des pièces qui donnent envie.</h2>
          <p className="mt-3 text-[15px] text-az-ink/75">Photos d&apos;illustration : ce ne sont pas des réalisations de l&apos;entreprise, qui est fictive.</p>
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {azurGallery.map((g, i) => (
              <li key={g.src} className={cn(g.wide && "md:col-span-2")}>
                <Reveal delay={Math.min(i, 2) * 0.06} y={26}>
                  <div className={cn("group relative overflow-hidden rounded-2xl bg-az-grout", g.wide ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3] md:aspect-auto md:h-full md:min-h-[300px]")}>
                    <Image src={g.src} alt={g.alt} fill sizes={g.wide ? "(max-width: 768px) 92vw, 860px" : "(max-width: 768px) 92vw, 430px"} className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="bg-az-tile py-20 sm:py-28">
        <Wrap>
          <Sign>Votre projet</Sign>
          <h2 className="mt-4 text-[clamp(2.7rem,6.5vw,5.8rem)]">De l&apos;idée aux finitions.</h2>
          <div className="mt-12"><PipeSteps steps={steps.map((text, i) => ({ n: String(i + 1), title: ["L'idée", "L'étude", "Le devis", "Les travaux"][i], text }))} /></div>
        </Wrap>
      </section>
      <EndCta title="Parlons de votre salle de bain." text="Quelques photos de la pièce et vos envies suffisent pour commencer." />
    </>
  );
}
