"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

interface ParallaxItemProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export default function ParallaxItem({ children, offset = 24, className }: ParallaxItemProps) {
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
