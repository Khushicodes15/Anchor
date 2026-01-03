// "use client";

// import { useEffect, useState } from "react";
// import { getIdToken } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import { getLatestWrapped } from "@/services/wrappedApi";
// import { WrappedResponse } from "@/types/wrapped";

// type WrappedStatus =
//   | "loading"
//   | "available"
//   | "unavailable"
//   | "error";

// export function useWrapped() {
//   const [status, setStatus] = useState<WrappedStatus>("loading");
//   const [data, setData] = useState<WrappedResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadWrapped() {
//       try {
//         const user = auth.currentUser;

        
//         if (!user) {
//           if (isMounted) {
//             setStatus("unavailable");
//           }
//           return;
//         }

//         const token = await getIdToken(user);

//         const response = await getLatestWrapped(token);

//         if (!isMounted) return;

//         if (!response.available) {
//           setData(response);
//           setStatus("unavailable");
//           return;
//         }

    
//         setData(response);
//         setStatus("available");
//       } catch (err) {
//         console.error("Failed to load wrapped:", err);
//         if (isMounted) {
//           setError("Failed to load Wrapped");
//           setStatus("error");
//         }
//       }
//     }

//     loadWrapped();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return {
//     status,
//     data,
//     error,
//   };
// }








"use client";

import { useEffect, useState } from "react";
import { getLatestWrapped } from "@/services/wrappedApi";
import type { WrappedResponse } from "@/types/wrapped";

/**
 * ======================================================
 * 🚧 DEVELOPMENT MODE
 * Toggle mock data while backend / auth is not ready
 * DELETE OR SET TO false WHEN BACKEND IS LIVE
 * ======================================================
 */
const USE_MOCK_DATA = true; // ❌ DELETE WHEN BACKEND DONE

/**
 * Mock Wrapped data — MUST match backend schema exactly
 * DELETE WHEN BACKEND DONE
 */
const MOCK_WRAPPED_DATA: WrappedResponse = {
  available: true,
  month: "2025-12",
  stats: {
    check_ins: 12,
    longest_streak: 3,
  },
  emotional_timeline: [
    { date: "2025-12-02", value: 0.72 },
    { date: "2025-12-05", value: 0.55 },
    { date: "2025-12-10", value: 0.48 },
    { date: "2025-12-18", value: 0.66 },
  ],
  top_characters: [
    "Resilient Self",
    "Inner Critic",
  ],
  emotional_weather: "stormy_then_calm",
  growth_moments: 4,
  highlight: "Even on difficult days, you kept showing up.",
  future_letter:
    "This month tested you — and you grew stronger than you realize.",
};

type WrappedStatus = "loading" | "success" | "unavailable" | "error";

export function useWrapped() {
  const [status, setStatus] = useState<WrappedStatus>("loading");
  const [data, setData] = useState<WrappedResponse | null>(null);

  useEffect(() => {
    /**
     * ======================================================
     * 🧪 MOCK MODE (UI DEVELOPMENT)
     * DELETE THIS BLOCK WHEN BACKEND IS READY
     * ======================================================
     */
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        setData(MOCK_WRAPPED_DATA);
        setStatus("success");
      }, 600); // small delay to simulate loading
      return;
    }


  }, []);

  return {
    status,
    data,
  };
}

