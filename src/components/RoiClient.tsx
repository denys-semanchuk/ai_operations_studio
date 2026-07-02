"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Clock, TrendingUp, Euro, ShieldCheck } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import { useHasMounted } from "@/lib/useHasMounted";

export default function RoiCalculator() {
  const hasMounted = useHasMounted();
  // States for sliders
  const [agents, setAgents] = useState(3);
  const [hours, setHours] = useState(15);
  const [rate, setRate] = useState(25);
  const [leads, setLeads] = useState(150);

  // Calculations
  const hoursSavedPerWeek = Math.round(agents * hours * 0.65); // AI saves 65% of follow-up & FAQ time
  const hoursSavedPerMonth = Math.round(hoursSavedPerWeek * 4.33);
  const monthlySavings = Math.round(hoursSavedPerMonth * rate);
  const annualSavings = monthlySavings * 12;

  // Assuming average commission of 6000€ and closing rate improvement of 4%
  const closingRateImprovement = 0.04;
  const extraDealsYear = Math.round(leads * 12 * closingRateImprovement);
  const extraRevenueYear = extraDealsYear * 6000;

  // Visual percentages
  const totalWeeklyWorkingHours = agents * 35; // 35h per agent standard
  const percentageFreeTime = Math.min(100, Math.round((hoursSavedPerWeek / totalWeeklyWorkingHours) * 100));

  // SVG Radial parameters
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (65 / 100) * circumference; // Locked at 65% efficiency

  return (
    <div className="page-wrapper container">
      {/* Intro */}
      <m.div
        className="roi-header"
        initial={hasMounted ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-label text-gradient">Simulateur d'Impact</span>
        <h1 className="roi-title font-primary">Calculez le ROI de l'IA pour votre agence</h1>
        <p className="roi-subtitle">
          Découvrez combien d'heures et d'argent vous pouvez économiser en automatisant vos tâches opérationnelles et commerciales.
        </p>
      </m.div>

      {/* Main Container */}
      <m.div
        className="roi-container"
        initial={hasMounted ? { opacity: 0, y: 30 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left Column: Sliders */}
        <TiltCard className="sliders-panel">
          <h3 className="panel-title">Vos paramètres actuels</h3>
          <p className="panel-subtitle">Ajustez les curseurs pour refléter votre activité quotidienne.</p>

          <div className="slider-group">
            <div className="slider-header">
              <label htmlFor="agents-range">Nombre d'agents immobiliers</label>
              <span className="slider-value">{agents}</span>
            </div>
            <input
              id="agents-range"
              type="range"
              min="1"
              max="25"
              value={agents}
              onChange={(e) => setAgents(parseInt(e.target.value))}
              className="custom-range"
            />
            <div className="range-labels">
              <span>1</span>
              <span>25</span>
            </div>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <label htmlFor="hours-range">Heures par semaine / agent passées sur les leads</label>
              <span className="slider-value">{hours}h</span>
            </div>
            <input
              id="hours-range"
              type="range"
              min="5"
              max="40"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="custom-range"
            />
            <div className="range-labels">
              <span>5h</span>
              <span>40h</span>
            </div>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <label htmlFor="rate-range">Coût horaire estimé par agent</label>
              <span className="slider-value">{rate} € / h</span>
            </div>
            <input
              id="rate-range"
              type="range"
              min="15"
              max="60"
              value={rate}
              onChange={(e) => setRate(parseInt(e.target.value))}
              className="custom-range"
            />
            <div className="range-labels">
              <span>15 €</span>
              <span>60 €</span>
            </div>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <label htmlFor="leads-range">Nombre de leads reçus par mois</label>
              <span className="slider-value">{leads}</span>
            </div>
            <input
              id="leads-range"
              type="range"
              min="20"
              max="800"
              value={leads}
              onChange={(e) => setLeads(parseInt(e.target.value))}
              className="custom-range"
            />
            <div className="range-labels">
              <span>20</span>
              <span>800</span>
            </div>
          </div>
        </TiltCard>

        {/* Right Column: Calculations */}
        <TiltCard className="results-panel">
          <h3 className="panel-title text-gradient">Gains opérationnels estimés</h3>

          <div className="results-layout">
            <div className="results-grid">
              <div className="result-card">
                <Clock size={20} className="result-icon text-gradient" />
                <div className="result-info">
                  <span className="result-label">Temps libéré par mois</span>
                  <span className="result-value">{hoursSavedPerMonth} heures</span>
                </div>
              </div>

              <div className="result-card">
                <Euro size={20} className="result-icon text-gradient-accent" />
                <div className="result-info">
                  <span className="result-label">Économie mensuelle estimée</span>
                  <span className="result-value">{monthlySavings.toLocaleString()} €</span>
                </div>
              </div>

              <div className="result-card">
                <TrendingUp size={20} className="result-icon text-gradient" />
                <div className="result-info">
                  <span className="result-label">Revenu potentiel additionnel / an</span>
                  <span className="result-value">+{extraRevenueYear.toLocaleString()} €</span>
                </div>
              </div>
            </div>

            {/* Circular Gauge Card */}
            <div className="gauge-card glass">
              <svg className="gauge-svg" viewBox="0 0 120 120">
                <circle className="gauge-bg-circle" cx="60" cy="60" r="50" />
                <circle 
                  className="gauge-progress-circle" 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                  }}
                />
              </svg>
              <div className="gauge-content">
                <span className="gauge-number">65%</span>
                <span className="gauge-label">de tâches qualifiées automatisées</span>
              </div>
            </div>
          </div>

          <div className="divider-line"></div>

          {/* Time speed comparison graph */}
          <div className="speed-comparison">
            <h4 className="comparison-title">Rapidité de traitement d'un lead entrant :</h4>
            <div className="bar-container">
              <span className="bar-label">Sans IA (Traitement manuel)</span>
              <div className="bar-row">
                <div className="bar-graphic manual" style={{ width: "95%" }}></div>
                <span className="bar-text">~ 2h à 24h</span>
              </div>
            </div>
            <div className="bar-container">
              <span className="bar-label text-gradient">Avec AI Operations Studio</span>
              <div className="bar-row">
                <div className="bar-graphic ai" style={{ width: "8%" }}></div>
                <span className="bar-text text-highlight">&lt; 5 minutes</span>
              </div>
            </div>
          </div>

          <div className="divider-line"></div>

          {/* Dynamic Tasks Breakdown Section */}
          <div className="roi-breakdown-section">
            <h4 className="comparison-title text-gradient">Répartition estimée des gains par tâche :</h4>
            <div className="breakdown-grid">
              <div className="breakdown-card glass">
                <div className="breakdown-header">
                  <span className="task-dot bg-blue"></span>
                  <span className="task-name">Triage des E-mails & FAQ</span>
                </div>
                <div className="breakdown-vals">
                  <span className="val-hours">{Math.round(hoursSavedPerMonth * 0.25)}h / mois</span>
                  <span className="val-money">+{Math.round(hoursSavedPerMonth * 0.25 * rate)} €</span>
                </div>
              </div>
              
              <div className="breakdown-card glass">
                <div className="breakdown-header">
                  <span className="task-dot bg-indigo"></span>
                  <span className="task-name">Qualification de leads</span>
                </div>
                <div className="breakdown-vals">
                  <span className="val-hours">{Math.round(hoursSavedPerMonth * 0.40)}h / mois</span>
                  <span className="val-money">+{Math.round(hoursSavedPerMonth * 0.40 * rate)} €</span>
                </div>
              </div>
              
              <div className="breakdown-card glass">
                <div className="breakdown-header">
                  <span className="task-dot bg-pink"></span>
                  <span className="task-name">Planification de RDV</span>
                </div>
                <div className="breakdown-vals">
                  <span className="val-hours">{Math.round(hoursSavedPerMonth * 0.20)}h / mois</span>
                  <span className="val-money">+{Math.round(hoursSavedPerMonth * 0.20 * rate)} €</span>
                </div>
              </div>
              
              <div className="breakdown-card glass">
                <div className="breakdown-header">
                  <span className="task-dot bg-green"></span>
                  <span className="task-name">Relance post-visite</span>
                </div>
                <div className="breakdown-vals">
                  <span className="val-hours">{Math.round(hoursSavedPerMonth * 0.15)}h / mois</span>
                  <span className="val-money">+{Math.round(hoursSavedPerMonth * 0.15 * rate)} €</span>
                </div>
              </div>
            </div>
          </div>

          <div className="divider-line"></div>

          <div className="annual-summary">
            <div className="annual-total-label">Total économies de temps cumulées / an :</div>
            <div className="annual-total-value">{annualSavings.toLocaleString()} €</div>
            <p className="summary-footnote">
              *Estimation indicative, non contractuelle — basée sur {hoursSavedPerWeek} heures libérées par semaine (soit {percentageFreeTime}% du temps de travail global de vos agents sur la pige) et une hypothèse de gain de conversion de 4% sur {leads} leads mensuels. Les résultats réels dépendent de votre activité et sont mesurés avec vous lors de l&apos;audit.
            </p>
          </div>

          <Link href="/contact?calculator=true" className="btn btn-primary cta-button shine-hover">
            <span>Présenter ce plan à mon agence</span>
          </Link>
        </TiltCard>
      </m.div>
    </div>
  );
}


