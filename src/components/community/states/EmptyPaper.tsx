// src/components/community/states/EmptyPaper.tsx

"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";
import ArchiveHeader from "../archive/ArchiveHeader";

export default function EmptyPaper() {
  return (
    
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        
        
        className="flex flex-col items-center text-center gap-6 max-w-md"
      >
        <h2
          className="text-2xl font-medium"
          style={{ color: crisisTheme.colors.textPrimary }}
        >
          This space is quiet for now.
        </h2>

        <p
          className="text-base leading-relaxed"
          style={{ color: crisisTheme.colors.textSecondary }}
        >
          Sometimes, stories arrive slowly.
          <br />
          This library exists so that when they do,
          they can be left gently.
        </p>

        <p
          className="text-sm"
          style={{ color: crisisTheme.colors.textTertiary }}
        >
          There is no expectation to add anything.
        </p>
      </motion.div>
    </div>
  );
}
