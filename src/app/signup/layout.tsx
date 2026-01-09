"use client";

import type { ReactNode } from "react";
import { headingFont, bodyFont } from "@/styles/fonts";

interface SignupLayoutProps {
  children: ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (
    <div
      className={`
        min-h-screen w-full
        font-body antialiased
        bg-white text-gray-900
        ${headingFont.variable}
        ${bodyFont.variable}
      `}
    >
      {children}
    </div>
  );
}
