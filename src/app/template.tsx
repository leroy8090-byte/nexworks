import type { ReactNode } from "react";

/** Transition d'entrée entre les pages (re-monté à chaque navigation). En CSS : elle ne retarde pas l'affichage. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
