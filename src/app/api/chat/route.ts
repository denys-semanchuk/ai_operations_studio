import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `Tu es l'assistant IA d'AI Operations Studio, une entreprise spécialisée dans l'automatisation des opérations immobilières via l'IA.

Informations clés :
- Fondateur : Denys Semanchuk
- Localisation : Bezons, Île-de-France
- Services :
  • IA FAQ & Auto-Replies — 490€/mois (réponses automatiques aux demandes entrantes)
  • Combo Web + IA Agent — 990€/mois (site vitrine + agent IA intégré)
  • Qualification & CRM Sync — 1 490€/mois (qualification leads + injection Airtable/Notion)
- Toutes les offres incluent un audit gratuit de 30 minutes
- Contact : denys@aioperations.studio
- ROI moyen : 10 à 20h économisées par semaine, +25 à 40% de taux de conversion
- Stack technique : n8n, Claude AI, Airtable, Notion, WhatsApp

Règles :
- Réponds TOUJOURS en français
- Sois concis : 2-3 phrases maximum par réponse
- Sois chaleureux et professionnel
- Pour toute question complexe ou spécifique, invite à réserver un audit gratuit de 30 min via la page Contact`;

export async function POST(req: NextRequest) {
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
      { reply: "Désolé, je rencontre un problème technique. Contactez-nous à denys@aioperations.studio !" },
      { status: 200 }
    );
  }
}
