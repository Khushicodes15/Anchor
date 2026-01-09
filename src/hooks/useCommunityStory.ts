"use client";

import { useEffect, useState } from "react";
import { fetchCommunityStories } from "@/services/communityApi";
import type { CommunityStory } from "@/types/community";

type Status = "loading" | "ready" | "error";

export function useCommunityStory(storyId?: string) {
  const [story, setStory] = useState<CommunityStory | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storyId) {
      setStatus("error");
      setError("Story ID missing");
      return;
    }

    let active = true;

    async function load() {
      try {
        setStatus("loading");

        const stories = await fetchCommunityStories();
        const found = stories.find((s) => s.id === storyId);

        if (!active) return;

        if (!found) {
          setStatus("error");
          setError("Story not found");
          return;
        }

        setStory(found);
        setStatus("ready");
      } catch (err) {
        if (!active) return;

        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Failed to load story"
        );
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [storyId]);

  return {
    story,
    status,
    error,
  };
}