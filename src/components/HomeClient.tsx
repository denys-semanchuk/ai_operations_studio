"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, Shield, Zap, TrendingUp, CheckCircle, Clock, ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import Magnetic from "@/components/Magnetic";
import ParallaxItem from "@/components/ParallaxItem";
import { useHasMounted } from "@/lib/useHasMounted";

export default function HomeClient() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const hasMounted = useHasMounted();

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
    "Agences indépendantes",
    "Réseaux mandataires",
    "Agences multi-sites",
    "Chasseurs immobiliers",
    "Gestion locative",
    "Syndics de copropriété",
  ];

  const testimonials = [
    {
      name: "Configuration 100% sur-mesure",
      role: "Aucun SaaS générique",
      text: "Chaque automatisation est construite autour de votre CRM et de vos flux réels — pas d'un template. On part de votre façon de travailler actuelle, on ne vous demande pas de changer d'outils.",
    },
    {
      name: "Sans engagement, sans risque",
      role: "Audit initial 100% gratuit",
      text: "Aucun contrat long terme imposé. Vous restez propriétaire de vos données, de vos workflows et de vos comptes (n8n, Airtable, CRM). Vous pouvez tout reprendre en main à tout moment.",
    },
    {
      name: "Transparence sur les résultats",
      role: "Mesuré avec vous, pas promis à l'avance",
      text: "Pas de chiffre marketing non vérifié. Chaque automatisation est suivie avec vous semaine après semaine dès le lancement, pour que vous voyiez exactement ce qu'elle change dans votre activité.",
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
      <m.section
        variants={containerVariants}
        initial={hasMounted ? "hidden" : false}
        animate="visible"
        className="hero"
      >
        <m.div variants={itemVariants} className="hero-badge">
          <Bot size={14} className="badge-icon" />
          <span>L'excellence opérationnelle par l'IA</span>
        </m.div>
        
        <m.h1 variants={itemVariants} className="hero-title font-primary">
          Nous automatisons vos <br />
          <span className="text-gradient-animate">opérations immobilières</span> grâce à l'IA
        </m.h1>
        
        <m.p variants={itemVariants} className="hero-subtitle">
          Captez, qualifiez et synchronisez vos leads immobiliers instantanément dans votre CRM.
          Fini les prospects perdus — votre agence répond en moins de 5 minutes, 24h/24.
        </m.p>

        <m.div variants={itemVariants} className="hero-actions">
          <Magnetic>
            <Link href="/contact" className="btn btn-primary shine-hover">
              <span>Réserver l'audit gratuit</span>
              <ArrowRight size={18} />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/demo" className="btn btn-secondary">
              <Bot size={16} />
              <span>Voir la démo live</span>
            </Link>
          </Magnetic>
        </m.div>

        <m.div variants={itemVariants} className="hero-trust">
          {[
            "Sans engagement",
            "Réponse sous 24h",
            "Formation incluse",
            "ROI dès le 1er mois",
          ].map((t) => (
            <span key={t} className="trust-pill">
              <CheckCircle size={12} className="trust-check" />
              {t}
            </span>
          ))}
        </m.div>
      </m.section>

      {/* Partners Marquee */}
      <div className="partners-marquee-section">
        <p className="marquee-title">PROFILS D&apos;AGENCES ACCOMPAGNÉS :</p>
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
      <m.section
        initial={hasMounted ? { opacity: 0, y: 50 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="stats-section"
      >
        <div className="stats-grid">
          {statCards.map((card, idx) => (
            <TiltCard key={idx} className="stat-card shine-hover">
              <ParallaxItem offset={14 + idx * 6} className="stat-icon-container">
                {card.icon}
              </ParallaxItem>
              <div className="stat-value">
                <CountUp value={card.value} />
              </div>
              <p className="stat-label">{card.label}</p>
              <p className="stat-desc">{card.desc}</p>
            </TiltCard>
          ))}
        </div>
      </m.section>

      {/* How it Works Section */}
      <m.section
        className="how-section"
        initial={hasMounted ? { opacity: 0, y: 40 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label text-gradient text-center block">Simple & Transparent</span>
        <h2 className="how-title font-primary text-center">Comment ça marche ?</h2>
        <div className="how-steps">
          <div className="how-step glass-card">
            <div className="how-step-num">01</div>
            <ParallaxItem offset={18} className="how-step-icon-wrap">
              <Clock size={28} className="text-gradient" />
            </ParallaxItem>
            <h3 className="how-step-title">Audit Gratuit · 30 min</h3>
            <p className="how-step-desc">On analyse vos flux actuels ensemble et on identifie les automatisations les plus rentables. Sans engagement, sans jargon.</p>
          </div>
          <div className="how-connector">
            <ArrowRight size={20} className="how-arrow" />
          </div>
          <div className="how-step glass-card">
            <div className="how-step-num">02</div>
            <ParallaxItem offset={28} className="how-step-icon-wrap">
              <Zap size={28} className="text-gradient" />
            </ParallaxItem>
            <h3 className="how-step-title">Intégration · 2 à 4 sem.</h3>
            <p className="how-step-desc">Configuration sur-mesure de n8n, Claude AI et votre CRM (Airtable/Notion). Zéro interruption de votre activité.</p>
          </div>
          <div className="how-connector">
            <ArrowRight size={20} className="how-arrow" />
          </div>
          <div className="how-step glass-card">
            <div className="how-step-num">03</div>
            <ParallaxItem offset={18} className="how-step-icon-wrap">
              <TrendingUp size={28} className="text-gradient" />
            </ParallaxItem>
            <h3 className="how-step-title">ROI · dès le 1er mois</h3>
            <p className="how-step-desc">Formation de votre équipe incluse. Support 14 jours post-lancement. Résultats mesurables dès la première semaine.</p>
          </div>
        </div>
      </m.section>

      {/* Testimonials Carousel Section */}
      <section className="testimonials-section">
        <span className="section-label text-gradient text-center block">Nos engagements</span>
        <h2 className="testimonials-title font-primary text-center">Ce que vous pouvez attendre de nous</h2>
        
        <div className="testimonials-container">
          <button type="button" onClick={prevTestimonial} className="nav-btn prev-btn" aria-label="Avis précédent">
            <ChevronLeft size={24} />
          </button>

          <div className="testimonial-slider-wrapper">
            <AnimatePresence mode="wait">
              <m.div
                key={activeTestimonial}
                initial={hasMounted ? { opacity: 0, x: 40 } : false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="glass-card testimonial-card"
              >
                <Quote size={40} className="quote-icon" />
                <p className="testimonial-text">{testimonials[activeTestimonial].text}</p>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">{testimonials[activeTestimonial].name}</h3>
                  <p className="testimonial-role">{testimonials[activeTestimonial].role}</p>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <button type="button" onClick={nextTestimonial} className="nav-btn next-btn" aria-label="Avis suivant">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="dots-row">
          {testimonials.map((_, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setActiveTestimonial(idx)}
              className={`dot ${activeTestimonial === idx ? "active" : ""}`}
              aria-label={`Aller à l'avis ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Objections Section */}
      <m.section
        className="obj-section"
        initial={hasMounted ? { opacity: 0, y: 40 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label text-gradient text-center block">Vos questions, nos réponses</span>
        <h2 className="obj-title font-primary text-center">Ce qui vous retient d'agir</h2>
        <div className="obj-grid">
          <TiltCard className="obj-card">
            <div className="obj-icon-wrap">
              <Shield size={24} className="text-gradient" />
            </div>
            <p className="obj-objection">"Je ne suis pas assez technique pour ça."</p>
            <p className="obj-answer">Nous gérons tout de A à Z — installation, configuration, formation. Vous n'avez besoin d'aucune compétence technique. Si vous utilisez WhatsApp, vous pouvez utiliser nos outils.</p>
          </TiltCard>
          <TiltCard className="obj-card">
            <div className="obj-icon-wrap">
              <Zap size={24} className="text-gradient" />
            </div>
            <p className="obj-objection">"Mon agence est trop petite pour ça."</p>
            <p className="obj-answer">Nos solutions s'adaptent dès 1 agent. C'est justement les petites structures qui gagnent le plus : chaque heure économisée représente un impact direct sur votre chiffre d'affaires.</p>
          </TiltCard>
          <TiltCard className="obj-card">
            <div className="obj-icon-wrap">
              <CheckCircle size={24} className="text-gradient" />
            </div>
            <p className="obj-objection">"J'ai déjà essayé un outil, ça n'a pas marché."</p>
            <p className="obj-answer">Nos systèmes sont construits sur-mesure, pas des SaaS génériques. On part de votre flux réel, pas d'un template. Résultat : une adoption immédiate par votre équipe.</p>
          </TiltCard>
        </div>
      </m.section>

      {/* CTA Banner Section */}
      <m.section
        className="cta-banner-section"
        initial={hasMounted ? { opacity: 0, y: 40 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="cta-banner glass-card shine-hover">
          <div className="cta-banner-content">
            <div className="cta-slots-row">
              <span className="cta-slot-dot" />
              <span className="cta-slots-text">3 créneaux disponibles cette semaine</span>
            </div>
            <h2 className="cta-banner-title font-primary">
              Audit opérationnel gratuit de 30 minutes
            </h2>
            <p className="cta-banner-desc">
              En 30 minutes, on identifie combien d&apos;heures par semaine vous perdez sur des tâches automatisables — et on vous montre exactement comment les récupérer.
            </p>
            <div className="cta-banner-actions">
              <Magnetic>
                <Link href="/contact" className="btn btn-primary shine-hover">
                  <span>Réserver mon créneau</span>
                  <ArrowRight size={18} />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/demo" className="btn btn-secondary">
                  <Bot size={18} />
                  <span>Voir la démo live</span>
                </Link>
              </Magnetic>
            </div>
          </div>
          <div className="cta-banner-badge">
            <Shield size={32} className="text-gradient" />
            <span>100% Gratuit<br />Sans engagement</span>
          </div>
        </div>
      </m.section>

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
    </div>
  );
}


