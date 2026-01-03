"use client";

import { useState } from "react";
import type { CommunityStory } from "@/types/community";

import EnvelopeCard from "./EnvelopeCard";
import StoryContent from "@/components/community/story/StoryContent";

interface StoryGridProps {
  stories: CommunityStory[];
}

export default function StoryGrid({ stories }: StoryGridProps) {
  const [activeStory, setActiveStory] =
    useState<CommunityStory | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {stories.map((story) => (
          <EnvelopeCard
            key={story.id}
            tags={story.tags}
            onOpen={() => setActiveStory(story)}
          />
        ))}
      </div>

      <StoryContent
        story={activeStory}
        onClose={() => setActiveStory(null)}
      />
    </>
  );
}
