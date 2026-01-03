// src/app/community/loading.tsx

"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";
import LoadingPaper from "@/components/community/states/LoadingPaper";

export default function CommunityLoadingPage() {
  return (
    <div
      className="min-h-[70vh] w-full flex items-center justify-center"
      style={{
        background: crisisTheme.colors.background,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: crisisTheme.animation.slow,
          ease: crisisTheme.animation.ease,
        }}
        className="w-full flex justify-center"
      >
        <LoadingPaper />
      </motion.div>
    </div>
  );
}
