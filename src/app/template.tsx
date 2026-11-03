"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ease } from "@/lib/utils";

/** Transition d'entrée entre les pages (re-monté à chaque navigation). */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </motion.div>
  );
}
