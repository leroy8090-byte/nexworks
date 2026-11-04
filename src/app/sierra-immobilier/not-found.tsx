import type { Metadata } from "next";
import Link from "next/link";
import { sierra } from "@/data/sierra";

export const metadata: Metadata = { title: "Page introuvable", robots: { index: false } };

export default function SierraNotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-[#FBFAF8] px-5 pt-[114px]">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[clamp(5rem,16vw,9rem)] font-light leading-none text-[#A68936]">404</p>
        <h1 className="mt-4 text-[1.8rem] font-semibold text-[#231F31]">Cette page n&apos;existe pas.</h1>
        <p className="mt-3 text-[15px] text-[#7A7684]">Le bien a peut-être été retiré du catalogue ou le lien est incorrect.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={sierra.basePath} className="bg-[#231F31] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#A68936]">
            Accueil
          </Link>
          <Link href={`${sierra.basePath}/biens`} className="border border-[#231F31] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-[#231F31] hover:border-[#A68936] hover:text-[#A68936]">
            Voir les biens
          </Link>
        </div>
      </div>
    </section>
  );
}
