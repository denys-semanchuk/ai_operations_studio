import { Metadata } from "next";
import RoiCalculator from "@/components/RoiClient";

const title = "Simulateur ROI | AI Operations Studio";
const description = "Calculez le temps de travail et l'argent économisés mensuellement par votre agence immobilière en installant nos agents IA autonomes.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["simulateur ROI", "calculateur gain de temps", "AI Operations Studio", "automatisation immobilier", "rentabilité IA"],
  alternates: { canonical: "/roi" },
  openGraph: { title, description, url: "/roi" },
  twitter: { title, description },
};

export default function RoiPage() {
  return <RoiCalculator />;
}
