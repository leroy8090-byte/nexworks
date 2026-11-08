"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Check } from "@/components/ui/Icons";
import { ease } from "@/lib/utils";

const Stage = ({ children }: { children: React.ReactNode }) => <div className="relative aspect-[5/4] w-full sm:aspect-[4/3]">{children}</div>;
const Pill = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full bg-sky px-3 py-1.5 text-xs font-bold text-ink ${className}`}>{children}</span>
);

/** Étape 1 : ce qu'on cherche à comprendre, coché au fil de l'échange. */
export function SceneBrief({ items }: { items: readonly string[] }) {
  return (
    <Stage>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-ink-3 p-6 sm:p-8">
          <p className="font-display text-2xl font-bold text-white">Votre projet</p>
          <ul className="mt-6 space-y-3">
            {items.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.28, duration: 0.5, ease }}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-4 text-[15px] font-medium text-white"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.45 + i * 0.28, type: "spring", stiffness: 400, damping: 20 }}
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sky text-ink"
                >
                  <Check className="size-3.5" strokeWidth={2.6} />
                </motion.span>
                {t}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Stage>
  );
}

/** Étape 2 : une vraie page, relue avec vous : une remarque, une correction, une validation. */
export function SceneDesign() {
  return (
    <Stage>
      <div className="absolute inset-0 flex items-center">
        <BrowserFrame url="azur-plomberie · maquette à valider" className="w-full">
          <div className="relative aspect-[1400/891] overflow-hidden bg-ink-3">
            <Image src="/projects/azur-cover.webp" alt="Une page d'artisan en cours de validation" fill sizes="(max-width: 1024px) 90vw, 620px" className="object-cover object-top" />
            {/* Le bouton dont on parle */}
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0.9] }} transition={{ delay: 0.5, duration: 1.2 }} aria-hidden className="absolute left-[1.8%] top-[72.5%] h-[10.5%] w-[17%] rounded-lg ring-[3px] ring-sky ring-offset-2 ring-offset-transparent" />
            <motion.p initial={{ opacity: 0, y: 12, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.7, duration: 0.45, ease }} className="absolute left-[21%] top-[56%] max-w-[46%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[12px] font-semibold leading-snug text-ink shadow-xl sm:text-sm">
              <span className="block text-[11px] font-bold text-sky-deep">Vous</span>
              On peut le rendre plus visible ?
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 12, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.8, duration: 0.45, ease }} className="absolute left-[36%] top-[77%] max-w-[46%] rounded-2xl rounded-bl-sm bg-sky px-3 py-2 text-[12px] font-semibold leading-snug text-ink shadow-xl sm:text-sm">
              <span className="block text-[11px] font-bold">NEXWORKS</span>
              C&apos;est fait, il passe en rouge.
            </motion.p>
          </div>
        </BrowserFrame>
      </div>
      <motion.div initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 2.9, duration: 0.5, ease }} className="absolute bottom-0 right-3 sm:bottom-3">
        <Pill><Check className="size-3.5" strokeWidth={2.6} /> Maquette validée avec vous</Pill>
      </motion.div>
    </Stage>
  );
}

/** Étape 3 : un vrai site de démonstration, sur ordinateur et sur téléphone. */
export function SceneBuild({ cover, mobile }: { cover: string; mobile: string }) {
  return (
    <Stage>
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }} className="absolute left-0 top-[6%] w-[86%]">
        <BrowserFrame url="solea · site de démonstration">
          <div className="relative aspect-[16/10]">
            <Image src={cover} alt="" fill sizes="(max-width: 1024px) 80vw, 560px" className="object-cover object-top" />
          </div>
        </BrowserFrame>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease }} className="absolute bottom-0 right-0 w-[27%] overflow-hidden rounded-[1.4rem] border-4 border-black shadow-[0_30px_60px_-10px_rgba(0,0,0,0.9)]">
        <div className="relative aspect-[9/18]">
          <Image src={mobile} alt="" fill sizes="180px" className="object-cover object-top" />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.5, ease }} className="absolute bottom-3 left-2">
        <Pill>
          <span className="relative flex size-2"><span className="absolute inset-0 animate-pulse-ring rounded-full bg-ink" /><span className="relative size-2 rounded-full bg-ink" /></span>
          En ligne
        </Pill>
      </motion.div>
    </Stage>
  );
}

/** Étape 4 : ce qu'on vise, illustré sur un exemple, sans promettre de position. */
export function SceneVisible() {
  return (
    <div className="flex aspect-[5/4] w-full flex-col justify-center gap-3 sm:aspect-[4/3]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="rounded-2xl border border-white/10 bg-ink-3 p-4 sm:p-5">
          <p className="text-xs font-bold text-mist">On cherche sur Google : plombier saint-raphaël</p>
          <p className="mt-2 text-[15px] font-bold leading-snug text-sky sm:text-lg">Plombier à Saint-Raphaël : dépannage et fuites | Azur Plomberie</p>
          <p className="mt-1 text-[13px] leading-relaxed text-mist sm:text-sm">Fuite, chauffe-eau, salle de bain. Le prix est annoncé avant les travaux.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease }} className="rounded-2xl border border-white/10 bg-ink-3 p-4 sm:p-5">
          <p className="text-xs font-bold text-mist">On demande à une IA : qui peut réparer une fuite&nbsp;?</p>
          <p className="mt-2 text-[15px] leading-snug text-white sm:text-base">« D&apos;après son site, Azur Plomberie intervient à Saint-Raphaël et à Fréjus pour les fuites et le dépannage. »</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.2, type: "spring", stiffness: 240, damping: 20 }} className="flex items-center gap-3 self-end rounded-2xl bg-sky px-4 py-3 text-ink">
          <Check className="size-5 shrink-0" strokeWidth={2.6} />
          <p className="font-bold leading-tight">Nouvelle demande : fuite sous l&apos;évier à Fréjus</p>
        </motion.div>
        <p className="text-center text-xs text-mist">Exemple sur un artisan fictif. Aucun classement ni aucune citation par une IA ne peut être garanti.</p>
    </div>
  );
}
