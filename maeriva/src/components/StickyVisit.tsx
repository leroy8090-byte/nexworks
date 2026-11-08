"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Sur une annonce, une fois les photos passées : une barre rappelle le bien, son prix et propose la visite.
 * Elle disparaît quand le formulaire de visite est à l'écran, pour ne jamais faire doublon.
 */
export function StickyVisit({ name, price, cta }: { name: string; price: string; cta: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const form = document.getElementById("visite");
    let past = false, formVisible = false;
    const update = () => setShow(past && !formVisible);
    const onScroll = () => { past = window.scrollY > window.innerHeight * 0.9; update(); };
    const io = form ? new IntersectionObserver(([e]) => { formVisible = e.isIntersecting; update(); }, { threshold: 0.15 }) : null;
    if (form && io) io.observe(form);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); io?.disconnect(); };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <m.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-line bg-white/95 backdrop-blur-md md:block">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-10 py-4 lg:px-16">
            <p className="serif text-[1.5rem] text-ink">{name}<span className="tabular ml-5 font-sans text-[15px] text-muted">{price}</span></p>
            <a href="#visite" className="inline-flex min-h-12 items-center gap-3 bg-ink px-7 text-[11px] font-medium tracking-[0.22em] text-white uppercase transition-colors hover:bg-sea">{cta} <span aria-hidden>→</span></a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
