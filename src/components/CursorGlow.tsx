"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Large soft orb — high lag, dreamy follow
  const orbX = useSpring(mouseX, { damping: 32, stiffness: 180, mass: 0.7 });
  const orbY = useSpring(mouseY, { damping: 32, stiffness: 180, mass: 0.7 });

  // Small crisp dot — very tight, almost instant follow
  const dotX = useSpring(mouseX, { damping: 28, stiffness: 700, mass: 0.3 });
  const dotY = useSpring(mouseY, { damping: 28, stiffness: 700, mass: 0.3 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const orbOffset = 160; // half of orb size (320px)
    const dotOffset = 5;   // half of dot size (10px)

    const handleMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX - orbOffset);
      mouseY.set(e.clientY - orbOffset);
      // Dot uses separate offset
      dotX.set(e.clientX - dotOffset);
      dotY.set(e.clientY - dotOffset);
    };

    const handleLeave = () => setIsVisible(false);

    const handleInteractiveEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setIsHoveringInteractive(true);
      }
    };
    const handleInteractiveLeave = () => setIsHoveringInteractive(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleInteractiveEnter);
    document.addEventListener("mouseout", handleInteractiveLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleInteractiveEnter);
      document.removeEventListener("mouseout", handleInteractiveLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Large soft ambient orb */}
      <motion.div
        className="cursor-orb"
        style={{ left: orbX, top: orbY }}
      />

      {/* Small crisp dot — scales up on interactive elements */}
      <motion.div
        className="cursor-dot"
        style={{ left: dotX, top: dotY }}
        animate={{
          scale: isHoveringInteractive ? 2.2 : 1,
          opacity: isHoveringInteractive ? 0.5 : 0.75,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      <style jsx global>{`
        * { cursor: none !important; }

        @media (pointer: coarse) {
          * { cursor: auto !important; }
          .cursor-orb,
          .cursor-dot { display: none !important; }
        }

        .cursor-orb {
          position: fixed;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(14, 165, 233, 0.11) 0%,
            rgba(99, 102, 241, 0.05) 50%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 9998;
          filter: blur(28px);
          mix-blend-mode: screen;
        }

        .cursor-dot {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(14, 165, 233, 0.9);
          box-shadow:
            0 0 6px rgba(14, 165, 233, 0.8),
            0 0 14px rgba(14, 165, 233, 0.4);
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>
    </>
  );
}
