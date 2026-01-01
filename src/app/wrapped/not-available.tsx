// src/app/wrapped/not-available.tsx
"use client";

import WrappedContainer from "@/components/wrapped/WrappedContainer";
import { motion } from "framer-motion";

export default function NotAvailable() {
  return (
    <WrappedContainer>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl mb-6"
      >
        Your Anchor Wrapped isn’t ready yet
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg opacity-75"
      >
        Once you’ve spent a little more time journaling, your story will appear
        here.
      </motion.p>
    </WrappedContainer>
  );
}
