"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Check, Calendar, ArrowRight, MessageSquare, Database, Globe, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useHasMounted } from "@/lib/useHasMounted";

export default function OffresClient() {
  const hasMounted = useHasMounted();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const coreOffers = [
    {
      id: "faq",
      icon: <MessageSquare size={28} className="offer-icon text-gradient" />,
      title: "IA FAQ & Auto-Replies",
      tag: "Idéal premier client",
      price: "1 000 - 1 500 €",
      time: "3-5 jours",
      desc: "Bot FAQ personnalisé, réponses automatiques sur e-mails et messageries, triage et redirection intelligente des demandes entrantes.",
      features: [
        "Base de connaissances personnalisée",
        "Réponses instantanées 24/7",
        "Triage automatique des demandes",
        "Alerte immédiate par e-mail/SMS",
        "Documentation & Prise en main",
      ],
      color: "var(--primary)",
    },
    {
      id: "combo",
      icon: <Globe size={28} className="offer-icon text-gradient" />,
      title: "Combo Web + IA",
      tag: "Le plus populaire",
      price: "1 500 - 2 000 €",
      time: "5-7 jours",
      desc: "Création complète ou refonte de votre site vitrine (Next.js/React) + intégration native de votre assistant virtuel intelligent.",
      features: [
        "Design premium sur-mesure",
        "Hébergement ultra-rapide optimisé SEO",
        "Chatbot IA personnalisé intégré",
        "Formulaire de contact intelligent",
        "Statistiques de visites incluses",
      ],
      color: "var(--secondary)",
    },
    {
      id: "crm",
      icon: <Database size={28} className="offer-icon text-gradient" />,
      title: "Qualification & CRM Sync",
      tag: "Fort ROI commercial",
      price: "1 500 - 2 500 €",
      time: "5-7 jours",
      desc: "Formulaire conversationnel IA interactif. Saisie, qualification automatique des critères (budget, urgence) et injection propre dans Airtable ou Notion.",
      features: [
        "Formulaire intelligent interactif",
        "Extraction automatique des données par IA",
        "Synchronisation immédiate sur Airtable/Notion",
        "Notification instantanée sur Slack ou mobile",
        "Conformité RGPD intégrée",
      ],
      color: "var(--accent)",
    },
    {
      id: "booking",
      icon: <Calendar size={28} className="offer-icon text-gradient" />,
      title: "Booking & Follow-up",
      tag: "Volume élevé de RDV",
      price: "1 500 - 3 000 €",
      time: "5-10 jours",
      desc: "Prise de rendez-vous automatique qualifiée, rappels automatiques (email/SMS), relances intelligentes et suivi post-contact.",
      features: [
        "Calendrier en ligne synchronisé",
        "Confirmation & Rappels de visite automatisés",
        "Workflows de relance après visite",
        "Collecte de retours clients",
        "Diminution de 80% des rendez-vous oubliés",
      ],
      color: "var(--primary)",
    },
  ];

  const faqs = [
    {
      q: "Comment s'effectue l'hébergement de l'agent n8n ?",
      a: "Nous pouvons installer et auto-héberger n8n sur un serveur VPS sécurisé à votre nom (frais minimes de ~5€/mois de VPS) pour vous garantir le contrôle total de vos données, ou utiliser la version n8n Cloud si vous préférez une gestion déléguée.",
    },
    {
      q: "Qu'en est-il du coût des jetons d'API (Claude, OpenAI) ?",
      a: "Les jetons d'API (Tokens) sont à votre charge et facturés à la consommation réelle par Anthropic ou OpenAI. Pour une agence locale standard (100-300 leads/mois), le coût moyen constaté est extrêmement faible, variant entre 5€ et 15€ par mois.",
    },
    {
      q: "Quel accompagnement est inclus lors de la livraison ?",
      a: "Chaque livraison comprend une documentation technique complète, un guide d'utilisation sous format vidéo Notion, ainsi qu'un support de 14 jours après la mise en ligne pour assurer le bon fonctionnement opérationnel.",
    },
    {
      q: "Les données de nos clients sont-elles sécurisées et conformes au RGPD ?",
      a: "Oui. Nous configurons les APIs en mode 'API Enterprise' pour garantir qu'aucune donnée de vos clients n'est utilisée pour entraîner les modèles de langage publics. Vos données de leads transitent de manière cryptée et sécurisée.",
    },
  ];

  return (
    <div className="page-wrapper container">
      {/* Intro */}
      <div className="offres-header">
        <span className="section-label text-gradient">Notre Catalogue</span>
        <h1 className="offres-title font-primary">Des solutions IA adaptées à votre budget</h1>
        <p className="offres-subtitle">
          Intégrez la puissance de l'IA dans vos opérations. Livraison rapide, ROI mesurable et accompagnement inclus.
        </p>
      </div>

      {/* Grid of Core Offers */}
      <div className="offers-grid">
        {coreOffers.map((offer, idx) => (
          <m.div
            key={offer.id}
            initial={hasMounted ? { opacity: 0, y: 40 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card offer-card"
          >
            <div className="offer-card-header">
              <div className="offer-icon-wrapper">{offer.icon}</div>
              <span className="offer-tag" style={{ border: `1px solid ${offer.color}`, color: offer.color }}>
                {offer.tag}
              </span>
            </div>
            
            <h3 className="offer-title">{offer.title}</h3>
            <p className="offer-desc">{offer.desc}</p>
            
            <div className="offer-pricing">
              <div className="offer-price-val">{offer.price}</div>
              <div className="offer-time-val">⏱ Livré en {offer.time}</div>
            </div>

            <div className="offer-divider"></div>

            <ul className="offer-features">
              {offer.features.map((feat, fidx) => (
                <li key={fidx} className="offer-feature-item">
                  <Check size={16} className="feature-check" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <Link href={`/contact?service=${offer.id}`} className="btn btn-secondary offer-btn shine-hover">
              <span>Choisir cette offre</span>
              <ArrowRight size={16} />
            </Link>
          </m.div>
        ))}
      </div>

      {/* Monthly Retainer / Maintenance Offer */}
      <m.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card retainer-card"
      >
        <div className="retainer-badge">Abonnement Récurrent</div>
        <div className="retainer-content">
          <div className="retainer-text">
            <h3 className="retainer-title">Support & Optimisation Mensuelle</h3>
            <p className="retainer-desc">
              Garantissez le bon fonctionnement, mettez à jour votre base de connaissances IA au gré de vos biens immobiliers et optimisez en continu les performances des invites (prompt tuning).
            </p>
          </div>
          <div className="retainer-price-area">
            <div className="retainer-price">150 - 400 € <span className="retainer-period">/ mois</span></div>
            <p className="retainer-conditions">Prélèvement automatique • Sans engagement</p>
            <Link href="/contact?service=support" className="btn btn-primary retainer-btn">
              <span>Souscrire au support</span>
            </Link>
          </div>
        </div>
      </m.div>

      {/* FAQ Accordion Section */}
      <div className="faq-section">
        <span className="section-label text-gradient text-center block">Foire Aux Questions</span>
        <h2 className="faq-title font-primary text-center">Questions Fréquentes</h2>
        
        <div className="faq-accordion-container">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-accordion-item glass">
              <button 
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="faq-question-btn"
                aria-expanded={openFaq === idx}
              >
                <HelpCircle size={18} className="text-gradient" />
                <span className="faq-question-text">{faq.q}</span>
                <span className={`faq-chevron ${openFaq === idx ? "open" : ""}`}>↓</span>
              </button>
              
              <AnimatePresence initial={false}>
                {openFaq === idx && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="faq-answer-container"
                  >
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


