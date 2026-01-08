"use client";

import { useState } from "react";
import { crisisTheme } from "@/styles/Theme";
import { SafeContact } from "@/types/safetyPlan";
import Button from "@/components/ui/Button";

type AddContactModalProps = {
  onAdd: (contact: SafeContact) => void;
  onClose: () => void;
};

export default function AddContactModal({
  onAdd,
  onClose,
}: AddContactModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const canSave =
    name.trim().length > 0 &&
    (phone.trim().length > 0 || email.trim().length > 0);

  function handleSave() {
    if (!canSave) return;

    onAdd({
      name: name.trim(),
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
    });

    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: crisisTheme.colors.surface,
          borderRadius: crisisTheme.radius.lg,
          padding: 24,
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "1.2rem",
            color: crisisTheme.colors.textPrimary,
          }}
        >
          Add a contact
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            color: crisisTheme.colors.textSecondary,
          }}
        >
          This can be anyone you feel comfortable reaching out to.
        </p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="tel"
          placeholder="Phone number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email address (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 8,
          }}
        >
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!canSave}
          >
            Add contact
          </Button>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  border: `1px solid ${crisisTheme.colors.border}`,
  borderRadius: crisisTheme.radius.sm,
  padding: "8px 10px",
  fontSize: "0.85rem",
  color: crisisTheme.colors.textPrimary,
  outline: "none",
};
