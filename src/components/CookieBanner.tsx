"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
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
          <m.div
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
          </m.div>
        )}
      </AnimatePresence>

    </>
  );
}
