import { useState, useEffect } from "react";
import { crisisApi, CrisisSupportResponse } from "@/services/crisisApi";

export type CrisisStep = "grounding" | "coping" | "contacts" | "reason" | "no-plan";

export function useCrisisFlow(enabled: boolean) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [crisisData, setCrisisData] =
    useState<CrisisSupportResponse | null>(null);

  const [currentStep, setCurrentStep] =
    useState<CrisisStep>("grounding");

  const [currentGroundingIndex, setCurrentGroundingIndex] =
    useState(0);

  useEffect(() => {
    if (!enabled) return;
    initialize();
  }, [enabled]);

  async function initialize() {
    try {
      setLoading(true);
      setError(null);

      await crisisApi.startCrisis();
      const support = await crisisApi.getCrisisSupport();

      setCrisisData(support);

      if (support.status === "no_safety_plan") {
        setCurrentStep("grounding");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to start crisis mode"
      );
    } finally {
      setLoading(false);
    }
  }

  function nextGroundingStep() {
    if (
      crisisData &&
      currentGroundingIndex < crisisData.grounding_steps.length - 1
    ) {
      setCurrentGroundingIndex((i) => i + 1);
    } else {
      if (crisisData?.status === "no_safety_plan") {
        setCurrentStep("no-plan");
      } else {
        setCurrentStep("coping");
      }
    }
  }

  return {
    loading,
    error,
    crisisData,
    currentStep,
    currentGroundingIndex,
    nextGroundingStep,
    goToStep: setCurrentStep,
  };
}
