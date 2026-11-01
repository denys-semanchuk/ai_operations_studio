import { Metadata } from "next";
import SystemeClient from "@/components/SystemeClient";

const title = "Système Lead → Mandat pour agences immobilières";
const description =
  "Chaque demande reçoit une réponse en quelques minutes, chaque vendeur est relancé jusqu'au mandat. Site, réponse automatique, tri, rendez-vous et relances pour les agences d'Île-de-France. À partir de 2 000 €.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["système lead mandat", "agence immobilière", "réponse automatique leads", "relance vendeurs", "mandat immobilier", "Île-de-France"],
  alternates: { canonical: "/systeme" },
  openGraph: { title, description, url: "/systeme" },
  twitter: { title, description },
};

export default function SystemePage() {
  return <SystemeClient />;
}
