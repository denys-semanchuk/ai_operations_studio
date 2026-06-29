"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Per-state transitions: slow enter (expo out), fast exit (ease in)
const variants = {
  initial: {
    opacity: 0,
    y: 22,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      ease: [0.16, 1, 0.3, 1], // expo out — smooth deceleration
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1], // ease in — snappy exit so user doesn't wait
    },
  },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: "100%", willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
