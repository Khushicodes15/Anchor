// src/components/community/visuals/SoftDivider.tsx

"use client";

import { crisisTheme } from "@/styles/Theme";

export default function SoftDivider() {
  return (
    <div
      className="w-full my-8"
      style={{
        height: "1px",
        background: crisisTheme.colors.border,
        opacity: 0.6,
      }}
    />
  );
}
