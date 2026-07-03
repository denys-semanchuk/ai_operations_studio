"use client";

import React, { useRef, useState } from "react";
import { m } from "framer-motion";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const isTouch = useIsTouchDevice();
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

  // No mousemove/mouseenter on touch — skip the framer-motion wrapper and
  // spring machinery entirely, the tilt/glow effect never showed here anyway.
  if (isTouch) {
    return (
      <div className={`glass-card ${className}`}>
        <div className="tc-spotlight" />
        <div className="tc-content">{children}</div>
      </div>
    );
  }

  return (
    <m.div
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


    </m.div>
  );
}
