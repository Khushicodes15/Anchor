"use client";

import { useState } from "react";
import { useCommunityStories } from "@/hooks/useCommunityStories";

import ArchiveHeader from "@/components/community/archive/ArchiveHeader";
import StoryGrid from "@/components/community/archive/StoryGrid";
import SubmitStoryButton from "@/components/community/archive/SubmitStoryButton";
import SubmitStoryModal from "@/components/community/submit/SubmitStoryModal";

import LoadingPaper from "@/components/community/states/LoadingPaper";
import EmptyPaper from "@/components/community/states/EmptyPaper";

export default function CommunityArchivePage() {
  const { status, stories } = useCommunityStories();
  const [showSubmit, setShowSubmit] = useState(false);

  /* ===============================
     LOADING STATE
     =============================== */
  if (status === "loading") {
    return <LoadingPaper />;
  }



  /* ===============================
     ARCHIVE CONTENT
     =============================== */
  return (
    <section className="flex flex-col gap-12">
      <ArchiveHeader onSubmit={() => setShowSubmit(true)} />

      <StoryGrid stories={stories} />

      <SubmitStoryModal
        open={showSubmit}
        onClose={() => setShowSubmit(false)}
      />
    </section>
  );
}
