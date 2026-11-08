import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import type { Lang } from "@/i18n/lang";
import { animationsFor, animPhoto, shownPhotoCredits } from "./data";
import { anxSerif } from "./font";
import { LivePreview } from "./LivePreview";
import { isScene } from "./scenes";
import "./animations.css";

/** Aperçu fixe, en CSS, de chaque animation (la vraie se lance en plein écran) */
function Preview({ slug }: { slug: string }) {
  if (slug === "golfe-a-travers-le-nom") {
    return (
      <div className="relative grid h-full place-items-center bg-white">
        <span className="anx-serif bg-cover bg-center bg-clip-text text-[clamp(2.6rem,7vw,5.4rem)] leading-none font-semibold tracking-[0.06em] text-transparent" style={{ backgroundImage: `url(${animPhoto("ponche-aerien", 1280)})` }}>MAÉRIVA</span>
        <span className="anx-caps absolute bottom-[22%] text-[8.5px] tracking-[0.42em] text-[#141619]/60">Golfe de Saint-Tropez</span>
      </div>
    );
  }
  return <div className="h-full bg-white" />;
}

/**
 * Section « Animations d'entrée » de la page du service Design & UX/UI :
 * les types d'animation d'ouverture que l'on conçoit, chacun à lancer en plein écran.
 */
const T = {
  fr: {
    eyebrow: "Animations d'entrée",
    title: "La première impression, *mise en scène.*",
    text: "Une animation d'ouverture installe l'univers d'une marque en quelques secondes, puis s'efface pour laisser place au contenu. Chacune est conçue sur mesure : courte, fluide sur téléphone, et facile à passer d'un clic. Voici les types d'animation que nous proposons, à lancer en plein écran.",
    launchAria: (name: string) => `Lancer l'animation « ${name} » en plein écran`,
    fullscreen: "Plein écran",
    live: "Aperçu animé",
    launch: "Lancer en plein écran",
    duration: "Durée",
    madeFor: "Conçue pour",
    fits: "Convient à",
    moreTitle: "D'autres types d'animation viendront s'ajouter.",
    moreText: "Chaque animation peut être adaptée à votre marque : votre nom, vos photos, vos couleurs.",
    credit: "Exemple réalisé pour MAÉRIVA, site de démonstration d'une agence fictive. Photographies libres de droits (Wikimedia Commons) :",
  },
  en: {
    eyebrow: "Entry animations",
    title: "The first impression, *staged.*",
    text: "An opening animation sets the tone of a brand in a few seconds, then fades away to leave room for the content. Each one is custom-designed: short, smooth on a phone, and easy to skip with one click. Here are the types of animation we offer, to launch full screen.",
    launchAria: (name: string) => `Launch the animation “${name}” full screen`,
    fullscreen: "Full screen",
    live: "Animated preview",
    launch: "Launch full screen",
    duration: "Duration",
    madeFor: "Designed for",
    fits: "Suited to",
    moreTitle: "More types of animation will be added.",
    moreText: "Every animation can be adapted to your brand: your name, your photos, your colours.",
    credit: "Example created for MAÉRIVA, the demonstration website of a fictional agency. Royalty-free photographs (Wikimedia Commons):",
  },
};

export function AnimationShowcase({ lang = "fr" }: { lang?: Lang }) {
  const t = T[lang];
  const animations = animationsFor(lang);
  return (
    <section id="animations" className={`${anxSerif.variable} scroll-mt-24 pb-20 pt-4 sm:pb-28`}>
      <Container>
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          text={t.text}
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {animations.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
                <Link href={`/animations/${a.slug}`} className="relative block aspect-[16/10] overflow-hidden border-b border-white/10" aria-label={t.launchAria(a.name)}>
                  <div className="anx-preview h-full">{isScene(a.slug) ? <LivePreview slug={a.slug} poster={<Preview slug={a.slug} />} /> : <Preview slug={a.slug} />}</div>
                  <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-[#141619]/85 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">{t.fullscreen} <ArrowRight className="size-3.5" /></span>
                  <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#141619] px-3 py-1.5 text-[11px] font-medium text-white">0{i + 1}<span className="inline-flex items-center gap-1.5 text-white/70"><span className="size-1.5 animate-pulse rounded-full bg-[#4fd18b]" aria-hidden />{t.live}</span></span>
                </Link>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">{a.name}</h3>
                  <p className="mt-3 leading-relaxed text-mist">{a.pitch}</p>
                  <ol className="mt-6 space-y-2.5 text-sm leading-relaxed text-mist">
                    {a.steps.map((s, k) => <li key={k} className="flex gap-3"><span className="font-display text-white/40 tabular-nums">{k + 1}.</span>{s}</li>)}
                  </ol>
                  <dl className="mt-6 grid gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-sm sm:grid-cols-[auto_1fr]">
                    <dt className="text-white/45">{t.duration}</dt><dd className="text-white">{a.duration}</dd>
                    <dt className="text-white/45">{t.madeFor}</dt><dd className="text-white">{a.madeFor}</dd>
                    <dt className="text-white/45">{t.fits}</dt><dd className="text-white">{a.fits}</dd>
                  </dl>
                  <Link href={`/animations/${a.slug}`} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">
                    {t.launch} <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.12}>
            <div className="flex h-full min-h-56 flex-col justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
              <p className="font-display text-lg font-semibold text-white">{t.moreTitle}</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mist">{t.moreText}</p>
            </div>
          </Reveal>
        </div>
        <p className="mt-10 text-xs leading-relaxed text-white/60">
          {t.credit}{" "}
          {shownPhotoCredits().map((c, k) => (
            <span key={c.file}>
              {k > 0 && " ; "}
              <a href={c.page} className="underline decoration-white/20 underline-offset-2 hover:text-white" rel="noopener noreferrer" target="_blank">{c.title}</a>, {c.author},{" "}
              <a href={c.licenseUrl} className="underline decoration-white/20 underline-offset-2 hover:text-white" rel="noopener noreferrer" target="_blank">{c.license}</a>
            </span>
          ))}
          .
        </p>
      </Container>
    </section>
  );
}
