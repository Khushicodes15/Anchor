// src/types/community.ts
export type CommunityStory = {
  id: string;
  story: string;
  tags: string[];
  likes: number;
  saved: number;
  created_at: string;
};
