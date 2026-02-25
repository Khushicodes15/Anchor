"use client";

import { useState, useEffect, useRef } from "react";
import JournalChatBox from "@/components/journal/JournalChatBox";
import JournalChatHistory from "@/components/journal/JournalChatHistory";
import { getSessions } from "@/services/journalApi";
import type { SessionSummary } from "@/services/journalApi";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export default function JournalPage() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  /* ✅ FIX — wait for Firebase auth hydration */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user || user.isAnonymous) {
        setSessions([]);
        setLoadingSessions(false);
        return;
      }

      try {
        const data = await getSessions();
        setSessions(data);
      } catch (e) {
        console.log("sessions fetch failed", e);
      } finally {
        setLoadingSessions(false);
      }
    });

    return () => unsub();
  }, []);

  /* Prevent page scroll retention */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ✅ Restore most recent session once */
  const didRestoreRef = useRef(false);

  useEffect(() => {
    if (didRestoreRef.current) return;
    if (!loadingSessions && sessions.length > 0) {
      didRestoreRef.current = true;
      setActiveSessionId(sessions[0].session_id);
    }
  }, [loadingSessions, sessions]);

  /* Start new chat */
  const handleNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
  };

  /* When first message creates a session */
  const handleSessionCreated = (session: SessionSummary) => {
    setActiveSessionId(session.session_id);
    setSessions((prev) => {
      if (prev.find((s) => s.session_id === session.session_id)) return prev;
      return [session, ...prev];
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Journal</h1>
        <p className="text-sm text-muted-foreground">
          A private space to reflect and unload your thoughts.
        </p>
      </header>

      <section className="flex h-[520px] rounded-2xl border overflow-hidden">
        <div className="flex-[3] p-6 min-w-0">
          <JournalChatBox
            activeSessionId={activeSessionId}
            messages={messages}
            setMessages={setMessages}
            onSessionCreated={handleSessionCreated}
          />
        </div>

        <div className="hidden sm:block flex-[1] border-l border-[var(--color-border)] min-w-0">
          <JournalChatHistory
            sessions={sessions}
            activeSessionId={activeSessionId}
            loading={loadingSessions}
            onSelectSession={(id) => {
              setActiveSessionId(id);
              setMessages([]);
            }}
            onNewChat={handleNewChat}
          />
        </div>
      </section>

      <div className="sm:hidden space-y-4">
        <button
          onClick={handleNewChat}
          className="w-full rounded-xl border px-4 py-2 text-sm font-medium"
        >
          + New chat
        </button>
        <JournalChatHistory
          sessions={sessions}
          activeSessionId={activeSessionId}
          loading={loadingSessions}
          onSelectSession={(id) => {
            setActiveSessionId(id);
            setMessages([]);
          }}
          onNewChat={handleNewChat}
        />
      </div>
    </div>
  );
}