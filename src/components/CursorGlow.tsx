"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Soft lagging spring parameters
  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      setIsVisible(true);
      // Offset by half of orb size (150px)
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        left: glowX,
        top: glowY,
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 9999,
        filter: "blur(25px)",
      }}
      className="hidden-mobile"
    />
  );
}
