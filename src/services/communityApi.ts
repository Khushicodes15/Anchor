import { CommunityStory } from "@/types/community";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/* =====================================================
   FETCH ALL STORIES
   ===================================================== */
export async function fetchCommunityStories(): Promise<CommunityStory[]> {
  if (!API_BASE_URL) throw new Error("API base URL missing");

  const res = await fetch(`${API_BASE_URL}/community/stories`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch community stories");
  }

  const json = await res.json();

  if (!json || !Array.isArray(json.stories)) {
    return [];
  }

  return json.stories;
}

/* =====================================================
   SUBMIT STORY
   ===================================================== */
export async function submitCommunityStory(payload: {
  story: string;
  tags: string[];
}): Promise<void> {
  if (!API_BASE_URL) throw new Error("API base URL missing");

  const res = await fetch(`${API_BASE_URL}/community/story`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Story submission failed");
  }
}

/* =====================================================
   REACTIONS (ONE-WAY, FAIL-SOFT)
   ===================================================== */
export async function likeCommunityStory(storyId: string): Promise<void> {
  if (!API_BASE_URL) return;

  try {
    await fetch(`${API_BASE_URL}/community/story/${storyId}/like`, {
      method: "POST",
    });
  } catch {
    // silent by design
  }
}

export async function saveCommunityStory(storyId: string): Promise<void> {
  if (!API_BASE_URL) return;

  try {
    await fetch(`${API_BASE_URL}/community/story/${storyId}/save`, {
      method: "POST",
    });
  } catch {
    // silent by design
  }
}
