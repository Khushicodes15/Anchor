"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import WrappedContainer from "@/components/wrapped/WrappedContainer";
import { ChevronRight } from "lucide-react";

interface CharactersSceneProps {
  characters: string[];
  onComplete: () => void;
}

const CHARACTER_COPY: Record<string, string> = {
  "Inner Critic": "This voice questioned you — but it was trying to protect you.",
  "Resilient Self": "You kept going, even when it felt heavy.",
  "Calm Observer": "Some moments, you learned to pause and breathe.",
  "Overthinker": "Your mind ran ahead — because it cares deeply.",
  "Quiet Optimist": "A small hope showed up, again and again.",
  "Protector": "You stood up for yourself when it mattered.",
};

function getCharacterImage(character: string) {
  const map: Record<string, string> = {
    "Inner Critic": "/inner-critic.png",
    "Resilient Self": "/resilient-self.png",
    "Calm Observer": "/calm-observer.png",
    "Overthinker": "/overthinker.png",
    "Quiet Optimist": "/quiet-optimist.png",
    "Protector": "/protector.png",
  };

  return map[character];
}

const cardVariants = {
  enter: { x: 140, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -140, opacity: 0 },
};

export default function CharactersScene({
  characters,
  onComplete,
}: CharactersSceneProps) {
  const [index, setIndex] = useState(0);

  const character = characters[index];
  const image = getCharacterImage(character);
  const description = CHARACTER_COPY[character];

  const hasNext = index < characters.length - 1;

  /** Arrow click → next character only */
  const handleNextCharacter = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasNext) setIndex((i) => i + 1);
  };

  /** Background tap → next scene */
  const handleBackgroundTap = () => {
    onComplete();
  };

  return (
    <div className="w-full h-full" onClick={handleBackgroundTap}>
      <WrappedContainer>
        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl md:text-4xl mb-12 text-center"
        >
          These parts of you showed up
        </motion.h2>

        {/* STAGE */}
        <div className="relative flex justify-center items-center h-[400px] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={character}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative flex flex-col items-center text-center max-w-sm"
            >
              {/* IMAGE */}
              {image && (
                <div className="relative mb-6">
                  <Image
                    src={image}
                    alt={character}
                    width={240}
                    height={240}
                    className="rounded-3xl"
                    priority
                  />

                  {/* glow */}
                  <div className="absolute inset-0 rounded-3xl bg-[#FFD88A] blur-3xl opacity-40 -z-10" />
                </div>
              )}

              {/* NAME */}
              <h3 className="text-2xl font-semibold mb-2">
                {character}
              </h3>

              {/* COPY */}
              <p className="text-base opacity-75 leading-relaxed">
                {description}
              </p>

              {/* RIGHT ARROW (only if more characters) */}
              {hasNext && (
                <button
                    onClick={handleNextCharacter}
                    className="
                    absolute
                    md:right-[-150px] md:top-1/3 md:-translate-y-1/2
                    bottom-[-56px] md:bottom-auto
                    left-1/2 md:left-auto
                    -translate-x-1/2 md:translate-x-0
                    p-3
                    rounded-full
                    opacity-70 hover:opacity-100
                    transition
                    "
                >
                    <ChevronRight size={32} />
                </button>
                )}

            </motion.div>
          </AnimatePresence>
        </div>
      </WrappedContainer>
    </div>
  );
}
