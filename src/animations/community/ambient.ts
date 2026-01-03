// src/animations/community/ambient.ts

import { crisisTheme } from "@/styles/Theme";

export const ambientDrift = {
  duration: crisisTheme.animation.slow * 4,
  ease: crisisTheme.animation.ease,
  repeat: Infinity,
  repeatType: "mirror" as const,
};
