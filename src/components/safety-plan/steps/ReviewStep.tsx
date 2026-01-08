"use client";

import { SafetyPlanCreate } from "@/types/safetyPlan";
import ContactCard from "@/components/safety-plan/contacts/ContactCard";
import { crisisTheme } from "@/styles/Theme";

type ReviewStepProps = {
  plan: SafetyPlanCreate;
};

export default function ReviewStep({ plan }: ReviewStepProps) {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Review your safety plan</h2>

      <Section title="Triggers">
        {renderList(plan.triggers)}
      </Section>

      <Section title="Coping strategies">
        {renderList(plan.coping_strategies)}
      </Section>

      <Section title="People">
        {plan.safe_contacts.length === 0 ? (
          <EmptyText>No contacts added</EmptyText>
        ) : (
          plan.safe_contacts.map((c, i) => (
            <ContactCard key={i} contact={c} />
          ))
        )}
      </Section>

      <Section title="Reminder">
        {plan.reason_to_live ? (
          <p style={textStyle}>{plan.reason_to_live}</p>
        ) : (
          <EmptyText>Nothing added</EmptyText>
        )}
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h3 style={sectionTitleStyle}>{title}</h3>
      {children}
    </div>
  );
}

function renderList(items: string[]) {
  if (items.length === 0) {
    return <EmptyText>Nothing added</EmptyText>;
  }

  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {items.map((item, i) => (
        <li key={i} style={textStyle}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function EmptyText({ children }: { children: string }) {
  return (
    <p style={{ ...textStyle, color: crisisTheme.colors.textSecondary }}>
      {children}
    </p>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 20,
};

const titleStyle = {
  margin: 0,
  fontSize: "1.1rem",
  fontWeight: 600,
  color: crisisTheme.colors.textPrimary,
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: "0.9rem",
  fontWeight: 600,
  color: crisisTheme.colors.textPrimary,
};

const textStyle = {
  margin: 0,
  fontSize: "0.9rem",
  color: crisisTheme.colors.textPrimary,
};
