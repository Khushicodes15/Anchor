"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

export default function SubmitStoryButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
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
    </motion.div>
  );
}
