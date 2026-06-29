"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          <motion.div
            className="exit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
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
          </motion.div>
        </>
      )}

      <style jsx global>{`
        .exit-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 10000;
        }
        .exit-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(560px, calc(100vw - 2rem));
          background: rgba(8, 12, 28, 0.98);
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 24px;
          padding: 3rem 2.5rem 2.5rem;
          z-index: 10001;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(14, 165, 233, 0.06);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .exit-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .exit-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .exit-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          border-radius: 99px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          width: fit-content;
        }
        .exit-title {
          font-size: 1.85rem;
          color: white;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .exit-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.65;
        }
        .exit-stats {
          display: flex;
          gap: 1.5rem;
        }
        .exit-stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          flex: 1;
          align-items: center;
        }
        .exit-stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
        }
        .exit-stat-label {
          font-size: 0.78rem;
          color: var(--text-dim);
          text-align: center;
        }
        .exit-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.25rem;
        }
        .exit-cta {
          width: 100%;
          justify-content: center;
          padding: 0.9rem 1.5rem;
          font-size: 0.95rem;
        }
        .exit-skip {
          background: none;
          border: none;
          color: var(--text-dim);
          font-size: 0.78rem;
          cursor: pointer;
          text-align: center;
          font-family: inherit;
          transition: color 0.2s;
          padding: 0.25rem;
        }
        .exit-skip:hover {
          color: var(--text-muted);
        }

        @media (max-width: 480px) {
          .exit-modal {
            padding: 2.5rem 1.5rem 2rem;
          }
          .exit-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
