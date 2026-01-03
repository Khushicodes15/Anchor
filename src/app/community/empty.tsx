// src/app/community/empty.tsx

"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";
import EmptyPaper from "@/components/community/states/EmptyPaper";

export default function CommunityEmptyPage() {
  return (
    <div
      className="min-h-[70vh] w-full flex items-center justify-center"
      style={{
        background: crisisTheme.colors.background,
      }}
    >
      <motion.div
        
      >
        <EmptyPaper />
      </motion.div>
    </div>
  );
}
