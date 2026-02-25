import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export type JournalResponse = {
  id: string;
  session_id?: string;
  content: string;
  reflection: string;
  themes: string[];
  follow_up_question?: string;
  sentiment_scores: Record<string, number>;
  risk_score: number;
  created_at: string;
};

export type SessionSummary = {
  session_id: string;
  title: string;
  created_at: string;
};

async function getAuthToken(): Promise<string> {
  const user = auth.currentUser;
  if (user) return user.getIdToken();

  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      unsub();
      if (!u) return reject(new Error("Not authenticated"));
      resolve(await u.getIdToken());
    });
  });
}

export async function createJournal(content: string, sessionId?: string) {
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
      session_id: sessionId ?? null,
    }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getSessions() {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/journals/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("sessions failed");
  return res.json();
}

export async function getSessionMessages(sessionId: string) {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/journals/session/${sessionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("session failed");
  return res.json();
}