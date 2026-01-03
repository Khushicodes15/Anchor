// src/components/wrapped/SceneTransition.tsx
"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneTransitionProps {
  sceneKey: string;
  children: ReactNode;
}

export default function SceneTransition({
  sceneKey,
  children,
}: SceneTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="w-screen h-screen overflow-hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
