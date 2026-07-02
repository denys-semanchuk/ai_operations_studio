import { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

const title = "À propos | AI Operations Studio";
const description = "Découvrez notre expertise en intégration d'intelligence artificielle, développement Next.js, bases de données Airtable et scénarios complexes n8n.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["à propos", "Denys Semanchuk", "Bezons", "expertise technique IA", "developpeur Next.js"],
  alternates: { canonical: "/a-propos" },
  openGraph: { title, description, url: "/a-propos" },
  twitter: { title, description },
};

export default function AboutPage() {
  return <AboutClient />;
}
