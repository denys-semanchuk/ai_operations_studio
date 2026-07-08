import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import DecorativeEffects from "@/components/DecorativeEffects";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import RouteProgress from "@/components/RouteProgress";
import Analytics from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

// Next.js optimized font loading — eliminates render-blocking @import.
// Weight lists are pared down to what globals.css actually declares for
// each family (verified via `document.fonts` across every route + a full
// grep of every `font-weight` rule in globals.css) — Outfit is only ever
// used at 600/700/800 (buttons, headings, one stat number), Plus Jakarta
// Sans only at 400/500/600/700 (body text). Neither uses 300.
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-primary",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-secondary",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#03050c",
};

export const metadata: Metadata = {
  title: {
    default: "AI Operations Studio | Intégration IA pour l'Immobilier",
    template: "%s | AI Operations Studio",
  },
  description: "Conception, intégration et optimisation de systèmes d'Intelligence Artificielle. Automatisez la qualification de vos leads et la prise de rendez-vous pour votre agence immobilière. Bezons, Île-de-France.",
  keywords: ["AI Operations Studio", "Denys Semanchuk", "automatisation immobilier", "n8n", "Airtable CRM", "Claude AI", "Bezons", "integration IA", "agent immobilier IA"],
  authors: [{ name: "Denys Semanchuk", url: "https://www.ai-operations.studio" }],
  creator: "AI Operations Studio",
  metadataBase: new URL("https://www.ai-operations.studio"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "AI Operations Studio",
    title: "AI Operations Studio | Intégration IA pour l'Immobilier",
    description: "Automatisez vos opérations immobilières grâce aux agents IA autonomes. Gagnez 10 à 20h par semaine.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Operations Studio",
    description: "Automatisez vos opérations immobilières grâce aux agents IA autonomes.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.ai-operations.studio/#organization",
  name: "AI Operations Studio",
  description:
    "Conception, intégration et optimisation de systèmes d'Intelligence Artificielle pour les agences immobilières en Île-de-France.",
  url: "https://www.ai-operations.studio",
  email: "denys@ai-operations.studio",
  logo: "https://www.ai-operations.studio/brand/icon-gradient.png",
  image: "https://www.ai-operations.studio/brand/icon-gradient.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bezons",
    postalCode: "95870",
    addressRegion: "Val-d'Oise",
    addressCountry: "FR",
  },
  founder: { "@type": "Person", name: "Denys Semanchuk" },
  sameAs: ["https://www.linkedin.com/in/denys-semanchuk/"],
  priceRange: "€€",
  openingHours: "Mo-Fr 09:00-18:00",
  areaServed: { "@type": "State", name: "Île-de-France" },
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Faut-il des compétences techniques pour utiliser vos solutions ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Nous gérons l'installation, la configuration et la formation complète. Si vous utilisez WhatsApp, vous pouvez utiliser nos outils.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour mettre en place une automatisation ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'intégration prend généralement 2 à 4 semaines. Nous assurons une transition sans interruption de votre activité.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le retour sur investissement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nos clients gagnent en moyenne 10 à 20 heures par semaine et constatent une augmentation de 25 à 40% de leur taux de conversion dès le premier mois.",
      },
    },
    {
      "@type": "Question",
      name: "L'audit initial est-il vraiment gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, l'audit opérationnel de 30 minutes est 100% gratuit et sans engagement. Nous analysons vos flux actuels et identifions les automatisations les plus rentables.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body>
        {/* Background visual components */}
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-radial" aria-hidden="true" />
        <div className="glow-orb glow-orb-primary" aria-hidden="true" />
        <div className="glow-orb glow-orb-secondary" aria-hidden="true" />
        
        <MotionProvider>
          <RouteProgress />
          <Analytics />

          {/* Shared Layout Structure */}
          <Header />
          <main className="main-content">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />

          {/* Decorative effects + delayed-trigger widgets (chat, cookie
              banner, exit intent, sticky bar, back-to-top) — all deferred
              off the critical path, see NonCriticalWidgets.tsx */}
          <ScrollProgress />
          <DecorativeEffects />
        </MotionProvider>
        <VercelAnalytics />
      </body>
    </html>
  );
}
