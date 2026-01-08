"use client";

import { useEffect, useState } from "react";
import EditableChip from "@/components/safety-plan/chips/EditableChip";
import { crisisTheme } from "@/styles/Theme";

type CopingStepProps = {
  value: string[];
  onChange: (next: string[]) => void;
};

export default function CopingStep({
  value,
  onChange,
}: CopingStepProps) {
  const [localValue, setLocalValue] = useState<string[]>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  function handleChange(next: string[]) {
    setLocalValue(next);
    onChange(next);
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        What usually helps you feel a little better?
      </h2>

      <p style={descriptionStyle}>
        Even small things count.
      </p>

      <EditableChip
        value={localValue}
        onChange={handleChange}
        placeholder="Add something that helps"
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