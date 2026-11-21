import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const SYSTEM_PROMPT = `Tu es l'assistant IA d'AI Operations Studio, une entreprise spécialisée dans l'automatisation des opérations immobilières via l'IA.

Informations clés :
- Fondateur : Denys Semanchuk
- Localisation : Bezons, Île-de-France
- Cible : agences immobilières indépendantes de 3 à 15 agents en Île-de-France
- Offre unique, le Système Lead → Mandat (détail sur /systeme) :
  • Mise en place — à partir de 2 000 €, une fois : site agence rapide pensé pour Google avec annonces importées automatiquement, toutes les demandes (site, portails) au même endroit, réponse automatique en quelques minutes (SMS, WhatsApp, e-mail), tri vendeur/acheteur/curieux, rendez-vous d'estimation dans l'agenda de l'agent, relances automatiques jusqu'au mandat
  • Accompagnement mensuel — de 800 à 1 500 €/mois selon les modules : le système tourne et est amélioré chaque mois, nouvelles automatisations, référencement local (Google Business Profile, pages par ville), rapport mensuel
- TVA non applicable (art. 293 B du CGI) : le prix affiché est le prix payé.
- On démarre toujours par un audit gratuit. Le prix exact se confirme après l'audit.
- Ne propose jamais d'autres offres ou d'autres tarifs que ceux-ci.
- Contact : denys@ai-operations.studio
- ROI moyen : 10 à 20h économisées par semaine, +25 à 40% de taux de conversion
- Stack technique : n8n, Claude AI, Airtable, Notion, WhatsApp

Règles :
- Réponds TOUJOURS en français
- Sois concis : 2-3 phrases maximum par réponse
- Sois chaleureux et professionnel
- Pour toute question complexe ou spécifique, invite à réserver un audit gratuit de 30 min via la page Contact`;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(`chat:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json(
      { reply: "Trop de messages envoyés. Réessayez dans une heure ou contactez-nous à denys@ai-operations.studio." },
      { status: 429 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages invalides" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-8),
      ],
      max_tokens: 200,
      temperature: 0.6,
    });

    const reply = completion.choices[0]?.message?.content ?? "Désolé, une erreur s'est produite. Veuillez nous contacter directement.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Désolé, je rencontre un problème technique. Contactez-nous à denys@ai-operations.studio !" },
      { status: 200 }
    );
  }
}
