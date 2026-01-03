"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";
import PaperTexture from "@/components/community/visuals/PaperTexture";
import EnvelopeSVG from "@/components/community/visuals/EnvelopeSVG";

export default function LoadingPaper() {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* Envelope holding the paper */}
      <motion.div>
        {/* Envelope */}
        <div className="flex justify-center mb-[-28px] z-10 relative">
          <EnvelopeSVG />
        </div>

        {/* Paper */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "#FFFDF9", // NOT pure white
            borderRadius: crisisTheme.radius.lg,
            padding: "48px 56px",
            minWidth: "420px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
            border: `1px solid ${crisisTheme.colors.border}`,
          }}
        >
          <PaperTexture />

          <p
            className="text-center text-base"
            style={{
              color: crisisTheme.colors.textSecondary,
              lineHeight: "1.7",
            }}
          >
            Preparing something gently for you…
          </p>
        </div>
      </motion.div>

      {/* Grounding micro-copy */}
      <motion.div
        className="text-sm"
        style={{ color: crisisTheme.colors.textTertiary }}
      >
        Take a slow breath.
      </motion.div>
    </div>
  );
}
