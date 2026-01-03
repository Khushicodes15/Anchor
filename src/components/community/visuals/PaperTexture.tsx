// src/components/community/visuals/PaperTexture.tsx

"use client";

import { crisisTheme } from "@/styles/Theme";

export default function PaperTexture() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.02) 1px, transparent 0)",
        backgroundSize: "6px 6px",
        opacity: 0.35,
        borderRadius: crisisTheme.radius.lg,
      }}
    />
  );
}
