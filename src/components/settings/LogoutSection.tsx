"use client";

import SettingsSection from "./SettingsSection";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

export default function LogoutSection() {
  const { logout } = useAuth();

  return (
    <SettingsSection title="Log out" icon={<LogOut size={30} />}>
      <motion.button
        onClick={logout}
        whileTap={{ scale: 0.96 }}
        whileHover={{ opacity: 0.85 }}
        transition={{ duration: 0.1 }}
        className="text-sm underline inline-flex items-center"
        style={{ color: crisisTheme.colors.textPrimary }}
      >
        Sign Out of Anchor
      </motion.button>
    </SettingsSection>
  );
}
