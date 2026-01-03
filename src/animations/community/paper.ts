// src/animations/community/paper.ts

import { crisisTheme } from "@/styles/Theme";

export const paperReveal = {
  initial: { y: 30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
  },
  transition: {
    duration: crisisTheme.animation.slow,
    ease: crisisTheme.animation.ease,
  },
};

export const paperFloat = {
  animate: {
    y: [0, -6, 0],
  },
  transition: {
    duration: crisisTheme.animation.slow * 2,
    ease: crisisTheme.animation.ease,
    repeat: Infinity,
    repeatType: "mirror",
  },
};
