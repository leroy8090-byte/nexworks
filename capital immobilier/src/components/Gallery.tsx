"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Photo } from "./Photo";

/** Les photos du bien : une mosaïque en pleine largeur, une bande à balayer sur téléphone, un plein écran au clavier et au doigt. */
export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const n = images.length;
  const prev = useCallback(() => { setDir(-1); setActive((i) => (i - 1 + n) % n); }, [n]);
  const next = useCallback(() => { setDir(1); setActive((i) => (i + 1) % n); }, [n]);
  const show = (i: number, e: React.MouseEvent<HTMLElement>) => { opener.current = e.currentTarget; setActive(i); setOpen(true); };
  useEffect(() => {
    if (!open) return;
    const back = opener.current;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); back?.focus(); };
  }, [open, prev, next]);
  const count = n >= 5 ? 5 : n >= 3 ? 3 : n;
  const layout = count === 5 ? "lg:grid-cols-4 lg:grid-rows-2" : count === 3 ? "lg:grid-cols-3 lg:grid-rows-2" : count === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";
  return (
    <div className="relative">
      <div onScroll={(e) => { const el = e.currentTarget; setSeen(Math.round(el.scrollLeft / el.clientWidth)); }} className={`strip flex h-[56svh] snap-x snap-mandatory gap-1 overflow-x-auto lg:grid lg:h-[74svh] lg:overflow-visible ${layout}`}>
        {images.slice(0, count).map((src, i) => (
          <button key={src} type="button" onClick={(e) => show(i, e)} aria-label={`Agrandir la photo ${i + 1} sur ${n}`} className={`zoom rise relative h-full w-full shrink-0 cursor-zoom-in snap-center overflow-hidden bg-sand lg:w-auto ${i === 0 && count >= 3 ? "lg:col-span-2 lg:row-span-2" : ""}`} style={{ animationDelay: `${i * 90}ms` }}>
            <Photo src={src} alt={`${title}, photo ${i + 1}`} fill preload={i === 0} quality={85} sizes={i === 0 ? "(min-width:1024px) 60vw, 85vw" : "(min-width:1024px) 30vw, 100vw"} className="object-cover" />
          </button>
        ))}
      </div>
      <p aria-hidden className="absolute bottom-4 left-4 bg-night/70 px-3 py-1.5 text-[13.5px] text-white backdrop-blur-sm lg:hidden">{`${Math.min(seen + 1, count)} / ${count}`}</p>
      <button type="button" onClick={(e) => show(0, e)} aria-label={`Voir les ${n} photos en grand`} className="absolute bottom-4 right-4 min-h-11 bg-white px-5 text-[14.5px] text-night transition-colors hover:bg-night hover:text-white">{`${n} photos`}</button>
      <AnimatePresence>
        {open && (
          <m.div role="dialog" aria-modal="true" aria-label={`Galerie : ${title}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[100] flex flex-col bg-night">
            <div className="flex items-center justify-between px-5 py-4 text-white">
              <p className="text-[15px]" aria-live="polite">{active + 1} / {n}</p>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="min-h-11 border border-white/40 px-5 text-[14px] transition-colors hover:bg-white hover:text-night">Fermer</button>
            </div>
            <div className="relative flex-1 overflow-hidden" onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchX.current === null) return; const d = e.changedTouches[0].clientX - touchX.current; if (Math.abs(d) > 50) { if (d < 0) next(); else prev(); } touchX.current = null; }}>
              <AnimatePresence initial={false} custom={dir}>
                <m.div key={images[active]} custom={dir} variants={{ enter: (d: number) => ({ x: `${d * 7}%`, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: `${d * -7}%`, opacity: 0 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
                  <Image src={images[active]} alt={`${title}, photo ${active + 1}`} fill sizes="100vw" quality={85} className="object-contain" />
                </m.div>
              </AnimatePresence>
              {n > 1 && (
                <>
                  <button type="button" onClick={prev} aria-label="Photo précédente" className="absolute left-3 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full bg-white/15 text-xl text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-night">←</button>
                  <button type="button" onClick={next} aria-label="Photo suivante" className="absolute right-3 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full bg-white/15 text-xl text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-night">→</button>
                </>
              )}
            </div>
            <div className="strip flex gap-2 overflow-x-auto px-4 py-3 sm:justify-center">
              {images.map((src, i) => (
                <button key={src} type="button" onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }} aria-label={`Afficher la photo ${i + 1}`} aria-current={i === active} className={`relative h-14 w-20 shrink-0 overflow-hidden transition-opacity duration-300 ${i === active ? "outline outline-1 outline-white" : "opacity-50 hover:opacity-100"}`}>
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
