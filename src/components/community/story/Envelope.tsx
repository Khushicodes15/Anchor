"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

interface EnvelopeProps {
  flapOpen?: boolean;
}

export default function Envelope({ flapOpen = false }: EnvelopeProps) {
  return (
    <div
      className="relative h-56 rounded-3xl shadow-xl overflow-hidden"
      style={{
        background: crisisTheme.colors.secondary,
        border: `1px solid ${crisisTheme.colors.border}`,
      }}
    >
      {/* FLAP */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[55%] origin-top"
        animate={{ rotateX: flapOpen ? 180 : 0 }}
        transition={{
          duration: 0.9,
          ease: "easeInOut",
        }}
        style={{
          background: crisisTheme.colors.surface,
          clipPath: "polygon(0 0, 50% 75%, 100% 0)",
          transformStyle: "preserve-3d",
        }}
      />

      {/* PAPER EDGE */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] h-4 rounded-sm"
        style={{ background: "#FFFFFF" }}
      />

      {/* FOOTER */}
      <div className="absolute bottom-6 w-full text-center">
        <p
          className="text-sm"
          style={{ color: crisisTheme.colors.textPrimary }}
        >
          Left here with care
        </p>
      </div>
    </div>
  );
}
