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

## Introduction vidéo

- Vidéo fournie par le propriétaire (`Downloads/maeriva_intro_HD_sans_son.mp4`, 60 images/s), coupée de 0,05 s à 3,41 s : la fin montrait une fausse version du site.
- `public/intro/maeriva-intro.mp4` (1920 × 1080, 60 i/s, qualité CRF 20, 6 Mo) et `public/intro/maeriva-intro-mobile.mp4` (cadrage vertical 810 × 1080 pris au centre de l'image pleine résolution, 30 i/s, 1,9 Mo, choisie sur téléphone).
- Entrée dans l'écran adoucie à l'encodage : zoom centré de 3,07 s à la fin (courbe en S, jusqu'à ×1,16) qui fait sortir le cadre de l'écran avant le passage au blanc ; netteté légère (unsharp). Filtre ffmpeg : `scale` avec `eval=frame` puis `crop` dont la position est calculée depuis la même courbe (sinon le zoom part du coin haut gauche).
- Passage au site : `public/intro/intro-logo.png` est le logo découpé dans la dernière image. Il se pose exactement sur celui de la vidéo (positions `LOGO_HD` et `LOGO_MOBILE` dans `IntroGate.tsx`, à remesurer si la vidéo change), la vidéo s'efface, le logo rejoint celui de l'en-tête, et les animations d'entrée de l'accueil attendent la fin de la vidéo.
- Lancée par `src/components/IntroGate.tsx` : première visite de l'accueil (français ou anglais) seulement, jamais si moins d'animations ou économie de données ; bouton Passer, touche Échap ; si la lecture ne démarre pas en 4 s, le site s'affiche directement.
- Pour la rejouer pendant une démo : `http://localhost:3006/?intro` ou `http://localhost:3006/en?intro`