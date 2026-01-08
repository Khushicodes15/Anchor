"use client";

import { crisisTheme } from "@/styles/Theme";

type ReasonStepProps = {
  value: string;
  onChange: (next: string) => void;
};

export default function ReasonStep({
  value,
  onChange,
}: ReasonStepProps) {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        Is there something that reminds you why you want to keep going?
      </h2>

      <p style={descriptionStyle}>
        This is optional. It could be a person, a memory, a goal, or anything
        meaningful to you.
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="You can write something here if you want"
        rows={4}
        style={textareaStyle}
      />
    </div>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 16,
};

const titleStyle = {
  margin: 0,
  fontSize: "1.1rem",
  fontWeight: 600,
  color: crisisTheme.colors.textPrimary,
};

const descriptionStyle = {
  margin: 0,
  fontSize: "0.9rem",
  color: crisisTheme.colors.textSecondary,
};

const textareaStyle = {
  resize: "none" as const,
  border: `1px solid ${crisisTheme.colors.border}`,
  borderRadius: crisisTheme.radius.sm,
  padding: 10,
  fontSize: "0.9rem",
  color: crisisTheme.colors.textPrimary,
  outline: "none",
};
