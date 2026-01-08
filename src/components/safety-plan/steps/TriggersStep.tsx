"use client";

import { useEffect, useState } from "react";
import EditableChip from "@/components/safety-plan/chips/EditableChip";
import { crisisTheme } from "@/styles/Theme";

type TriggersStepProps = {
  value: string[];
  onChange: (next: string[]) => void;
};

export default function TriggersStep({
  value,
  onChange,
}: TriggersStepProps) {
  const [localValue, setLocalValue] = useState<string[]>(value);

  // Sync parent → local when navigating back
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
        What usually makes things feel overwhelming for you?
      </h2>

      <p style={descriptionStyle}>
        This can include situations, thoughts, or moments that tend to be
        difficult.
      </p>

      <EditableChip
        value={localValue}
        onChange={handleChange}
        placeholder="Add a trigger"
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