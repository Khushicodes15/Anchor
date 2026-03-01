"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle, ShieldCheck, HeartHandshake } from "lucide-react";
import { crisisTheme } from "@/styles/Theme";

export default function DashboardHeader() {
  const hasSafetyPlan = false;

  return (
    <div className="mb-6">

      {/* ── DESKTOP: single row, unchanged ── */}
      <div className="hidden sm:flex items-center justify-between gap-3">
        <Link href="/therapist">
          <motion.button
            whileHover={{ y: -1, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium"
            style={{ background: crisisTheme.colors.primarySoft, color: crisisTheme.colors.textPrimary, border: `1px solid ${crisisTheme.colors.border}` }}
          >
            <HeartHandshake size={18} />
            Therapist Support
          </motion.button>
        </Link>

        <Link href="/crisis">
          <motion.button
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.06, 1], boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 12px rgba(0,0,0,0.12)", "0 0 0px rgba(0,0,0,0)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: crisisTheme.colors.secondary, color: crisisTheme.colors.textPrimary, border: `1px solid ${crisisTheme.colors.border}`, willChange: "transform" }}
          >
            <AlertCircle size={18} />
            I Need Help Now
          </motion.button>
        </Link>

        <Link href="/safety-plan">
          <motion.button
            whileHover={{ y: -1, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium"
            style={{ background: crisisTheme.colors.primarySoft, color: crisisTheme.colors.textPrimary, border: `1px solid ${crisisTheme.colors.border}` }}
          >
            <ShieldCheck size={18} />
            {hasSafetyPlan ? "Review Your Safety Plan" : "Build Your Safety Plan"}
          </motion.button>
        </Link>
      </div>

      {/* ── MOBILE: Therapist + Safety Plan row, then Help Now centered below ── */}
      <div className="flex flex-col gap-2 sm:hidden">

        <div className="flex gap-2">
          <Link href="/therapist" className="flex-1">
            <motion.button
              whileHover={{ y: -1, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
              style={{ background: crisisTheme.colors.primarySoft, color: crisisTheme.colors.textPrimary, border: `1px solid ${crisisTheme.colors.border}` }}
            >
              <HeartHandshake size={15} />
              Therapist Support
            </motion.button>
          </Link>

          <Link href="/safety-plan" className="flex-1">
            <motion.button
              whileHover={{ y: -1, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
              style={{ background: crisisTheme.colors.primarySoft, color: crisisTheme.colors.textPrimary, border: `1px solid ${crisisTheme.colors.border}` }}
            >
              <ShieldCheck size={15} />
              {hasSafetyPlan ? "Review Safety Plan" : "Build Safety Plan"}
            </motion.button>
          </Link>
        </div>

        <div className="flex justify-center">
          <Link href="/crisis">
            <motion.button
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.06, 1], boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 12px rgba(0,0,0,0.12)", "0 0 0px rgba(0,0,0,0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium"
              style={{ background: crisisTheme.colors.secondary, color: crisisTheme.colors.textPrimary, border: `1px solid ${crisisTheme.colors.border}`, willChange: "transform" }}
            >
              <AlertCircle size={18} />
              I Need Help Now
            </motion.button>
          </Link>
        </div>

      </div>
    </div>
  );
}