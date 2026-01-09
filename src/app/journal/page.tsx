"use client";

import { useState } from "react";
import JournalChatBox from "@/components/journal/JournalChatBox";
import JournalChatHistory from "@/components/journal/JournalChatHistory";

export type Session = {
  id: string;
  title: string;
};

export default function JournalPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Journal</h1>
        <p className="text-sm text-muted-foreground">
          A private space to reflect and unload your thoughts.
        </p>
      </header>

      <section className="flex h-[520px] rounded-2xl border overflow-hidden">
        {/* Left: Chat */}
        <div className="flex-[3] p-6">
          <JournalChatBox
            activeSessionId={activeSessionId}
            onCreateSession={(session) => {
              setSessions((prev) => [session, ...prev]);
              setActiveSessionId(session.id);
            }}
          />
        </div>

        {/* Right: History */}
        <div className="flex-[1] border-l border-[var(--color-border)]">
          <JournalChatHistory
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSelectSession={setActiveSessionId}
          />
        </div>
      </section>
    </div>
  );
}








