import { useState, useEffect } from "react";
import { crisisApi, CrisisSupportResponse } from "@/services/crisisApi";

export type CrisisStep = "grounding" | "coping" | "contacts" | "reason";

// MOCK DATA FOR TESTING (REMOVE WHEN BACKEND IS READY)
const MOCK_CRISIS_DATA: CrisisSupportResponse = {
  status: "crisis_mode_active",
  grounding_steps: [
    "Pause and take 5 slow breaths.",
    "Name 3 things you can see around you.",
    "Place your feet on the ground and feel the floor beneath you.",
  ],
  coping_strategies: [
    "Deep breathing",
    "Going for a walk",
    "Listening to music",
    "Calling a friend",
    "Taking a shower",
  ],
  safe_contacts: [
    { name: "Mom", phone: "+1234567890" },
    { name: "Best Friend", phone: "+0987654321", email: "friend@example.com" },
    { name: "Therapist", phone: "+1122334455" },
  ],
  reason_to_live: "My family needs me. My dreams are still waiting for me. Better days are possible.",
};

export function useCrisisFlow() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [crisisData, setCrisisData] = useState<CrisisSupportResponse | null>(null);
  const [currentStep, setCurrentStep] = useState<CrisisStep>("grounding");
  const [currentGroundingIndex, setCurrentGroundingIndex] = useState(0);

  useEffect(() => {
    initializeCrisis();
  }, []);

  const initializeCrisis = async () => {
    try {
      setLoading(true);
      setError(null);

      // TRY REAL BACKEND FIRST
      try {
        await crisisApi.startCrisis();
        const support = await crisisApi.getCrisisSupport();

        if (support.status === "no_safety_plan") {
          setError(support.message || "Please create a safety plan first.");
          return;
        }

        setCrisisData(support);
      } catch (backendError) {
        // FALLBACK TO MOCK DATA IF BACKEND FAILS
        console.warn("Backend failed, using mock data:", backendError);
        
        // Simulate delay for realism
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setCrisisData(MOCK_CRISIS_DATA);
      }
    } catch (err) {
      console.error("Crisis initialization error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load crisis support"
      );
    } finally {
      setLoading(false);
    }
  };

  const nextGroundingStep = () => {
    if (
      crisisData?.grounding_steps &&
      currentGroundingIndex < crisisData.grounding_steps.length - 1
    ) {
      setCurrentGroundingIndex((i) => i + 1);
    } else {
      setCurrentStep("coping");
    }
  };

  const goToStep = (step: CrisisStep) => {
    setCurrentStep(step);
  };

  return {
    loading,
    error,
    crisisData,
    currentStep,
    currentGroundingIndex,
    nextGroundingStep,
    goToStep,
  };
}