"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
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
    return "Problème de connexion. Contactez-nous à denys@ai-operations.studio !";
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
          <m.button
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
          </m.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <m.div
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
                <m.div
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
                </m.div>
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
                aria-label="Votre question"
                className="chat-input"
                disabled={isTyping}
              />
              <button
                type="button"
                className="chat-send-btn"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                aria-label="Envoyer"
              >
                <Send size={16} />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>


    </>
  );
}
