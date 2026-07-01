"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consented = localStorage.getItem("cookie-consent");
    if (!consented) {
      // Show after a short delay
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: "accepted" }));
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: "declined" }));
    setVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="cookie-banner"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="cookie-content">
              <div className="cookie-icon-wrap">
                <Shield size={20} />
              </div>
              <div className="cookie-text">
                <p className="cookie-title">Respect de votre vie privée</p>
                <p className="cookie-desc">
                  Nous utilisons des cookies essentiels au fonctionnement du site ainsi que des cookies analytiques (Microsoft Clarity) pour comprendre l&apos;usage du site. Ces derniers ne sont activés qu&apos;avec votre accord.
                </p>
              </div>
            </div>
            <div className="cookie-actions">
              <button type="button" className="cookie-btn cookie-decline" onClick={handleDecline}>
                Refuser
              </button>
              <button type="button" className="cookie-btn cookie-accept" onClick={handleAccept}>
                Accepter
              </button>
              <button type="button" className="cookie-close" onClick={handleDecline} aria-label="Fermer">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        .cookie-banner {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 3rem);
          max-width: 720px;
          background: rgba(8, 12, 28, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          z-index: 9500;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }
        .cookie-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex: 1;
        }
        .cookie-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
          flex-shrink: 0;
        }
        .cookie-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.2rem;
        }
        .cookie-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .cookie-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }
        .cookie-btn {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-family: inherit;
        }
        .cookie-decline {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
        }
        .cookie-decline:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }
        .cookie-accept {
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 2px 10px rgba(14, 165, 233, 0.3);
        }
        .cookie-accept:hover {
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.45);
        }
        .cookie-close {
          background: none;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          padding: 0.25rem;
          display: none;
        }
        @media (max-width: 600px) {
          .cookie-banner {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 1.25rem;
          }
          .cookie-close {
            display: block;
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}
