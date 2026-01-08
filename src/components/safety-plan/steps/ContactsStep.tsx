"use client";

import { useState } from "react";
import { SafeContact } from "@/types/safetyPlan";
import ContactCard from "@/components/safety-plan/contacts/ContactCard";
import AddContactModal from "@/components/safety-plan/contacts/AddContactModal";
import Button from "@/components/ui/Button";
import { crisisTheme } from "@/styles/Theme";

type ContactsStepProps = {
  value: SafeContact[];
  onChange: (next: SafeContact[]) => void;
};

export default function ContactsStep({
  value,
  onChange,
}: ContactsStepProps) {
  const [showModal, setShowModal] = useState(false);

  function addContact(contact: SafeContact) {
    onChange([...value, contact]);
  }

  function removeContact(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        Who can you reach out to when you need support?
      </h2>

      <p style={descriptionStyle}>
        This can be anyone you trust — a friend, family member, or someone else
        supportive.
      </p>

      {value.length === 0 && (
        <p style={emptyStyle}>
          You haven’t added any contacts yet.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {value.map((contact, index) => (
          <ContactCard
            key={`${contact.name}-${index}`}
            contact={contact}
            onRemove={() => removeContact(index)}
          />
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={() => setShowModal(true)}
      >
        Add contact
      </Button>

      {showModal && (
        <AddContactModal
          onAdd={addContact}
          onClose={() => setShowModal(false)}
        />
      )}
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

const emptyStyle = {
  margin: 0,
  fontSize: "0.85rem",
  color: crisisTheme.colors.textSecondary,
};
