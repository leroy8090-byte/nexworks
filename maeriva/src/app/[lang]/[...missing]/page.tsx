import { notFound } from "next/navigation";

/** Toute adresse inconnue affiche la page « introuvable » du site, dans la bonne langue, avec l'en-tête et le pied de page. */
export default function Missing() {
  notFound();
}
