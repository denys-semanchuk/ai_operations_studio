"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { m, useAnimation } from "framer-motion";

export default function RouteProgress() {
  const pathname = usePathname();
  const controls = useAnimation();
  const firstRender = useRef(true);

  useEffect(() => {
    // Skip on initial page load
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const run = async () => {
      // Snap to 0, make visible
      controls.set({ scaleX: 0, opacity: 1 });
      // Sweep to full width
      await controls.start({
        scaleX: 1,
        transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
      });
      // Fade out
      await controls.start({
        opacity: 0,
        transition: { duration: 0.28, delay: 0.08 },
      });
    };

    run();
  }, [pathname, controls]);

  return (
    <m.div
      animate={controls}
      initial={{ scaleX: 0, opacity: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2.5px",
        background: "linear-gradient(90deg, #4f46e5 0%, #0ea5e9 50%, #d946ef 100%)",
        transformOrigin: "left center",
        zIndex: 99999,
        pointerEvents: "none",
        boxShadow: "0 0 10px rgba(14, 165, 233, 0.7), 0 0 20px rgba(79, 70, 229, 0.4)",
      }}
    />
  );
}
