"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

type Props = {
  label: string;
  href: string;
  icon: any;
  isActive: boolean;
  onClick?: () => void;
};

export default function NavItem({
  label,
  href,
  icon: Icon,
  isActive,
  onClick,
}: Props) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        whileHover={{ x: 4 }}
        className="flex items-center gap-3 px-4 py-2 rounded-xl transition-colors"
        style={{
          background: isActive
            ? crisisTheme.colors.primarySoft
            : "transparent",
          color: isActive
            ? crisisTheme.colors.textPrimary
            : crisisTheme.colors.textSecondary,
        }}
      >
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </motion.div>
    </Link>
  );
}
