// src/services/communityApi.ts
import { auth } from "@/lib/firebase";
import type { CommunityStory } from "@/types/community";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/* ===============================
   FETCH STORIES
   =============================== */
export async function fetchCommunityStories(): Promise<CommunityStory[]> {
  if (!API_BASE_URL) throw new Error("API_BASE_URL_MISSING");

  const res = await fetch(
    `${API_BASE_URL}/community/fetch/stories`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("FETCH_FAILED");
  }

  const json = await res.json();
  return Array.isArray(json.stories) ? json.stories : [];
}

/* ===============================
   SUBMIT STORY
   =============================== */
export async function submitCommunityStory(payload: {
  story: string;
  tags: string[];
}): Promise<void> {
  if (!API_BASE_URL) throw new Error("API base URL missing");

  const res = await fetch(
    `${API_BASE_URL}/community/post/story`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Story submission failed");
  }
}

/* ===============================
   REACTIONS (FAIL-SOFT)
   =============================== */
export async function likeCommunityStory(storyId: string) {
  if (!API_BASE_URL) return;

  fetch(`${API_BASE_URL}/community/story/like?story_id=${storyId}`, {
    method: "POST",
  }).catch(() => {});
}

export async function saveCommunityStory(storyId: string) {
  if (!API_BASE_URL) return;

  fetch(`${API_BASE_URL}/community/story/save?story_id=${storyId}`, {
    method: "POST",
  }).catch(() => {});
}
