import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Conception, Intégration & Optimisation IA",
  description: "Nous automatisons vos opérations immobilières à Bezons et en Île-de-France grâce aux agents IA autonomes (n8n, Airtable, Claude). Gagnez 10 à 20h par semaine.",
  keywords: ["AI Operations Studio", "Denys Semanchuk", "automatisation immobilier", "n8n", "Airtable CRM", "Claude AI", "Bezons", "integration IA"],
};

export default function Home() {
  return <HomeClient />;
}
