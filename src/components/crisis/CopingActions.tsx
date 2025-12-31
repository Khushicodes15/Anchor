"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

type Props = {
  strategies: string[];
  onNext: () => void;
};

export default function CopingActions({ strategies, onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section
      className="fixed left-0 right-0 bottom-0 flex overflow-hidden"
      style={{
        top: "60px", // navbar height — DO NOT REMOVE
        background: crisisTheme.colors.background,
      }}
    >
      {/* LEFT CONTENT */}
      <div
        className="flex-1 flex flex-col z-10"
        style={{
          paddingTop: "96px", // 🔑 pushes content BELOW navbar safely
          paddingLeft: "8vw", // 🔑 moves away from extreme left
        }}
      >
        <h2
          className="text-3xl font-medium mb-10 max-w-md"
          style={{ color: crisisTheme.colors.textPrimary }}
        >
          Choose something that usually helps
        </h2>

        {/* STRATEGIES */}
        <div
          className="grid gap-5 max-w-xl"
          style={{
            gridTemplateColumns:
              strategies.length > 4 ? "1fr 1fr" : "1fr",
          }}
        >
          {strategies.map((item) => {
            const isActive = selected === item;

            return (
              <motion.button
                key={item}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelected(item)}
                className="px-8 py-5 rounded-full text-left text-lg transition-colors"
                style={{
                  background: isActive
                    ? "#4F8F6A" // calm green confirmation
                    : crisisTheme.colors.primarySoft,
                  color: isActive
                    ? "#FFFFFF"
                    : crisisTheme.colors.textSecondary,
                }}
              >
                {item}
              </motion.button>
            );
          })}
        </div>

        {/* FEEDBACK */}
        {selected && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-lg max-w-md"
            style={{ color: crisisTheme.colors.textSecondary }}
          >
            You chose <strong>{selected}</strong>.
            <br />
            Take a moment — you’re doing the right thing.
          </motion.p>
        )}

        {/* CONTINUE */}
        <button
          disabled={!selected}
          onClick={onNext}
          className="mt-10 w-fit px-12 py-4 rounded-full text-lg disabled:opacity-40"
          style={{
            background: crisisTheme.colors.primary,
            color: "#FFFFFF",
          }}
        >
          Continue
        </button>
      </div>

      {/* RIGHT QUADRANT */}
      <motion.svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMaxYMax slice"
        className="absolute bottom-0 right-0 w-[60vw] h-[60vw] pointer-events-none"
      >
        <circle cx="1000" cy="1000" r="520" fill="#FFE27A" />
        <circle cx="1000" cy="1000" r="420" fill="#FFD96A" />
        <circle cx="1000" cy="1000" r="320" fill="#FF9F1C" />

        {/* SMILE */}
        <g
          transform="translate(850 850) rotate(-45)"
          stroke="#6B4A00"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          opacity="0.35"
        >
          <path d="M-40 -20 q20 -14 40 0" />
          <path d="M20 -20 q20 -14 40 0" />
          <path d="M-25 15 q35 30 70 0" />
        </g>
      </motion.svg>
    </section>
  );
}
