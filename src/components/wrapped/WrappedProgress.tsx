// src/components/wrapped/WrappedProgress.tsx
"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

interface WrappedProgressProps {
  current: number;
  total: number;
}

export default function WrappedProgress({
  current,
  total,
}: WrappedProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full overflow-hidden"
         style={{ background: crisisTheme.colors.border }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: crisisTheme.colors.primary }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}
