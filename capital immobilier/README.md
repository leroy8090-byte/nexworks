# CAPITAL IMMOBILIER

Concept de refonte réalisé par NEXWORKS AGENCY, relié au logiciel NEXWORKS ESTATE. Ce projet est séparé du site NEXWORKS AGENCY.

## Lancer en local

```
npm run dev
```

Le site répond sur http://localhost:3003/capital-immobilier. Les biens viennent du logiciel agence (port 3100), qui doit aussi tourner.

Les dépendances sont celles du dossier parent. Pour déployer ce projet seul : retirer `turbopack.root` de `next.config.ts` et lancer `npm install` ici.

## Réglages

Copier `.env.example` vers `.env.local` et renseigner les clés fournies par le logiciel admin.
