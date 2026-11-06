"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Img = { src: string; alt: string };

/** Une grande photo et ses voisines. On ouvre en plein écran, on passe au clavier ou au doigt. */
export function PropertyGallery({ images, title }: { images: Img[]; title: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const n = images.length;
  const prev = useCallback(() => setActive((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setActive((i) => (i + 1) % n), [n]);
  const show = (i: number, e: React.MouseEvent<HTMLElement>) => { opener.current = e.currentTarget; setActive(i); setOpen(true); };

  useEffect(() => {
    if (!open) return;
    const back = opener.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      back?.focus();
    };
  }, [open, prev, next]);

  const side = images.slice(1, 5);
  return (
    <div>
      <div className={`grid gap-2 ${side.length ? "lg:grid-cols-[3fr_2fr]" : ""}`}>
        <button type="button" onClick={(e) => show(0, e)} aria-label={`Voir les ${n} photos en grand`} className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-t-[8rem] bg-[#F0E4CE] sm:rounded-t-[12rem] lg:aspect-auto lg:min-h-[440px]">
          <Image src={images[0].src} alt={images[0].alt} fill preload sizes="(min-width:1024px) 58vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]" />
          <span className="absolute bottom-4 right-4 rounded-full bg-[#FBF7EE]/95 px-4 py-2 text-[14px] font-semibold text-[#0E4F68]">{`Voir les ${n} photos`}</span>
        </button>
        {side.length > 0 && (
          <div className="grid grid-cols-4 gap-2 lg:grid-cols-2">
            {side.map((im, i) => (
              <button key={im.src} type="button" onClick={(e) => show(i + 1, e)} aria-label={`Voir la photo ${i + 2} sur ${n}`} className="group relative aspect-square cursor-zoom-in overflow-hidden bg-[#F0E4CE] lg:aspect-auto">
                <Image src={im.src} alt="" fill sizes="(min-width:1024px) 30vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} role="dialog" aria-modal="true" aria-label={`Galerie : ${title}`} className="fixed inset-0 z-[100] flex flex-col bg-[#0B2A38]/98">
            <div className="flex items-center justify-between px-5 py-4 text-white">
              <p className="text-[15px] font-medium" aria-live="polite">{active + 1} / {n}</p>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/40 px-5 py-2.5 text-[14px] font-semibold hover:bg-white/10">Fermer ✕</button>
            </div>
            <div className="relative flex-1" onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchX.current === null) return; const d = e.changedTouches[0].clientX - touchX.current; if (Math.abs(d) > 50) { if (d < 0) next(); else prev(); } touchX.current = null; }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={active} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }} className="absolute inset-0">
                  <Image src={images[active].src} alt={images[active].alt} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              {n > 1 && (
                <>
                  <button type="button" onClick={prev} aria-label="Photo précédente" className="absolute left-3 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full bg-black/35 text-xl text-white hover:bg-black/60">←</button>
                  <button type="button" onClick={next} aria-label="Photo suivante" className="absolute right-3 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full bg-black/35 text-xl text-white hover:bg-black/60">→</button>
                </>
              )}
            </div>
            <div className="flex justify-center gap-2 overflow-x-auto px-4 py-3">
              {images.map((im, i) => (
                <button key={im.src} type="button" onClick={() => setActive(i)} aria-label={`Afficher la photo ${i + 1}`} aria-current={i === active} className={`relative h-14 w-20 shrink-0 overflow-hidden transition-opacity ${i === active ? "ring-2 ring-white" : "opacity-55 hover:opacity-100"}`}>
                  <Image src={im.src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
