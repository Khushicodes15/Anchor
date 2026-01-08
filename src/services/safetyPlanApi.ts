// src/services/safetyPlanApi.ts

import { SafetyPlan, SafetyPlanCreate } from "@/types/safetyPlan";
import { getAuth } from "firebase/auth";

/**
 * Explicit domain error for auth-required flows
 */
export class AuthRequiredError extends Error {
  constructor() {
    super("AUTH_REQUIRED");
  }
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getAuthToken(): Promise<string> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new AuthRequiredError();
  }

  return await user.getIdToken();
}

export async function fetchSafetyPlan(): Promise<SafetyPlan> {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/safety-plans/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("FAILED_FETCH_SAFETY_PLAN");
  }

  return res.json();
}

export async function saveSafetyPlan(
  data: SafetyPlanCreate
): Promise<SafetyPlan> {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/safety-plans/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("FAILED_SAVE_SAFETY_PLAN");
  }

  return res.json();
}
