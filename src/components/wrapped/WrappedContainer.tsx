"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

interface WrappedContainerProps {
  children: ReactNode;
  className?: string;
}

export default function WrappedContainer({ children }: WrappedContainerProps) {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center px-6"
      style={{
        background: crisisTheme.colors.background,
        color: crisisTheme.colors.textPrimary,
      }}
    >
      {/* ===== Background Motion Layer ===== */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: crisisTheme.colors.primarySoft,
          opacity: 0.35,
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 -right-40 w-[520px] h-[520px] rounded-full blur-3xl"
        style={{
          background: crisisTheme.colors.secondarySoft,
          opacity: 0.35,
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[-200px] left-1/3 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: crisisTheme.colors.accent,
          opacity: 0.18,
        }}
        animate={{
          x: [0, -60, 30, 0],
          y: [0, -30, 50, 0],
        }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ===== Content Layer ===== */}
      <motion.div
        className="relative z-10 w-full max-w-3xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
