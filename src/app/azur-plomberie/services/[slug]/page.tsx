import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PipeSteps } from "@/components/azur/PipeSteps";
import { Arrow, Btn, Check, EndCta, Picto, Sign, Wrap } from "@/components/azur/ui";
import { Reveal } from "@/components/ui/Reveal";
import { azur, azurServices, getAzurService, quoteHref } from "@/data/azur";
import { azurPhotoCredits } from "@/data/azur-credits";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => azurServices.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getAzurService((await params).slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default async function ServicePage({ params }: Props) {
  const s = getAzurService((await params).slug);
  if (!s) notFound();
  const others = azurServices.filter((o) => o.slug !== s.slug).slice(0, 5);
  const credit = (azurPhotoCredits as Record<string, { author: string; license: string }>)[s.slug];

  return (
    <>
      <section className="az-tiles az-tiles-dark relative overflow-hidden bg-az-cobalt pb-16 pt-32 text-white sm:pb-24 sm:pt-44">
        <Wrap className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <Link href={`${azur.basePath}/services`} className="az-rise inline-block text-base font-semibold underline underline-offset-4">Tous les services</Link>
            <h1 className="az-rise mt-5 text-[clamp(3.2rem,9vw,8rem)]" style={{ animationDelay: ".08s" }}>{s.title}</h1>
            <p className="az-rise mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl" style={{ animationDelay: ".16s" }}>{s.short}</p>
          </div>
          <div className="az-rise hidden size-44 items-center justify-center rounded-full border-4 border-white lg:flex" style={{ animationDelay: ".24s" }}>
            <Picto name={s.picto} className="size-24" />
          </div>
        </Wrap>
      </section>

      <section className="bg-az-tile py-16 sm:py-24">
        <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div>
            <p className="az-display text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.15]">{s.intro}</p>
            {s.photo ? (
              <figure className="mt-10">
                <Reveal y={26} className="relative aspect-[3/2] overflow-hidden rounded-2xl border-2 border-az-ink bg-az-grout">
                  <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(max-width: 1024px) 92vw, 720px" className="object-cover" />
                </Reveal>
                {credit && (
                  <figcaption className="mt-2 text-sm text-az-ink/75">
                    Photo d&apos;illustration : {credit.author} ({credit.license}).{" "}
                    <Link href={`${azur.basePath}/mentions-legales`} className="underline underline-offset-2">Voir les crédits</Link>
                  </figcaption>
                )}
              </figure>
            ) : (
              <div className="mt-10 flex aspect-[3/1] items-center justify-center rounded-2xl border-2 border-az-ink bg-az-cobalt text-white"><Picto name={s.picto} className="size-28" /></div>
            )}
            <h2 className="mt-12 text-[2.7rem]">Ce qu&apos;on fait</h2>
            <ul className="mt-4 divide-y-2 divide-az-ink/10 border-y-2 border-az-ink/10">
              {s.includes.map((x) => (
                <li key={x} className="flex gap-3 py-3.5 text-lg"><Check className="mt-1 text-az-cobalt" />{x}</li>
              ))}
            </ul>
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-az-hot-deep p-6 text-white sm:p-8">
              <h2 className="text-[2.4rem]">En attendant notre passage</h2>
              <ul className="mt-4 space-y-3 text-[17px] leading-relaxed">
                {s.tips.map((t) => <li key={t} className="flex gap-3"><Check className="mt-1" />{t}</li>)}
              </ul>
              <Btn href={quoteHref(s.prestation)} variant="white" className="mt-6 w-full" arrow>Décrire mon besoin</Btn>
            </div>
          </aside>
        </Wrap>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Wrap>
          <Sign>Comment ça se passe</Sign>
          <h2 className="mt-4 text-[clamp(2.5rem,5.5vw,4.8rem)]">Vos quatre étapes.</h2>
          <div className="mt-12"><PipeSteps steps={s.steps.map((text, i) => ({ n: String(i + 1), title: ["Vous décrivez", "On étudie", "On s'accorde", "On intervient"][i], text }))} /></div>
        </Wrap>
      </section>

      <section className="bg-az-tile py-16 sm:py-24">
        <Wrap>
          <h2 className="text-[clamp(2.5rem,5.5vw,4.8rem)]">Nos autres services</h2>
          <ul className="mt-8 border-t-2 border-az-ink">
            {others.map((o, i) => (
              <li key={o.slug}>
                <Reveal delay={i * 0.04} y={14}>
                  <Link href={o.href ?? `${azur.basePath}/services/${o.slug}`} className="group flex items-center justify-between gap-5 border-b-2 border-az-ink/15 py-4 transition-colors hover:bg-white sm:px-3">
                    <span className="flex items-center gap-4">
                      <Picto name={o.picto} className="size-10 text-az-cobalt" />
                      <span className="az-display text-[1.9rem] sm:text-[2.5rem]">{o.title}</span>
                    </span>
                    <Arrow className="size-6 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>
      <EndCta />
    </>
  );
}
