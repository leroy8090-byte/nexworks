"use client";

import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE } from "./Motion";
import { Photo } from "./Photo";
import { Icon } from "./ui";

type Img = { src: string; alt: string };

/** Mosaïque de photos ; un clic ouvre la visionneuse plein écran (flèches, Échap, glisser au doigt). */
const T = {
  fr: { enlarge: (i: number, n: number, alt: string) => `Agrandir la photo ${i} sur ${n} : ${alt}`, zoom: "Agrandir", photos: "Photos", close: "Fermer", prev: "Photo précédente", next: "Photo suivante" },
  en: { enlarge: (i: number, n: number, alt: string) => `Enlarge photo ${i} of ${n}: ${alt}`, zoom: "Enlarge", photos: "Photos", close: "Close", prev: "Previous photo", next: "Next photo" },
};

export function PropertyGallery({ images, name, lang = "fr" }: { images: Img[]; name: string; lang?: "fr" | "en" }) {
  const t = T[lang];
  const [open, setOpen] = useState<number | null>(null);
  const last = useRef<HTMLButtonElement | null>(null);
  const close = useCallback(() => { setOpen(null); last.current?.focus(); }, []);
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);
  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [open, close, go]);
  const touch = useRef(0);

  // La grande photo à gauche, les autres complètent la grille sans laisser de trou, quel que soit leur nombre.
  const n = images.length;
  const span = (i: number) => (i === 0 || n === 2 ? "sm:col-span-2 sm:row-span-2" : (n === 3 || (n === 4 && i === 3)) ? "sm:col-span-2" : "");
  return (
    <>
      <div className="grid auto-rows-[46svh] gap-3 sm:auto-rows-[30svh] sm:grid-cols-4 lg:auto-rows-[34svh]">
        {images.map((im, i) => (
          <m.button key={im.src} type="button" onClick={(e) => { last.current = e.currentTarget; setOpen(i); }} aria-label={t.enlarge(i + 1, images.length, im.alt)}
            
            className={`group relative overflow-hidden bg-paper ${span(i)}`}>
            <Photo src={im.src} alt={im.alt} fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]" />
            <span aria-hidden className="absolute right-4 bottom-4 bg-white px-3 py-1.5 text-[10px] tracking-[0.2em] text-ink uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">{t.zoom}</span>
          </m.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <m.div role="dialog" aria-modal="true" aria-label={`${t.photos} : ${name}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="fixed inset-0 z-[90] bg-white text-ink"
            onTouchStart={(e) => { touch.current = e.touches[0].clientX; }} onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1); }}>
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 sm:p-8">
              <p className="tabular text-[12px] tracking-[0.24em] uppercase">{String(open + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</p>
              <button type="button" autoFocus onClick={close} aria-label={t.close} className="grid size-12 place-items-center rounded-full border border-ink/20 bg-white transition-colors hover:bg-ink hover:text-white"><Icon name="close" /></button>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.figure key={open} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.55, ease: EASE }} className="absolute inset-x-4 top-24 bottom-24 sm:inset-x-24">
                <Photo src={images[open].src} alt={images[open].alt} fill sizes="100vw" className="object-contain" />
                <figcaption className="absolute inset-x-0 -bottom-14 text-center text-[14px] text-muted">{images[open].alt}</figcaption>
              </m.figure>
            </AnimatePresence>
            {images.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label={t.prev} className="absolute top-1/2 left-3 grid size-12 -translate-y-1/2 rotate-180 place-items-center rounded-full border border-ink/20 bg-white transition-colors hover:bg-ink hover:text-white sm:left-8"><Icon name="arrow" /></button>
                <button type="button" onClick={() => go(1)} aria-label={t.next} className="absolute top-1/2 right-3 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-ink/20 bg-white transition-colors hover:bg-ink hover:text-white sm:right-8"><Icon name="arrow" /></button>
              </>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
