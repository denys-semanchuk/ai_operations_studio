// Réalisations publiées sur le site.
//
// Règle : chaque chiffre et chaque phrase ici doit pouvoir se vérifier dans le
// projet du client (dépôt, déploiement, mesures). Pas de chiffre estimé, pas
// de témoignage écrit à la place du client. Si un chiffre change, le corriger
// ici : la page du cas, la liste /realisations, le bloc de l'accueil et le
// sitemap le lisent tous depuis ce fichier.

export type Stat = { value: string; label: string };

export type Realisation = {
  slug: string;
  client: string;
  lieu: string;
  url: string;
  urlLabel: string;
  titre: string;
  resume: string;
  image: { src: string; width: number; height: number };
  stats: Stat[];
  points: string[];
};

export const loger9: Realisation = {
  slug: "loger-9",
  client: "Loger 9",
  lieu: "Agence immobilière à Bagnolet (93)",
  url: "https://loger9.fr",
  urlLabel: "loger9.fr",
  titre: "Le nouveau site de l'agence, en ligne en deux semaines",
  resume:
    "Les annonces de Loger 9 étaient publiées sur un site créé par son réseau de diffusion, pas sur loger9.fr. J'ai construit un nouveau site : les annonces y arrivent sans ressaisie, chaque page permet de prendre rendez-vous, et l'agence modifie son contenu seule.",
  image: { src: "/realisations/loger-9/accueil.webp", width: 1280, height: 853 },
  stats: [
    // Accord du client le 27/08/2026, mise en ligne sur loger9.fr le 10/09/2026.
    { value: "2 sem.", label: "de l'accord à la mise en ligne" },
    // Catalogue au lancement (septembre 2026).
    { value: "48", label: "annonces importées au lancement, sans ressaisie" },
    // PageSpeed Insights, mobile, 31/10/2026.
    { value: "99", label: "sur 100 : note PageSpeed sur mobile" },
    // PageSpeed Insights, mobile, 31/10/2026.
    { value: "100", label: "sur 100 : accessibilité" },
  ],
  points: [
    "Annonces importées depuis la plateforme de diffusion",
    "Prise de rendez-vous sur chaque page",
    "Contenu modifiable par l'agence, sans développeur",
  ],
};

export const realisations: Realisation[] = [loger9];
