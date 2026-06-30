# AI Operations Studio

Site vitrine — conception, intégration et optimisation de systèmes d'Intelligence Artificielle pour les agences immobilières (n8n, Claude AI, Airtable/Notion).

## Stack

- [Next.js](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Framer Motion, Three.js (canvas particles), Lucide icons
- Groq SDK (chat widget) et Resend (formulaire de contact)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Créer un fichier `.env.local` à la racine avec :

```bash
GROQ_API_KEY=
RESEND_API_KEY=
```

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — lance le build de production
- `npm run lint` — ESLint

## Identité visuelle

Les assets de marque (logo, favicons, variantes) se trouvent dans [public/brand](public/brand).
