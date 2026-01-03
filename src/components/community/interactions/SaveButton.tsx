"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { crisisTheme } from "@/styles/Theme";
import { useStoryReactions } from "@/hooks/useStoryReactions";

export default function SaveButton({
  storyId,
  initialCount,
}: {
  storyId: string;
  initialCount?: number;
}) {
  const { save, saved } = useStoryReactions(storyId);
  const count = (initialCount ?? 0) + (saved ? 1 : 0);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={save}
      className="flex items-center gap-3 px-5 py-3 rounded-full border"
      style={{
        borderColor: saved
          ? crisisTheme.colors.secondary
          : crisisTheme.colors.border,
        color: saved
          ? crisisTheme.colors.secondary
          : crisisTheme.colors.textSecondary,
        minHeight: 44,
      }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: saved ? 1.1 : 1,
          color: saved
            ? crisisTheme.colors.secondary
            : crisisTheme.colors.textSecondary,
        }}
        transition={{ duration: 0.2 }}
      >
        <Bookmark
          size={20}
          fill={saved ? crisisTheme.colors.secondary : "none"}
          strokeWidth={1.8}
        />
      </motion.div>

      <span className="text-sm tabular-nums">
        {count}
      </span>
    </motion.button>
  );
}
