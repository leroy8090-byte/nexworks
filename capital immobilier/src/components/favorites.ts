"use client";

import { useSyncExternalStore } from "react";

const KEY = "capital-favoris";
const listeners = new Set<() => void>();
const EMPTY: string[] = [];
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

export function toggleFavorite(id: string) {
  const cur = read();
  cache = cur.includes(id) ? cur.filter((r) => r !== id) : [...cur, id];
  try { window.localStorage.setItem(KEY, JSON.stringify(cache)); } catch {}
  listeners.forEach((l) => l());
}

/** Les favoris restent dans le navigateur du visiteur : rien n'est envoyé. */
export function useFavorites() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
