import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export type JournalResponse = {
  id: string;
  content: string;
  reflection: string;
  themes: string[];
  sentiment_scores: Record<string, number>;
  risk_score: number;
  created_at: string;
};

/* ✅ WAIT FOR AUTH TO BE READY */
function getAuthToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();

      if (!user) {
        reject(new Error("Not authenticated"));
        return;
      }

      try {
        const token = await user.getIdToken();
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  });
}

export async function createJournal(content: string) {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/journals/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: "Journal reflection",
      content,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to create journal");
  }

  return (await res.json()) as JournalResponse;
}

export async function getJournals() {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/journals/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch journals");
  }

  return (await res.json()) as JournalResponse[];
}


