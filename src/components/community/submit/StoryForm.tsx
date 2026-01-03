"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TagInput from "./TagInput";
import { submitCommunityStory } from "@/services/communityApi";

export default function StoryForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [story, setStory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!story.trim()) return;

    setSubmitting(true);
    try {
      await submitCommunityStory({ story, tags });
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">
        Leave something you once needed to hear
      </h2>

      <textarea
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Write freely. No names. No advice. Just what helped you survive."
        className="w-full h-40 p-4 rounded-xl border resize-none"
      />

      <TagInput tags={tags} onChange={setTags} />

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          Leave it here
        </Button>
      </div>
    </div>
  );
}
