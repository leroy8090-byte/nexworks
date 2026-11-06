"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SEEN = "capital-intro";

/** Avant l'affichage : une seule ouverture par visite, et aucune si le visiteur limite les animations. */
export const INTRO_SCRIPT = `(function(){try{if(sessionStorage.getItem("${SEEN}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="off"}catch(e){}})()`;

/** Tout est en CSS : même sans JavaScript, le rideau s'ouvre. La page se charge dessous, sans rien attendre. */
export function Intro() {
  const [gone, setGone] = useState(false);
  const end = () => { document.documentElement.dataset.intro = "off"; setGone(true); };
  useEffect(() => {
    try { window.sessionStorage.setItem(SEEN, "1"); } catch {}
    const t = setTimeout(end, 1550);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div aria-hidden className="intro" onClick={end}>
      <span className="intro-top" />
      <span className="intro-bottom" />
      <div className="intro-logo">
        <Image src="/media/logo-stacked-light.png" alt="" width={969} height={718} preload sizes="(min-width:640px) 400px, 56vw" className="h-auto w-[56vw] max-w-[400px]" />
        <span className="intro-line" />
      </div>
    </div>
  );
}
