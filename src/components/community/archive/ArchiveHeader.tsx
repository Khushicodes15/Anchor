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
      className="relative -mt-4 md:-mt-8 mb-6 md:mb-8"
    >
      <div className="relative w-full max-w-6xl mx-auto px-6">

        {/* DESKTOP: 3-col grid — spacer | title+subtitle | button */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div />

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

          <div className="flex justify-end">
            <SubmitStoryButton onClick={onSubmit} />
          </div>
        </div>

        {/* MOBILE: stacked */}
        <div className="flex flex-col gap-4 text-center md:hidden">
          <h1
            className="text-3xl font-medium"
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
          <div className="mt-2 flex justify-center">
            <SubmitStoryButton onClick={onSubmit} />
          </div>
        </div>

      </div>
    </motion.header>
  );
}