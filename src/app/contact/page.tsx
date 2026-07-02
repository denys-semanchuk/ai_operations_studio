import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

const title = "Contact & Audit Gratuit | AI Operations Studio";
const description = "Planifiez un audit gratuit de 30 minutes de vos processus immobiliers à Bezons. Découvrez comment intégrer des agents d'intelligence artificielle.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["contact", "audit gratuit", "Bezons 95870", "AI Operations Studio", "automatisation n8n"],
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
  twitter: { title, description },
};

export default function ContactPage() {
  return <ContactClient />;
}
