// src/components/community/visuals/AmbientMotion.tsx

"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

export default function AmbientMotion() {
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10"
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: crisisTheme.animation.slow * 4,
        ease: crisisTheme.animation.ease,
        repeat: Infinity,
        repeatType: "mirror",
      }}
      style={{
        background: `radial-gradient(
          circle at 50% 30%,
          ${crisisTheme.colors.primarySoft}22,
          transparent 60%
        )`,
      }}
    />
  );
}
