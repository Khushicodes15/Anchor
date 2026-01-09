"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import AppNavDrawer from "./AppNavDrawer";
import { crisisTheme } from "@/styles/Theme";

export default function AppNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-16 px-6 flex items-center justify-between backdrop-blur-sm"
        style={{
          background: "rgba(255,247,230,0.95)",
          borderBottom: `1px solid ${crisisTheme.colors.border}`,
        }}
      >
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <div
            className="text-lg font-semibold"
            style={{ color: crisisTheme.colors.textPrimary }}
          >
            Anchor
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg"
          style={{ color: crisisTheme.colors.textPrimary }}
        >
          <Menu size={22} />
        </button>
      </motion.nav>

      <AppNavDrawer isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}