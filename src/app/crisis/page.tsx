"use client";

import CrisisNavbar from "@/components/navigation/AppNavbar";
import BreathingFullScreen from "@/components/crisis/BreathingFullScreen";
import GroundingStep from "@/components/crisis/GroundingRouter";
import CopingActions from "@/components/crisis/CopingActions";
import SafeContacts from "@/components/crisis/SafeContacts";
import ReasonToLive from "@/components/crisis/ReasonToLive";
import StepTransition from "@/components/crisis/StepTransition";
import { useCrisisFlow } from "@/hooks/useCrisisFlow";
import { useAuth } from "@/hooks/useAuth";
import { crisisTheme } from "@/styles/Theme";

export default function CrisisPage() {
  const { user, loading: authLoading } = useAuth();

  const {
    loading,
    error,
    crisisData,
    currentStep,
    currentGroundingIndex,
    nextGroundingStep,
    goToStep,
  } = useCrisisFlow();

  if (authLoading) return null;

  // if (!user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       Please sign in to access Crisis Mode.
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading crisis support…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!crisisData) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <CrisisNavbar />

      {/* 🚨 Breathing takes over the viewport */}
      {currentStep === "grounding" && currentGroundingIndex === 0 ? (
        <BreathingFullScreen
          preference="box"
          onComplete={nextGroundingStep}
          cloudLeftSrc="/cloud-left1.png"
          cloudRightSrc="/cloud-right1.png"
        />
      ) : (
        /* ✅ Everything else stays constrained */
        <main
          className="flex-1 px-6 py-12 flex justify-center"
          style={{ background: crisisTheme.colors.background }}
        >
          
          <div className="w-full max-w-3xl">
            
            
            {currentStep === "grounding" && (
              <GroundingStep
                text={crisisData.grounding_steps?.[currentGroundingIndex]}
                onNext={nextGroundingStep}
              />
            )}

            {currentStep === "coping" && (
              <CopingActions
                strategies={crisisData.coping_strategies || []}
                onNext={() => goToStep("contacts")}
              />
            )}

            {currentStep === "contacts" && (
              <SafeContacts
                contacts={crisisData.safe_contacts || []}
                onNext={() => goToStep("reason")}
              />
            )}

            {currentStep === "reason" && (
              <ReasonToLive
                reason={crisisData.reason_to_live}
                onFinish={() => (window.location.href = "/dashboard")}
              />
            )}
          </div>
        </main>
      )}
    </div>
  );
}