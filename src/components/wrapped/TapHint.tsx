// src/components/wrapped/TapHint.tsx
"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

export default function TapHint() {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 text-sm"
      style={{ color: crisisTheme.colors.textSecondary }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      Tap to continue
    </motion.div>
  );
}
