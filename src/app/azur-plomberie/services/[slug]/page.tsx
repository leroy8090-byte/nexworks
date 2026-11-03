import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { azurServices, getAzurService } from "@/data/azur";
import { AzurCtaBand, RelatedServices } from "@/components/azur/PageBlocks";
import { AzurIcons } from "@/components/azur/Icons";
import { AzurButton, Reveal, Wrap } from "@/components/azur/ui";

type Params = { slug: string };

export function generateStaticParams() {
  return azurServices.filter((s) => !s.href).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getAzurService(slug);
  if (!s || s.href) return {};
  return {
    title: s.title,
    description: s.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getAzurService(slug);
  if (!s || s.href) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-[#002D72]">
        <Image src={s.image} alt="" fill className="object-cover opacity-30" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002D72] via-[#002D72]/88 to-[#002D72]/4" />
        <Wrap className="relative py-16 sm:py-24">
          <nav className="text-[13px] text-white/70">
            <Link href="/azur-plomberie/services" className="hover:text-[#4FC3F7]">
              ← Tous les services
            </Link>
          </nav>
          <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.18em] text-[#4FC3F7]">Prestation</p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-azur-display)] text-[2.4rem] font-bold leading-[1.08] text-white sm:text-[3.2rem]">
            {s.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">{s.description}</p>
          <div className="mt-8">
            <AzurButton href="/azur-plomberie/contact">Demander un devis</AzurButton>
          </div>
        </Wrap>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Wrap className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          <div className="space-y-5">
            {s.intro.map((p) => (
              <Reveal key={p}>
                <p className="text-[16px] leading-relaxed text-[#536273]">{p}</p>
              </Reveal>
            ))}
            <Reveal>
              <h2 className="mt-8 font-[family-name:var(--font-azur-display)] text-2xl font-bold text-[#002D72]">Ce que couvre cette prestation</h2>
              <ul className="mt-5 space-y-3">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-[#002D72]">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#4FC3F7] text-[#002D72]">
                      <AzurIcons.check className="size-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[1.5rem] border border-[#E4EBF1] bg-[#F3F6F8]">
              <div className="relative aspect-[4/3]">
                <Image src={s.image} alt={s.alt} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="font-bold text-[#002D72]">Besoin de cette intervention ?</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-[#536273]">
                  Décrivez votre situation : commune, symptômes et photos si possible. Sur ce site de démonstration, le formulaire ne transmet aucune donnée.
                </p>
                <AzurButton href="/azur-plomberie/contact" className="mt-5 w-full">
                  Demander un devis
                </AzurButton>
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>

      <section className="bg-[#F3F6F8] py-16 sm:py-20">
        <Wrap>
          <Reveal>
            <h2 className="font-[family-name:var(--font-azur-display)] text-2xl font-bold text-[#002D72] sm:text-3xl">Comment ça se passe</h2>
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((step, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <li className="h-full rounded-2xl border border-[#E4EBF1] bg-white p-6">
                  <span className="flex size-10 items-center justify-center rounded-full bg-[#002D72] font-[family-name:var(--font-azur-display)] font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#536273]">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Wrap className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-[family-name:var(--font-azur-display)] text-2xl font-bold text-[#002D72]">Avant de nous écrire</h2>
            <ul className="mt-6 space-y-4">
              {s.tips.map((t) => (
                <li key={t} className="rounded-2xl border border-[#E4EBF1] bg-[#F3F6F8] p-5 text-[15px] leading-relaxed text-[#536273]">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[1.5rem] bg-[#002D72] p-8 text-white sm:p-10">
              <h2 className="font-[family-name:var(--font-azur-display)] text-2xl font-bold">Prêt à décrire votre besoin ?</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                Aucun délai ni tarif n&apos;est inventé sur ce concept. Le formulaire sert à illustrer le parcours de demande.
              </p>
              <AzurButton href="/azur-plomberie/contact" className="mt-6">
                Aller au formulaire
              </AzurButton>
            </div>
          </Reveal>
        </Wrap>
      </section>

      <RelatedServices exclude={s.slug} />
      <AzurCtaBand />
    </>
  );
}
