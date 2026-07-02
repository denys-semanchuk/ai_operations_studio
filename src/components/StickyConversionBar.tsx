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


    </div>
  );
}
