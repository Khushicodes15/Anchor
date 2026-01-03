"use client";

import { useState } from "react";
import { CommunityStory } from "@/types/community";

export function useCommunityStory() {
  const [story, setStory] = useState<CommunityStory | null>(null);

  function openStory(s: CommunityStory) {
    setStory(s);
  }

  function closeStory() {
    setStory(null);
  }

  return {
    story,
    openStory,
    closeStory,
  };
}
