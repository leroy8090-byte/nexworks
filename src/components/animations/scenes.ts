import { GolfeNom } from "./GolfeNom";

/** Les animations jouables, par adresse. « Le défilé » (Defile.tsx) est mis de côté pour l'instant. */
export const SCENES = { "golfe-a-travers-le-nom": GolfeNom } as const;
export type SceneSlug = keyof typeof SCENES;
export const isScene = (slug: string): slug is SceneSlug => slug in SCENES;
