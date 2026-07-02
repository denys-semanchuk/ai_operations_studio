"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
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
        <p className="demo-disclaimer">
          Reconstitution illustrative d&apos;un scénario type — aucun appel réel à n8n ou Claude n&apos;est déclenché ici. Le fonctionnement réel est mis en place lors de l&apos;intégration avec votre CRM.
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
                  <m.div
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
                  </m.div>
                ))}
                {(step === 1.5 || step === 2.5) && (
                  <m.div className="typing-indicator">
                    <div className="small-visualizer">
                      <span className="audio-bar bar-1"></span>
                      <span className="audio-bar bar-2"></span>
                      <span className="audio-bar bar-3"></span>
                    </div>
                    <span>Analyse des critères financiers...</span>
                  </m.div>
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
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="demo-cta-finished">
                <Link href="/contact" className="btn btn-primary btn-finished shine-hover">
                  <span>Mettre en place cette automatisation</span>
                </Link>
                <button onClick={() => setStep(0)} className="btn btn-secondary btn-restart">
                  Recommencer
                </button>
              </m.div>
            )}
          </div>
        </TiltCard>
      </div>
    </div>
  );
}


