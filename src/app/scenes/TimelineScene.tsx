"use client";

import { motion } from "framer-motion";
import WrappedContainer from "@/components/wrapped/WrappedContainer";
import { EmotionalTimelinePoint } from "@/types/wrapped";
import Image from "next/image";

interface TimelineSceneProps {
  timeline: EmotionalTimelinePoint[];
}

function buildPath(points: EmotionalTimelinePoint[], width: number, height: number) {
  if (points.length === 0) return "";

  const stepX = width / (points.length - 1);

  return points
    .map((point, index) => {
      const x = index * stepX;
      const y = height - point.value * height;
      return `${index === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");
}

export default function TimelineScene({ timeline }: TimelineSceneProps) {
  const width = 300;
  const height = 120;

  const path = buildPath(timeline, width, height);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* TEXT + GRAPH */}
      <WrappedContainer>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl mb-6"
        >
          Your month wasn’t still
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="opacity-70 mb-10"
        >
          Some days felt heavier. Some felt lighter.
        </motion.p>

        <div className="relative flex justify-center">
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="emotionGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#919682" />
                <stop offset="50%" stopColor="#FF9F1C" />
                <stop offset="100%" stopColor="#4E8D6A" />
              </linearGradient>
            </defs>

            <motion.path
              d={path}
              fill="none"
              stroke="url(#emotionGradient)"
              strokeWidth={5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {timeline.map((point, index) => {
              const x = (index / (timeline.length - 1)) * width;
              const y = height - point.value * height;

              return (
                <motion.circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={6}
                  fill="#FF9F1C"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{
                    delay: 2 + index * 0.12,
                    duration: 0.6,
                  }}
                />
              );
            })}
          </svg>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          className="mt-8 text-lg opacity-70"
        >
          You didn’t stay stuck in one place.
        </motion.p>
      </WrappedContainer>

      {/* WAVES AT BOTTOM */}
       {/* FIRE AT BOTTOM */}
          <motion.div
            className="absolute bottom-0 left-0 w-full pointer-events-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/waves.png"
              alt="Emotional waves"
              width={1920}
              height={420}
              className="w-full object-cover"
              priority
            />
      </motion.div>
    </div>
  );
}
