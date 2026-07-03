"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

interface ParallaxItemProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

// Split into its own component (rather than a branch inside ParallaxItem) so
// that on touch devices useScroll/useTransform are never even mounted —
// continuous scroll-linked computation is a real contributor to scroll
// jank on phones, and the effect is a subtle desktop nicety.
function AnimatedParallaxItem({ children, offset = 24, className }: ParallaxItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <m.div ref={ref} style={{ y }} className={className}>
      {children}
    </m.div>
  );
}

export default function ParallaxItem(props: ParallaxItemProps) {
  const isTouch = useIsTouchDevice();

  if (isTouch) {
    return <div className={props.className}>{props.children}</div>;
  }

  return <AnimatedParallaxItem {...props} />;
}
