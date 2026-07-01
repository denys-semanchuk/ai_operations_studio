# AI Operations Studio

Site vitrine — conception, intégration et optimisation de systèmes d'Intelligence Artificielle pour les agences immobilières (n8n, Claude AI, Airtable/Notion).

## Stack

- [Next.js](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Framer Motion, Canvas 2D (particles), Lucide icons
- Groq SDK (chat widget) et Resend (formulaire de contact)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner les clés :

```bash
GROQ_API_KEY=
RESEND_API_KEY=
```

## Déploiement (Vercel)

Le projet est un Next.js standard, déployable sans configuration (`vercel.json`) supplémentaire.

- **Local** : `vercel link` puis `vercel env pull` pour récupérer `.env.local` depuis le projet Vercel.
- **Preview** : chaque push sur une branche non-production (ou chaque PR) déclenche un déploiement Preview avec une URL dédiée.
- **Production** : un push/merge sur `main` déploie en production (domaine `aioperations.studio`).

Les variables `GROQ_API_KEY` et `RESEND_API_KEY` doivent être renseignées séparément dans le dashboard Vercel (Project Settings → Environment Variables) pour les environnements **Preview** et **Production** — elles ne sont pas partagées automatiquement depuis `.env.local`.

> Note : le rate-limiting des routes `/api/chat` et `/api/contact` ([src/lib/rateLimit.ts](src/lib/rateLimit.ts)) est en mémoire (`Map`). Sur Vercel, chaque invocation serverless peut atterrir sur une instance différente, donc la limite n'est pas garantie de façon stricte entre régions/instances — elle réduit l'abus basique mais ne remplace pas une solution partagée (ex. Vercel KV/Upstash) si un trafic plus élevé est attendu.

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — lance le build de production
- `npm run lint` — ESLint

## Identité visuelle

Les assets de marque (logo, favicons, variantes) se trouvent dans [public/brand](public/brand).
