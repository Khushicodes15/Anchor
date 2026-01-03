"use client";

import { useState } from "react";
import {
  likeCommunityStory,
  saveCommunityStory,
} from "@/services/communityApi";

export function useStoryReactions(storyId: string) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  async function like() {
    if (liked) return;
    setLiked(true);
    await likeCommunityStory(storyId);
  }

  async function save() {
    if (saved) return;
    setSaved(true);
    await saveCommunityStory(storyId);
  }

  return {
    like,
    save,
    liked,
    saved,
  };
}
