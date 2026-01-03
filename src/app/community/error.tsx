// src/app/community/error.tsx

"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";
import ErrorPaper from "@/components/community/states/ErrorPaper";

export default function CommunityErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div
      className="min-h-[70vh] w-full flex items-center justify-center"
      style={{
        background: crisisTheme.colors.background,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: crisisTheme.animation.normal,
          ease: crisisTheme.animation.ease,
        }}
        className="w-full flex justify-center"
      >
        <ErrorPaper
          message={
            "Something didn’t open the way it should. You’re safe — and this can be tried again."
          }
        />
      </motion.div>
    </div>
  );
}
