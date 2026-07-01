import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const SERVICE_LABELS: Record<string, string> = {
  faq: "IA FAQ & Auto-Replies",
  combo: "Combo Web + IA Agent",
  crm: "Qualification & CRM Sync",
  booking: "Booking & Automations Relance",
  audit: "Audit opérationnel gratuit",
};

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#39;";
      default: return char;
    }
  });
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json(
      { error: "Trop de demandes envoyées. Réessayez plus tard ou écrivez à denys@aioperations.studio." },
      { status: 429 }
    );
  }

  try {
    const { name, phone, email, service, message, bookedDay, bookedTime } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    const safeBookedDay = escapeHtml(bookedDay);
    const safeBookedTime = escapeHtml(bookedTime);
    const serviceLabel = escapeHtml(SERVICE_LABELS[service] ?? service);

    const bookingInfo = bookedDay && bookedTime
      ? `<p><strong>Créneau choisi :</strong> ${safeBookedDay} à ${safeBookedTime}</p>`
      : "";

    await resend.emails.send({
      from: "AI Operations Studio <onboarding@resend.dev>",
      to: "denys@aioperations.studio",
      replyTo: safeEmail,
      subject: `🎯 Nouvelle demande d'audit — ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #03050c; color: #f8fafc; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
          <h2 style="color: #0ea5e9; margin-top: 0;">Nouvelle demande d'audit opérationnel</h2>
          <table style="width:100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr><td style="padding: 0.6rem 0; color: #64748b; width: 40%;">Nom / Agence</td><td style="padding: 0.6rem 0; font-weight: 600;">${safeName}</td></tr>
            <tr><td style="padding: 0.6rem 0; color: #64748b;">Email</td><td style="padding: 0.6rem 0;"><a href="mailto:${safeEmail}" style="color: #0ea5e9;">${safeEmail}</a></td></tr>
            ${phone ? `<tr><td style="padding: 0.6rem 0; color: #64748b;">Téléphone</td><td style="padding: 0.6rem 0;">${safePhone}</td></tr>` : ""}
            <tr><td style="padding: 0.6rem 0; color: #64748b;">Service souhaité</td><td style="padding: 0.6rem 0; color: #4f46e5; font-weight: 600;">${serviceLabel}</td></tr>
          </table>
          ${bookingInfo}
          ${message ? `<div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; margin-top: 1rem;"><p style="margin: 0; color: #94a3b8; font-size: 0.9rem;">${safeMessage}</p></div>` : ""}
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 1.5rem 0;" />
          <p style="color: #64748b; font-size: 0.8rem; margin: 0;">AI Operations Studio · denys@aioperations.studio</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact route]", err);
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
  }
}
