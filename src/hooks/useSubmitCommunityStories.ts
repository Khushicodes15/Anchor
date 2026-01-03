"use client";

import { useState } from "react";
import { submitCommunityStory } from "@/services/communityApi";

export function useSubmitCommunityStories() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(payload: {
    story: string;
    tags: string[];
  }) {
    try {
      setLoading(true);
      setError(null);

      await submitCommunityStory(payload);
      setSubmitted(true);
    } catch {
      setError("Something didn’t go through. You can try again.");
    } finally {
      setLoading(false);
    }
  }

  return {
    submit,
    loading,
    submitted,
    error,
  };
}
