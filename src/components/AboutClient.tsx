"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Check, Layers, Play, Database, BookOpen, Code } from "lucide-react";
import TiltCard from "@/components/TiltCard";

export default function AboutClient() {
  const [activeSkill, setActiveSkill] = useState("n8n"); // Default active is n8n
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skills = [
    {
      id: "nextjs",
      name: "React / Next.js",
      desc: "Création de sites ultra-rapides, interactifs et optimisés pour le SEO.",
      caseTitle: "Refonte de site vitrine + Intégration Bot",
      caseDesc: "Nous recréons des vitrines immobilières modernes avec Next.js. Dans ce cas de figure, l'affichage passe sous la barre des 0.5s, et un bot conversationnel qualifie directement les critères de recherche des acheteurs dès la première page.",
    },
    {
      id: "nodejs",
      name: "Node.js",
      desc: "Développement d'APIs et de microservices robustes pour connecter vos systèmes.",
      caseTitle: "Passerelle API Immobilière Custom",
      caseDesc: "Développement d'un service intermédiaire Node.js permettant de brancher n'importe quel portail immobilier fermé directement aux outils de base de données internes de nos clients.",
    },
    {
      id: "llm",
      name: "Claude & GPT Integration",
      desc: "Configuration avancée des modèles d'agents Claude (Anthropic) et GPT (OpenAI).",
      caseTitle: "Analyse automatique de dossiers locataires",
      caseDesc: "Intégration des APIs de vision LLM pour lire les pièces justificatives (avis d'imposition, fiches de paie) soumises par les candidats locataires, extrayant automatiquement les ratios de solvabilité.",
    },
    {
      id: "n8n",
      name: "n8n / Automations",
      desc: "Création de scénarios d'automatisation complexes et auto-hébergés.",
      caseTitle: "Workflow complet de relance post-visite",
      caseDesc: "Scénario n8n connecté à Google Calendar : 2h après chaque visite de bien, le client reçoit un SMS contenant un lien unique pour formuler son offre ou donner son avis. Saisie directe dans Airtable.",
    },
    {
      id: "airtable",
      name: "Airtable / Notion",
      desc: "Modélisation de bases de données légères, collaboratives et prêtes à l'emploi.",
      caseTitle: "CRM Interne sur-mesure",
      caseDesc: "Conception d'une structure Airtable avec vues Kanban partagées entre négociateurs, automatisations de relance automatique de prospects froids et suivi de facturation intégré.",
    },
  ];

  const architectures = {
    nextjs: {
      title: "Architecture Next.js App Router",
      steps: [
        { label: "1. Vercel CDN Edge", desc: "Hébergement mondial avec temps de réponse sous 20ms." },
        { label: "2. ISR (Incremental Static)", desc: "Pages HTML pré-générées pour un chargement instantané." },
        { label: "3. React Server Components", desc: "Zéro JavaScript inutilisé envoyé au navigateur." },
        { label: "4. API Routes Intégrées", desc: "Passerelles pour sécuriser les jetons d'accès API." }
      ],
      payload: `// Next.js Route Handler (src/app/api/route.ts)
export async function POST(req: Request) {
  const data = await req.json();
  
  // Sécurisation de l'API Key côté serveur
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.CLAUDE_API_KEY
    },
    body: JSON.stringify(data)
  });
  
  return Response.json(await res.json());
}`
    },
    nodejs: {
      title: "Architecture Passerelle Node.js",
      steps: [
        { label: "1. Express API Wrapper", desc: "Point d'entrée sécurisé pour les webhooks des portails immo." },
        { label: "2. Token Encryption", desc: "Chiffrement AES-256 de toutes les clés d'accès tierces." },
        { label: "3. Queue Management (BullMQ)", desc: "Gestion des pics de trafic pour éviter toute perte de prospects." },
        { label: "4. PM2 Cluster Daemon", desc: "Redémarrage automatique et clustering sur processeurs multi-cœurs." }
      ],
      payload: `// Node.js Express Controller
const express = require('express');
const app = express();

app.post('/api/webhook/gateway', async (req, res) => {
  const encryptedPayload = encrypt(req.body);
  await queue.add('parse-lead', { payload: encryptedPayload });
  res.status(202).send({ status: 'queued' });
});`
    },
    llm: {
      title: "Schéma Claude AI JSON Parser",
      steps: [
        { label: "1. System Prompt Guidance", desc: "Directives de jeu de rôle et d'extraction stricte sans bavardage." },
        { label: "2. Anthropic API Call", desc: "Appel de Claude 3.5 Sonnet avec température = 0 pour un résultat déterministe." },
        { label: "3. JSON Schema Enforcement", desc: "Définition des paramètres structurés attendus." },
        { label: "4. Post-Parsing Validation", desc: "Vérification des types et typages avant insertion CRM." }
      ],
      payload: `// Claude Tool Definition JSON Schema
{
  name: "extract_real_estate_lead_criteria",
  description: "Extrait les critères financiers d'un message",
  input_schema: {
    type: "object",
    properties: {
      budget: { type: "integer", description: "Budget max en euros" },
      apport: { type: "integer", description: "Apport personnel" }
    },
    required: ["budget", "apport"]
  }
}`
    },
    n8n: {
      title: "Workflow n8n Automations",
      steps: [
        { label: "1. Webhook trigger", desc: "Écoute des formulaires du site ou des e-mails du portail." },
        { label: "2. Claude Parser node", desc: "Extraction structurée des critères du client." },
        { label: "3. Airtable Check & Insert", desc: "Recherche des doublons par téléphone et écriture." },
        { label: "4. Router conditionnel", desc: "Aiguillage Slack ou SMS Twilio selon l'urgence." }
      ],
      payload: `// Structures des noeuds n8n (JSON Export)
[
  { "name": "Webhook Listener", "type": "n8n-nodes-base.webhook" },
  { "name": "Claude AI Extractor", "type": "n8n-nodes-base.anthropic" },
  { "name": "CRM Sync", "type": "n8n-nodes-base.airtable" },
  { "name": "Slack Alert", "type": "n8n-nodes-base.slack" }
]`
    },
    airtable: {
      title: "Modèle de Données Airtable CRM",
      steps: [
        { label: "1. Table Leads", desc: "Stockage des prospects qualifiés avec horodatage." },
        { label: "2. Table Biens", desc: "Catalogue de biens immobiliers locaux relié aux leads." },
        { label: "3. Formulaires Internes", desc: "Formulaires pour saisir les retours de visites des agents." },
        { label: "4. Automation interne", desc: "Envoi automatique d'e-mail de remerciement lors du changement de statut." }
      ],
      payload: `// Structure des relations SQL / NoSQL
Leads (Table)
 ├─ id (AutoNumber)
 ├─ Nom & Prénom (Single line text)
 ├─ Budget (Currency)
 ├─ Bien Associé (Link to Biens table)
 └─ Statut (Select: Nouveau | Qualifié | En Visite | Offre | Gagné)`
    }
  };

  const currentCase = skills.find((s) => s.id === activeSkill) || skills[3];

  return (
    <div className="page-wrapper container">
      {/* Hero Header */}
      <div className="about-header">
        <span className="section-label text-gradient">Le Fondateur & La Vision</span>
        <h1 className="about-title font-primary">À propos de AI Operations Studio</h1>
        <p className="about-subtitle">
          Découvrez qui se cache derrière le studio et comment nous aidons les agences immobilières à entrer dans l'ère de l'automatisation.
        </p>
      </div>

      {/* Grid: Founder profile + Genesis */}
      <div className="about-grid">
        {/* Founder details card */}
        <TiltCard className="founder-card">
          <div className="founder-avatar-wrapper">
            <div className="founder-avatar-fallback">DS</div>
          </div>
          <h3 className="founder-name">Denys Semanchuk</h3>
          <p className="founder-title">Fondateur & Ingénieur Intégrateur IA</p>
          <div className="founder-bio">
            <p>
              Issu d'un parcours en <strong>Computer Science</strong> avec 2,5 ans d'expérience en développement web et applications. Je me suis spécialisé dans l'optimisation des flux opérationnels en connectant les interfaces web modernes aux grands modèles de langage (LLMs) et aux outils no-code avancés.
            </p>
          </div>
          <div className="founder-tags">
            <span>⚛️ React/Next.js</span>
            <span>🟢 Node.js</span>
            <span>⚡ n8n</span>
            <span>📊 Airtable</span>
          </div>
        </TiltCard>

        {/* Story/Genesis card */}
        <TiltCard className="genesis-card">
          <h3 className="panel-title text-gradient">La genèse du projet</h3>
          <div className="genesis-text">
            <p>
              Après avoir livré plusieurs sites web traditionnels à des TPE et des agents immobiliers, un constat s'est imposé de lui-même : <strong>le vrai problème n'était pas la visibilité du site — c'était le traitement des prospects.</strong>
            </p>
            <p>
              Des leads de grande valeur arrivaient par e-mail et restaient sans réponse pendant des heures, voire des jours, faute de temps. C'est ainsi qu'est né <strong>AI Operations Studio</strong> : une offre ciblée pour résoudre ce goulot d'étranglement de manière mesurable grâce aux agents autonomes.
            </p>
          </div>

          <div className="divider-line"></div>

          <h3 className="panel-title text-gradient-accent">Notre Vision à 5 Ans</h3>
          <div className="vision-text">
            <p>
              Notre objectif immédiat est d'accompagner nos 3 premiers clients locaux à Bezons et en Île-de-France pour créer des études de cas incontournables.
            </p>
            <p>
              À long terme, nous standardisons nos scripts et nos modèles d'automatisation (SOPs) afin de devenir l'opérateur de référence en intégration IA pour les réseaux immobiliers nationaux et européens.
            </p>
          </div>
        </TiltCard>
      </div>

      {/* Skills / Tech Stack Grid with Interactive Explorer */}
      <div className="skills-section">
        <h3 className="skills-section-title font-primary text-center">Notre Expertise Technique</h3>
        <p className="skills-section-subtitle text-center">
          Cliquez sur l'une de nos technologies clés pour voir un exemple concret d'application immobilière.
        </p>

        <div className="skills-layout">
          {/* Left: Buttons grid */}
          <div className="skills-tabs">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => setActiveSkill(skill.id)}
                className={`skill-tab glass-card ${activeSkill === skill.id ? "active" : ""}`}
              >
                <div className="skill-tab-header">
                  <Check size={16} className={`tab-check ${activeSkill === skill.id ? "active-check" : ""}`} />
                  <span className="tab-name">{skill.name}</span>
                </div>
                <p className="tab-desc">{skill.desc}</p>
              </button>
            ))}
          </div>

          {/* Right: Detailed Case Study */}
          <div className="case-study-display">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCase.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card case-card"
              >
                <div className="case-header">
                  <BookOpen size={20} className="case-icon text-gradient" />
                  <span className="case-badge">Cas d'usage Immobilier</span>
                </div>
                <h4 className="case-title">{currentCase.caseTitle}</h4>
                <p className="case-desc">{currentCase.caseDesc}</p>
                
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-secondary btn-tech-details shine-hover"
                >
                  <Code size={16} />
                  <span>Voir l'architecture technique</span>
                </button>

                <div className="case-footer">
                  <span className="case-tech-label">Technologie :</span>
                  <span className="case-tech-value">{currentCase.name}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Immersive Architecture Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="modal-content glass"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3 className="modal-title font-primary">
                  {architectures[currentCase.id as keyof typeof architectures].title}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="close-btn" aria-label="Fermer">✕</button>
              </div>

              <div className="modal-body-layout">
                {/* Steps flowchart */}
                <div className="modal-steps">
                  <h4 className="modal-subtitle">Étapes clés du système :</h4>
                  <div className="steps-list">
                    {architectures[currentCase.id as keyof typeof architectures].steps.map((step, idx) => (
                      <div key={idx} className="step-item">
                        <div className="step-number">{idx + 1}</div>
                        <div className="step-text">
                          <span className="step-label-bold">{step.label}</span>
                          <span className="step-desc-small">{step.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Payload / Code */}
                <div className="modal-code">
                  <h4 className="modal-subtitle">Schéma de données / Code Payload :</h4>
                  <pre className="code-block">
                    <code>{architectures[currentCase.id as keyof typeof architectures].payload}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {styleAbout}
    </div>
  );
}

const styleAbout = (
  <style jsx global>{`
    .about-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    .about-title {
      font-size: 2.75rem;
      color: white;
      margin-top: 0.5rem;
      margin-bottom: 1.25rem;
    }
    .about-subtitle {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1.8fr;
      gap: 3rem;
      margin-bottom: 5rem;
      align-items: start;
    }
    .founder-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 3rem 2rem;
    }
    .founder-avatar-wrapper {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: var(--gradient-primary);
      padding: 3px;
      margin-bottom: 1.5rem;
      box-shadow: 0 0 25px rgba(99, 102, 241, 0.3);
    }
    .founder-avatar-fallback {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #090e24;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      font-weight: 800;
      font-family: var(--font-primary);
    }
    .founder-name {
      font-size: 1.5rem;
      color: white;
      margin-bottom: 0.25rem;
    }
    .founder-title {
      font-size: 0.9rem;
      color: var(--secondary);
      font-weight: 600;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .founder-bio {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .founder-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
    }
    .founder-tags span {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      padding: 0.3rem 0.75rem;
      border-radius: 8px;
      font-size: 0.8rem;
      color: var(--foreground);
    }
    
    /* Genesis panel */
    .genesis-card {
      padding: 3rem;
    }
    .panel-title {
      font-size: 1.4rem;
      color: white;
      margin-bottom: 1rem;
    }
    .genesis-text, .vision-text {
      font-size: 0.98rem;
      color: var(--text-muted);
      line-height: 1.7;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .divider-line {
      height: 1px;
      background: rgba(255, 255, 255, 0.08);
      margin: 2rem 0;
    }

    /* Skills section */
    .skills-section {
      padding: 3rem 0;
    }
    .skills-section-title {
      font-size: 2.25rem;
      color: white;
      margin-bottom: 0.75rem;
    }
    .skills-section-subtitle {
      font-size: 1.05rem;
      color: var(--text-muted);
      margin-bottom: 3.5rem;
    }
    .text-center {
      text-align: center;
    }
    .skills-layout {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3rem;
      align-items: start;
    }
    .skills-tabs {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .skill-tab {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 1.25rem 1.5rem;
      cursor: pointer;
      text-align: left;
      width: 100%;
      border-color: rgba(255, 255, 255, 0.04);
      background: rgba(10, 16, 35, 0.3);
      transition: all 0.3s ease;
    }
    .skill-tab:hover, .skill-tab.active {
      border-color: var(--secondary);
      background: rgba(14, 165, 233, 0.05);
      box-shadow: 0 0 15px rgba(14, 165, 233, 0.1);
    }
    .skill-tab-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .tab-check {
      color: var(--text-dim);
      transition: color 0.3s ease;
    }
    .tab-check.active-check {
      color: var(--secondary);
    }
    .tab-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: white;
    }
    .tab-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.4;
      padding-left: 1.75rem;
    }
    
    /* Case study detailed display */
    .case-study-display {
      height: 100%;
    }
    .case-card {
      padding: 3rem 2.5rem;
      height: 100%;
      border: 1px solid rgba(99, 102, 241, 0.25);
      background: linear-gradient(135deg, rgba(15, 20, 45, 0.6) 0%, rgba(5, 8, 22, 0.6) 100%);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      min-height: 380px;
    }
    .case-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .case-badge {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--accent);
      background: rgba(217, 70, 239, 0.1);
      border: 1px solid rgba(217, 70, 239, 0.25);
      padding: 0.25rem 0.65rem;
      border-radius: 99px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .case-title {
      font-size: 1.6rem;
      color: white;
      line-height: 1.3;
    }
    .case-desc {
      font-size: 1rem;
      color: var(--text-muted);
      line-height: 1.7;
      flex-grow: 1;
    }
    .case-footer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.25rem;
    }
    .case-tech-label {
      color: var(--text-dim);
    }
    .case-tech-value {
      color: var(--secondary);
      font-weight: 600;
    }
    .btn-tech-details {
      margin-top: 0.5rem;
      width: fit-content;
      font-size: 0.82rem;
      padding: 0.5rem 1.15rem;
    }

    /* Modal styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(3, 5, 12, 0.8);
      backdrop-filter: blur(12px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .modal-content {
      width: 100%;
      max-width: 900px;
      padding: 3rem;
      border: 1px solid rgba(14, 165, 233, 0.2);
      max-height: 90vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-title {
      font-size: 1.75rem;
      color: white;
    }
    .close-btn {
      background: none;
      border: none;
      color: var(--text-dim);
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    .close-btn:hover {
      color: white;
    }
    .modal-body-layout {
      display: grid;
      grid-template-columns: 1.2fr 1.5fr;
      gap: 3rem;
    }
    .modal-subtitle {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .steps-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .step-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    .step-number {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(14, 165, 233, 0.1);
      border: 1px solid rgba(14, 165, 233, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary);
      font-size: 0.85rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .step-text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .step-label-bold {
      font-size: 0.95rem;
      font-weight: 600;
      color: white;
    }
    .step-desc-small {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.4;
    }
    .code-block {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      padding: 1.25rem;
      font-family: monospace;
      font-size: 0.82rem;
      color: #94a3b8;
      overflow-x: auto;
      max-height: 350px;
      line-height: 1.5;
    }

    @media (max-width: 900px) {
      .about-grid {
        grid-template-columns: 1fr;
      }
      .skills-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .case-card {
        min-height: auto;
      }
      .modal-body-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `}</style>
);
