import { Metadata } from "next";
import BlogClient from "@/components/BlogClient";

export const metadata: Metadata = {
  title: "Blog — Automatisation IA pour l'Immobilier",
  description: "Guides pratiques, cas concrets et stratégies pour automatiser vos opérations immobilières avec n8n, Claude AI et Airtable.",
  keywords: ["blog immobilier IA", "automatisation agence immobilière", "n8n airtable immobilier", "qualification leads automatique"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Automatisation IA pour l'Immobilier",
    description: "Guides pratiques, cas concrets et stratégies pour automatiser vos opérations immobilières avec n8n, Claude AI et Airtable.",
    url: "/blog",
  },
};

export default function Blog() {
  return <BlogClient />;
}
