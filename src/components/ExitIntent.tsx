"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function ExitIntent() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    // Don't retrigger if already dismissed this session
    if (sessionStorage.getItem("exitDismissed")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered || dismissed) return;
      // Only trigger when cursor leaves from the top of the viewport
      if (e.clientY <= 5) {
        setVisible(true);
        setTriggered(true);
      }
    };

    // Wait 8s before activating so it doesn't fire on normal scrolling
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [triggered, dismissed]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("exitDismissed", "1");
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <m.div
            className="exit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />

          {/* Modal */}
          <m.div
            className="exit-modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Offre de départ"
          >
            <button
              type="button"
              className="exit-close"
              onClick={dismiss}
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <div className="exit-badge">
              <Zap size={14} />
              <span>Avant de partir</span>
            </div>

            <h2 className="exit-title font-primary">
              Vous perdez des leads<br />
              <span className="text-gradient">en ce moment même.</span>
            </h2>

            <p className="exit-desc">
              En moyenne, 67% des prospects immobiliers choisissent l'agence qui répond
              en premier. Nos clients répondent en moins de 5 minutes — 24h/24.
            </p>

            <div className="exit-stats">
              {[
                { value: "< 5 min", label: "Réponse automatique" },
                { value: "30 min", label: "Audit 100% gratuit" },
              ].map((s) => (
                <div key={s.value} className="exit-stat">
                  <span className="exit-stat-value">{s.value}</span>
                  <span className="exit-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="exit-actions">
              <Link href="/contact" className="btn btn-primary shine-hover exit-cta" onClick={dismiss}>
                <span>Réserver mon audit gratuit</span>
                <ArrowRight size={16} />
              </Link>
              <button type="button" className="exit-skip" onClick={dismiss}>
                Non merci, je préfère continuer à perdre des leads
              </button>
            </div>
          </m.div>
        </>
      )}


    </AnimatePresence>
  );
}
