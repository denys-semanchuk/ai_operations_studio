import { Metadata } from "next";
import DemoSimulator from "@/components/DemoClient";

export const metadata: Metadata = {
  title: "Simulateur de Lead IA | AI Operations Studio",
  description: "Testez notre simulateur d'agent conversationnel IA en temps réel. Découvrez comment n8n qualifie les prospects immobiliers et met à jour Airtable.",
  keywords: ["simulateur de lead", "demo chatbot", "n8n chatbot", "qualification de prospects", "AI Operations Studio"],
};

export default function DemoPage() {
  return <DemoSimulator />;
}
