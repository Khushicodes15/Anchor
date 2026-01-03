"use client";

import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties; // ✅ added
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  style,
}: ButtonProps) {
  const baseStyles =
    "rounded-full font-semibold transition-all relative overflow-hidden group";

  const variants = {
    primary: "bg-[#FFE27A] text-[#6B4A00] hover:bg-[#7a7f6d]",
    secondary: "bg-[#595E48] text-white hover:bg-[#4a503d]",
    outline:
      "border-2 border-[#919682] text-[#919682] hover:bg-[#919682] hover:text-white",
  };

  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={style} // ✅ passed through
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <span className="relative z-10">{children}</span>

      {/* Ripple effect */}
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 2, opacity: 0.2 }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
}
