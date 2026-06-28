import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact & Audit Gratuit | AI Operations Studio",
  description: "Planifiez un audit gratuit de 30 minutes de vos processus immobiliers à Bezons. Découvrez comment intégrer des agents d'intelligence artificielle.",
  keywords: ["contact", "audit gratuit", "Bezons 95870", "AI Operations Studio", "automatisation n8n"],
};

export default function ContactPage() {
  return <ContactClient />;
}
