"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Euro, ShieldCheck } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";

export default function RoiCalculator() {
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
      <motion.div
        className="roi-header"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-label text-gradient">Simulateur d'Impact</span>
        <h1 className="roi-title font-primary">Calculez le ROI de l'IA pour votre agence</h1>
        <p className="roi-subtitle">
          Découvrez combien d'heures et d'argent vous pouvez économiser en automatisant vos tâches opérationnelles et commerciales.
        </p>
      </motion.div>

      {/* Main Container */}
      <motion.div
        className="roi-container"
        initial={{ opacity: 0, y: 30 }}
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
              *Calculé sur la base de {hoursSavedPerWeek} heures libérées par semaine (soit {percentageFreeTime}% du temps de travail global de vos agents sur la pige) et un gain de conversion de 4% sur {leads} leads mensuels.
            </p>
          </div>

          <Link href="/contact?calculator=true" className="btn btn-primary cta-button shine-hover">
            <span>Présenter ce plan à mon agence</span>
          </Link>
        </TiltCard>
      </motion.div>

      {styleRoi}
    </div>
  );
}

const styleRoi = (
  <style jsx global>{`
    .roi-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .roi-title {
      font-size: 2.75rem;
      color: white;
      margin-top: 0.5rem;
      margin-bottom: 1.25rem;
    }
    .roi-subtitle {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .roi-container {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 3rem;
      align-items: start;
    }
    .panel-title {
      font-size: 1.5rem;
      color: white;
      margin-bottom: 0.5rem;
    }
    .panel-subtitle {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
    }
    .slider-group {
      margin-bottom: 1.5rem;
    }
    .slider-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
      color: var(--foreground);
      font-weight: 500;
    }
    .slider-value {
      font-weight: 700;
      color: var(--secondary);
      background: rgba(14, 165, 233, 0.08);
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      font-size: 0.9rem;
      border: 1px solid rgba(14, 165, 233, 0.15);
    }
    .custom-range {
      width: 100%;
      height: 6px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.08);
      outline: none;
      -webkit-appearance: none;
      cursor: pointer;
    }
    .custom-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--gradient-primary);
      box-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
      cursor: pointer;
      transition: transform 0.1s ease;
    }
    .custom-range::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }
    .range-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--text-dim);
      margin-top: 0.5rem;
    }
    
    /* Results panel */
    .results-panel {
      border: 1px solid rgba(14, 165, 233, 0.15);
    }
    .results-layout {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 1.5rem;
      align-items: center;
      margin-top: 1.5rem;
    }
    .results-grid {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .result-card {
      display: flex;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.04);
      padding: 1.15rem;
      border-radius: 12px;
      align-items: center;
    }
    .result-icon {
      flex-shrink: 0;
    }
    .result-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .result-label {
      font-size: 0.82rem;
      color: var(--text-muted);
    }
    .result-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: white;
    }
    
    /* Gauge style */
    .gauge-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
      height: 100%;
      border-radius: 16px;
      position: relative;
    }
    .gauge-svg {
      width: 110px;
      height: 110px;
      transform: rotate(-90deg);
    }
    .gauge-bg-circle {
      fill: none;
      stroke: rgba(255, 255, 255, 0.03);
      stroke-width: 8px;
    }
    .gauge-progress-circle {
      fill: none;
      stroke: url(#gaugeGradient);
      stroke: var(--secondary);
      stroke-width: 8px;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.6s ease;
    }
    .gauge-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -5px;
    }
    .gauge-number {
      font-size: 1.6rem;
      font-weight: 800;
      color: white;
      line-height: 1;
    }
    .gauge-label {
      font-size: 0.72rem;
      color: var(--text-muted);
      max-width: 80px;
      margin-top: 0.25rem;
      line-height: 1.2;
    }
    
    /* Bar graph styling */
    .speed-comparison {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-top: 1rem;
    }
    .comparison-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .bar-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .bar-label {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .bar-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .bar-graphic {
      height: 12px;
      border-radius: 6px;
      transition: width 0.8s ease;
    }
    .bar-graphic.manual {
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.4);
    }
    .bar-graphic.ai {
      background: var(--gradient-primary);
      box-shadow: 0 0 10px rgba(14, 165, 233, 0.3);
    }
    .bar-text {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-dim);
      white-space: nowrap;
    }
    .text-highlight {
      color: var(--secondary);
    }
    
    .divider-line {
      height: 1px;
      background: rgba(255, 255, 255, 0.08);
      margin: 1.75rem 0;
    }
    .annual-summary {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }
    .annual-total-label {
      font-size: 0.95rem;
      color: var(--text-muted);
    }
    .annual-total-value {
      font-size: 3rem;
      font-weight: 800;
      color: white;
      line-height: 1;
    }
    .summary-footnote {
      font-size: 0.75rem;
      color: var(--text-dim);
      line-height: 1.4;
      margin-top: 0.5rem;
    }
    .cta-button {
      width: 100%;
    }

    .roi-breakdown-section {
      margin: 2rem 0;
    }
    .breakdown-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      margin-top: 1.5rem;
    }
    .breakdown-card {
      padding: 1.25rem 1.5rem !important;
      border-radius: 12px !important;
      background: rgba(10, 16, 35, 0.2) !important;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .breakdown-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .task-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .task-dot.bg-blue { background: #0ea5e9; box-shadow: 0 0 8px #0ea5e9; }
    .task-dot.bg-indigo { background: #6366f1; box-shadow: 0 0 8px #6366f1; }
    .task-dot.bg-pink { background: #d946ef; box-shadow: 0 0 8px #d946ef; }
    .task-dot.bg-green { background: #10b981; box-shadow: 0 0 8px #10b981; }
    .task-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: white;
    }
    .breakdown-vals {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.95rem;
    }
    .val-hours {
      color: var(--text-muted);
    }
    .val-money {
      color: #10b981;
      font-weight: 700;
    }

    @media (max-width: 900px) {
      .roi-container {
        grid-template-columns: 1fr;
      }
      .results-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .gauge-card {
        padding: 3rem;
      }
      .breakdown-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .roi-title {
        font-size: 1.9rem;
      }
      .roi-subtitle {
        font-size: 1rem;
      }
      .panel-title {
        font-size: 1.2rem;
      }
      .slider-group label {
        font-size: 0.85rem;
      }
      .result-value {
        font-size: 1.1rem;
      }
      .annual-total-value {
        font-size: 2.25rem;
      }
      .comparison-title {
        font-size: 0.82rem;
      }
      .breakdown-card {
        padding: 1rem 1.25rem !important;
      }
      .sliders-panel,
      .results-panel {
        padding: 1.5rem !important;
      }
      .gauge-card {
        padding: 2rem;
      }
      .bar-text {
        font-size: 0.78rem;
      }
    }

    @media (max-width: 480px) {
      .results-layout {
        grid-template-columns: 1fr;
      }
      .breakdown-grid {
        grid-template-columns: 1fr;
      }
    }
  `}</style>
);
