"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { CommunityStory } from "@/types/community";

import EnvelopeOpenAnimation from "./EnvelopeOpenAnimation";
import EnvelopeCloseAnimation from "./EnvelopeCloseAnimation";
import PaperSheet from "./PaperSheet";
import Button from "@/components/ui/Button";

/* ✅ ADDED */
import LikeButton from "@/components/community/interactions/LikeButton";
import SaveButton from "@/components/community/interactions/SaveButton";

export default function StoryContent({
  story,
  onClose,
}: {
  story: CommunityStory | null;
  onClose: () => void;
}) {
  const [closing, setClosing] = useState(false);
  const [closedDone, setClosedDone] = useState(false);

  if (!story) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-6 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: "rgba(255,247,230,0.96)" }}
      >
        {/* OPEN / READING */}
        {!closing && (
          <EnvelopeOpenAnimation>
            <PaperSheet story={story} />

            {/* ✅ ADDED: LIKE + SAVE */}
            <div className="mt-6 flex justify-center gap-8">
              <LikeButton
                storyId={story.id}
                initialCount={story.likes ?? 0}
              />
              <SaveButton
                storyId={story.id}
                initialCount={story.saved ?? 0}
              />
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                variant="secondary"
                onClick={() => setClosing(true)}
              >
                Finish
              </Button>
            </div>
          </EnvelopeOpenAnimation>
        )}

        {/* CLOSING */}
        {closing && (
          <EnvelopeCloseAnimation
            onComplete={() => setClosedDone(true)}
          >
            <PaperSheet story={story} />
          </EnvelopeCloseAnimation>
        )}

        {/* POST-CLOSE ACTIONS */}
        {closedDone && (
          <motion.div
            className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col gap-4 items-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Button
              variant="primary"
              onClick={() => {
                setClosing(false);
                setClosedDone(false);
              }}
            >
              Read again
            </Button>

            <Button
              variant="outline"
              onClick={onClose}
            >
              Back to library
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
