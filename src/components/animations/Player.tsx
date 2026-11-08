"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { servicePath } from "@/i18n/lang";
import { useLang } from "@/i18n/use-lang";
import { SCENES, type SceneSlug } from "./scenes";


/** Lance une animation en plein écran ; à la fin, une barre discrète propose de la rejouer (ou touche R). */
export function Player({ slug, name }: { slug: SceneSlug; name: string }) {
  const lang = useLang();
  const [run, setRun] = useState(0);
  const [ended, setEnded] = useState(false);
  const replay = () => { setEnded(false); setRun((r) => r + 1); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key.toLowerCase() === "r" && !e.metaKey && !e.ctrlKey) replay(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Scene = SCENES[slug];
  return (
    <div className="anx-stage">
      <Scene key={run} onDone={() => setEnded(true)} />
      <div className={`absolute bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-black/10 bg-white/90 p-1 text-[12px] font-medium text-[#141619] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[opacity,translate] duration-500 ${ended ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
        <Link href={`${servicePath(lang, "design-ux")}#animations`} className="rounded-full px-4 py-2.5 transition-colors hover:bg-black/5">{lang === "en" ? "← Back" : "← Retour"}</Link>
        <span className="hidden px-2 text-black/45 sm:inline">{name}</span>
        <button type="button" onClick={replay} className="rounded-full bg-[#141619] px-4 py-2.5 text-white transition-colors hover:bg-black">{lang === "en" ? "Replay ↻" : "Rejouer ↻"}</button>
      </div>
    </div>
  );
}
