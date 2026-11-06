# Audit de capitalimmobilier.fr

Relevé du 06/11/2026, sur les pages autorisées par `robots.txt`. Le site n'a pas été testé avec un compte, et aucun formulaire n'a été envoyé.

## Ce qui existe réellement

| Élément | Constat |
| --- | --- |
| Plateforme | La Boîte Immo (PHP, Apache, thème Foundation, jQuery) |
| Espace copropriétaire | Connexion vers un extranet ICS (`extranet2.ics.fr`), depuis l'en-tête de toutes les pages |
| Annonces | 16 à vendre, 11 à louer, **aucune** location de vacances |
| Recherche | Formulaire présent : type d'offre, localisation, type, surface, prix, pièces, référence |
| Tri et sélection | Tri par prix, pièces, surface ; « Ma sélection » |
| Alertes | Page d'alerte e-mail |
| Honoraires | Barème public : 6 % jusqu'à 150 000 €, 5 % jusqu'à 1 000 000 €, 4 % au-delà |
| Contact | Formulaire avec reCAPTCHA, traité par La Boîte Immo en sous-traitance |

## Activités à conserver

Transaction, location, location de vacances, gestion locative, location-gérance, syndic de petites et moyennes copropriétés, ASL et ASA, démarrage de copropriétés neuves.

Engagements publiés par l'agence : garantie des loyers, compte rendu de gestion mensuel, numéro dédié aux urgences, espace client 24 h/24, salle de réunion pour les assemblées générales.

## Problèmes constatés

**SEO**
- Pas de H1 sur l'accueil ni sur les honoraires.
- Aucune donnée structurée (0 bloc JSON-LD sur les pages testées).
- Titre de page mal orthographié (« Syndicat de compropriété ») et H1 « Syndicat ».
- Pas de meta description sur le syndic, la sélection et les honoraires.
- Plan du site : URL d'annonces avec espaces (`/0-acheter-33234-saint raphael/1`) et doublons.
- Sur les listes, 88 images sur 91 sans texte alternatif (vente), 80 sur 83 (location).

**Crédibilité et conformité**
- Mentions légales vides : raison sociale, RCS, TVA, carte professionnelle, garantie financière, tous non renseignés. **À corriger en priorité par l'agence.**
- Lien Twitter du pied de page mort (404), lien Google+ d'un service fermé.
- Coquille « CAPÏTAL IMMOBILIER » sur la page syndic.
- Référence « 036 » utilisée par deux annonces différentes (Le Cannet et Fayence).
- Code postal de l'agence affiché en 83530 : à faire confirmer.

**Expérience**
- Syndic et gestion locative, deux spécialités, sont de simples listes de texte sans parcours de demande.
- Aucune page d'estimation ni parcours vendeur.
- La page de location de vacances affiche seulement « aucun bien ne correspond ».
- Hiérarchie faible : l'accueil n'explique pas clairement les quatre besoins du visiteur.

## Architecture retenue pour le concept

- **Annonces :** annonces publiques et photos transférées dans `src/data/listings.snapshot.json` et `public/biens`, lues uniquement par `src/lib/listings.ts`. Pour la production, cette fonction se branche sur le flux La Boîte Immo ou l'API de NEXWORKS ESTATE, sans double saisie et sans toucher au reste du site.
- **Formulaires :** envoi par e-mail à une adresse configurée (`RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`). Sans configuration, le formulaire l'annonce et n'affiche aucun faux succès.
- **Espace copropriétaire :** conserver l'accès à l'extranet ICS existant.

## À vérifier

Rien de ce qui suit n'a pu être mesuré depuis l'extérieur : URL générant du trafic (Search Console nécessaire), conditions du flux La Boîte Immo et de l'extranet ICS, droits de réutilisation pour une mise en production. Lighthouse sur le site officiel reste à passer.
