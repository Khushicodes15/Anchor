"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { crisisTheme } from "@/styles/Theme";

export default function Loading() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start overflow-hidden"
      style={{
        background: crisisTheme.colors.secondarySoft,
      }}
    >
      {/* SKY AREA */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        {/* Floating paper plane */}
        <motion.div
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 2.5,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/plane1.png" 
            alt="Paper plane"
            width={340}
            height={340}
            priority
          />
        </motion.div>
      </div>

      {/* CLOUD + TEXT */}
      <div className="relative w-full">
        {/* Cloud shape */}
        <div
          className="w-full"
          style={{
            background: crisisTheme.colors.surface,
            borderTopLeftRadius: "100% 40%",
            borderTopRightRadius: "100% 40%",
          }}
        >
          <div className="max-w-xl mx-auto px-6 py-16 text-center">
            <h1
              className="text-4xl font-semibold mb-4"
              style={{ color: crisisTheme.colors.textPrimary }}
            >
              Woo hoo!
            </h1>

            <p
              className="text-lg leading-relaxed"
              style={{ color: crisisTheme.colors.textSecondary }}
            >
              Getting things ready for you.
              <br />
              Just a moment…
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
