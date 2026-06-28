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
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({
    opacity: 0,
    background: "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 80%)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (max 10 degrees tilt)
    const centerX = mouseX - width / 2;
    const centerY = mouseY - height / 2;
    const rX = -(centerY / (height / 2)) * 8;
    const rY = (centerX / (width / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);

    // Glowing border shine position
    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(circle 120px at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.12) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 100%)`,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowStyle({
      opacity: 0,
      background: "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 80%)",
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ 
        transformStyle: "preserve-3d",
        position: "relative",
      }}
      className={`glass-card ${className}`}
    >
      {/* Glow highlight background */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          transition: "opacity 0.2s ease",
          zIndex: 1,
          ...glowStyle,
        }}
      />
      
      {/* Content wrapper preserving 3D spacing */}
      <div style={{ transform: "translateZ(25px)", zIndex: 2, position: "relative" }}>
        {children}
      </div>
    </motion.div>
  );
}
