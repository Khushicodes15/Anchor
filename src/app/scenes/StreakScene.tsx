"use client";

import { motion } from "framer-motion";
import WrappedContainer from "@/components/wrapped/WrappedContainer";
import Image from "next/image";

interface StreakSceneProps {
  longestStreak: number;
}

export default function StreakScene({ longestStreak }: StreakSceneProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* TEXT */}
      <WrappedContainer>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl mb-6"
        >
          Your longest streak was
        </motion.p>

        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold mb-4"
        >
          {longestStreak} days
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="opacity-70"
        >
          That consistency matters.
        </motion.p>
      </WrappedContainer>

      {/* FIRE AT BOTTOM */}
      <motion.div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="/fire.png"
          alt="Streak fire"
          width={1920}
          height={420}
          className="w-full object-cover"
          priority
        />
      </motion.div>
    </div>
  );
}
