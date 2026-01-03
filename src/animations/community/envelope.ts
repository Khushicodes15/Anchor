// src/animations/community/envelope.ts

import { crisisTheme } from "@/styles/Theme";

export const envelopeOpen = {
  initial: { y: 0, opacity: 1 },
  animate: {
    y: 40,
    opacity: 0,
  },
  transition: {
    duration: crisisTheme.animation.normal,
    ease: crisisTheme.animation.ease,
  },
};

export const envelopeRise = {
  initial: { y: 80, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
  },
  transition: {
    duration: crisisTheme.animation.slow,
    ease: crisisTheme.animation.ease,
  },
};
