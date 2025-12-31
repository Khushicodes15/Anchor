"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
      style={{ background: crisisTheme.colors.background }}
    >
      <div className="max-w-3xl mx-auto px-6 pt-10 space-y-12">
        {/* Page Header */}
        <header className="space-y-2">
          <h1
            className="text-4xl md:text-5xl font-Inter"
            style={{ color: crisisTheme.colors.textPrimary }}
          >
            Settings
          </h1>

          <p
            className="text-lg"
            style={{ color: crisisTheme.colors.textTertiary }}
          >
            Manage your account, security, and preferences
          </p>
        </header>

        {/* Content */}
        <section className="space-y-10">
          {children}
        </section>
      </div>
    </motion.main>
  );
}
