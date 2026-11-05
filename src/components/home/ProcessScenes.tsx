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

const Bone = ({ className }: { className: string }) => <div className={`rounded-md ${className}`} />;

/** Étape 2 : la maquette grise prend ses couleurs sous vos yeux. */
export function SceneDesign() {
  return (
    <Stage>
      <div className="absolute inset-0 flex items-center">
        <BrowserFrame url="votre-entreprise.fr · maquette" className="w-full">
          <div className="relative aspect-[16/10]">
            <div className="absolute inset-0 space-y-3 bg-ink-3 p-5 sm:p-8">
              <Bone className="h-4 w-1/4 bg-white/15" />
              <Bone className="mt-6 h-8 w-3/4 bg-white/15" />
              <Bone className="h-8 w-1/2 bg-white/15" />
              <Bone className="h-3 w-2/3 bg-white/10" />
              <div className="grid grid-cols-3 gap-3 pt-5">
                <Bone className="h-20 bg-white/10" />
                <Bone className="h-20 bg-white/10" />
                <Bone className="h-20 bg-white/10" />
              </div>
            </div>
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0 space-y-3 p-5 sm:p-8"
              style={{ background: "linear-gradient(140deg, #0d3550, #0a1017)" }}
            >
              <Bone className="h-4 w-1/4 bg-white" />
              <Bone className="mt-6 h-8 w-3/4 bg-sky" />
              <Bone className="h-8 w-1/2 bg-sky" />
              <Bone className="h-3 w-2/3 bg-white/60" />
              <div className="grid grid-cols-3 gap-3 pt-5">
                <Bone className="h-20 bg-white/15" />
                <Bone className="h-20 bg-sky/40" />
                <Bone className="h-20 bg-white/15" />
              </div>
            </motion.div>
          </div>
        </BrowserFrame>
      </div>
      <motion.div initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.8, duration: 0.5, ease }} className="absolute bottom-2 right-3 sm:bottom-6">
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

/** Étape 4 : ce qu'on vise, illustré sans promettre de position. */
export function SceneVisible() {
  const cards = [
    { title: "Sur Google", lines: ["Votre entreprise · votre ville", "Horaires, services, avis, itinéraire"] },
    { title: "Dans une IA", lines: ["« Voici ce que propose cette entreprise… »", "Des informations claires et cohérentes"] },
  ];
  return (
    <Stage>
      <div className="absolute inset-0 flex flex-col justify-center gap-4">
        {cards.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3, duration: 0.7, ease }} className="rounded-2xl border border-white/10 bg-ink-3 p-5 sm:p-6">
            <p className="text-sm font-bold text-sky">{c.title}</p>
            <p className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">{c.lines[0]}</p>
            <p className="mt-1 text-[15px] text-mist">{c.lines[1]}</p>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.9, type: "spring", stiffness: 240, damping: 20 }} className="self-end rounded-2xl bg-sky px-5 py-4 text-ink">
          <p className="font-display text-lg font-bold">Nouvelle demande de contact</p>
        </motion.div>
        <p className="text-center text-xs text-mist">Illustration. Aucun classement ni aucune citation par une IA ne peut être garanti.</p>
      </div>
    </Stage>
  );
}
