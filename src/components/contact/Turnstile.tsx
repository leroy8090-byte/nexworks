"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/i18n/lang";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loading: Promise<TurnstileApi> | null = null;

function loadScript(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile")));
    s.onerror = () => {
      loading = null;
      reject(new Error("turnstile"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

/**
 * Vérification anti-robot Cloudflare Turnstile. Le script n'est chargé que lorsque `active` passe à vrai
 * (au premier clic dans le formulaire) : il ne pèse donc rien sur l'ouverture de la page.
 * `resetKey` : changer sa valeur relance la vérification (jeton déjà utilisé ou expiré).
 */
export function Turnstile({
  siteKey,
  lang,
  active,
  resetKey,
  onToken,
  onUnavailable,
}: {
  siteKey: string;
  lang: Lang;
  active: boolean;
  resetKey: number;
  onToken: (token: string) => void;
  onUnavailable: () => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const cb = useRef({ onToken, onUnavailable });
  cb.current = { onToken, onUnavailable };

  useEffect(() => {
    if (!active || !box.current) return;
    let alive = true;
    const el = box.current;
    loadScript()
      .then((api) => {
        if (!alive) return;
        widget.current = api.render(el, {
          sitekey: siteKey,
          theme: "dark",
          size: "flexible",
          language: lang,
          callback: (t: string) => cb.current.onToken(t),
          "expired-callback": () => cb.current.onToken(""),
          "error-callback": () => cb.current.onUnavailable(),
        });
      })
      .catch(() => alive && cb.current.onUnavailable());
    return () => {
      alive = false;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [active, siteKey, lang]);

  useEffect(() => {
    if (widget.current) {
      window.turnstile?.reset(widget.current);
      cb.current.onToken("");
    }
  }, [resetKey]);

  return <div ref={box} className="min-h-[65px]" />;
}
