// src/components/community/visuals/EnvelopeSVG.tsx

"use client";

import { crisisTheme } from "@/styles/Theme";

export default function EnvelopeSVG() {
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="12"
        width="112"
        height="60"
        rx="10"
        fill={crisisTheme.colors.primarySoft}
        stroke={crisisTheme.colors.border}
      />
      <path
        d="M10 18L60 46L110 18"
        stroke={crisisTheme.colors.primary}
        strokeOpacity="0.35"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
