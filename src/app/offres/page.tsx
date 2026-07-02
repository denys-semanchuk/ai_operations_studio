import { Metadata } from "next";
import OffresClient from "@/components/OffresClient";

const title = "Offres & Intégrations IA | AI Operations Studio";
const description = "Découvrez notre catalogue d'intégrations d'intelligence artificielle : bots FAQ, combos Web+IA, qualification de leads Airtable, et automatisation d'agendas.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["offres IA", "tarifs chatbot", "developpement site immobilier", "Airtable CRM", "n8n"],
  alternates: { canonical: "/offres" },
  openGraph: { title, description, url: "/offres" },
  twitter: { title, description },
};

export default function OffresPage() {
  return <OffresClient />;
}
