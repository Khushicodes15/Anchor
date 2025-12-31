"use client";

import { useState } from "react";
import SettingsSection from "./SettingsSection";
import { Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

export default function SecuritySection() {
  const { resetPassword } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    try {
      setError(null);
      await resetPassword();
      setEmailSent(true);
    } catch {
      setError("Couldn’t send reset email. Please try again.");
    }
  };

  return (
    <SettingsSection
      title="Security"
      description="Protect your account"
      icon={<Shield size={30} />}
    >
      {/* Tappable action */}
      <motion.button
        onClick={handleResetPassword}
        whileTap={{ scale: 0.96 }}
        whileHover={{ opacity: 0.85 }}
        transition={{ duration: 0.1 }}
        className="text-sm underline inline-flex items-center"
        style={{ color: crisisTheme.colors.textPrimary }}
      >
        Change password
      </motion.button>

      {/* Inline feedback */}
      <AnimatePresence>
        {emailSent && !error && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-sm"
            style={{ color: crisisTheme.colors.textSecondary }}
          >
            We’ve sent a secure password reset link to your email.
          </motion.p>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-sm"
            style={{ color: "#B45309" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </SettingsSection>
  );
}
