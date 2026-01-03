"use client";

import { motion } from "framer-motion";
import { useBreathing } from "@/hooks/useBreathing";
import { useEffect } from "react";
import Image from "next/image";

interface Props {
  preference?: "box" | "478" | "deep";
  onComplete: () => void;
  cloudLeftSrc?: string;
  cloudRightSrc?: string;
}

export default function BreathingFullScreen({
  preference = "box",
  onComplete,
  cloudLeftSrc,
  cloudRightSrc,
}: Props) {
  const { phase, completedCycles } = useBreathing(preference);

  // auto-complete after 3 full cycles
  useEffect(() => {
    if (completedCycles >= 3) {
      onComplete();
    }
  }, [completedCycles, onComplete]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "calc(100vh - 64px)", // navbar height
        backgroundColor: "#FFD33D",
      }}
    >
      {/* Instruction */}
      <div className="absolute top-10 w-full text-center z-20">
        <motion.h2
          key={phase}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-medium"
          style={{ color: "#6B4A00" }}
        >
          {phase === "inhale" && "Breathe in"}
          {phase === "hold" && "Hold"}
          {phase === "exhale" && "Breathe out"}
        </motion.h2>
      </div>

      {/* SUN */}
      <motion.svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 w-full h-full"
      >
        {/* OUTER GLOW */}
        <motion.circle
          cx="500"
          cy="1000"
          r="520"
          fill="#FFE27A"
          animate={{
            scale:
              phase === "inhale" || phase === "hold"
                ? 1.08
                : 0.95,
          }}
          transition={{
            duration: phase === "hold" ? 0 : 4, // 👈 KEY FIX
            ease: "easeInOut",
          }}

        />

        {/* MID GLOW */}
        <motion.circle
          cx="500"
          cy="1000"
          r="440"
          fill="#FFD96A"
          animate={{
            scale:
              phase === "inhale" || phase === "hold"
                ? 1.06
                : 0.96,
          }}
          transition={{
            duration: phase === "hold" ? 0 : 4, // 👈 KEY FIX
            ease: "easeInOut",
          }}

        />

        {/* SUN CORE */}
        <motion.circle
          cx="500"
          cy="1000"
          r="340"
          fill="#FF9F1C"
                    animate={{
            scale:
              phase === "inhale" || phase === "hold"
                ? 1.04
                : 0.97,
          }}
          transition={{
            duration: phase === "hold" ? 0 : 4, // 👈 KEY FIX
            ease: "easeInOut",
          }}
        />

        {/* FACE */}
        <g
          transform="translate(500 740)"
          stroke="#6B4A00"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        >
          <path d="M-60 -20 q20 -16 40 0" />
          <path d="M20 -20 q20 -16 40 0" />
          <path d="M-40 20 q40 30 80 0" />
        </g>
      </motion.svg>

      {/* CLOUDS */}
      {cloudLeftSrc && (
        <div className="absolute bottom-[-7vh] left-[-6vw] z-30 w-[80vw] max-w-xl">
          <Image src={cloudLeftSrc} alt="Cloud" width={600} height={300} />
        </div>
      )}

      {cloudRightSrc && (
        <div className="absolute bottom-[-7vh] right-[-6vw] z-30 w-[65vw] max-w-xl">
          <Image src={cloudRightSrc} alt="Cloud" width={600} height={300} />
        </div>
      )}
    </section>
  );
}
