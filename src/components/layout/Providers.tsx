"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Respecte la préférence système « réduire les animations » pour toutes les animations Framer Motion. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
