"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle, ShieldCheck, HeartHandshake } from "lucide-react";
import { crisisTheme } from "@/styles/Theme";

export default function DashboardHeader() {
  const hasSafetyPlan = false;

  return (
    <div className="flex items-center justify-between mb-6 gap-3">

      {/* Therapist Support – Left (same style as Safety Plan) */}
      <Link href="/therapist">
        <motion.button
          whileHover={{ y: -1, scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium"
          style={{
            background: crisisTheme.colors.primarySoft,
            color: crisisTheme.colors.textPrimary,
            border: `1px solid ${crisisTheme.colors.border}`,
          }}
        >
          <HeartHandshake size={18} />
          Therapist Support
        </motion.button>
      </Link>

      {/* I Need Help Now – Middle (pulsing, existing color) */}
      <Link href="/crisis">
        <motion.button
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.06, 1],
            boxShadow: [
              "0 0 0px rgba(0,0,0,0)",
              "0 0 12px rgba(0,0,0,0.12)",
              "0 0 0px rgba(0,0,0,0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
          style={{
            background: crisisTheme.colors.secondary,
            color: crisisTheme.colors.textPrimary,
            border: `1px solid ${crisisTheme.colors.border}`,
            willChange: "transform",
          }}
        >
          <AlertCircle size={18} />
          I Need Help Now
        </motion.button>
      </Link>

      {/* Safety Plan – Right */}
      <Link href="/safety-plan">
        <motion.button
          whileHover={{ y: -1, scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium"
          style={{
            background: crisisTheme.colors.primarySoft,
            color: crisisTheme.colors.textPrimary,
            border: `1px solid ${crisisTheme.colors.border}`,
          }}
        >
          <ShieldCheck size={18} />
          {hasSafetyPlan ? "Review Your Safety Plan" : "Build Your Safety Plan"}
        </motion.button>
      </Link>

    </div>
  );
}