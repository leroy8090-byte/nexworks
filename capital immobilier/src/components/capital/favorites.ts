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
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      fn();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

export function toggleFavorite(ref: string) {
  const cur = read();
  const next = cur.includes(ref) ? cur.filter((r) => r !== ref) : [...cur, ref];
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Navigation privée : le favori reste valable jusqu'à la fermeture de la page.
  }
  listeners.forEach((l) => l());
}

/** Les favoris restent dans le navigateur du visiteur : rien n'est envoyé. */
export function useFavorites() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
