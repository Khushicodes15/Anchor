//main backend ready code


// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { fetchCommunityStories } from "@/services/communityApi";
// import { CommunityStory } from "@/types/community";

// type Status = "loading" | "ready" | "empty" | "error";

// export function useCommunityStories() {
//   const [stories, setStories] = useState<CommunityStory[]>([]);
//   const [status, setStatus] = useState<Status>("loading");
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     try {
//       setStatus("loading");
//       const data = await fetchCommunityStories();

//       if (data.length === 0) {
//         setStories([]);
//         setStatus("empty");
//       } else {
//         setStories(data);
//         setStatus("ready");
//       }
//     } catch (err) {
//       setError("Unable to load the community library.");
//       setStatus("error");
//     }
//   }, []);

//   useEffect(() => {
//     load();
//   }, [load]);

//   return {
//     stories,
//     status,
//     error,
//     refetch: load,
//   };
// }


/**
 * ======================================================
 * 🚧 DEV MODE
 * Delete when backend + CORS is fully verified
 * ======================================================
 */




"use client";

import { useEffect, useState } from "react";
import { fetchCommunityStories } from "@/services/communityApi";
import { MOCK_COMMUNITY_STORIES } from "@/services/communityMock";
import type { CommunityStory } from "@/types/community";


const USE_MOCK_DATA = true;

type Status = "loading" | "success" | "empty";

export function useCommunityStories() {
  const [status, setStatus] = useState<Status>("loading");
  const [stories, setStories] = useState<CommunityStory[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setStatus("loading");

      // 🧪 MOCK MODE (UI unblocker)
      if (USE_MOCK_DATA) {
        setTimeout(() => {
          if (!mounted) return;

          if (MOCK_COMMUNITY_STORIES.length === 0) {
            setStories([]);
            setStatus("empty");
          } else {
            setStories(MOCK_COMMUNITY_STORIES);
            setStatus("success");
          }
        }, 600);
        return;
      }

      // 🌐 REAL FETCH
      try {
        const data = await fetchCommunityStories();

        if (!mounted) return;

        if (data.length === 0) {
          setStories([]);
          setStatus("empty");
          return;
        }

        setStories(data);
        setStatus("success");
      } catch {
        // HARD GUARANTEE: never block UI
        if (!mounted) return;
        setStories([]);
        setStatus("empty");
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    status,
    stories,
  };
}
