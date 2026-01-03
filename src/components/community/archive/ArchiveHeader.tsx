"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";
import SubmitStoryButton from "./SubmitStoryButton";

export default function ArchiveHeader({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: crisisTheme.animation.normal,
        ease: crisisTheme.animation.ease,
      }}
      className="
        relative
        -mt-4 md:-mt-8     /* ⬆️ move up slightly on all, more on desktop */
        mb-6 md:mb-8
      "
    >
      <div className="relative w-full max-w-6xl mx-auto px-6">
        {/* DESKTOP: right-aligned action */}
        <div className="hidden md:block absolute right-[-150] top-1/4 -translate-y-1/2">
          <SubmitStoryButton onClick={onSubmit} />
        </div>

        {/* CENTERED TITLE + SUBTITLE */}
        <div className="flex flex-col gap-4 text-center">
          <h1
            className="text-3xl md:text-4xl font-medium"
            style={{ color: crisisTheme.colors.textPrimary }}
          >
            Community Library
          </h1>

          <p
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: crisisTheme.colors.textSecondary }}
          >
            A quiet archive of personal reflections left anonymously.
            <br />
            Read only what feels right.
          </p>
        </div>

        {/* MOBILE: button under header */}
        <div className="mt-6 flex justify-center md:hidden">
          <SubmitStoryButton onClick={onSubmit} />
        </div>
      </div>
    </motion.header>
  );
}
