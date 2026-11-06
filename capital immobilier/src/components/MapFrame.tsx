"use client";

import { saveConsent, useConsent } from "./Cookies";
import { Photo } from "./Photo";

/** La carte de la commune : rien n'est demandé à Google avant l'accord du visiteur. */
export function MapFrame({ query, title, image }: { query: string; title: string; image: string }) {
  const consent = useConsent();
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed&hl=fr`;
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-night">
      {consent?.external
        ? <iframe src={src} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0" />
        : (
          <div className="absolute inset-0 grid place-items-center p-5 text-center text-white">
            <Photo src={image} alt="" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover opacity-40" />
            <div className="relative max-w-md">
              <p className="text-[1.7rem] leading-tight [font-family:var(--font-display)]">La carte attend votre accord.</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/90">Elle est fournie par Google Maps, qui peut déposer des cookies.</p>
              <button type="button" onClick={() => saveConsent(true)} className="mt-4 min-h-11 bg-white px-6 text-[14.5px] font-medium text-night transition-colors hover:bg-sand">Afficher la carte</button>
            </div>
          </div>
        )}
    </div>
  );
}
