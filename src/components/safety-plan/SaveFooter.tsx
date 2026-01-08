"use client";

import { crisisTheme } from "@/styles/Theme";
import Button from "@/components/ui/Button";

type SaveFooterProps = {
  onBack: () => void;
  onNext: () => void;
  onSave: () => Promise<void>;
  isLastStep: boolean;
  isSaving: boolean;
  error: string | null;

  authRequired?: boolean;
  onSignIn?: () => void;
};

export default function SaveFooter({
  onBack,
  onNext,
  onSave,
  isLastStep,
  isSaving,
  error,
  authRequired = false,
  onSignIn,
}: SaveFooterProps) {
  return (
    <footer
      style={{
        position: "sticky",
        bottom: 0,
        marginTop: 24,
        paddingTop: 16,
        background: crisisTheme.colors.surface,
        borderTop: `1px solid ${crisisTheme.colors.border}`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Auth message */}
      {authRequired && (
        <div
          style={{
            padding: 12,
            borderRadius: crisisTheme.radius.md,
            background: crisisTheme.colors.secondarySoft,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              color: crisisTheme.colors.textPrimary,
            }}
          >
            Please sign in to save your safety plan.
          </p>

          {onSignIn && (
            <Button variant="primary" onClick={onSignIn}>
              Sign in
            </Button>
          )}
        </div>
      )}

      {/* Non-auth errors */}
      {!authRequired && error && (
        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            color: crisisTheme.colors.textSecondary,
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Button
          variant="secondary"
          onClick={onBack}
          disabled={isSaving}
        >
          Back
        </Button>

        {!isLastStep && (
          <Button
            variant="primary"
            onClick={onNext}
            disabled={isSaving}
          >
            Next
          </Button>
        )}

        {isLastStep && !authRequired && (
          <Button
            variant="primary"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving…" : "Save Safety Plan"}
          </Button>
        )}
      </div>
    </footer>
  );
}
