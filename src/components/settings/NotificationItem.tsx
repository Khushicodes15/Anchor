"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

interface NotificationItemProps {
  message: string;
  acknowledged: boolean;
  onClick: () => void;
}

export default function NotificationItem({
  message,
  acknowledged,
  onClick,
}: NotificationItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className="w-full text-left rounded-xl p-4 transition"
      style={{
        background: acknowledged
          ? crisisTheme.colors.background
          : crisisTheme.colors.primarySoft,
      }}
    >
      <p
        className="text-sm"
        style={{
          color: crisisTheme.colors.textPrimary,
          opacity: acknowledged ? 0.7 : 1,
        }}
      >
        {message}
      </p>
    </motion.button>
  );
}
