"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

type Props = {
  reason?: string;
  onFinish: () => void;
};

export default function ReasonToLive({ reason, onFinish }: Props) {
  return (
    <section
      className="fixed left-0 right-0 bottom-0 flex overflow-hidden"
      style={{
        top: "60px", // navbar height — DO NOT REMOVE
        background: crisisTheme.colors.background,
      }}
    >
      {/* TEXT CONTENT */}
      <div className="absolute left-0 right-0 top-[18%] px-6 text-center z-10">
        <h2
          className="text-3xl font-medium mb-6"
          style={{ color: crisisTheme.colors.textSecondary }}
        >
          Something worth holding on to
        </h2>

        <p
          className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto"
          style={{ color: crisisTheme.colors.textSecondary }}
        >
          "{reason ?? "You matter more than you realize."}"
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFinish}
          className="mt-10 px-16 py-4 rounded-full text-lg"
          style={{
            background: crisisTheme.colors.secondary,
            color: "#FFFFFF",
          }}
        >
          I'm okay for now
        </motion.button>
      </div>

      {/* FULL-BLEED WAVES */}
      <div className="absolute bottom-0 left-0 w-full h-[45%] pointer-events-none">
        <svg
          viewBox="0 0 1440 500"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* MOBILE — SHORELINE (NO CENTER DIP) */}
        <path
          d="
            M0,280
            C360,260 720,240 1080,220
            C1200,210 1320,205 1440,200
            L1440,500 L0,500 Z
          "
          fill="#FFDD3C"
          className="sm:hidden"
        />

          {/* DESKTOP WAVE — ORIGINAL */}
          <path
            d="
              M0,200
              C360,160 520,280 720,300
              C920,280 1080,160 1440,200
              L1440,500 L0,500 Z
            "
            fill="#FFDD3C"
            className="hidden sm:block"
          />
        </svg>
      </div>
    </section>
  );
}
