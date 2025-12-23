"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
      className={`
        bg-white/90 backdrop-blur-sm 
        rounded-3xl p-8 
        shadow-xl border border-gray-100
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}