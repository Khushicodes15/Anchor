"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function SettingsSection({
  title,
  description,
  icon,
  children,
}: SettingsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl p-6 md:p-8 shadow-sm"
      style={{
        background: crisisTheme.colors.surface,
        border: `1px solid ${crisisTheme.colors.border}`,
        color: crisisTheme.colors.textPrimary,
      }}
   

    >
      <header className="mb-6 flex items-start gap-3">
        {icon && (
          <div
            className="mt-1"
            style={{ color: crisisTheme.colors.secondary }}
          >
            {icon}
          </div>
        )}

        <div className="space-y-1">
          <h2
            className="text-xl font-bold"
            style={{ color: crisisTheme.colors.textTertiary }}
          >
            {title}
          </h2>

          {description && (
            <p
              className="text-sm"
              style={{ color: crisisTheme.colors.textTertiary }}
            >
              {description}
            </p>
          )}
        </div>
      </header>
      
      

      {children}
    </motion.section>
  );
}

