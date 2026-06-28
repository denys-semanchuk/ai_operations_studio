import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import CursorGlow from "@/components/CursorGlow";
import ChatWidget from "@/components/ChatWidget";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CookieBanner from "@/components/CookieBanner";

// Next.js optimized font loading — eliminates render-blocking @import
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-primary",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  authors: [{ name: "Denys Semanchuk", url: "https://aioperations.studio" }],
  creator: "AI Operations Studio",
  metadataBase: new URL("https://aioperations.studio"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "AI Operations Studio",
    title: "AI Operations Studio | Intégration IA pour l'Immobilier",
    description: "Automatisez vos opérations immobilières grâce aux agents IA autonomes. Gagnez 10 à 20h par semaine.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Operations Studio",
    description: "Automatisez vos opérations immobilières grâce aux agents IA autonomes.",
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Background visual components */}
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-radial" aria-hidden="true" />
        <div className="glow-orb glow-orb-primary" aria-hidden="true" />
        <div className="glow-orb glow-orb-secondary" aria-hidden="true" />
        
        <ThreeBackground />
        <CursorGlow />
        
        {/* Shared Layout Structure */}
        <Header />
        <main style={{ minHeight: "calc(100vh - 200px)", position: "relative", zIndex: 1 }}>
          {children}
        </main>
        <Footer />

        {/* Interactive overlays */}
        <ScrollProgress />
        <ChatWidget />
        <BackToTop />
        <CookieBanner />
      </body>
    </html>
  );
}
