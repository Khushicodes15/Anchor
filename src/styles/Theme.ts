import { Easing } from "framer-motion";
export const crisisTheme = {
  colors: {
    /* ===============================
       GLOBAL BACKGROUND
       =============================== */
    background: "#FFF7E6", // warm cream

    /* ===============================
       SURFACES / CARDS
       =============================== */
    surface: "#FFFFFF",

    /* ===============================
       PRIMARY ACTIONS
       =============================== */
    primary: "#FF9F1C",       // sun orange
    primarySoft: "#FFE27A",   // sun glow yellow

    /* ===============================
       SECONDARY / SUPPORT
       =============================== */
    secondary: "#4E8D6A",     
    secondarySoft: "#E6F3EC", 

    /* ===============================
       TEXT
       =============================== */
    textPrimary: "#2F3326",   // calm dark olive (NOT white everywhere)
    textSecondary: "#5E6453",
    textTertiary: "#6B4A00",

    /* ===============================
       ACCENTS (very limited use)
       =============================== */
    accent: "#FFDD3C",        // warm yellow accent

    border: "rgba(0,0,0,0.08)",
  },

  radius: {
    sm: "10px",
    md: "16px",
    lg: "24px",
    pill: "999px",
  },

  spacing: {
    section: "clamp(24px, 5vw, 64px)",
    card: "24px",
  },

  animation: {
    slow: 1.6,
    normal: 0.8,
    ease: "easeInOut" as Easing,
  },
};
