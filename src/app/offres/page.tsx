import { Metadata } from "next";
import OffresClient from "@/components/OffresClient";

export const metadata: Metadata = {
  title: "Offres & Intégrations IA | AI Operations Studio",
  description: "Découvrez notre catalogue d'intégrations d'intelligence artificielle : bots FAQ, combos Web+IA, qualification de leads Airtable, et automatisation d'agendas.",
  keywords: ["offres IA", "tarifs chatbot", "developpement site immobilier", "Airtable CRM", "n8n"],
};

export default function OffresPage() {
  return <OffresClient />;
}
