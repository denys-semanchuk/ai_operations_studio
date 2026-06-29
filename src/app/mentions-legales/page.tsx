import { Metadata } from "next";
import MentionsLegalesClient from "@/components/MentionsLegalesClient";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales d'AI Operations Studio — éditeur, hébergeur, propriété intellectuelle, données personnelles.",
  robots: { index: false, follow: false },
};

export default function MentionsLegales() {
  return <MentionsLegalesClient />;
}
