// src/services/crisisApi.ts

const API_BASE = "https://anchor-backend-1.onrender.com";

export interface CrisisSupportResponse {
  status: "crisis_mode_active" | "no_safety_plan";
  message?: string;
  grounding_steps?: string[];
  coping_strategies?: string[];
  safe_contacts?: Array<{
    name: string;
    phone?: string;
    email?: string;
  }>;
  reason_to_live?: string;
}

// MOCK DATA - REMOVE WHEN BACKEND IS READY
const MOCK_RESPONSE: CrisisSupportResponse = {
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
    "Watching a favorite show",
  ],
  safe_contacts: [
    { name: "Mom", phone: "+1234567890" },
    { name: "Best Friend", phone: "+0987654321" },
    { name: "Therapist", phone: "+1122334455" },
  ],
  reason_to_live: "My family loves me. My dreams are still ahead. Better days are coming.",
};

export const crisisApi = {
  // USING MOCK DATA - UNCOMMENT REAL API WHEN BACKEND IS READY
  async startCrisis(): Promise<{ status: string; activated_at: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      status: "crisis_started",
      activated_at: new Date().toISOString(),
    };
  },

  async getCrisisSupport(): Promise<CrisisSupportResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return MOCK_RESPONSE;
  },

  /* REAL API CALLS - UNCOMMENT WHEN BACKEND IS READY
  async startCrisis(): Promise<{ status: string; activated_at: string }> {
    const token = await getAuthToken();

    const res = await fetch(`${API_BASE}/crisis/start`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to start crisis mode");
    }

    return res.json();
  },

  async getCrisisSupport(): Promise<CrisisSupportResponse> {
    const token = await getAuthToken();

    const res = await fetch(`${API_BASE}/crisis/support`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch crisis support");
    }

    return res.json();
  },
  */
};