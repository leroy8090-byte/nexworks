"use client";

import { DemoLanguage } from "./DemoLanguage";

// Le dictionnaire n'est téléchargé que si le visiteur choisit l'anglais.
const capital = () => import("@/i18n-demo/capital");

export const CapitalLanguage = () => <DemoLanguage load={capital} />;
