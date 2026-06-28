"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, Shield, Zap, TrendingUp, CheckCircle, Clock, ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";
import TiltCard from "@/components/TiltCard";

export default function HomeClient() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const statCards = [
    {
      icon: <Clock className="stat-icon text-gradient" size={32} />,
      value: "10 à 20h",
      label: "Temps gagné par semaine",
      desc: "Libérez vos agents des tâches répétitives pour qu'ils se concentrent sur la vente.",
    },
    {
      icon: <Zap className="stat-icon text-gradient" size={32} />,
      value: "< 5 min",
      label: "Temps de réponse initial",
      desc: "Qualifiez vos leads 24h/24, 7j/7, dès qu'ils soumettent une demande.",
    },
    {
      icon: <TrendingUp className="stat-icon text-gradient" size={32} />,
      value: "+30%",
      label: "Taux de conversion lead",
      desc: "Ne perdez plus aucun contact grâce aux relances automatisées intelligentes.",
    },
  ];

  const partners = [
    "Bezons Immo",
    "Parisian Estates",
    "Val-d'Oise Transaction",
    "Orpi Bezons",
    "Century 21 Bezons",
    "Nexity Local",
  ];

  const testimonials = [
    {
      name: "Jean-Marc Dubois",
      role: "Directeur, Bezons Immobilier",
      text: "Denys a automatisé notre qualification de locataires. Nous économisons 15 heures par semaine et nos candidats reçoivent une réponse structurée en moins de 3 minutes.",
      rating: "★★★★★",
    },
    {
      name: "Sophie Martin",
      role: "Fondatrice, Paris Invest",
      text: "L'intégration de n8n et Claude a radicalement transformé notre suivi commercial. Plus aucun e-mail entrant ne reste sans réponse pendant le week-end.",
      rating: "★★★★★",
    },
    {
      name: "Marc Levêque",
      role: "Gérant, Val-d'Oise Transaction",
      text: "La structure Airtable connectée au site web nous a permis de nous affranchir d'outils CRM lourds et onéreux. C'est simple, rapide et entièrement sur-mesure.",
      rating: "★★★★★",
    },
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="page-wrapper container">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero"
      >
        <motion.div variants={itemVariants} className="hero-badge">
          <Bot size={14} className="badge-icon" />
          <span>L'excellence opérationnelle par l'IA</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="hero-title font-primary">
          Nous automatisons vos <br />
          <span className="text-gradient">opérations immobilières</span> grâce à l'IA
        </motion.h1>
        
        <motion.p variants={itemVariants} className="hero-subtitle">
          Conception, intégration et optimisation de systèmes d'Intelligence Artificielle.
          Capter, qualifiez et synchronisez vos leads immobiliers instantanément dans votre CRM.
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-actions">
          <Link href="/offres" className="btn btn-primary shine-hover">
            <span>Découvrir nos offres</span>
            <ArrowRight size={18} />
          </Link>
          <Link href="/roi" className="btn btn-secondary">
            <span>Estimer votre ROI</span>
          </Link>
        </motion.div>
      </motion.section>

      {/* Partners Marquee */}
      <div className="partners-marquee-section">
        <h4 className="marquee-title">ILS FONT CONFIANCE À NOS SOLUTIONS IA :</h4>
        <div className="marquee-container glass">
          <div className="marquee-track">
            {/* First cycle */}
            {partners.map((partner, idx) => (
              <div key={`p1-${idx}`} className="partner-logo">
                <span>⚡ {partner}</span>
              </div>
            ))}
            {/* Second identical cycle for seamless scroll */}
            {partners.map((partner, idx) => (
              <div key={`p2-${idx}`} className="partner-logo">
                <span>⚡ {partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="stats-section"
      >
        <div className="stats-grid">
          {statCards.map((card, idx) => (
            <TiltCard key={idx} className="stat-card shine-hover">
              <div className="stat-icon-container">{card.icon}</div>
              <h3 className="stat-value">{card.value}</h3>
              <h4 className="stat-label">{card.label}</h4>
              <p className="stat-desc">{card.desc}</p>
            </TiltCard>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Carousel Section */}
      <section className="testimonials-section">
        <span className="section-label text-gradient text-center block">Témoignages</span>
        <h2 className="testimonials-title font-primary text-center">Ce que disent nos clients locaux</h2>
        
        <div className="testimonials-container">
          <button onClick={prevTestimonial} className="nav-btn prev-btn" aria-label="Avis précédent">
            <ChevronLeft size={24} />
          </button>

          <div className="testimonial-slider-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="glass-card testimonial-card"
              >
                <Quote size={40} className="quote-icon" />
                <p className="testimonial-text">"{testimonials[activeTestimonial].text}"</p>
                <div className="testimonial-rating">{testimonials[activeTestimonial].rating}</div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonials[activeTestimonial].name}</h4>
                  <p className="testimonial-role">{testimonials[activeTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={nextTestimonial} className="nav-btn next-btn" aria-label="Avis suivant">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="dots-row">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTestimonial(idx)}
              className={`dot ${activeTestimonial === idx ? "active" : ""}`}
              aria-label={`Aller à l'avis ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* CTA Banner Section */}
      <motion.section
        className="cta-banner-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="cta-banner glass-card shine-hover">
          <div className="cta-banner-content">
            <span className="section-label text-gradient">Offre de lancement</span>
            <h2 className="cta-banner-title font-primary">
              Audit opérationnel gratuit de 30 minutes
            </h2>
            <p className="cta-banner-desc">
              Découvrez en 30 minutes comment l&apos;IA peut transformer vos opérations quotidiennes. 
              Sans engagement, sans jargon technique — juste des résultats concrets.
            </p>
            <div className="cta-banner-actions">
              <Link href="/contact" className="btn btn-primary shine-hover">
                <span>Réserver mon créneau</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/demo" className="btn btn-secondary">
                <Bot size={18} />
                <span>Voir la démo live</span>
              </Link>
            </div>
          </div>
          <div className="cta-banner-badge">
            <Shield size={32} className="text-gradient" />
            <span>100% Gratuit<br />Sans engagement</span>
          </div>
        </div>
      </motion.section>

      {/* Pain vs Solution Section */}
      <section className="pain-solution-section">
        <div className="ps-header">
          <span className="section-label text-gradient">Pourquoi nous existons</span>
          <h2 className="ps-main-title font-primary">Deux réalités. Une seule direction.</h2>
        </div>
        <div className="ps-grid">
          {/* Pain Column */}
          <TiltCard className="ps-card ps-pain-card">
            <div className="ps-card-badge ps-badge-pain">
              <span>✕</span>
            </div>
            <span className="ps-card-label ps-label-pain">Le constat</span>
            <h3 className="ps-card-title">Le problème n&apos;est pas votre site web.</h3>
            <p className="ps-card-desc">
              Ce sont vos demandes entrantes non traitées. Des acquéreurs perdus faute de réponse rapide, des heures au téléphone pour des demandes non qualifiées.
            </p>
            <div className="ps-list">
              <div className="ps-item ps-item-pain">
                <span className="ps-item-icon ps-icon-pain">✕</span>
                <span>Des prospects perdus après 15 min sans réponse</span>
              </div>
              <div className="ps-item ps-item-pain">
                <span className="ps-item-icon ps-icon-pain">✕</span>
                <span>Des heures perdues à répondre aux mêmes questions</span>
              </div>
              <div className="ps-item ps-item-pain">
                <span className="ps-item-icon ps-icon-pain">✕</span>
                <span>Des fiches CRM incomplètes ou saisies à la main</span>
              </div>
            </div>
          </TiltCard>

          {/* VS Divider */}
          <div className="ps-vs-divider">
            <div className="ps-vs-line" />
            <div className="ps-vs-circle">VS</div>
            <div className="ps-vs-line" />
          </div>

          {/* Solution Column */}
          <TiltCard className="ps-card ps-solution-card">
            <div className="ps-card-badge ps-badge-solution">
              <CheckCircle size={18} />
            </div>
            <span className="ps-card-label ps-label-solution">La solution</span>
            <h3 className="ps-card-title">AI Operations Studio.</h3>
            <p className="ps-card-desc">
              Des workflows IA (n8n, Claude, Notion/Airtable) qui qualifient, aiguillent et relancent vos clients de manière 100% autonome et mesurable.
            </p>
            <div className="ps-list">
              <div className="ps-item ps-item-solution">
                <CheckCircle size={16} className="ps-icon-solution" />
                <span>Qualification automatique immédiate des critères</span>
              </div>
              <div className="ps-item ps-item-solution">
                <CheckCircle size={16} className="ps-icon-solution" />
                <span>Prise de RDV synchronisée sur vos agendas</span>
              </div>
              <div className="ps-item ps-item-solution">
                <CheckCircle size={16} className="ps-icon-solution" />
                <span>Injection propre et structurée dans votre CRM</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Global CSS rules */}
      {styleHome}
    </div>
  );
}

const styleHome = (
  <style jsx global>{`
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 5rem 0 4rem 0;
      max-width: 950px;
      margin: 0 auto;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.25rem;
      border-radius: 99px;
      background: rgba(99, 102, 241, 0.08);
      border: 1px solid rgba(99, 102, 241, 0.18);
      color: var(--secondary);
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 2.25rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .badge-icon {
      color: var(--secondary);
    }
    .hero-title {
      font-size: 4rem;
      line-height: 1.15;
      margin-bottom: 1.75rem;
      color: white;
      letter-spacing: -0.03em;
    }
    .hero-subtitle {
      font-size: 1.25rem;
      line-height: 1.65;
      color: var(--text-muted);
      margin-bottom: 3.25rem;
      max-width: 760px;
    }
    .hero-actions {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 5.5rem;
    }
    
    /* Partners Marquee */
    .partners-marquee-section {
      width: 100%;
      margin-bottom: 7.5rem;
      text-align: center;
    }
    .marquee-title {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text-dim);
      letter-spacing: 0.15em;
      margin-bottom: 1.75rem;
    }
    .marquee-container {
      width: 100%;
      overflow: hidden;
      padding: 1.5rem 0;
      border-radius: 16px;
      display: flex;
    }
    .marquee-track {
      display: flex;
      width: max-content;
      gap: 4rem;
      animation: marqueeScroll 28s linear infinite;
    }
    .partner-logo {
      display: flex;
      align-items: center;
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-muted);
      white-space: nowrap;
    }
    @keyframes marqueeScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    /* Stats */
    .stats-section {
      padding: 5.5rem 0;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    .stat-icon-container {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stat-value {
      font-size: 2.25rem;
      font-weight: 800;
      color: white;
      margin-top: 0.5rem;
    }
    .stat-label {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--secondary);
    }
    .stat-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.5;
    }
    
    /* Testimonials section */
    .testimonials-section {
      padding: 6.5rem 0;
    }
    .testimonials-title {
      font-size: 2.25rem;
      color: white;
      margin-top: 0.5rem;
      margin-bottom: 3.5rem;
    }
    .testimonials-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .testimonial-slider-wrapper {
      flex-grow: 1;
      min-height: 250px;
    }
    .testimonial-card {
      padding: 3rem 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1.25rem;
      position: relative;
    }
    .quote-icon {
      color: var(--primary);
      opacity: 0.15;
      position: absolute;
      top: 1.5rem;
      left: 2rem;
    }
    .testimonial-text {
      font-size: 1.15rem;
      color: white;
      line-height: 1.6;
      font-style: italic;
    }
    .testimonial-rating {
      color: #fbbf24;
      font-size: 1.1rem;
      letter-spacing: 0.1em;
    }
    .testimonial-name {
      font-size: 1.05rem;
      color: white;
      font-weight: 700;
      margin-bottom: 0.2rem;
    }
    .testimonial-role {
      font-size: 0.85rem;
      color: var(--secondary);
      font-weight: 600;
    }
    .nav-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }
    .nav-btn:hover {
      color: white;
      border-color: var(--secondary);
      background: rgba(14, 165, 233, 0.08);
    }
    .dots-row {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      cursor: pointer;
      padding: 0;
      transition: all 0.3s ease;
    }
    .dot.active {
      background: var(--secondary);
      width: 20px;
      border-radius: 4px;
    }
    
    .pain-solution-section {
      padding: 6.5rem 0;
    }
    .ps-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }
    .ps-main-title {
      font-size: 2.25rem;
      color: white;
      margin-top: 0.5rem;
      letter-spacing: -0.02em;
    }
    .ps-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 2rem;
      align-items: stretch;
    }
    .ps-card {
      padding: 2.75rem !important;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .ps-pain-card {
      border: 1px solid rgba(239, 68, 68, 0.12) !important;
      background: linear-gradient(160deg, rgba(239, 68, 68, 0.04) 0%, rgba(5, 8, 22, 0.4) 40%) !important;
    }
    .ps-solution-card {
      border: 1px solid rgba(16, 185, 129, 0.15) !important;
      background: linear-gradient(160deg, rgba(16, 185, 129, 0.04) 0%, rgba(5, 8, 22, 0.4) 40%) !important;
    }
    .ps-card-badge {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .ps-badge-pain {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #ef4444;
    }
    .ps-badge-solution {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      color: #10b981;
    }
    .ps-card-label {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .ps-label-pain {
      color: #ef4444;
    }
    .ps-label-solution {
      color: #10b981;
    }
    .ps-card-title {
      font-size: 1.5rem;
      color: white;
      line-height: 1.3;
    }
    .ps-card-desc {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.65;
    }
    .ps-list {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      margin-top: 0.75rem;
    }
    .ps-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      color: var(--foreground);
      padding: 0.6rem 0.85rem;
      border-radius: 8px;
      transition: background 0.2s ease;
    }
    .ps-item-pain {
      background: rgba(239, 68, 68, 0.04);
      border: 1px solid rgba(239, 68, 68, 0.06);
    }
    .ps-item-pain:hover {
      background: rgba(239, 68, 68, 0.07);
    }
    .ps-item-solution {
      background: rgba(16, 185, 129, 0.04);
      border: 1px solid rgba(16, 185, 129, 0.06);
    }
    .ps-item-solution:hover {
      background: rgba(16, 185, 129, 0.07);
    }
    .ps-item-icon {
      flex-shrink: 0;
      width: 20px;
      text-align: center;
    }
    .ps-icon-pain {
      color: #ef4444;
      font-weight: 700;
    }
    .ps-icon-solution {
      color: #10b981;
      flex-shrink: 0;
    }
    /* VS Divider */
    .ps-vs-divider {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
    }
    .ps-vs-line {
      width: 1px;
      flex: 1;
      background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
    }
    .ps-vs-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--secondary);
      letter-spacing: 0.05em;
    }
    /* CTA Banner */
    .cta-banner-section {
      padding: 2rem 0 6.5rem 0;
    }
    .cta-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 3.5rem 4rem !important;
      border: 1px solid rgba(14, 165, 233, 0.15) !important;
      background: linear-gradient(135deg, rgba(15, 20, 50, 0.5) 0%, rgba(5, 8, 22, 0.5) 100%) !important;
    }
    .cta-banner-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 600px;
    }
    .cta-banner-title {
      font-size: 2rem;
      color: white;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }
    .cta-banner-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.65;
    }
    .cta-banner-actions {
      display: flex;
      gap: 1rem;
      margin-top: 0.75rem;
    }
    .cta-banner-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      text-align: center;
      padding: 1.5rem 2rem;
      border-radius: 16px;
      background: rgba(99, 102, 241, 0.06);
      border: 1px solid rgba(99, 102, 241, 0.12);
      font-size: 0.85rem;
      font-weight: 700;
      color: white;
      line-height: 1.35;
    }

    .section-label {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    @media (max-width: 900px) {
      .hero-title {
        font-size: 2.75rem;
      }
      .stats-grid {
        grid-template-columns: 1fr;
      }
      .ps-grid {
        grid-template-columns: 1fr;
      }
      .ps-vs-divider {
        flex-direction: row;
        gap: 0;
      }
      .ps-vs-line {
        width: auto;
        height: 1px;
        flex: 1;
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
      }
      .testimonials-container {
        gap: 0.5rem;
      }
      .nav-btn {
        display: none;
      }
    }
  `}</style>
);
