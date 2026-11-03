import Image from "next/image";
import Link from "next/link";
import { azurServices } from "@/data/azur";
import { AzurIcons } from "./Icons";
import { AzurButton, Reveal, Wrap } from "./ui";

export function AzurCtaBand({
  title = "Un projet ou un problème de plomberie ?",
  text = "Décrivez votre besoin : nous étudions chaque demande individuellement.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#002D72] py-14 sm:py-16">
      <div className="pointer-events-none absolute -left-20 top-0 size-56 rounded-full bg-[#4FC3F7]/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-16 bottom-0 size-48 rounded-full bg-[#FFC107]/20 blur-3xl" aria-hidden />
      <Wrap className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="font-[family-name:var(--font-azur-display)] text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">{text}</p>
        </div>
        <AzurButton href="/azur-plomberie/contact">Demander un devis</AzurButton>
      </Wrap>
    </section>
  );
}

export function RelatedServices({ exclude }: { exclude?: string }) {
  const list = azurServices.filter((s) => s.slug !== exclude).slice(0, 3);
  return (
    <section className="bg-[#F3F6F8] py-16 sm:py-20">
      <Wrap>
        <Reveal>
          <h2 className="font-[family-name:var(--font-azur-display)] text-2xl font-bold text-[#002D72] sm:text-3xl">Autres prestations</h2>
          <p className="mt-3 max-w-2xl text-[15px] text-[#536273]">Explorez les autres pages du site pour comprendre l&apos;ensemble de l&apos;offre présentée.</p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <Reveal key={s.slug}>
              <Link
                href={s.href ?? `/azur-plomberie/services/${s.slug}`}
                className="group block overflow-hidden rounded-2xl border border-[#E4EBF1] bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-28px_rgba(16,42,67,.45)]"
              >
                <div className="relative aspect-[16/10]">
                  <Image src={s.image} alt={s.alt} fill sizes="(max-width:1024px) 100vw, 33vw" loading="eager" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#002D72]">{s.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#536273]">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0077C2]">
                    Voir la page <AzurIcons.arrow className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
