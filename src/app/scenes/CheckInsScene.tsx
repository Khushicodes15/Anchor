"use client";

import { motion } from "framer-motion";
import WrappedContainer from "@/components/wrapped/WrappedContainer";

interface CheckInsSceneProps {
  checkIns: number;
}

export default function CheckInsScene({ checkIns }: CheckInsSceneProps) {
  /** SVG GEOMETRY */
  const WIDTH = 3000;
  const HEIGHT = 1400;
  const RADIUS = 1200;

  const centerX = WIDTH / 2;
  const centerY = HEIGHT - 120; // safely below text

  /**
   * ✅ Visible arc window
   * We only render ticks between these angles
   */
  const ARC_START = Math.PI * 0.25; // left-bottom
  const ARC_END = Math.PI * 0.75;   // right-bottom

  /**
   * ✅ EXACTLY 5 ticks, evenly spaced
   */
  const TICKS = Array.from({ length: 5 }, (_, i) => {
    const t = i / 4; // 0 → 1
    return ARC_START + t * (ARC_END - ARC_START);
  });

  /**
   * ✅ Man placed on right side of arc
   * Always visible, no dependency on ticks
   */
  const MAN_ANGLE = ARC_START + (ARC_END - ARC_START) * 0.22;

  const manX = centerX - RADIUS * Math.cos(MAN_ANGLE);
  const manY = centerY - RADIUS * Math.sin(MAN_ANGLE);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* TEXT */}
      <WrappedContainer>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl mb-4">
          You checked in
        </motion.p>

        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-7xl font-bold mb-4"
        >
          {checkIns} times
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="opacity-70"
        >
          Even showing up counts.
        </motion.p>
      </WrappedContainer>

      {/* CLOCK */}
      <div className="absolute bottom-[-1100] left-0 w-full h-[700px] pointer-events-none">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3000px] h-[1400px]"
        >
          {/* CLOCK FILL */}
          <path
            d={`
              M ${centerX - RADIUS} ${centerY}
              A ${RADIUS} ${RADIUS} 0 0 1 ${centerX + RADIUS} ${centerY}
              L ${centerX + RADIUS} ${HEIGHT}
              L ${centerX - RADIUS} ${HEIGHT}
              Z
            `}
            fill="#FFF4D6"
          />

          {/* ARC BORDER */}
          <path
            d={`
              M ${centerX - RADIUS} ${centerY}
              A ${RADIUS} ${RADIUS} 0 0 1 ${centerX + RADIUS} ${centerY}
            `}
            stroke="#4E8D6A"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />

          {/* TICKS + GLOW (ALWAYS 5) */}
          {TICKS.map((angle, i) => {
            const x1 = centerX - RADIUS * Math.cos(angle);
            const y1 = centerY - RADIUS * Math.sin(angle);
            const x2 = centerX - (RADIUS - 40) * Math.cos(angle);
            const y2 = centerY - (RADIUS - 40) * Math.sin(angle);

            return (
              <g key={i}>
                {/* glow */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#F2C94C"
                  strokeWidth="14"
                  opacity="0.28"
                />
                {/* tick */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#7A5A3A"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* MAN */}
          <image
            href="/man-walking.png"
            x={manX - -150}
            y={manY - 152}
            width="90"
            height="90"
          />
        </svg>
      </div>
    </div>
  );
}
