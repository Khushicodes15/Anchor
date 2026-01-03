"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

interface EnvelopeCardProps {
  tags: string[];
  onOpen: () => void;
}

export default function EnvelopeCard({ tags, onOpen }: EnvelopeCardProps) {
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        duration: crisisTheme.animation.normal,
        ease: crisisTheme.animation.ease,
      }}
      className="relative w-full max-w-sm mx-auto focus:outline-none"
      style={{ pointerEvents: "auto" }}
    >
      {/* ENVELOPE BODY */}
      <div
        className="relative rounded-3xl shadow-lg overflow-hidden"
        style={{
          background: crisisTheme.colors.secondary,
          border: `1px solid ${crisisTheme.colors.border}`,
          height: 190, // 🔒 thicker envelope
        }}
      >
        {/* FLAP (TOP) */}
        <div
          className="absolute top-0 left-0 w-full h-[55%] pointer-events-none"
          style={{
            background: crisisTheme.colors.surface,
            clipPath: "polygon(0 0, 50% 70%, 100% 0)",
          }}
        />

        {/* PAPER EDGE */}
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 w-[88%] h-4 rounded-sm opacity-80 pointer-events-none"
          style={{ background: "#FFFFFF" }}
        />

        {/* TAGS (ON ENVELOPE) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full"
              style={{
                background: crisisTheme.colors.secondarySoft,
                color: crisisTheme.colors.secondary,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* FOOTER TEXT */}
        <div className="absolute bottom-6 w-full text-center pointer-events-none">
          <p
            className="text-sm"
            style={{ color: crisisTheme.colors.textPrimary }}
          >
            Left here with care
          </p>
        </div>
      </div>
    </motion.button>
  );
}
