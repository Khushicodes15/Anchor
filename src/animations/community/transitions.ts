// src/animations/community/transitions.ts

import { crisisTheme } from "@/styles/Theme";

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: {
    duration: crisisTheme.animation.normal,
    ease: crisisTheme.animation.ease,
  },
};
