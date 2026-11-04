"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Img = { src: string; alt: string };

export function PropertyGallery({ images, title }: { images: Img[]; title: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
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
      opener?.focus();
    };
  }, [open, prev, next]);

  return (
    <div>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Agrandir la photographie"
        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-[#E8E0D4] sm:aspect-[16/10]"
      >
        <Image src={images[active].src} alt={images[active].alt} fill priority sizes="(min-width:1024px) 66vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]" />
        <span className="absolute bottom-4 right-4 bg-[#F8F7F3]/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#183B50]">
          Agrandir · {active + 1}/{images.length}
        </span>
      </button>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((im, i) => (
          <button
            key={im.src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Afficher la photographie ${i + 1} sur ${images.length}`}
            aria-current={i === active}
            className={`relative aspect-[4/3] overflow-hidden bg-[#E8E0D4] transition-opacity ${i === active ? "ring-2 ring-[#183B50] ring-offset-2 ring-offset-[#F8F7F3]" : "opacity-65 hover:opacity-100"}`}
          >
            <Image src={im.src} alt="" fill sizes="160px" className="object-cover" />
          </button>
        ))}
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={`Galerie — ${title}`} className="fixed inset-0 z-[100] flex flex-col bg-[#252A2D]/97">
          <div className="flex items-center justify-between px-5 py-4 text-[#F8F7F3]">
            <p className="text-[13px] font-medium tracking-[0.1em]" aria-live="polite">
              {active + 1} / {images.length}
            </p>
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="rounded-full border border-[#F8F7F3]/40 px-5 py-2 text-[13px] font-semibold hover:bg-[#F8F7F3]/10">
              Fermer ✕
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={images[active].src} alt={images[active].alt} fill sizes="100vw" className="object-contain" />
            <button type="button" onClick={prev} aria-label="Photographie précédente" className="absolute left-3 top-1/2 size-12 -translate-y-1/2 rounded-full border border-[#F8F7F3]/40 text-xl text-[#F8F7F3] hover:bg-[#F8F7F3]/10">
              ←
            </button>
            <button type="button" onClick={next} aria-label="Photographie suivante" className="absolute right-3 top-1/2 size-12 -translate-y-1/2 rounded-full border border-[#F8F7F3]/40 text-xl text-[#F8F7F3] hover:bg-[#F8F7F3]/10">
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
