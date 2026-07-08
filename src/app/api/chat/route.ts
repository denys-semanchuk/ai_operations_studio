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
- Services (installation ponctuelle + abonnement de maintenance mensuel 150-400€/mois) :
  • IA FAQ & Auto-Replies — 1 000 à 1 500€ (réponses automatiques aux demandes entrantes)
  • Combo Web + IA Agent — 1 500 à 2 000€ (site vitrine + agent IA intégré)
  • Qualification & CRM Sync — 1 500 à 2 500€ (qualification leads + injection Airtable/Notion)
  • Booking & Follow-up — 1 500 à 3 000€ (prise de RDV automatique + relances)
- Toutes les offres incluent un audit gratuit de 30 minutes. Ces tarifs sont indicatifs — le devis exact dépend du besoin, à confirmer lors de l'audit.
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
