"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  // Starts at the final value (not 0) so SSR/first paint always shows the
  // real number — on a slow mobile connection, hydration + the inView
  // check can take seconds, during which a 0-initialized counter would
  // render wrong values ("0 à 0h") the whole time instead of just skipping
  // the count-up animation.
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (!isInView) return;
    setProgress(0);
    let frame: number;
    const start = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, duration]);

  const display = value.replace(/\d+/g, (match) => {
    const target = parseInt(match, 10);
    return Math.round(target * progress).toString();
  });

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
