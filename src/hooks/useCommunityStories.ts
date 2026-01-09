"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchCommunityStories } from "@/services/communityApi";
import type { CommunityStory } from "@/types/community";

type Status = "loading" | "ready" | "empty" | "error";

export function useCommunityStories() {
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  const load = useCallback(async () => {
    try {
      setStatus("loading");
      const data = await fetchCommunityStories();

      if (data.length === 0) {
        setStories([]);
        setStatus("empty");
      } else {
        setStories(data);
        setStatus("ready");
      }
    } catch {
      setStories([]);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    stories,
    status,
    refetch: load,
  };
}
