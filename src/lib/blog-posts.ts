export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  tag: "Tutoriel" | "Étude de cas" | "Comparatif";
  readTime: string;
  date: string;
  comingSoon: boolean;
  body?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "automatiser-qualification-leads-immobilier",
    title: "5 étapes pour automatiser la qualification de vos leads immobiliers avec n8n",
    excerpt:
      "Un prospect non rappelé dans les 15 premières minutes a beaucoup plus de chances de choisir une autre agence. Voici comment configurer un workflow n8n qui qualifie, répond et injecte en CRM sans intervention humaine.",
    tag: "Tutoriel",
    readTime: "8 min",
    date: "12 juin 2025",
    comingSoon: false,
    body: [
      "La plupart des agences immobilières perdent des mandats non pas faute de biens à proposer, mais faute de rapidité de réponse. Un formulaire de contact rempli un samedi soir, un message WhatsApp envoyé pendant que l'agent est en visite, un lead Facebook capté à 22h : dans l'immobilier, le premier qui répond avec une question pertinente est souvent celui qui décroche le rendez-vous.",
      "Automatiser la qualification ne veut pas dire remplacer l'agent — cela veut dire que le prospect n'attend jamais, et que l'agent ne récupère que des contacts déjà triés, avec les bonnes informations en CRM.",
      "## 1. Centraliser les points d'entrée",
      "Avant de qualifier quoi que ce soit, il faut que toutes les sources de leads (formulaire du site, WhatsApp Business, Messenger, portails comme SeLoger ou Leboncoin) arrivent dans un point unique. Avec n8n, cela passe par des webhooks : chaque source pousse son événement vers un workflow central, plutôt que de laisser chaque canal isolé dans sa propre boîte mail.",
      "## 2. Extraire les critères avec un modèle de langage",
      "Une fois le message reçu, un nœud d'appel à un modèle de langage (Claude, par exemple) analyse le texte libre du prospect pour en extraire les critères structurés : type de bien recherché, budget, secteur, statut (acheteur, locataire, vendeur), urgence. Contrairement à un formulaire rigide, cette étape fonctionne même si le prospect écrit en langage naturel — ce qui est le cas la majorité du temps sur WhatsApp ou Messenger.",
      "## 3. Poser les questions manquantes automatiquement",
      "Si des informations clés manquent (budget non précisé, secteur flou), le workflow renvoie une relance automatique et personnalisée au prospect pour les obtenir, avant même qu'un agent humain n'intervienne. C'est cette étape qui fait gagner le plus de temps : l'agent ne perd plus 10 minutes au téléphone à poser des questions basiques.",
      "## 4. Scorer et prioriser le lead",
      "Tous les prospects ne se valent pas. Un lead avec un budget cohérent, un secteur clair et un besoin urgent doit remonter en haut de la pile. Le workflow applique une grille de score simple (complétude des critères, budget, délai) et classe automatiquement chaque lead avant de le transmettre.",
      "## 5. Synchroniser le CRM et notifier l'agent",
      "Dernière étape : la fiche complète (coordonnées, critères, score, historique d'échange) est injectée directement dans Airtable ou Notion, et une notification part vers l'agent concerné par SMS ou Slack — avec juste ce qu'il faut d'information pour rappeler immédiatement, sans ressaisie manuelle.",
      "## Ce que cela change concrètement",
      "Le résultat de ce type de workflow n'est pas un gadget technologique : c'est la suppression du délai entre la demande d'un prospect et sa prise en charge par un humain. C'est ce délai, plus que n'importe quel autre facteur, qui détermine si un lead se transforme en visite ou part chez un concurrent.",
      "Si vous voulez voir à quoi ressemble ce type de workflow en conditions réelles sur un cas type acheteur/locataire/vendeur, notre page démo en propose une reconstitution illustrative.",
    ],
  },
  {
    slug: "roi-automatisation-agence-immobiliere",
    title: "Comment estimer le ROI de l'automatisation IA pour une petite agence immobilière",
    excerpt:
      "Avant d'investir dans l'automatisation, il faut savoir sur quoi elle agit réellement : temps administratif, délai de réponse, taux de transformation. Voici la méthode pour construire votre propre estimation, avec vos vrais chiffres.",
    tag: "Étude de cas",
    readTime: "6 min",
    date: "28 mai 2025",
    comingSoon: false,
    body: [
      "Beaucoup d'agences hésitent à automatiser leurs process parce que le retour sur investissement leur semble flou ou surestimé par les prestataires du secteur. C'est une réserve saine : mieux vaut une estimation prudente basée sur vos propres chiffres qu'une promesse marketing générique.",
      "## Les trois leviers qui génèrent réellement du ROI",
      "L'automatisation IA dans une agence immobilière agit sur trois choses mesurables, et seulement trois : le temps passé sur des tâches répétitives (relances, FAQ, saisie CRM), la vitesse de première réponse à un prospect, et le taux de transformation lead → visite → mandat/vente.",
      "## 1. Chiffrer le temps administratif actuel",
      "La première étape n'est pas technique, elle est comptable : combien d'heures par semaine chaque agent passe-t-il à répondre aux mêmes questions (disponibilité, horaires de visite, documents à fournir), à relancer des prospects sans réponse, ou à ressaisir des informations dans le CRM ? Ce chiffre se mesure en observant une semaine type, pas en l'estimant à la louche.",
      "## 2. Isoler ce qui est réellement automatisable",
      "Toutes les tâches ne se valent pas. Répondre à une question de FAQ ou qualifier un premier contact est hautement automatisable. Négocier un mandat ou rassurer un vendeur hésitant ne l'est pas — et ne doit pas l'être. Une estimation de ROI honnête sépare clairement les deux catégories plutôt que de prétendre tout automatiser.",
      "## 3. Relier délai de réponse et taux de transformation",
      "C'est le levier le plus difficile à chiffrer précisément, car il dépend de votre marché local. Mais le principe reste constant dans l'immobilier : un prospect qui reçoit une réponse pertinente en quelques minutes a statistiquement plus de chances de rester engagé qu'un prospect qui attend plusieurs heures. Pour construire une estimation prudente, on part généralement d'une hypothèse basse (quelques points de conversion supplémentaires), pas d'un chiffre choc.",
      "## 4. Construire une estimation avec vos données, pas des moyennes sectorielles",
      "Notre simulateur ROI permet de faire ce calcul avec vos propres paramètres (nombre d'agents, heures actuellement consacrées aux tâches répétitives, taux horaire, volume de leads mensuels). Le résultat reste une estimation indicative — nous le précisons directement dans l'outil — mais elle a l'avantage d'être construite sur votre activité réelle plutôt que sur une moyenne nationale qui ne veut pas dire grand-chose pour une agence de 2 ou 3 personnes.",
      "## Ce qu'on mesure ensuite, une fois en place",
      "La vraie validation du ROI n'est pas le calcul initial, c'est le suivi après intégration : nombre d'heures effectivement libérées, délai de réponse moyen avant/après, taux de conversion sur les leads traités par le système. C'est ce suivi, fait avec vous semaine après semaine, qui remplace la promesse par un chiffre vérifié.",
    ],
  },
  {
    slug: "connecter-airtable-whatsapp-n8n",
    title: "Connecter WhatsApp Business à votre CRM Airtable via n8n : les principes clés",
    excerpt:
      "WhatsApp est devenu le canal de contact préféré des prospects immobiliers, mais rares sont les agences qui le relient à leur CRM. Voici les briques techniques nécessaires pour faire le pont, sans dépendre d'un développeur permanent.",
    tag: "Tutoriel",
    readTime: "10 min",
    date: "14 mai 2025",
    comingSoon: false,
    body: [
      "Pour une agence immobilière indépendante, WhatsApp Business est souvent le canal où arrivent le plus de messages entrants — et le moins bien suivi. Contrairement à un formulaire de site, un message WhatsApp n'atterrit dans aucun CRM par défaut : il reste dans l'application, sans trace structurée, et dépend entièrement de la mémoire de l'agent qui l'a reçu.",
      "## Pourquoi WhatsApp pose un problème structurel",
      "Le souci n'est pas WhatsApp en tant que canal — c'est un excellent canal, rapide et informel, adapté à l'immobilier. Le problème est l'absence de pont vers un outil de suivi. Sans automatisation, chaque conversation WhatsApp est une île : aucune vue d'ensemble sur qui a été recontacté, quel bien a été proposé, ou où en est chaque prospect.",
      "## Les briques nécessaires",
      "Techniquement, relier WhatsApp Business à un CRM comme Airtable repose sur trois éléments : l'API officielle WhatsApp Business (via un fournisseur agréé Meta), un outil d'orchestration comme n8n qui reçoit les messages entrants et les événements, et une base Airtable structurée pour stocker les fiches prospects et l'historique des échanges.",
      "## Le principe du workflow",
      "Chaque message entrant sur WhatsApp Business déclenche un webhook reçu par n8n. Le contenu du message est analysé (nouveau contact ou conversation existante), la fiche prospect est créée ou mise à jour dans Airtable, et selon le contenu du message, une réponse automatique peut partir immédiatement (accusé de réception, question de qualification) pendant qu'une notification arrive à l'agent concerné.",
      "## Ce qui doit rester manuel",
      "Un point important : l'automatisation ne doit pas simuler une conversation humaine indéfiniment. Elle sert à qualifier et à ne jamais laisser un message sans accusé de réception — la prise de rendez-vous, la négociation et le closing restent du ressort de l'agent. Un système qui essaie de « faire semblant » d'être humain trop longtemps finit par créer de la friction plutôt que d'en supprimer.",
      "## Sécurité et conformité",
      "Ce type d'intégration implique de manipuler des données personnelles de prospects (numéros de téléphone, échanges). Il est nécessaire de passer par l'API officielle WhatsApp Business (pas par des solutions non officielles qui violent les conditions d'utilisation de Meta et risquent un bannissement du numéro), et de s'assurer que la base Airtable respecte les principes du RGPD applicables à votre activité.",
      "## Mise en place",
      "La configuration initiale (compte API WhatsApp Business, structure Airtable, workflow n8n) demande une phase de paramétrage technique. C'est précisément ce que nous prenons en charge lors de l'intégration : vous n'avez pas besoin de compétences techniques préalables, seulement de votre numéro WhatsApp Business existant et de votre façon actuelle de qualifier un prospect.",
    ],
  },
  {
    slug: "choisir-crm-agence-immobiliere-2025",
    title: "Airtable vs Notion vs HubSpot : quel CRM choisir pour votre agence en 2025 ?",
    excerpt:
      "Comparatif complet des trois solutions les plus utilisées par les petites agences immobilières françaises. Critères : coût, automatisation, facilité d'adoption.",
    tag: "Comparatif",
    readTime: "7 min",
    date: "À venir",
    comingSoon: true,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && !p.comingSoon);
}
