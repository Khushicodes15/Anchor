// src/hooks/useSafetyPlan.ts

import { useCallback, useEffect, useState } from "react";
import {
  SafetyPlan,
  SafetyPlanCreate,
} from "@/types/safetyPlan";
import {
  fetchSafetyPlan,
  saveSafetyPlan,
  AuthRequiredError,
} from "@/services/safetyPlanApi";

const EMPTY_PLAN: SafetyPlanCreate = {
  triggers: [],
  coping_strategies: [],
  safe_contacts: [],
  reason_to_live: "",
};

export function useSafetyPlan() {
  const [plan, setPlan] = useState<SafetyPlanCreate>(EMPTY_PLAN);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /**
   * INITIAL LOAD
   * - Signed-out users are allowed
   * - Any failure falls back to empty plan
   * - NO error UI here
   */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data: SafetyPlan = await fetchSafetyPlan();

        if (!mounted) return;

        setPlan({
          triggers: data.triggers ?? [],
          coping_strategies: data.coping_strategies ?? [],
          safe_contacts: data.safe_contacts ?? [],
          reason_to_live: data.reason_to_live ?? "",
        });
      } catch {
        if (!mounted) return;

        // 🔑 Any failure on load is non-fatal
        // Signed-out users start with an empty plan
        setPlan(EMPTY_PLAN);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * LOCAL UPDATES
   */
  const updatePlan = useCallback(
    (updates: Partial<SafetyPlanCreate>) => {
      setPlan((prev) => ({
        ...prev,
        ...updates,
      }));
    },
    []
  );

  /**
   * SAVE
   * - Does NOT set UI error state
   * - AuthRequiredError is thrown to the page
   * - Other errors are thrown to the page
   */
  const persistPlan = useCallback(
  async (data: SafetyPlanCreate) => {
    setSaving(true);
    try {
      await saveSafetyPlan(data);
    } finally {
      setSaving(false);
    }
  },
  []
);


  return {
    plan,
    loading,
    saving,
    updatePlan,
    persistPlan,
  };
}
