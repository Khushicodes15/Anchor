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
  // Fast path — Firebase already hydrated
  if (auth.currentUser) {
    return auth.currentUser.getIdToken();
  }


  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      unsub();
      if (!user || user.isAnonymous) {
        reject(new Error("Not authenticated"));
        return;
      }
      try {
        resolve(await user.getIdToken());
      } catch (err) {
        reject(err);
      }
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

    cache: "no-store",
    body: JSON.stringify({
      title: content.trim().slice(0, 40),
      content,
      session_id: sessionId ?? null,
    }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ── Get sidebar session list ───────────────────────────────────────────── */
export async function getSessions(): Promise<SessionSummary[]> {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/journals/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
    
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`sessions fetch failed: ${res.status}`);
  return res.json();
}

/* ── Get all messages for a session ────────────────────────────────────── */
export async function getSessionMessages(sessionId: string): Promise<JournalResponse[]> {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/journals/session/${sessionId}`, {
    headers: { Authorization: `Bearer ${token}` },
    // ✅ no-store: session messages can grow at any time
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`session fetch failed: ${res.status}`);
  return res.json();
}


export async function getJournals(): Promise<JournalResponse[]> {
  const token = await getAuthToken();

  const res = await fetch(`${API_BASE}/journals/`, {
    headers: { Authorization: `Bearer ${token}` },
   
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`journals fetch failed: ${res.status}`);
  return res.json();
}