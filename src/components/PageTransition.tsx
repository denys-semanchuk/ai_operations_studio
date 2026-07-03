"use client";

import { m, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useHasMounted } from "@/lib/useHasMounted";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

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
  // Skip the entrance animation on the very first paint so SSR'd content
  // is visible immediately instead of sitting at opacity:0 until hydration.
  // Subsequent client-side route changes still get the full transition.
  const hasMounted = useHasMounted();
  const isTouch = useIsTouchDevice();

  // Phones get an instant swap instead of the fade/slide — no outgoing page
  // kept mounted for an exit animation, no motion values on the route path.
  if (isTouch) {
    return <div className="page-transition-static">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={pathname}
        variants={variants}
        initial={hasMounted ? "initial" : false}
        animate="animate"
        exit="exit"
        style={{ width: "100%", willChange: "opacity, transform" }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
