"use client";

import GroundingSeeThree from "./SeeThreeThings";
import GroundingFeet from "./FeelYourFeet";

interface GroundingStepProps {
  text?: string;
  onNext: () => void;
}

export default function GroundingStep({
  text,
  onNext,
}: GroundingStepProps) {
  if (!text) return null;

  // Step 1 (index 1): Name 3 things you can see
  if (text.toLowerCase().includes("name 3")) {
    return <GroundingSeeThree onComplete={onNext} />;
  }

  // Step 2 (index 2): Feel your feet
  if (text.toLowerCase().includes("feet")) {
    return <GroundingFeet onComplete={onNext} />;
  }

  // Fallback (should never happen)
  return null;
}
