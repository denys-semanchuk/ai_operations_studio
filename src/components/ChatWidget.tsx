"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

const WELCOME_MESSAGE =
  "Bonjour ! Je suis l'assistant IA d'AI Operations Studio. Comment puis-je vous aider ? Posez-moi vos questions sur nos offres, tarifs ou notre processus d'intégration.";

async function fetchBotReply(
  history: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });
    const data = await res.json();
    return data.reply ?? "Désolé, une erreur s'est produite.";
  } catch {
    return "Problème de connexion. Contactez-nous à denys@aioperations.studio !";
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);
  const nextId = useCallback(() => {
    idCounter.current += 1;
    return idCounter.current;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      setTimeout(() => {
        setMessages([{ id: nextId(), text: WELCOME_MESSAGE, sender: "bot" }]);
      }, 500);
    }
  };

  const sendMessage = async (text: string) => {
    const userMsg: Message = { id: nextId(), text, sender: "user" };
    setMessages((prev) => {
      const next = [...prev, userMsg];
      callApi(next);
      return next;
    });
    setInput("");
    setIsTyping(true);
  };

  const callApi = async (currentMessages: Message[]) => {
    const history = currentMessages.map((m) => ({
      role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    }));
    const reply = await fetchBotReply(history);
    setMessages((prev) => [
      ...prev,
      { id: nextId(), text: reply, sender: "bot" },
    ]);
    setIsTyping(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
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
              <button
                className="chat-close"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le chat"
              >
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
                    {msg.sender === "bot" ? (
                      <Bot size={14} />
                    ) : (
                      <User size={14} />
                    )}
                  </div>
                  <div className="chat-msg-bubble">{msg.text}</div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="chat-msg bot">
                  <div className="chat-msg-avatar">
                    <Bot size={14} />
                  </div>
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
                {[
                  "Quels sont vos tarifs ?",
                  "Comment fonctionne l'audit ?",
                  "Quel ROI espérer ?",
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="chat-suggestion-btn"
                    onClick={() => sendMessage(s)}
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
                disabled={isTyping}
              />
              <button
                className="chat-send-btn"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                aria-label="Envoyer"
              >
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
        .chat-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
