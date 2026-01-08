"use client";

import { useState, KeyboardEvent } from "react";
import { crisisTheme } from "@/styles/Theme";

type EditableChipProps = {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export default function EditableChip({
  value,
  onChange,
  placeholder = "Type and press Enter",
}: EditableChipProps) {
  const [input, setInput] = useState("");

  function addChip() {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) return;

    onChange([...value, trimmed]);
    setInput("");
  }

  function removeChip(chip: string) {
    onChange(value.filter((item) => item !== chip));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addChip();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {value.map((chip) => (
        <span
          key={chip}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 10px",
            borderRadius: crisisTheme.radius.pill,
            background: crisisTheme.colors.secondarySoft,
            color: crisisTheme.colors.textPrimary,
            fontSize: "0.85rem",
          }}
        >
          {chip}

          <button
            type="button"
            aria-label={`Remove ${chip}`}
            onClick={() => removeChip(chip)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "1rem",
              lineHeight: 1,
              color: crisisTheme.colors.textSecondary,
            }}
          >
            ×
          </button>
        </span>
      ))}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          flex: "1 1 120px",
          minWidth: 120,
          border: `1px solid ${crisisTheme.colors.border}`,
          borderRadius: crisisTheme.radius.sm,
          padding: "6px 8px",
          fontSize: "0.85rem",
          outline: "none",
          color: crisisTheme.colors.textPrimary,
        }}
      />
    </div>
  );
}
