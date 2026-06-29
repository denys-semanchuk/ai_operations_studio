"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [glowVars, setGlowVars] = useState<React.CSSProperties>({
    "--tc-gx": "50%",
    "--tc-gy": "50%",
    "--tc-opacity": "0",
  } as React.CSSProperties);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = -((mouseY - rect.height / 2) / (rect.height / 2)) * 9;
    const rY = ((mouseX - rect.width / 2) / (rect.width / 2)) * 9;

    setRotateX(rX);
    setRotateY(rY);
    setGlowVars({
      "--tc-gx": `${Math.round((mouseX / rect.width) * 100)}%`,
      "--tc-gy": `${Math.round((mouseY / rect.height) * 100)}%`,
      "--tc-opacity": "1",
    } as React.CSSProperties);
  };

  const handleMouseEnter = () => setScale(1.018);

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
    setGlowVars((prev) => ({ ...prev, "--tc-opacity": "0" } as React.CSSProperties));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY, scale }}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.8 }}
      style={{ transformStyle: "preserve-3d", position: "relative", willChange: "transform", ...glowVars }}
      className={`glass-card ${className}`}
    >
      <div className="tc-spotlight" />
      <div className="tc-content">{children}</div>

      <style jsx global>{`
        .tc-spotlight {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: var(--tc-opacity, 0);
          background: radial-gradient(
            circle 220px at var(--tc-gx, 50%) var(--tc-gy, 50%),
            rgba(14, 165, 233, 0.16) 0%,
            rgba(99, 102, 241, 0.07) 50%,
            transparent 100%
          );
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        .tc-content {
          transform: translateZ(20px);
          z-index: 2;
          position: relative;
        }
      `}</style>
    </motion.div>
  );
}
