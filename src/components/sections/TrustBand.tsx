const words = ["Design", "Développement", "SEO", "GEO", "Performance"];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: 3 }).flatMap((_, r) =>
        words.map((w) => (
          <li key={`${r}-${w}`} className="flex items-center">
            <span className="px-8 font-display text-sm font-medium uppercase tracking-[0.32em] text-mist sm:px-12">
              {w}
            </span>
            <span className="size-1.5 rotate-45 bg-sky/80" />
          </li>
        )),
      )}
    </ul>
  );
}

export function TrustBand() {
  return (
    <section aria-label="Nos domaines d'expertise" className="relative border-y border-white/[0.07] bg-ink-2/60 py-6">
      <p className="sr-only">Design, développement, SEO, GEO et performance.</p>
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}
