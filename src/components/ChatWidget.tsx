"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

const botResponses: Record<string, string> = {
  "default": "Je suis l'assistant virtuel d'AI Operations Studio. Comment puis-je vous aider ? Vous pouvez me poser des questions sur nos offres, nos tarifs ou notre processus d'intégration.",
  "prix": "Nos forfaits démarrent à 490€/mois pour l'IA FAQ & Auto-Replies. Le Combo Web + IA Agent est à 990€, et le forfait Qualification & CRM Sync à 1 490€/mois. Tous incluent un audit gratuit de 30 minutes !",
  "tarif": "Nos forfaits démarrent à 490€/mois pour l'IA FAQ & Auto-Replies. Le Combo Web + IA Agent est à 990€, et le forfait Qualification & CRM Sync à 1 490€/mois. Tous incluent un audit gratuit de 30 minutes !",
  "audit": "L'audit opérationnel gratuit dure 30 minutes. Nous analysons vos flux de travail actuels (traitement des leads, réponses clients, CRM) et identifions les points d'automatisation IA les plus rentables pour votre agence.",
  "n8n": "n8n est notre outil d'orchestration principal. Il connecte votre site web, vos chatbots IA (Claude/GPT), votre CRM (Airtable/Notion) et vos canaux de communication (email, WhatsApp) en workflows automatisés.",
  "combien": "Le temps d'intégration est de 2 à 4 semaines selon la complexité. Nous offrons un accompagnement complet avec formation de votre équipe. Le ROI est visible dès le premier mois avec 10 à 20h économisées par semaine.",
  "contact": "Vous pouvez nous contacter directement via la page Contact, ou planifier un audit gratuit. Denys Semanchuk, le fondateur, vous répond personnellement sous 24h. Email : denys@aioperations.studio",
  "bonjour": "Bonjour ! 👋 Bienvenue chez AI Operations Studio. Je suis votre assistant IA virtuel. Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me poser vos questions sur nos services d'automatisation.",
  "salut": "Salut ! 👋 Bienvenue chez AI Operations Studio. Comment puis-je vous aider aujourd'hui ?",
  "immobilier": "Nous sommes spécialisés dans l'automatisation pour les agences immobilières. Nos agents IA qualifient automatiquement vos leads (budget, surface, localisation), prennent des rendez-vous et injectent les données dans votre CRM.",
  "roi": "En moyenne, nos clients économisent 10 à 20 heures par semaine et augmentent leur taux de conversion de 25 à 40%. Utilisez notre Simulateur ROI sur la page dédiée pour calculer votre gain personnalisé !",
};

function findBotResponse(input: string): string {
  const lower = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const [key, value] of Object.entries(botResponses)) {
    if (key !== "default" && lower.includes(key)) {
      return value;
    }
  }
  return "Merci pour votre question ! Pour une réponse détaillée et personnalisée, je vous invite à planifier un audit gratuit de 30 minutes avec Denys. Vous pouvez le faire directement depuis notre page Contact.";
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      // Send welcome message
      setTimeout(() => {
        setMessages([{
          id: 1,
          text: botResponses["default"],
          sender: "bot",
        }]);
      }, 500);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: findBotResponse(userMsg.text),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="chat-fab"
            onClick={handleOpen}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ouvrir le chat"
          >
            <MessageCircle size={24} />
            {!hasOpened && <span className="chat-fab-badge" />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="chat-header-name">Assistant IA</div>
                  <div className="chat-header-status">
                    <span className="chat-status-dot" />
                    En ligne
                  </div>
                </div>
              </div>
              <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Fermer le chat">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages" ref={scrollRef}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`chat-msg ${msg.sender}`}
                >
                  <div className="chat-msg-avatar">
                    {msg.sender === "bot" ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className="chat-msg-bubble">{msg.text}</div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="chat-msg bot">
                  <div className="chat-msg-avatar"><Bot size={14} /></div>
                  <div className="chat-msg-bubble chat-typing">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 1 && (
              <div className="chat-suggestions">
                {["Quels sont vos tarifs ?", "Comment fonctionne l'audit ?", "Quel ROI espérer ?"].map((s) => (
                  <button
                    key={s}
                    className="chat-suggestion-btn"
                    onClick={() => {
                      setInput(s);
                      setTimeout(() => {
                        const userMsg: Message = { id: Date.now(), text: s, sender: "user" };
                        setMessages((prev) => [...prev, userMsg]);
                        setIsTyping(true);
                        setTimeout(() => {
                          setMessages((prev) => [...prev, { id: Date.now() + 1, text: findBotResponse(s), sender: "bot" }]);
                          setIsTyping(false);
                        }, 1000);
                      }, 100);
                      setInput("");
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="chat-input-bar">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question..."
                className="chat-input"
              />
              <button className="chat-send-btn" onClick={handleSend} disabled={!input.trim()} aria-label="Envoyer">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .chat-fab {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
          z-index: 9000;
        }
        .chat-fab-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ef4444;
          border: 2px solid var(--background);
          animation: pulse-badge 2s ease-in-out infinite;
        }
        @keyframes pulse-badge {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        .chat-window {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 380px;
          height: 520px;
          border-radius: 20px;
          background: rgba(8, 12, 28, 0.97);
          border: 1px solid rgba(14, 165, 233, 0.15);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9001;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(14, 165, 233, 0.08);
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 0, 0, 0.2);
        }
        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .chat-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .chat-header-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: white;
        }
        .chat-header-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          color: #10b981;
        }
        .chat-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .chat-close {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 0.4rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }
        .chat-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .chat-msg {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          max-width: 88%;
        }
        .chat-msg.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .chat-msg-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          flex-shrink: 0;
        }
        .chat-msg.bot .chat-msg-avatar {
          background: rgba(14, 165, 233, 0.1);
          border-color: rgba(14, 165, 233, 0.2);
          color: var(--secondary);
        }
        .chat-msg-bubble {
          padding: 0.7rem 1rem;
          border-radius: 14px;
          font-size: 0.84rem;
          line-height: 1.55;
        }
        .chat-msg.bot .chat-msg-bubble {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--foreground);
          border-top-left-radius: 4px;
        }
        .chat-msg.user .chat-msg-bubble {
          background: var(--gradient-primary);
          color: white;
          border-top-right-radius: 4px;
        }

        .chat-typing {
          display: flex;
          gap: 4px;
          padding: 0.85rem 1.1rem;
        }
        .typing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--text-dim);
          animation: typing-bounce 1.2s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        .chat-suggestions {
          display: flex;
          gap: 0.4rem;
          padding: 0 1.25rem 0.75rem;
          flex-wrap: wrap;
        }
        .chat-suggestion-btn {
          padding: 0.4rem 0.75rem;
          border-radius: 99px;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.15);
          color: var(--secondary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .chat-suggestion-btn:hover {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .chat-input-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 0, 0, 0.15);
        }
        .chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 0.6rem 0.9rem;
          color: white;
          font-size: 0.85rem;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .chat-input:focus {
          border-color: rgba(14, 165, 233, 0.4);
        }
        .chat-input::placeholder {
          color: var(--text-dim);
        }
        .chat-send-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--gradient-primary);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .chat-send-btn:not(:disabled):hover {
          box-shadow: 0 0 15px rgba(14, 165, 233, 0.3);
        }

        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 2rem);
            height: calc(100vh - 6rem);
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  );
}
