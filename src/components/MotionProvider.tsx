"use client";

import { LazyMotion, domMax } from "framer-motion";

// framer-motion's `motion` component eagerly bundles every animation,
// gesture and layout engine it supports. Everything in this codebase uses
// the lightweight `m` component instead, scoped to this provider, which
// cuts framer-motion's contribution to the bundle roughly in half.
// `domMax` covers every feature actually in use: layoutId (Header), drag-
// free gestures like whileHover/whileTap (BackToTop, ChatWidget), and
// scroll-linked values (ScrollProgress, ParallaxItem).
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
