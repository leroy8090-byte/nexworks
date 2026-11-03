"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, prev, next]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Agrandir la photographie"
        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-[#D9CBB7] sm:aspect-[16/10]"
      >
        <Image
          src={images[active]}
          alt={`${title} — photographie ${active + 1}`}
          fill
          priority
          sizes="(min-width:1024px) 66vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
        />
      </button>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Afficher la photographie ${i + 1}`}
            aria-current={i === active}
            className={`relative aspect-[4/3] overflow-hidden bg-[#D9CBB7] transition-opacity ${
              i === active ? "ring-1 ring-[#24251F] ring-offset-2 ring-offset-[#F6F3EC]" : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="160px" className="object-cover" />
          </button>
        ))}
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={`Galerie — ${title}`} className="fixed inset-0 z-[100] flex flex-col bg-[#24251F]/97">
          <div className="flex items-center justify-between px-5 py-4 text-[#FFFEFA]">
            <p className="text-[12px] uppercase tracking-[0.22em]">
              {active + 1} / {images.length}
            </p>
            <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] hover:text-[#D9CBB7]">
              Fermer ✕
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={images[active]} alt={`${title} — photographie ${active + 1}`} fill sizes="100vw" className="object-contain" />
            <button
              type="button"
              onClick={prev}
              aria-label="Photographie précédente"
              className="absolute left-3 top-1/2 size-12 -translate-y-1/2 border border-[#FFFEFA]/40 text-xl text-[#FFFEFA] hover:bg-[#FFFEFA]/10"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Photographie suivante"
              className="absolute right-3 top-1/2 size-12 -translate-y-1/2 border border-[#FFFEFA]/40 text-xl text-[#FFFEFA] hover:bg-[#FFFEFA]/10"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
