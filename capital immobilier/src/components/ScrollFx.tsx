import { Photo } from "./Photo";

/** Un texte qui se remplit mot à mot, au rythme du défilement. Sans prise en charge du navigateur, il s'affiche simplement. */
export function ScrollText({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={`${w}${i}`}><span className={dark ? "ink-word ink-word-dark" : "ink-word"} style={{ "--o": `${(i % 14) * 1.3}%` } as React.CSSProperties}>{w}</span>{" "}</span>
      ))}
    </>
  );
}

const PLACES = ["Saint-Raphaël", "Fréjus", "Agay", "Boulouris", "Anthéor", "Valescure", "Santa Lucia"];

/** Des textes géants qui glissent en sens inverse quand on descend. Décor : les vrais liens sont dans la page. */
export function GiantMarquee() {
  const row = [...PLACES, ...PLACES, ...PLACES];
  const line = (cls: string, outline?: boolean) => (
    <p className={`${cls} whitespace-nowrap text-[3.6rem] font-bold uppercase leading-[1.08] tracking-[-0.03em] sm:text-[8.5rem] [font-family:var(--font-display)] ${outline ? "text-outline" : "text-night"}`}>
      {row.map((n, i) => <span key={`${n}${i}`}>{n}<span className="mx-5 text-sea sm:mx-10">●</span></span>)}
    </p>
  );
  return <div aria-hidden className="select-none space-y-1 overflow-hidden bg-white py-14 sm:py-24">{line("glide-left")}{line("glide-right", true)}</div>;
}

const COLS = [
  { cls: "col-up", images: ["calanque", "basilique", "agay", "port-soir"] },
  { cls: "col-down", images: ["agay-roches", "saint-raphael-port", "corniche", "santa-lucia"] },
  { cls: "col-up-fast", images: ["ile-or", "vieux-port", "antheor", "massif-esterel"] },
];

/** Trois colonnes de photos du secteur, à des vitesses différentes, avec un grand titre par-dessus. */
export function PhotoColumns({ title }: { title: string }) {
  return (
    <section className="relative isolate h-[125svh] overflow-hidden bg-night">
      <div className="absolute inset-x-0 -top-[35%] -z-10 grid grid-cols-2 gap-2 px-2 sm:gap-3 sm:px-3 md:grid-cols-3">
        {COLS.map((c, k) => (
          <div key={c.cls} className={`${c.cls} ${k === 2 ? "hidden md:block" : ""} space-y-2 sm:space-y-3`}>
            {c.images.map((n) => (
              <div key={n} className="relative aspect-[4/5] overflow-hidden bg-ink-soft">
                <Photo src={`/media/${n}.webp`} alt="" fill sizes="(min-width:768px) 33vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <span aria-hidden className="absolute inset-0 -z-10 bg-night/45" />
      <div className="absolute inset-0 grid place-items-center px-5 text-center">
        <h2 className="max-w-6xl text-[2.9rem] leading-[0.98] text-white sm:text-[6.4rem]">{title}</h2>
      </div>
    </section>
  );
}
