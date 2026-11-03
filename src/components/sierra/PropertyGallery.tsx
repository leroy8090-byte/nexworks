"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setI((v) => (v + 1) % images.length);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, images.length]);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-3">
        <button
          type="button"
          onClick={() => {
            setI(0);
            setOpen(true);
          }}
          className="relative aspect-[4/3] overflow-hidden bg-[#D8C9B5] md:col-span-2 md:aspect-auto md:min-h-[420px]"
        >
          <Image src={images[0]} alt={`${title} — photo principale (démonstration)`} fill sizes="(min-width:768px) 66vw, 100vw" className="object-cover" priority />
        </button>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
          {images.slice(1, 4).map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setI(idx + 1);
                setOpen(true);
              }}
              className="relative aspect-[4/3] overflow-hidden bg-[#D8C9B5]"
            >
              <Image src={src} alt={`${title} — photo ${idx + 2} (démonstration)`} fill sizes="(min-width:768px) 25vw, 33vw" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Galerie photographique" className="fixed inset-0 z-[80] flex items-center justify-center bg-[#222421]/92 p-4">
          <button type="button" aria-label="Fermer" onClick={() => setOpen(false)} className="absolute right-5 top-5 text-[#FCFBF8]">
            Fermer
          </button>
          <button
            type="button"
            aria-label="Image précédente"
            onClick={() => setI((v) => (v - 1 + images.length) % images.length)}
            className="absolute left-4 text-[#FCFBF8] sm:left-8"
          >
            ←
          </button>
          <div className="relative h-[70vh] w-full max-w-5xl">
            <Image src={images[i]} alt={`${title} — vue ${i + 1}`} fill sizes="100vw" className="object-contain" />
          </div>
          <button type="button" aria-label="Image suivante" onClick={() => setI((v) => (v + 1) % images.length)} className="absolute right-4 text-[#FCFBF8] sm:right-8">
            →
          </button>
        </div>
      )}
    </>
  );
}
