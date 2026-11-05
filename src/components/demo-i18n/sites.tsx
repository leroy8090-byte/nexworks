"use client";

import { DemoLanguage } from "./DemoLanguage";

// Le dictionnaire n'est téléchargé que si le visiteur choisit l'anglais.
const azur = () => import("@/i18n-demo/azur");
const riviera = () => import("@/i18n-demo/riviera");
const volt = () => import("@/i18n-demo/volt");

export const AzurLanguage = () => <DemoLanguage load={azur} />;
export const RivieraLanguage = () => <DemoLanguage load={riviera} />;
export const VoltLanguage = () => <DemoLanguage load={volt} />;
