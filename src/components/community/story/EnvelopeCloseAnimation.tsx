"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Envelope from "./Envelope";

export default function EnvelopeCloseAnimation({
  children,
  onComplete,
}: {
  children: ReactNode;
  onComplete?: () => void;
}) {
  return (
    <div className="relative flex justify-center min-h-[80vh] pointer-events-none">
      {/* ENVELOPE RETURNS */}
      <motion.div
        initial={{ y: 520 }}
        animate={{ y: 220 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 w-full z-20"
        onAnimationComplete={() => {
          onComplete?.();
        }}
      >
        <Envelope flapOpen={false} />
      </motion.div>

      {/* PAPER RETURNS */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 100, opacity: 0 }}
        transition={{
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
