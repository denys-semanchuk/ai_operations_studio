"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Large soft orb — high lag, dreamy follow
  const orbX = useSpring(mouseX, { damping: 32, stiffness: 180, mass: 0.7 });
  const orbY = useSpring(mouseY, { damping: 32, stiffness: 180, mass: 0.7 });

  // Small crisp dot — this is the only visible pointer (the real OS cursor
  // is hidden via `cursor: none`), so it tracks the mouse 1:1 with no
  // spring lag. Any smoothing here reads as a laggy/sluggish cursor.
  const dotX = useMotionValue(-500);
  const dotY = useMotionValue(-500);

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
      <m.div
        className="cursor-orb"
        style={{ x: orbX, y: orbY }}
      />

      {/* Small crisp dot — scales up on interactive elements */}
      <m.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: isHoveringInteractive ? 2.2 : 1,
          opacity: isHoveringInteractive ? 0.5 : 0.75,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />


    </>
  );
}
