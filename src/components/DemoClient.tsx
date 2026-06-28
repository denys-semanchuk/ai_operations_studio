"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Database, Server, Play, CheckCircle2, ChevronRight, MessageSquare, ArrowRight, GitBranch, Cpu, Sparkles } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import Confetti from "@/components/Confetti";

export default function DemoSimulator() {
  const [selectedTemplate, setSelectedTemplate] = useState("buyer"); // buyer, tenant, seller
  const [step, setStep] = useState(0); // 0: Idle, 1: Message received, 2: AI Qualifying, 3: CRM Sync, 4: Finished
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([]);
  const [crmData, setCrmData] = useState<any>({
    name: "—",
    phone: "—",
    project: "—",
    budget: "—",
    apport: "—",
    status: "En attente ⏳",
  });

  const templates = {
    buyer: {
      name: "Jean Valentin",
      phone: "+33 6 12 34 56 78",
      project: "Achat T3 Bezons",
      budget: "320 000 €",
      apport: "45 000 €",
      messages: [
        { sender: "user", text: "Bonjour, je suis intéressé par l'appartement T3 à Bezons à 320 000 €. Est-il toujours disponible ? Mon numéro est le 06 12 34 56 78." },
        { sender: "bot", text: "Bonjour ! Oui, le T3 à Bezons est toujours disponible. Pour préparer au mieux votre dossier de visite, pourriez-vous me préciser votre apport personnel ainsi que votre situation financière actuelle (prêt pré-approuvé, etc.) ?" },
        { sender: "user", text: "J'ai un apport de 45 000 € et ma banque m'a déjà accordé une simulation de prêt positive." },
        { sender: "bot", text: "Parfait ! Vos critères correspondent idéalement. J'enregistre votre dossier comme 'Qualifié'. Souhaitez-vous planifier une visite ce samedi à 10h ou 14h ?" }
      ]
    },
    tenant: {
      name: "Sarah Laroche",
      phone: "+33 7 98 76 54 32",
      project: "Location Studio Bezons",
      budget: "850 € / mois",
      apport: "Garant physique OK",
      messages: [
        { sender: "user", text: "Bonjour, je cherche un studio à louer à Bezons pour un budget max de 850€/mois. Mon tel: 07 98 76 54 32." },
        { sender: "bot", text: "Bonjour Sarah ! Nous avons actuellement deux studios disponibles dans cette gamme. Quels sont vos revenus nets mensuels actuels et disposez-vous d'un garant ?" },
        { sender: "user", text: "Je gagne 2 600 € net par mois en CDI (période d'essai validée) et mon père se porte garant de mon bail." },
        { sender: "bot", text: "Excellent dossier ! Vous validez le critère des 3x le loyer et le garant. Je qualifie votre fiche et vous envoie le lien pour déposer vos pièces justificatives." }
      ]
    },
    seller: {
      name: "Marc Dubreuil",
      phone: "+33 6 55 44 33 22",
      project: "Vente Maison Bezons",
      budget: "Estimation ~550k€",
      apport: "Propriétaire unique",
      messages: [
        { sender: "user", text: "Bonjour, je souhaite vendre ma maison de 5 pièces située à Bezons. Je cherche un professionnel pour une estimation. Contact: 06 55 44 33 22." },
        { sender: "bot", text: "Bonjour Marc ! C'est noté, nous réalisons des estimations gratuites. Pourriez-vous me préciser l'état général de la maison (travaux à prévoir) ainsi que l'urgence de votre projet ?" },
        { sender: "user", text: "Maison en très bon état, aucun gros travaux. Je souhaite vendre d'ici 3 à 6 mois car je déménage dans le Sud." },
        { sender: "bot", text: "Très bien, Marc. C'est un projet de vente concret. Je qualifie votre demande et la transmets à notre conseiller local pour convenir d'une visite d'estimation sous 24h." }
      ]
    }
  } as const;

  const startSimulation = () => {
    setStep(1);
    setMessages([]);
    setCrmData({
      name: "—",
      phone: "—",
      project: "—",
      budget: "—",
      apport: "—",
      status: "En attente ⏳",
    });

    const activeTemplate = templates[selectedTemplate as keyof typeof templates];

    // Step 1: User message arrives
    setTimeout(() => {
      setMessages((prev) => [...prev, activeTemplate.messages[0]]);
      setStep(1.5);
    }, 1200);

    // Step 2: Bot responds
    setTimeout(() => {
      setMessages((prev) => [...prev, activeTemplate.messages[1]]);
      setStep(2);
    }, 3200);

    // Step 3: User replies
    setTimeout(() => {
      setMessages((prev) => [...prev, activeTemplate.messages[2]]);
      setStep(2.5);
    }, 5500);

    // Step 4: AI processes & syncs to CRM
    setTimeout(() => {
      setMessages((prev) => [...prev, activeTemplate.messages[3]]);
      setStep(3);
      setCrmData({
        name: activeTemplate.name,
        phone: activeTemplate.phone,
        project: activeTemplate.project,
        budget: activeTemplate.budget,
        apport: activeTemplate.apport,
        status: "Qualifié ✅",
      });
    }, 8000);

    // Step 5: Finished
    setTimeout(() => {
      setStep(4);
    }, 10500);
  };

  return (
    <div className="page-wrapper container">
      {/* Confetti Explosion on complete */}
      <Confetti active={step === 4} />

      {/* Intro */}
      <div className="demo-header">
        <span className="section-label text-gradient">Simulateur en Temps Réel</span>
        <h1 className="demo-title font-primary">Visualisez le traitement d'un lead</h1>
        <p className="demo-subtitle">
          Choisissez un profil type de prospect ci-dessous, puis lancez le simulateur pour voir le robot IA n8n interagir, extraire les critères et synchroniser votre CRM.
        </p>
      </div>

      {/* Profile Selector */}
      {step === 0 && (
        <div className="profile-selector">
          <button 
            className={`profile-tab ${selectedTemplate === "buyer" ? "active" : ""}`}
            onClick={() => setSelectedTemplate("buyer")}
          >
            <span>Acheteur T3 (Jean)</span>
          </button>
          <button 
            className={`profile-tab ${selectedTemplate === "tenant" ? "active" : ""}`}
            onClick={() => setSelectedTemplate("tenant")}
          >
            <span>Locataire Studio (Sarah)</span>
          </button>
          <button 
            className={`profile-tab ${selectedTemplate === "seller" ? "active" : ""}`}
            onClick={() => setSelectedTemplate("seller")}
          >
            <span>Vendeur Maison (Marc)</span>
          </button>
        </div>
      )}

      {/* n8n Workflow interactive diagram */}
      <div className="workflow-diagram glass">
        <div className="diagram-header">
          <GitBranch size={16} className="text-gradient" />
          <span>Workflow d'intégration en temps réel (n8n + Claude)</span>
        </div>
        <div className="diagram-nodes">
          <div className={`diagram-node ${step >= 1 ? "active" : ""}`}>
            <MessageSquare size={16} />
            <span>Message Prospect</span>
          </div>
          
          <div className="diagram-connector">
            <svg className="connector-svg" width="100%" height="10">
              <line x1="0" y1="5" x2="100%" y2="5" className="base-line" />
              {step >= 1.5 && (
                <line x1="0" y1="5" x2="100%" y2="5" className="pulse-line" />
              )}
            </svg>
          </div>
          
          <div className={`diagram-node ${step >= 1.5 ? "active" : ""}`}>
            <Server size={16} />
            <span>Webhook n8n</span>
          </div>
          
          <div className="diagram-connector">
            <svg className="connector-svg" width="100%" height="10">
              <line x1="0" y1="5" x2="100%" y2="5" className="base-line" />
              {step >= 2 && (
                <line x1="0" y1="5" x2="100%" y2="5" className="pulse-line" />
              )}
            </svg>
          </div>
          
          <div className={`diagram-node ${step >= 2.5 ? "active" : ""}`}>
            <Cpu size={16} />
            <span>IA Parser (Claude)</span>
          </div>
          
          <div className="diagram-connector">
            <svg className="connector-svg" width="100%" height="10">
              <line x1="0" y1="5" x2="100%" y2="5" className="base-line" />
              {step >= 3 && (
                <line x1="0" y1="5" x2="100%" y2="5" className="pulse-line" />
              )}
            </svg>
          </div>
          
          <div className={`diagram-node ${step >= 3 ? "active" : ""}`}>
            <Database size={16} />
            <span>CRM (Airtable)</span>
          </div>
          
          <div className="diagram-connector">
            <svg className="connector-svg" width="100%" height="10">
              <line x1="0" y1="5" x2="100%" y2="5" className="base-line" />
              {step >= 4 && (
                <line x1="0" y1="5" x2="100%" y2="5" className="pulse-line" />
              )}
            </svg>
          </div>
          
          <div className={`diagram-node ${step >= 4 ? "active" : ""}`}>
            <Sparkles size={16} />
            <span>Notif SMS/Slack</span>
          </div>
        </div>
      </div>

      {/* Simulator Layout */}
      <div className="demo-layout">
        {/* Left Column: Chat Simulation */}
        <TiltCard className="simulator-panel">
          <div className="panel-header">
            <Bot className="panel-header-icon" size={20} />
            <span>Chatbot IA Immobilier</span>
            {step > 0 && <span className="status-badge pulse">Simulation active</span>}
          </div>

          <div className="chat-area">
            {step === 0 ? (
              <div className="chat-idle">
                <p>Prêt à démarrer l'expérience ?</p>
                <button onClick={startSimulation} className="btn btn-primary start-btn shine-hover">
                  <Play size={16} fill="white" />
                  <span>Lancer la Simulation</span>
                </button>
              </div>
            ) : (
              <div className="chat-messages-container">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`chat-bubble-wrapper ${msg.sender}`}
                  >
                    <div className="avatar-icon">
                      {msg.sender === "bot" ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className="chat-bubble-container">
                      <div className="chat-bubble">{msg.text}</div>
                      {/* Audio visualizer for AI when thinking/answering */}
                      {msg.sender === "bot" && idx === messages.length - 1 && (step === 1.5 || step === 2.5) && (
                        <div className="audio-visualizer">
                          <span className="audio-bar bar-1"></span>
                          <span className="audio-bar bar-2"></span>
                          <span className="audio-bar bar-3"></span>
                          <span className="audio-bar bar-4"></span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {(step === 1.5 || step === 2.5) && (
                  <motion.div className="typing-indicator">
                    <div className="small-visualizer">
                      <span className="audio-bar bar-1"></span>
                      <span className="audio-bar bar-2"></span>
                      <span className="audio-bar bar-3"></span>
                    </div>
                    <span>Analyse des critères financiers...</span>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </TiltCard>

        {/* Right Column: CRM Sync Mockup */}
        <TiltCard className="crm-panel">
          <div className="panel-header">
            <Database className="panel-header-icon" size={20} />
            <span>Airtable / Notion CRM</span>
            {step === 3 && <span className="sync-spinner">🔄</span>}
          </div>

          <div className="crm-content">
            <h4 className="crm-table-title">Dernières opportunités qualifiées :</h4>
            <div className="crm-table">
              <div className="crm-row crm-header-row">
                <div>Champ</div>
                <div>Donnée qualifiée par l'IA</div>
              </div>
              <div className={`crm-row ${step >= 3 ? "flash-row" : ""}`}>
                <div className="crm-field-label">Prospect</div>
                <div className={crmData.name !== "—" ? "text-highlight" : ""}>{crmData.name}</div>
              </div>
              <div className={`crm-row ${step >= 3 ? "flash-row" : ""}`}>
                <div className="crm-field-label">Téléphone</div>
                <div className={crmData.phone !== "—" ? "text-highlight" : ""}>{crmData.phone}</div>
              </div>
              <div className={`crm-row ${step >= 3 ? "flash-row" : ""}`}>
                <div className="crm-field-label">Projet</div>
                <div className={crmData.project !== "—" ? "text-highlight" : ""}>{crmData.project}</div>
              </div>
              <div className={`crm-row ${step >= 3 ? "flash-row" : ""}`}>
                <div className="crm-field-label">Budget</div>
                <div className={crmData.budget !== "—" ? "text-highlight" : ""}>{crmData.budget}</div>
              </div>
              <div className={`crm-row ${step >= 3 ? "flash-row" : ""}`}>
                <div className="crm-field-label">Apport</div>
                <div className={crmData.apport !== "—" ? "text-highlight" : ""}>{crmData.apport}</div>
              </div>
              <div className={`crm-row ${step >= 3 ? "flash-row" : ""}`}>
                <div className="crm-field-label">Statut</div>
                <div>
                  <span className={`status-badge-crm ${crmData.status.includes("✅") ? "success" : "pending"}`}>
                    {crmData.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Event notifications/log */}
            <div className="event-log-container">
              <h4 className="crm-table-title">Logs d'intégration n8n :</h4>
              <div className="event-logs">
                <div className={`log-item ${step >= 1 ? "active" : ""}`}>
                  <ChevronRight size={14} />
                  <span>Webhook reçus : Message entrant détecté</span>
                </div>
                <div className={`log-item ${step >= 2 ? "active" : ""}`}>
                  <ChevronRight size={14} />
                  <span>LLM Parser : Extraction des critères financiers</span>
                </div>
                <div className={`log-item ${step >= 3 ? "active" : ""}`}>
                  <ChevronRight size={14} />
                  <span>Airtable Sync : Ligne insérée avec succès</span>
                </div>
                <div className={`log-item ${step >= 4 ? "active" : ""}`}>
                  <CheckCircle2 size={14} className="success-icon" />
                  <span>Notif : Alerte SMS envoyée à l'agent local</span>
                </div>
              </div>
            </div>

            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="demo-cta-finished">
                <Link href="/contact" className="btn btn-primary btn-finished shine-hover">
                  <span>Mettre en place cette automatisation</span>
                </Link>
                <button onClick={() => setStep(0)} className="btn btn-secondary btn-restart">
                  Recommencer
                </button>
              </motion.div>
            )}
          </div>
        </TiltCard>
      </div>

      {styleDemo}
    </div>
  );
}

const styleDemo = (
  <style jsx global>{`
    .demo-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .demo-title {
      font-size: 2.75rem;
      color: white;
      margin-top: 0.5rem;
      margin-bottom: 1.25rem;
    }
    .demo-subtitle {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    
    /* Profile selector tabs */
    .profile-selector {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .profile-tab {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .profile-tab:hover, .profile-tab.active {
      color: white;
      border-color: var(--secondary);
      background: rgba(14, 165, 233, 0.05);
      box-shadow: 0 0 15px rgba(14, 165, 233, 0.1);
    }

    /* workflow interactive diagram */
    .workflow-diagram {
      padding: 1.5rem 2rem;
      border-radius: 16px;
      margin-bottom: 3.5rem;
    }
    .diagram-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .diagram-nodes {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
    }
    .diagram-node {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.82rem;
      color: var(--text-dim);
      transition: all 0.4s ease;
    }
    .diagram-node.active {
      color: white;
      border-color: var(--secondary);
      background: rgba(14, 165, 233, 0.08);
      box-shadow: 0 0 10px rgba(14, 165, 233, 0.15);
    }
    .diagram-connector {
      flex-grow: 1;
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
    }
    .connector-svg {
      overflow: visible;
    }
    .base-line {
      stroke: rgba(255, 255, 255, 0.04);
      stroke-width: 2;
    }
    .pulse-line {
      stroke: var(--secondary);
      stroke-width: 3;
      stroke-dasharray: 8 20;
      animation: dash 1.5s linear infinite;
      stroke-linecap: round;
      filter: drop-shadow(0 0 4px var(--secondary));
    }
    @keyframes dash {
      to {
        stroke-dashoffset: -28;
      }
    }

    .demo-layout {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3rem;
      align-items: start;
    }
    
    /* Panels */
    .simulator-panel, .crm-panel {
      padding: 0;
      overflow: hidden;
      min-height: 520px;
      display: flex;
      flex-direction: column;
    }
    .panel-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 0.9rem;
      font-weight: 600;
      color: white;
    }
    .panel-header-icon {
      color: var(--secondary);
    }
    .status-badge {
      margin-left: auto;
      font-size: 0.75rem;
      color: #10b981;
      background: rgba(16, 185, 129, 0.1);
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    .sync-spinner {
      margin-left: auto;
      animation: spin 1s linear infinite;
      font-size: 0.95rem;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Active pulse */
    .pulse {
      animation: pulseAnimation 2s infinite;
    }
    @keyframes pulseAnimation {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
    
    /* Chat area */
    .chat-area {
      padding: 1.5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .chat-idle {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }
    .chat-idle p {
      color: var(--text-muted);
      font-size: 1.05rem;
    }
    .start-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .chat-messages-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      justify-content: flex-end;
    }
    .chat-bubble-wrapper {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
      max-width: 85%;
    }
    .chat-bubble-wrapper.user {
      align-self: flex-end;
      flex-direction: row-reverse;
    }
    .avatar-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      flex-shrink: 0;
    }
    .chat-bubble-wrapper.bot .avatar-icon {
      background: rgba(14, 165, 233, 0.1);
      border-color: rgba(14, 165, 233, 0.2);
      color: var(--secondary);
    }
    .chat-bubble-container {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .chat-bubble {
      padding: 0.85rem 1.15rem;
      border-radius: 16px;
      font-size: 0.92rem;
      line-height: 1.5;
    }
    .chat-bubble-wrapper.bot .chat-bubble {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      color: white;
      border-top-left-radius: 4px;
    }
    .chat-bubble-wrapper.user .chat-bubble {
      background: var(--gradient-primary);
      color: white;
      border-top-right-radius: 4px;
    }
    
    /* Audio visualizer */
    .audio-visualizer {
      display: flex;
      align-items: center;
      gap: 3px;
      height: 16px;
      padding-left: 0.5rem;
    }
    .audio-bar {
      width: 3px;
      background: var(--secondary);
      border-radius: 3px;
      height: 100%;
    }
    .bar-1 { animation: bounce 0.8s ease-in-out infinite; animation-delay: 0.1s; }
    .bar-2 { animation: bounce 0.8s ease-in-out infinite; animation-delay: 0.3s; }
    .bar-3 { animation: bounce 0.8s ease-in-out infinite; animation-delay: 0.2s; }
    .bar-4 { animation: bounce 0.8s ease-in-out infinite; animation-delay: 0.4s; }
    @keyframes bounce {
      0%, 100% { transform: scaleY(0.3); }
      50% { transform: scaleY(1); }
    }
    
    .typing-indicator {
      font-size: 0.8rem;
      color: var(--text-dim);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: 2.25rem;
    }
    .small-visualizer {
      display: flex;
      gap: 2px;
      height: 10px;
      width: 14px;
      align-items: center;
    }
    
    /* CRM mockup */
    .crm-panel {
      padding: 1.5rem;
    }
    .crm-table-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .crm-table {
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 2rem;
      background: rgba(0, 0, 0, 0.1);
    }
    .crm-row {
      display: grid;
      grid-template-columns: 1fr 2fr;
      padding: 0.6rem 1rem;
      font-size: 0.85rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      color: var(--text-muted);
      align-items: center;
      transition: all 0.3s ease;
    }
    .crm-header-row {
      background: rgba(255, 255, 255, 0.02);
      font-weight: 700;
      color: white;
    }
    .crm-row:last-child {
      border-bottom: none;
    }
    .crm-field-label {
      font-weight: 600;
      color: white;
    }
    .text-highlight {
      color: var(--secondary);
      font-weight: 600;
    }
    
    /* CRM green glow flash */
    .flash-row {
      animation: greenGlowFlash 1.6s ease-out;
    }
    @keyframes greenGlowFlash {
      0% {
        background: rgba(16, 185, 129, 0.15);
        box-shadow: inset 0 0 10px rgba(16, 185, 129, 0.3);
        color: white;
      }
      100% {
        background: transparent;
        box-shadow: none;
      }
    }
    
    .status-badge-crm {
      font-size: 0.75rem;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      font-weight: 600;
    }
    .status-badge-crm.pending {
      background: rgba(255, 255, 255, 0.03);
      color: var(--text-dim);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .status-badge-crm.success {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    
    /* Integration events log */
    .event-log-container {
      margin-bottom: 1.5rem;
    }
    .event-logs {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 8px;
      padding: 1rem;
      font-family: monospace;
      font-size: 0.8rem;
    }
    .log-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-dim);
      transition: color 0.3s ease;
    }
    .log-item.active {
      color: var(--foreground);
    }
    .success-icon {
      color: #10b981;
    }
    .demo-cta-finished {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .btn-finished {
      flex-grow: 1;
    }
    .btn-restart {
      white-space: nowrap;
    }

    @media (max-width: 900px) {
      .workflow-diagram {
        display: none;
      }
      .demo-layout {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .demo-title {
        font-size: 1.9rem;
      }
      .demo-subtitle {
        font-size: 1rem;
      }
      .profile-selector {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
      }
      .profile-tab {
        text-align: center;
        padding: 0.65rem 1rem;
      }
      .simulator-panel,
      .crm-panel {
        min-height: auto;
      }
      .demo-cta-finished {
        flex-direction: column;
        gap: 0.75rem;
      }
      .demo-cta-finished .btn {
        width: 100%;
        text-align: center;
        justify-content: center;
      }
      .crm-row {
        font-size: 0.8rem;
        padding: 0.5rem 0.75rem;
      }
    }

    @media (max-width: 480px) {
      .demo-title {
        font-size: 1.65rem;
      }
      .simulator-panel {
        padding: 1.25rem;
      }
      .crm-panel {
        padding: 1.25rem;
      }
      .chat-bubble {
        max-width: 90%;
        font-size: 0.82rem;
      }
    }
  `}</style>
);
