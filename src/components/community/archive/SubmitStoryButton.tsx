"use client";

import Button from "@/components/ui/Button";
import { crisisTheme } from "@/styles/Theme";

export default function SubmitStoryButton({
  onClick,
}: {
  onClick: () => void;
}) {
  // ✅ Fix: motion.div was creating a stacking context above the navbar.
  // Plain div has no stacking context — framer-motion on the parent
  // motion.header already handles the entrance animation for this button.
  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        onClick={onClick}
        style={{
          borderColor: crisisTheme.colors.primary,
          color: crisisTheme.colors.primary,
        }}
      >
        Leave a story
      </Button>
    </div>
  );
}