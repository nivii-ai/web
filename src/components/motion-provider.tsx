"use client";

import { MotionConfig } from "motion/react";

/** Las animaciones de `motion` no leen la preferencia del sistema sin esto. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
