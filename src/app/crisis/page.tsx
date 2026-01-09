"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import CrisisNavbar from "@/components/navigation/AppNavbar";
import BreathingFullScreen from "@/components/crisis/BreathingFullScreen";
import GroundingStep from "@/components/crisis/GroundingRouter";
import CopingActions from "@/components/crisis/CopingActions";
import SafeContacts from "@/components/crisis/SafeContacts";
import ReasonToLive from "@/components/crisis/ReasonToLive";
import { useCrisisFlow } from "@/hooks/useCrisisFlow";
import { useAuth } from "@/hooks/useAuth";
import { crisisTheme } from "@/styles/Theme";
import Loading from "./loading";

export default function CrisisPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const {
    loading,
    error,
    crisisData,
    currentStep,
    currentGroundingIndex,
    nextGroundingStep,
    goToStep,
  } = useCrisisFlow(!!user);

  /**
   * 🔐 Redirect unauthenticated users
   */
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/crisis/sign-in");
    }
  }, [authLoading, user, router]);

  /**
   * 🚧 Redirect after grounding if no safety plan exists
   */
  useEffect(() => {
    if (currentStep === "no-plan") {
      router.replace("/crisis/no-safety-plan");
    }
  }, [currentStep, router]);

  if (authLoading || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
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

      {/* 🚨 Breathing takes full screen at start */}
      {currentStep === "grounding" && currentGroundingIndex === 0 ? (
        <BreathingFullScreen
          preference="box"
          onComplete={nextGroundingStep}
          cloudLeftSrc="/cloud-left1.png"
          cloudRightSrc="/cloud-right1.png"
        />
      ) : (
        <main
          className="flex-1 px-6 py-12 flex justify-center"
          style={{ background: crisisTheme.colors.background }}
        >
          <div className="w-full max-w-3xl">
            {currentStep === "grounding" && (
              <GroundingStep
                text={
                  crisisData.grounding_steps[currentGroundingIndex]
                }
                onNext={nextGroundingStep}
              />
            )}

            {currentStep === "coping" && (
              <CopingActions
                strategies={crisisData.coping_strategies ?? []}
                onNext={() => goToStep("contacts")}
              />
            )}

            {currentStep === "contacts" && (
              <SafeContacts
                contacts={crisisData.safe_contacts ?? []}
                onNext={() => goToStep("reason")}
              />
            )}

            {currentStep === "reason" && (
              <ReasonToLive
                reason={crisisData.reason_to_live}
                onFinish={() => router.push("/dashboard")}
              />
            )}
          </div>
        </main>
      )}
    </div>
  );
}
