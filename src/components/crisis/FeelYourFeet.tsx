"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GroundingFeet({
  onComplete,
}: {
  onComplete: () => void;
}) {
  return (
    <section
      className="fixed inset-x-0 bottom-0 flex flex-col"
      style={{
        top: "60px", // navbar height
        background: "#FFE27A",
      }}
    >
      {/* Instruction */}
      <div className="mt-24 text-center z-20 px-6">
        <h1
          className="text-3xl font-medium leading-relaxed"
          style={{ color: "#6B4A00" }}
        >
          Place your feet on the ground.
          <br />
          Feel the floor supporting you.
        </h1>
      </div>

      <div className="flex-1 relative flex flex-col items-center">
        {/* MAN */}
        <motion.div
          className="
            absolute left-1/2 -translate-x-1/2 z-20
            bottom-[18vh] sm:bottom-[6vh]
          "
          animate={{ y: [0, -4, 0] }}
        >
          <Image
            src="/walking-man.png"
            alt=""
            width={520}
            height={520}
            priority
            draggable={false}
            className="scale-110 sm:scale-100"
          />
        </motion.div>

        {/* CONTINUE BUTTON */}
        <div className="absolute bottom-16 z-30">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="px-14 py-4 rounded-full text-lg font-medium"
            style={{
              background: "#FFF192",
              color: "#2F7D5B",
            }}
          >
            Continue
          </motion.button>
        </div>
      </div>
    </section>
  );
}
