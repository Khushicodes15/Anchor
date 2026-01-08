"use client";

import { crisisTheme } from "@/styles/Theme";
import { SafeContact } from "@/types/safetyPlan";

type ContactCardProps = {
  contact: SafeContact;
  onRemove?: () => void;
};

export default function ContactCard({
  contact,
  onRemove,
}: ContactCardProps) {
  return (
    <div
      style={{
        border: `1px solid ${crisisTheme.colors.border}`,
        borderRadius: crisisTheme.radius.md,
        padding: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: 500,
            color: crisisTheme.colors.textPrimary,
          }}
        >
          {contact.name}
        </span>

        {contact.phone && (
          <span
            style={{
              fontSize: "0.8rem",
              color: crisisTheme.colors.textSecondary,
            }}
          >
            {contact.phone}
          </span>
        )}

        {contact.email && (
          <span
            style={{
              fontSize: "0.8rem",
              color: crisisTheme.colors.textSecondary,
            }}
          >
            {contact.email}
          </span>
        )}
      </div>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${contact.name}`}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "0.85rem",
            color: crisisTheme.colors.textSecondary,
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
}
