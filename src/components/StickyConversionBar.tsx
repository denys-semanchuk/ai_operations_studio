"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X, Zap } from "lucide-react";

export default function StickyConversionBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <div className="scb-wrap">
      <div className="scb-inner container">
        <div className="scb-left">
          <span className="scb-dot" />
          <Zap size={15} className="scb-zap" />
          <span className="scb-text">
            <strong>Audit IA gratuit · 30 min</strong>
            <span className="scb-sub">3 créneaux disponibles cette semaine</span>
          </span>
        </div>
        <div className="scb-right">
          <Link href="/contact" className="scb-cta shine-hover">
            <span>Réserver maintenant</span>
            <ArrowRight size={14} />
          </Link>
          <button
            type="button"
            className="scb-dismiss"
            onClick={() => setDismissed(true)}
            aria-label="Fermer"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .scb-wrap {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 8500;
          background: rgba(5, 8, 22, 0.92);
          backdrop-filter: blur(16px);
          border-top: 1px solid rgba(14, 165, 233, 0.2);
          padding: 0.75rem 2rem;
          box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.4), 0 -1px 0 rgba(14, 165, 233, 0.08);
          animation: scb-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes scb-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .scb-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
        .scb-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: 0;
        }
        .scb-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          flex-shrink: 0;
          box-shadow: 0 0 8px #10b981;
          animation: scb-pulse 2s ease-in-out infinite;
        }
        @keyframes scb-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.3); }
        }
        .scb-zap {
          color: var(--secondary);
          flex-shrink: 0;
        }
        .scb-text {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          font-size: 0.92rem;
          color: white;
        }
        .scb-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 400;
        }
        .scb-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        .scb-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--gradient-primary);
          color: white;
          padding: 0.55rem 1.25rem;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 700;
          font-family: var(--font-primary);
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
          white-space: nowrap;
          overflow: hidden;
          position: relative;
        }
        .scb-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(14, 165, 233, 0.45);
        }
        .scb-dismiss {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--text-dim);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .scb-dismiss:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        @media (max-width: 640px) {
          .scb-sub { display: none; }
          .scb-wrap { padding: 0.65rem 1rem; }
        }
      `}</style>
    </div>
  );
}
