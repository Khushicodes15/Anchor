"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { crisisTheme } from "@/styles/Theme";
import Button from "@/components/ui/Button";
import { useSubmitCommunityStories } from "@/hooks/useSubmitCommunityStories";

export default function SubmitStoryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [story, setStory] = useState("");
  const [tags, setTags] = useState("");

  const {
    submit,
    loading,
    submitted,
    error,
  } = useSubmitCommunityStories();

  async function handleSubmit() {
    if (!story.trim()) return;

    submit({
      story: story.trim(),
      tags: tags
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
    });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: "rgba(255,247,230,0.94)",
            backdropFilter: "blur(3px)",
          }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-xl border"
            style={{ borderColor: crisisTheme.colors.border }}
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-6">
                <h2
                  className="text-2xl font-medium"
                  style={{ color: crisisTheme.colors.textPrimary }}
                >
                  Thank you for leaving this here
                </h2>

                <p
                  className="text-base leading-relaxed"
                  style={{ color: crisisTheme.colors.textSecondary }}
                >
                  Your story has been received.
                  <br />
                  It will be reviewed before appearing in the Community Library.
                  <br />
                  <br />
                  We’re grateful you chose to share this.
                </p>

                <Button variant="primary" onClick={onClose}>
                  Back to Library
                </Button>
              </div>
            ) : (
              <>
                <h2
                  className="text-2xl font-medium mb-6 text-center"
                  style={{ color: crisisTheme.colors.textPrimary }}
                >
                  Leave a story
                </h2>

                <textarea
                  value={story}
                  onChange={e => setStory(e.target.value)}
                  rows={6}
                  placeholder="Write only what feels safe to share…"
                  className="w-full rounded-2xl p-4 mb-4 outline-none resize-none border"
                  style={{
                    borderColor: crisisTheme.colors.border,
                    color: crisisTheme.colors.textPrimary,
                  }}
                />

                <input
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="Optional tags (comma separated)"
                  className="w-full rounded-full px-4 py-3 mb-6 outline-none border"
                  style={{
                    borderColor: crisisTheme.colors.border,
                    color: crisisTheme.colors.textPrimary,
                  }}
                />

                {error && (
                  <p
                    className="text-sm mb-4 text-center"
                    style={{ color: crisisTheme.colors.textSecondary }}
                  >
                    {error}
                  </p>
                )}

                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Leaving…" : "Submit"}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
