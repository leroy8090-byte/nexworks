"use client";

import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** Code promo easter egg — à mentionner dans le formulaire de contact. */
export const CAT_PROMO_CODE = "MIAOU15";

const CATCH_DISTANCE = 36;
/** Vitesse constante du chat, en pixels par seconde (indépendante de la souris). */
const CAT_SPEED = 160;
const STORAGE_KEY = "nexworks-cat-caught";

/**
 * Chat qui court après le curseur. S’il l’attrape, un pop-up propose un code promo.
 * Désactivé sur tactile, et si l’utilisateur préfère réduire les animations.
 */
export function CursorCat() {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);
  /** Chat terminé pour de bon (ne revient plus). */
  const [done, setDone] = useState(false);
  /** Pop-up code promo (une seule fois). */
  const [showPromo, setShowPromo] = useState(false);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [copied, setCopied] = useState(false);

  const x = useMotionValue(-80);
  const y = useMotionValue(-80);

  const mouse = useRef({ x: 0, y: 0, moving: false });
  const cat = useRef({ x: -80, y: -80 });
  const nearSince = useRef<number | null>(null);
  const lastFace = useRef(0);
  const lastTs = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    setReady(true);
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let already = false;
    try {
      already = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (!fine || reduce || already) {
      if (already) setDone(true);
      return;
    }
    setEnabled(true);
  }, []);

  const closePromo = () => setShowPromo(false);

  useEffect(() => {
    if (!showPromo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePromo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPromo]);

  useEffect(() => {
    if (!enabled || done) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, moving: true };
      window.clearTimeout((onMove as unknown as { t?: number }).t);
      (onMove as unknown as { t?: number }).t = window.setTimeout(() => {
        mouse.current.moving = false;
      }, 90);
    };

    const tick = (ts: number) => {
      if (!lastTs.current) lastTs.current = ts;
      // Cap pour éviter un grand saut si l’onglet a été mis en pause
      const dt = Math.min(0.05, (ts - lastTs.current) / 1000);
      lastTs.current = ts;

      const mx = mouse.current.x;
      const my = mouse.current.y;
      let cx = cat.current.x;
      let cy = cat.current.y;
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.hypot(dx, dy);

      // Poursuite à vitesse fixe : ni accélération, ni lien avec la vitesse de la souris
      if (dist > 0.5) {
        const step = Math.min(dist, CAT_SPEED * dt);
        cx += (dx / dist) * step;
        cy += (dy / dist) * step;
        cat.current = { x: cx, y: cy };
        x.set(cx);
        y.set(cy);
      }

      if (Math.abs(dx) > 4 && Date.now() - lastFace.current > 120) {
        setFacing(dx >= 0 ? 1 : -1);
        lastFace.current = Date.now();
      }

      if (dist < CATCH_DISTANCE && !mouse.current.moving) {
        if (nearSince.current == null) nearSince.current = Date.now();
        else if (Date.now() - nearSince.current > 320) {
          setDone(true);
          setShowPromo(true);
          setEnabled(false);
          try {
            localStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
          nearSince.current = null;
          cancelAnimationFrame(raf.current);
          return;
        }
      } else {
        nearSince.current = null;
      }

      raf.current = requestAnimationFrame(tick);
    };

    lastTs.current = 0;
    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      lastTs.current = 0;
    };
  }, [enabled, done, x, y]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(CAT_PROMO_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  if (!ready || (!enabled && !showPromo)) return null;

  return createPortal(
    <>
      {enabled && !done && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[80] -ml-7 -mt-6 will-change-transform"
          style={{ x, y }}
        >
          <CatSvg facing={facing} />
        </motion.div>
      )}

      <AnimatePresence>
        {showPromo && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cat-promo-title"
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/75 backdrop-blur-sm"
              aria-label="Fermer"
              onClick={closePromo}
            />
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/12 bg-ink-2 p-7 shadow-[0_40px_100px_-20px_rgba(0,0,0,.9)] sm:p-8"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full"
                style={{ background: "radial-gradient(closest-side, rgba(85,189,242,.28), transparent)" }}
                aria-hidden
              />
              <div className="relative flex items-start gap-4">
                <span className="mt-0.5 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-sky/25 bg-sky/10">
                  <CatSvg facing={1} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky">Easter egg</p>
                  <h2 id="cat-promo-title" className="mt-2 font-display text-2xl font-semibold text-white">
                    Le chat a croqué votre curseur
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist">
                    En récompense, voici un code promo à indiquer dans votre message de contact&nbsp;:
                  </p>
                </div>
              </div>

              <div className="relative mt-6 flex items-center justify-between gap-3 rounded-2xl border border-sky/30 bg-sky/[0.08] px-4 py-3.5">
                <code className="font-display text-xl font-semibold tracking-[0.18em] text-sky sm:text-2xl">
                  {CAT_PROMO_CODE}
                </code>
                <button
                  type="button"
                  onClick={copyCode}
                  className="shrink-0 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:border-sky/50 hover:text-sky"
                >
                  {copied ? "Copié" : "Copier"}
                </button>
              </div>
              <p className="relative mt-3 text-xs leading-relaxed text-mist/80">
                Mentionnez <span className="text-white/90">{CAT_PROMO_CODE}</span> dans le formulaire :&nbsp;
                −15&nbsp;% sur une première prestation (création ou refonte de site).
              </p>

              <div className="relative mt-7 flex flex-wrap gap-3">
                <a
                  href="/contact?objet=devis"
                  className="inline-flex items-center justify-center rounded-full bg-sky px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-sky-bright"
                >
                  Contacter NEXWORKS
                </a>
                <button
                  type="button"
                  onClick={closePromo}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/30 hover:text-white"
                >
                  Continuer à naviguer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}

function CatSvg({ facing }: { facing: 1 | -1 }) {
  return (
    <svg
      width="56"
      height="48"
      viewBox="0 0 56 48"
      fill="none"
      className="drop-shadow-[0_8px_18px_rgba(0,0,0,.55)]"
      style={{ transform: `scaleX(${facing})` }}
    >
      {/* Corps */}
      <ellipse cx="28" cy="30" rx="16" ry="11" fill="#1a222b" stroke="#55bdf2" strokeWidth="1.4" />
      {/* Tête */}
      <circle cx="40" cy="20" r="10" fill="#1a222b" stroke="#55bdf2" strokeWidth="1.4" />
      {/* Oreilles */}
      <path d="M32 14 L34.5 5 L38.5 12.5 Z" fill="#1a222b" stroke="#55bdf2" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M42 12.5 L46.5 4.5 L49 14 Z" fill="#1a222b" stroke="#55bdf2" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M33.2 12.2 L34.6 7.2 L36.8 11.5 Z" fill="#55bdf2" opacity="0.55" />
      <path d="M43.2 11.8 L45.8 6.5 L47.2 12.5 Z" fill="#55bdf2" opacity="0.55" />
      {/* Yeux */}
      <ellipse cx="38" cy="19.5" rx="2.1" ry="2.6" fill="#55bdf2" />
      <ellipse cx="44.5" cy="19.5" rx="2.1" ry="2.6" fill="#55bdf2" />
      <circle cx="38.5" cy="19" r="0.7" fill="#050505" />
      <circle cx="45" cy="19" r="0.7" fill="#050505" />
      {/* Nez / bouche */}
      <path d="M41 22.2 L42.2 23.4 L43.4 22.2" stroke="#a7adb5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      {/* Queue */}
      <path
        d="M13 30 C8 24, 6 18, 10 12"
        stroke="#55bdf2"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Pattes */}
      <ellipse cx="20" cy="39" rx="3.2" ry="2.2" fill="#12161b" stroke="#55bdf2" strokeWidth="1" />
      <ellipse cx="28" cy="40" rx="3.2" ry="2.2" fill="#12161b" stroke="#55bdf2" strokeWidth="1" />
      <ellipse cx="35" cy="39" rx="3.2" ry="2.2" fill="#12161b" stroke="#55bdf2" strokeWidth="1" />
    </svg>
  );
}
