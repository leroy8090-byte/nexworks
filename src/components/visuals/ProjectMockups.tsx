"use client";

/* eslint-disable @next/next/no-img-element */
import { ScaledStage } from "@/components/ui/ScaledStage";
import type { ProjectImages } from "@/data/projects";

/**
 * Aperçu d'un projet : captures réelles du site dans un navigateur et un smartphone.
 * La page défile automatiquement vers le bas puis remonte (ordinateur et téléphone).
 * Images déjà optimisées (webp) dans public/projects : servies telles quelles.
 */

const W = 700;
const H = 440;

const BROWSER_W = 580;
const BROWSER_VIEW_H = 380;
const PHONE_VIEW_W = 138;
const PHONE_VIEW_H = 262;

export function ProjectMockup({ images, label, url }: { images: ProjectImages; label?: string; url: string }) {
  const dh = (images.desktop.height / images.desktop.width) * BROWSER_W;
  const mh = (images.mobile.height / images.mobile.width) * PHONE_VIEW_W;
  // Défile jusqu'à ~88 % de la hauteur pour montrer services, méthode, contact…
  const dScroll = Math.max(0, Math.min(dh - BROWSER_VIEW_H, Math.round(dh * 0.88)));
  const mScroll = Math.max(0, Math.min(mh - PHONE_VIEW_H, Math.round(mh * 0.88)));

  return (
    <ScaledStage width={W} height={H} label={label}>
      <div className="absolute inset-0">
        <div
          className="absolute left-[60px] top-[80px] size-[420px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(85,189,242,.14), transparent)" }}
        />

        {/* Navigateur */}
        <div
          className="absolute left-0 top-0 overflow-hidden rounded-2xl border border-white/15 bg-ink-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.95)]"
          style={{ width: BROWSER_W, height: BROWSER_VIEW_H + 32 }}
        >
          <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-[#14181d] px-3.5">
            <span className="size-[7px] rounded-full bg-white/25" />
            <span className="size-[7px] rounded-full bg-white/25" />
            <span className="size-[7px] rounded-full bg-white/25" />
            <div className="ml-3 flex h-[18px] flex-1 items-center rounded-md bg-white/[0.07] px-2.5 text-[9px] tracking-wide text-mist/80">
              {url}
            </div>
          </div>
          <div className="overflow-hidden" style={{ height: BROWSER_VIEW_H }}>
            <img
              src={images.desktop.src}
              alt=""
              width={images.desktop.width}
              height={images.desktop.height}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="shot-scroll block"
              style={{ width: BROWSER_W, height: dh, ["--scroll" as string]: `-${dScroll}px` }}
            />
          </div>
        </div>

        {/* Smartphone */}
        <div
          className="absolute left-[520px] top-[112px] rounded-[28px] border border-white/25 bg-black p-1.5 shadow-[0_30px_60px_-10px_rgba(0,0,0,.95)]"
          style={{ width: PHONE_VIEW_W + 12, height: PHONE_VIEW_H + 28 }}
        >
          <div className="relative h-full overflow-hidden rounded-[22px] bg-ink">
            <div className="absolute left-1/2 top-1.5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-black/60" />
            <div className="overflow-hidden" style={{ height: PHONE_VIEW_H + 12 }}>
              <img
                src={images.mobile.src}
                alt=""
                width={images.mobile.width}
                height={images.mobile.height}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="shot-scroll block"
                style={{ width: PHONE_VIEW_W, height: mh, animationDelay: "-1.2s", ["--scroll" as string]: `-${mScroll}px` }}
              />
            </div>
          </div>
        </div>
      </div>
    </ScaledStage>
  );
}
