// src/app/community/[storyId]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import { useCommunityStory } from "@/hooks/useCommunityStory";

import EnvelopeOpenAnimation from "@/components/community/story/EnvelopeOpenAnimation";
import StoryContent from "@/components/community/story/StoryContent";
import LoadingPaper from "@/components/community/states/LoadingPaper";
import ErrorPaper from "@/components/community/states/ErrorPaper";

export default function CommunityStoryPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const router = useRouter();

  const { status, story, error } = useCommunityStory(storyId);

  if (status === "loading") {
    return <LoadingPaper />;
  }

  if (status === "error" || !story) {
    return <ErrorPaper message={error} />;
  }

  return (
    <EnvelopeOpenAnimation onClose={() => router.push("/community")}>
      <StoryContent story={story} />
    </EnvelopeOpenAnimation>
  );
}
