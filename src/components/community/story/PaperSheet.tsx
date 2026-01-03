"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";
import type { CommunityStory } from "@/types/community";

export default function PaperSheet({ story }: { story: CommunityStory }) {
  return (
    <motion.div
      className="rounded-3xl shadow-xl px-8 py-10"
      style={{
        background: "#FFFFFF",
        color: crisisTheme.colors.textPrimary,
      }}
    >
      <p className="text-lg leading-relaxed whitespace-pre-line">
        {story.story}
      </p>
    </motion.div>
  );
}
