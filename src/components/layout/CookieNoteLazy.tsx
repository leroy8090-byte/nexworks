"use client";

import dynamic from "next/dynamic";

/** Le petit mot sur les cookies n'apparaît qu'après 1,6 s : son code se charge à part, hors du chemin critique de la page. */
export const CookieNoteLazy = dynamic(() => import("./CookieNote").then((m) => m.CookieNote), { ssr: false });
