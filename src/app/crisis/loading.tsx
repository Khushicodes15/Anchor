"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

export default function CrisisLoading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#F5F6F2" }}
    >
      {/* Soft breathing pulse */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-40 h-40 rounded-full mb-10"
        style={{
          background: crisisTheme.colors.primarySoft,
        }}
      />

      {/* Gentle copy */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl md:text-2xl max-w-xl leading-relaxed"
        style={{ color: crisisTheme.colors.textPrimary }}
      >
        Take a moment.  
        <br />
        We’re here with you.
      </motion.p>
    </div>
  );
}