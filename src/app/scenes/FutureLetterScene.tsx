"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import WrappedContainer from "@/components/wrapped/WrappedContainer";
import Button from "@/components/ui/Button";

interface FutureLetterSceneProps {
  letter: string;
  onReplay: () => void;
  onExit: () => void;
}

export default function FutureLetterScene({
  letter,
  onReplay,
  onExit,
}: FutureLetterSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* LEFT IMAGE — DESKTOP ONLY */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="hidden md:block absolute left-[-60] bottom-0 w-[520px] h-[750px] pointer-events-none z-10"
      >
        <Image
          src="/stairs.png"
          alt="Stairs"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* RIGHT IMAGE — DESKTOP ONLY */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden md:block absolute right-0 bottom-0 w-[390px] h-[820px] pointer-events-none z-10"
      >
        <Image
          src="/leaves.png"
          alt="Leaves"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* MAIN CONTENT */}
      <WrappedContainer>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-3xl leading-relaxed mb-16"
        >
          {letter}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Button variant="secondary" onClick={onReplay}>
            Watch Again
          </Button>

          <Button variant="primary" onClick={onExit}>
            Return to Dashboard
          </Button>
        </motion.div>
      </WrappedContainer>
    </div>
  );
}
