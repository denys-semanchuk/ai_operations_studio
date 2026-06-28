import { Metadata } from "next";
import RoiCalculator from "@/components/RoiClient";

export const metadata: Metadata = {
  title: "Simulateur ROI | AI Operations Studio",
  description: "Calculez le temps de travail et l'argent économisés mensuellement par votre agence immobilière en installant nos agents IA autonomes.",
  keywords: ["simulateur ROI", "calculateur gain de temps", "AI Operations Studio", "automatisation immobilier", "rentabilité IA"],
};

export default function RoiPage() {
  return <RoiCalculator />;
}
