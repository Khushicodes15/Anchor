"use client";

import { useState } from "react";
import { submitCommunityStory } from "@/services/communityApi";

type ErrorType = "auth" | "content" | "unknown" | null;

export function useSubmitCommunityStories() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  async function submit(payload: {
    story: string;
    tags: string[];
  }) {
    try {
      setLoading(true);
      setError(null);

      await submitCommunityStory(payload);
      setSubmitted(true);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "AUTH_REQUIRED") {
          setError("auth");
          return;
        }
        if (err.message === "CONTENT_BLOCKED") {
          setError("content");
          return;
        }
      }
      setError("unknown");
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
