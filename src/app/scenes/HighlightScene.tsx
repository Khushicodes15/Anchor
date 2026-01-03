"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import WrappedContainer from "@/components/wrapped/WrappedContainer";

interface HighlightSceneProps {
  highlight: string;
}

export default function HighlightScene({ highlight }: HighlightSceneProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* LEFT BORDER IMAGE */}
        <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-y-0 left-0 w-[860px] pointer-events-none z-10"
        >
        <Image
            src="/left-border.png"
            alt="Decorative border"
            fill
            className="object-cover"
            priority
        />
        </motion.div>


      {/* TEXT (UNCHANGED) */}
      <WrappedContainer>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl leading-relaxed relative z-10"
        >
          {highlight}
        </motion.p>
      </WrappedContainer>

      {/* CROWN IMAGE (FLOATING ABOVE TEXT) */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        className="absolute top-[18%] left-1/2 -translate-x-1/2 pointer-events-none z-20"
      >
        <Image
          src="/crown.png"
          alt="Highlight crown"
          width={350}
          height={350}
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
