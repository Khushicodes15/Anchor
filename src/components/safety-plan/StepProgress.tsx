"use client";

import { crisisTheme } from "@/styles/Theme";

type StepKey =
  | "triggers"
  | "coping"
  | "contacts"
  | "reason"
  | "review";

type StepProgressProps = {
  steps: StepKey[];
  currentStep: StepKey;
};

const STEP_LABELS: Record<StepKey, string> = {
  triggers: "Triggers",
  coping: "Coping",
  contacts: "People",
  reason: "Reminder",
  review: "Review",
};

export default function StepProgress({
  steps,
  currentStep,
}: StepProgressProps) {
  return (
    <nav
      aria-label="Safety plan progress"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {steps.map((step) => {
        const isActive = step === currentStep;

        return (
          <span
            key={step}
            style={{
              padding: "6px 12px",
              borderRadius: crisisTheme.radius.pill,
              fontSize: "0.8rem",
              fontWeight: 500,
              background: isActive
                ? crisisTheme.colors.primarySoft
                : crisisTheme.colors.secondarySoft,
              color: isActive
                ? crisisTheme.colors.textPrimary
                : crisisTheme.colors.textSecondary,
              transition: `all ${crisisTheme.animation.normal}s ${crisisTheme.animation.ease}`,
            }}
          >
            {STEP_LABELS[step]}
          </span>
        );
      })}
    </nav>
  );
}
