import { Metadata } from "next";
import DemoSimulator from "@/components/DemoClient";

const title = "Simulateur de Lead IA | AI Operations Studio";
const description = "Testez notre simulateur d'agent conversationnel IA en temps réel. Découvrez comment n8n qualifie les prospects immobiliers et met à jour Airtable.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["simulateur de lead", "demo chatbot", "n8n chatbot", "qualification de prospects", "AI Operations Studio"],
  alternates: { canonical: "/demo" },
  openGraph: { title, description, url: "/demo" },
  twitter: { title, description },
};

export default function DemoPage() {
  return <DemoSimulator />;
}
