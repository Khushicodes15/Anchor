// src/app/community/[storyId]/error.tsx

"use client";

import ErrorPaper from "@/components/community/states/ErrorPaper";

export default function StoryErrorPage() {
  return (
    <ErrorPaper message="This story couldn’t be opened right now. You’re safe to step away." />
  );
}
