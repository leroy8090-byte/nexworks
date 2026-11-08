# MAÉRIVA, site de démonstration

Agence immobilière de prestige **fictive**, créée pour le portfolio de NEXWORKS AGENCY.

- Lancer : `cd maeriva && ../node_modules/.bin/next dev -p 3006`, puis http://localhost:3006
- Agence, biens, prix : fictifs. Les faits sur Saint-Tropez, Sainte-Maxime et Saint-Raphaël sont réels.
- Téléphone : 04 65 71 20 26, tranche réservée par l'ARCEP aux œuvres de fiction.
- Photos : Wikimedia Commons, licences libres, crédits dans `src/data/photo-credits.ts` et sur `/credits-photos`. Elles illustrent des types de biens, pas les biens décrits. Les villas célèbres (Ephrussi, Noailles…) ont été écartées.
- Logo : fourni par le propriétaire, détouré dans `public/brand/` (versions bleu nuit et claire).
- Fermé aux moteurs tant que `NEXT_PUBLIC_MAERIVA_LIVE` n'est pas à `1`.
- Formulaires : envoi par Resend si `RESEND_API_KEY`, `CONTACT_FROM` et `CONTACT_TO` sont définis ; sinon le site le dit honnêtement.

## Pour en faire le site d'une vraie agence

1. Remplacer les biens de `src/data/properties.ts` par les vrais (ou les brancher sur le flux du logiciel de l'agence).
2. Mentions légales : carte professionnelle, garantie financière, assurance, barème d'honoraires.
3. Vrais coordonnées, vraies photos, DPE réels.
4. Faire relire la version anglaise par un locuteur natif avant la mise en ligne.

## Deux langues

- Français à la racine (`/proprietes`), anglais sous `/en` avec des adresses traduites (`/en/properties`, `/en/sell`…).
- Toutes les pages vivent dans `src/app/[lang]/` ; `src/proxy.ts` fait la correspondance des adresses ; `src/i18n/config.ts` contient la table des adresses.
- Les textes des pages sont dans chaque fichier (objet `C` ou `T` avec `fr` et `en`) ; l'anglais des données (biens, destinations, services) est dans `src/data/localized.ts`.
- Bouton FR / EN dans l'en-tête : même page dans l'autre langue, recherche conservée. Balises hreflang sur chaque page.
- Les demandes reçues par l'agence restent en français, avec la langue du visiteur.

## Introduction « le golfe à travers le nom »

- Remplace la vidéo d'introduction (supprimée le 2026-11-08, récupérable dans l'historique Git, commit 7308bdd).
- Tout en code, sans vidéo : `src/components/IntroGate.tsx`, styles `.intro-*` et règles `data-intro` dans `globals.css`. Photo : `src/lib/intro.ts` (vue aérienne de la Ponche, `public/photos/ponche-aerien-*.webp`), préchargée par le script du `<head>` quand l'intro va se jouer.
- Déroulé (environ 4 s) : les lettres de MAÉRIVA se remplissent de la photo sur fond blanc (calque blanc en mode « screen »), le nom plonge dans le I jusqu'à ce que la photo remplisse l'écran, la photo se range dans le cadre de la photo d'accueil (`data-hero-frame`) pendant que le titre apparaît, puis s'efface sur la villa.
- Pendant l'intro, `html[data-intro="1"]` met en pause les animations d'entrée de l'accueil ; `data-intro="2"` (photo qui se range) laisse partir le titre ; `data-intro-played` sur le cadre retire son voile blanc et remplace l'apparition de la villa par un simple recul.
- Première visite de l'accueil (français ou anglais) seulement, jamais si moins d'animations ou économie de données ; bouton Passer, touche Échap ; si la photo ou la police tardent plus de 2,5 s, le site s'affiche directement.
- Graisse 600 de Cormorant Garamond chargée pour les lettres (plus épaisses, on voit mieux la photo).
- Pour la rejouer pendant une démo : `http://localhost:3006/?intro` ou `http://localhost:3006/en?intro`