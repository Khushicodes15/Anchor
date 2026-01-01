"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import WrappedContainer from "@/components/wrapped/WrappedContainer";

interface GrowthSceneProps {
  growthMoments: number;
}

export default function GrowthScene({ growthMoments }: GrowthSceneProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* DECORATIVE IMAGE (LEFT, DOES NOT AFFECT TEXT) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute left-[4%] top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:block"

      >
        <Image
          src="/growth.png"
          alt="Growth"
          width={500}
          height={500}
          priority
        />
      </motion.div>

      {/* TEXT — UNTOUCHED ALIGNMENT */}
      <WrappedContainer>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl mb-6"
        >
          You had
        </motion.h2>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold mb-4"
        >
          {growthMoments}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="opacity-70 max-w-md mx-auto"
        >
          moments where you handled things better than before
        </motion.p>
      </WrappedContainer>
    </div>
  );
}
