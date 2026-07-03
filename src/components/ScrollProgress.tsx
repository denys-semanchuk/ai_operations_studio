"use client";

import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

// Split out so the scroll listener + spring are never even set up on touch
// devices — a continuous scroll-linked computation is exactly the kind of
// thing that contributes to scroll jank on phones, for a subtle decorative
// reading-progress bar.
function AnimatedScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return <m.div className="scroll-progress-bar" style={{ scaleX, transformOrigin: "0%" }} />;
}

export default function ScrollProgress() {
  const isTouch = useIsTouchDevice();
  if (isTouch) return null;
  return <AnimatedScrollProgress />;
}
