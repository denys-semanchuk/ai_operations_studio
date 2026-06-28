import { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "À propos | AI Operations Studio",
  description: "Découvrez notre expertise en intégration d'intelligence artificielle, développement Next.js, bases de données Airtable et scénarios complexes n8n.",
  keywords: ["à propos", "Denys Semanchuk", "Bezons", "expertise technique IA", "developpeur Next.js"],
};

export default function AboutPage() {
  return <AboutClient />;
}
