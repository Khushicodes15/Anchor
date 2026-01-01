"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { crisisTheme } from "@/styles/Theme";

interface WeatherSceneProps {
  weather: string;
}

export default function WeatherScene({ weather }: WeatherSceneProps) {
  const isStormy = weather === "stormy";
  const isCloudy = weather === "cloudy";
  const isStormyThenCalm = weather === "stormy_then_calm";
  const isMostlyClear = weather === "mostly_clear";
  const isCalm = weather === "calm";

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ backgroundColor: crisisTheme.colors.background }}
    >
      {/* ===== TOP IMAGE (STORM) ===== */}
      {(isStormy || isStormyThenCalm) && (
        <motion.div
          className="absolute top-0 left-0 w-full z-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <Image
            src="/stormy1.png"
            alt="Storm"
            width={1920}
            height={320}
            className="object-cover object-top"
            priority
          />
        </motion.div>
      )}

      {/* ===== FULL PAGE BLEND (STORM → CALM) ===== */}
      {(isStormyThenCalm || isMostlyClear) && (
        <motion.div
          className="absolute inset-0 z-5"
          initial={{ opacity: isStormyThenCalm ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: isStormyThenCalm ? 2.2 : 0,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/sun_cloud.png"
            alt="Transition sky"
            fill
            className="w-full object-bottom"
          />
        </motion.div>
      )}

      {/* ===== BOTTOM IMAGE ===== */}
      {(isCloudy || isCalm) && (
        <motion.div
          className="absolute bottom-0 left-0 w-full z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <Image
            src={isCloudy ? "/cloud1.png" : "/sun2.png"}
            alt="Ground"
            width={1920}
            height={120}
            className="object-cover object-bottom"
          />
        </motion.div>
      )}

      {/* ===== TEXT (SAFE ZONE) ===== */}
<div className="absolute inset-0 z-20 pointer-events-none">
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="
      absolute
      top-[38%] md:top-[40%]
      left-1/2 -translate-x-1/2
      text-center
      max-w-xl
      px-6
    "
  >
    <p
      className="text-xl md:text-2xl mb-4"
      style={{ color: crisisTheme.colors.textSecondary }}
    >
      This month felt
    </p>

    <h2
      className="text-3xl md:text-4xl font-semibold capitalize"
      style={{ color: crisisTheme.colors.textPrimary }}
    >
      {weather.replaceAll("_", " ")}
    </h2>
  </motion.div>
</div>

    </div>
  );
}
