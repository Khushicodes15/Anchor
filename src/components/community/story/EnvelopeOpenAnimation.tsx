"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Envelope from "./Envelope";

export default function EnvelopeOpenAnimation({
  children,
  onComplete
}: {
  children: ReactNode;
  onComplete?: () => void;
}) {
  return (
    <div className="relative flex justify-center min-h-[80vh]">
      {/* ENVELOPE */}
      <motion.div
        initial={{ y: 220 }}
        animate={{ y: 520 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 w-full z-20"
        onAnimationComplete={onComplete}
      >
        <Envelope flapOpen />
      </motion.div>

      {/* PAPER EMERGES */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative mt-32 w-full max-w-xl z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
