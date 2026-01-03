"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { crisisTheme } from "@/styles/Theme";
import { useStoryReactions } from "@/hooks/useStoryReactions";

export default function LikeButton({
  storyId,
  initialCount,
}: {
  storyId: string;
  initialCount?: number;
}) {
  const { like, liked } = useStoryReactions(storyId);
  const count = (initialCount ?? 0) + (liked ? 1 : 0);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={like}
      className="flex items-center gap-3 px-5 py-3 rounded-full border"
      style={{
        borderColor: liked
          ? crisisTheme.colors.primary
          : crisisTheme.colors.border,
        color: liked
          ? crisisTheme.colors.primary
          : crisisTheme.colors.textSecondary,
        minHeight: 44,
      }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: liked ? 1.1 : 1,
          color: liked
            ? crisisTheme.colors.primary
            : crisisTheme.colors.textSecondary,
        }}
        transition={{ duration: 0.2 }}
      >
        <Heart
          size={20}
          fill={liked ? crisisTheme.colors.primary : "none"}
          strokeWidth={1.8}
        />
      </motion.div>

      <span className="text-sm tabular-nums">
        {count}
      </span>
    </motion.button>
  );
}
