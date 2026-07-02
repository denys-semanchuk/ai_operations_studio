import { Metadata } from "next";
import MentionsLegalesClient from "@/components/MentionsLegalesClient";

export const metadata: Metadata = {
  title: "Mentions Légales | AI Operations Studio",
  description: "Mentions légales d'AI Operations Studio — éditeur, hébergeur, propriété intellectuelle, données personnelles.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: false },
};

export default function MentionsLegales() {
  return <MentionsLegalesClient />;
}
