"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";


import { useSafetyPlan } from "@/hooks/useSafetyPlan";
import { SafetyPlanCreate } from "@/types/safetyPlan";

import SafetyPlanLayout from "@/components/safety-plan/SafetyPlanLayout";
import StepProgress from "@/components/safety-plan/StepProgress";
import TriggersStep from "@/components/safety-plan/steps/TriggersStep";
import CopingStep from "@/components/safety-plan/steps/CopingStep";
import ContactsStep from "@/components/safety-plan/steps/ContactsStep";
import ReasonStep from "@/components/safety-plan/steps/ReasonStep";
import ReviewStep from "@/components/safety-plan/steps/ReviewStep";
import SaveFooter from "@/components/safety-plan/SaveFooter";
import Loading from "@/app/crisis/loading";

type StepKey =
  | "triggers"
  | "coping"
  | "contacts"
  | "reason"
  | "review";

const STEPS: StepKey[] = [
  "triggers",
  "coping",
  "contacts",
  "reason",
  "review",
];

export default function SafetyPlanPage() {
  const router = useRouter();

  const { plan, loading, saving, persistPlan } = useSafetyPlan();

  /**
   * Draft state (wizard-owned)
   * Never nullable
   */
  const [draftPlan, setDraftPlan] =
    useState<SafetyPlanCreate>(plan);

  const [isInitialized, setIsInitialized] = useState(false);
  const [currentStep, setCurrentStep] =
    useState<StepKey>("triggers");

  const [authRequired, setAuthRequired] = useState(false);
  const [saveError, setSaveError] =
    useState<string | null>(null);

  /**
   * Initialize draft exactly once after load
   */
  useEffect(() => {
    if (!loading && !isInitialized) {
      setDraftPlan(plan);
      setIsInitialized(true);
    }
  }, [loading, plan, isInitialized]);

  if (loading || !isInitialized) {
    return <Loading />;
  }

  const stepIndex = STEPS.indexOf(currentStep);
  const isLastStep = currentStep === "review";

  function updateDraft(
    updates: Partial<SafetyPlanCreate>
  ) {
    setDraftPlan((prev) => ({
      ...prev,
      ...updates,
    }));
  }

  function goNext() {
    if (!isLastStep) {
      setCurrentStep(STEPS[stepIndex + 1]);
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setCurrentStep(STEPS[stepIndex - 1]);
    }
  }

  async function handleSave() {
  setAuthRequired(false);
  setSaveError(null);

  const user = auth.currentUser;

  if (!user) {
    setAuthRequired(true);
    return;
  }

  try {
    await persistPlan(draftPlan);
  } catch {
    setSaveError(
      "Unable to save your safety plan. Please try again."
    );
  }
}


  function renderStep() {
    switch (currentStep) {
      case "triggers":
        return (
          <TriggersStep
            value={draftPlan.triggers}
            onChange={(triggers) =>
              updateDraft({ triggers })
            }
          />
        );

      case "coping":
        return (
          <CopingStep
            value={draftPlan.coping_strategies}
            onChange={(coping_strategies) =>
              updateDraft({ coping_strategies })
            }
          />
        );

      case "contacts":
        return (
          <ContactsStep
            value={draftPlan.safe_contacts}
            onChange={(safe_contacts) =>
              updateDraft({ safe_contacts })
            }
          />
        );

      case "reason":
        return (
          <ReasonStep
            value={draftPlan.reason_to_live ?? ""}
            onChange={(reason_to_live) =>
              updateDraft({ reason_to_live })
            }
          />
        );

      case "review":
        return <ReviewStep plan={draftPlan} />;

      default:
        return null;
    }
  }

  return (
    <SafetyPlanLayout>
      <StepProgress
        currentStep={currentStep}
        steps={STEPS}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            paddingRight: 4,
          }}
        >
          {renderStep()}
        </div>

        <SaveFooter
          onBack={goBack}
          onNext={goNext}
          onSave={handleSave}
          isSaving={saving}
          isLastStep={isLastStep}
          error={saveError}
          authRequired={authRequired}
          onSignIn={() => router.push("/login")}
        />
      </div>
    </SafetyPlanLayout>
  );
}
