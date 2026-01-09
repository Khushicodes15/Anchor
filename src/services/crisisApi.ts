// src/services/crisisApi.ts
import { getAuth } from "firebase/auth";
import { auth } from "@/lib/firebase";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getAuthToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("AUTH_REQUIRED");
  return await user.getIdToken();
}

export interface CrisisSupportResponse {
  status: "crisis_mode_active" | "no_safety_plan";
  message?: string;
  grounding_steps: string[];
  coping_strategies?: string[];
  safe_contacts?: Array<{
    name: string;
    phone?: string;
    email?: string;
  }>;
  reason_to_live?: string;
}

export const crisisApi = {
  async startCrisis() {
    const token = await getAuthToken();

    const res = await fetch(`${API_BASE}/crisis/start`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("FAILED_TO_START_CRISIS");
    }

    return res.json();
  },

  async getCrisisSupport(): Promise<CrisisSupportResponse> {
    const token = await getAuthToken();

    const res = await fetch(`${API_BASE}/crisis/support`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("FAILED_TO_FETCH_CRISIS_SUPPORT");
    }

    return res.json();
  },
};
