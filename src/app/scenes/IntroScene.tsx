"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { crisisTheme } from "@/styles/Theme";

interface IntroSceneProps {
  monthLabel: string;
}

export default function IntroScene({ monthLabel }: IntroSceneProps) {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: crisisTheme.colors.background }}
    >
      {/* =========================
          BRUSH REVEAL
         ========================= */}
      <motion.div
        className="absolute top-0 left-0 w-full z-10 overflow-hidden"
        initial={{ height: "0%" }}
        animate={{ height: ["0%", "100%", "100%", "0%"] }}
        transition={{
          duration: 3.2,
          times: [0, 0.45, 0.65, 1],
          ease: "easeInOut",
        }}
      >
        <div className="relative w-full h-screen">
          <Image
            src="/brush_intro3.jpg"
            alt="Brush reveal"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* =========================
          DECORATIVE IMAGES + GLOW
         ========================= */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.3, duration: 1.2 }}
      >
        {/* TOP RIGHT */}
        <div className="absolute top-[-3%] left-1/2 -translate-x-1/2">

          {/* Glow */}
          <div className="absolute inset-0 bg-[#FFDD3C]/30 blur-3xl rounded-full scale-125" />

          {/* Image */}
          <Image
            src="/glow-right.png"
            alt="Decorative glow right"
            width={230}
            height={230}
            className="relative z-10 opacity-90"
          />
        </div>

        
      </motion.div>

      {/* =========================
          TEXT + UNDERLINE
         ========================= */}
      <motion.div
        className="relative z-20 text-center px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4, duration: 1, ease: "easeOut" }}
      >
        <p
          className="text-xl md:text-2xl mb-4"
          style={{ color: crisisTheme.colors.textSecondary }}
        >
          Your
        </p>

        <h1
          className="text-4xl md:text-6xl font-semibold mb-3"
          style={{ color: crisisTheme.colors.textPrimary }}
        >
          Anchor Wrapped
        </h1>

        

        <p
          className="mt-6 text-lg md:text-xl"
          style={{ color: crisisTheme.colors.textSecondary }}
        >
          {monthLabel}
        </p>
      </motion.div>
    </div>
  );
}
