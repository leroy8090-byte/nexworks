"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackLocal } from "@/lib/sierra-client-stats";

function send(payload: Record<string, unknown>) {
  if (payload.type === "page_view") trackLocal({ type: "page_view" });
  if (payload.type === "property_view" && typeof payload.slug === "string") {
    trackLocal({ type: "property_view", slug: payload.slug, title: typeof payload.title === "string" ? payload.title : undefined });
  }
  if (payload.type === "property_click" && typeof payload.slug === "string") {
    trackLocal({ type: "property_click", slug: payload.slug, title: typeof payload.title === "string" ? payload.title : undefined });
  }

  const body = JSON.stringify(payload);
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/sierra-stats", blob);
    return;
  }
  void fetch("/api/sierra-stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export function SierraPageTracker() {
  const pathname = usePathname();
  const last = useRef("");

  useEffect(() => {
    if (!pathname || pathname.includes("/admin") || pathname.includes("/acces")) return;
    if (last.current === pathname) return;
    last.current = pathname;
    send({ type: "page_view", path: pathname });
  }, [pathname]);

  return null;
}

export function SierraPropertyViewTracker({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    send({ type: "property_view", slug, title });
  }, [slug, title]);
  return null;
}

export function trackPropertyClick(slug: string, title: string) {
  send({ type: "property_click", slug, title });
}
