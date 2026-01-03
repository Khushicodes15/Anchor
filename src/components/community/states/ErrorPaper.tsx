"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";
import PaperTexture from "@/components/community/visuals/PaperTexture";
import EnvelopeSVG from "@/components/community/visuals/EnvelopeSVG";

export default function ErrorPaper({
  message,
}: {
  message?: string | null;
}) {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* Envelope */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: crisisTheme.animation.normal,
          ease: crisisTheme.animation.ease,
        }}
        className="relative"
      >
        <div className="flex justify-center mb-[-28px] z-10 relative">
          <EnvelopeSVG />
        </div>

        {/* Paper */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "#FFFDF9", // warm paper, not white
            borderRadius: crisisTheme.radius.lg,
            padding: "44px 52px",
            minWidth: "420px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
            border: `1px solid ${crisisTheme.colors.border}`,
          }}
        >
          <PaperTexture />

          {/* Folded corner (imperfection) */}
          <div
            className="absolute top-0 right-0 w-10 h-10"
            style={{
              background: crisisTheme.colors.background,
              clipPath: "polygon(0 0, 100% 0, 100% 100%)",
              opacity: 0.7,
            }}
          />

          <p
            className="text-center text-base leading-relaxed"
            style={{ color: crisisTheme.colors.textSecondary }}
          >
            {message ??
              "This page didn’t arrive the way it was meant to."}
          </p>
        </div>
      </motion.div>

      {/* Gentle reassurance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-sm text-center"
        style={{ color: crisisTheme.colors.textTertiary }}
      >
        You can step away, or return when it feels right.
      </motion.div>
    </div>
  );
}
