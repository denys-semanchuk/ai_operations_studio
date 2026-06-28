"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, ArrowRight, MessageSquare, Database, Globe, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function OffresClient() {
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
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 40 }}
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
          </motion.div>
        ))}
      </div>

      {/* Monthly Retainer / Maintenance Offer */}
      <motion.div 
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
      </motion.div>

      {/* FAQ Accordion Section */}
      <div className="faq-section">
        <span className="section-label text-gradient text-center block">Foire Aux Questions</span>
        <h2 className="faq-title font-primary text-center">Questions Fréquentes</h2>
        
        <div className="faq-accordion-container">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-accordion-item glass">
              <button 
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
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="faq-answer-container"
                  >
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {styleOffers}
    </div>
  );
}

const styleOffers = (
  <style jsx global>{`
    .offres-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .offres-title {
      font-size: 2.75rem;
      color: white;
      margin-top: 0.5rem;
      margin-bottom: 1.25rem;
    }
    .offres-subtitle {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .offers-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin-bottom: 3.5rem;
    }
    .offer-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .offer-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .offer-icon-wrapper {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .offer-tag {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.35rem 0.75rem;
      border-radius: 99px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .offer-title {
      font-size: 1.5rem;
      color: white;
      margin-bottom: 0.75rem;
    }
    .offer-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }
    .offer-pricing {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .offer-price-val {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--secondary);
    }
    .offer-time-val {
      font-size: 0.9rem;
      color: var(--text-dim);
      font-weight: 500;
    }
    .offer-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.06);
      margin-bottom: 1.5rem;
    }
    .offer-features {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }
    .offer-feature-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      color: var(--foreground);
    }
    .feature-check {
      color: #10b981;
      flex-shrink: 0;
    }
    .offer-btn {
      width: 100%;
      margin-top: auto;
    }
    
    /* Retainer section */
    .retainer-card {
      background: linear-gradient(135deg, rgba(15, 20, 45, 0.7) 0%, rgba(5, 8, 22, 0.7) 100%);
      border: 1px solid rgba(99, 102, 241, 0.2);
      padding: 2.5rem;
      margin-bottom: 3.5rem;
    }
    .retainer-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent);
      background: rgba(217, 70, 239, 0.1);
      border: 1px solid rgba(217, 70, 239, 0.25);
      padding: 0.35rem 0.75rem;
      border-radius: 99px;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .retainer-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      align-items: center;
    }
    .retainer-title {
      font-size: 1.75rem;
      color: white;
      margin-bottom: 1rem;
    }
    .retainer-desc {
      color: var(--text-muted);
      line-height: 1.7;
      font-size: 1rem;
    }
    .retainer-price-area {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
      border-left: 1px solid rgba(255, 255, 255, 0.08);
      padding-left: 3rem;
    }
    .retainer-price {
      font-size: 2rem;
      font-weight: 800;
      color: white;
    }
    .retainer-period {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-muted);
    }
    .retainer-conditions {
      font-size: 0.8rem;
      color: var(--text-dim);
    }
    .retainer-btn {
      width: 100%;
      margin-top: 0.5rem;
    }
    
    /* FAQ Accordion */
    .faq-section {
      padding: 2rem 0;
      max-width: 800px;
      margin: 0 auto;
    }
    .faq-title {
      font-size: 2.25rem;
      color: white;
      margin-top: 0.5rem;
      margin-bottom: 2rem;
    }
    .faq-accordion-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .faq-accordion-item {
      overflow: hidden;
      border-radius: 12px;
      background: rgba(10, 16, 35, 0.3);
      border-color: rgba(255, 255, 255, 0.04);
      transition: all 0.3s ease;
    }
    .faq-accordion-item:hover {
      border-color: rgba(14, 165, 233, 0.2);
    }
    .faq-question-btn {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 1rem;
      background: none;
      border: none;
      padding: 1.25rem 1.5rem;
      cursor: pointer;
      color: white;
      text-align: left;
    }
    .faq-question-text {
      font-size: 1.05rem;
      font-weight: 600;
      flex-grow: 1;
    }
    .faq-chevron {
      color: var(--text-dim);
      font-size: 0.9rem;
      transition: transform 0.3s ease;
    }
    .faq-chevron.open {
      transform: rotate(180deg);
      color: var(--secondary);
    }
    .faq-answer-container {
      overflow: hidden;
    }
    .faq-answer-content {
      padding: 0 1.5rem 1.5rem 2.75rem;
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
    }
    .block {
      display: block;
    }

    @media (max-width: 900px) {
      .offers-grid {
        grid-template-columns: 1fr;
      }
      .retainer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .retainer-price-area {
        border-left: none;
        padding-left: 0;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding-top: 2rem;
        width: 100%;
      }
    }

    @media (max-width: 600px) {
      .offres-title {
        font-size: 1.9rem;
      }
      .offres-subtitle {
        font-size: 1rem;
      }
      .offer-title {
        font-size: 1.25rem;
      }
      .offer-price-val {
        font-size: 1.3rem;
      }
      .retainer-card {
        padding: 1.75rem !important;
      }
      .retainer-title {
        font-size: 1.35rem;
      }
      .retainer-price {
        font-size: 1.6rem;
      }
      .retainer-btn {
        width: 100%;
      }
      .faq-title {
        font-size: 1.75rem;
        margin-bottom: 1.5rem;
      }
      .faq-question-text {
        font-size: 0.95rem;
      }
      .faq-question-btn {
        padding: 1rem;
        gap: 0.75rem;
      }
      .faq-answer-content {
        padding: 0 1rem 1rem 2.5rem;
      }
    }
  `}</style>
);
