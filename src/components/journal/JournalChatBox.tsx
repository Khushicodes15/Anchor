"use client";

import { useEffect, useRef, useState } from "react";
import JournalChatMessage from "./JournalChatMessage";
import { createJournal, getSessionMessages } from "@/services/journalApi";
import type { ChatMessage } from "@/app/journal/page";
import type { SessionSummary } from "@/services/journalApi";

type Props = {
  activeSessionId: string | null;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onSessionCreated: (session: SessionSummary) => void;
};

/* ── PDF download (client-side, no backend needed) ── */
async function downloadChatAsPdf(
  messages: ChatMessage[],
  sessionId: string | null
) {
  // Dynamically import jsPDF to keep bundle light
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  const maxW = pageW - margin * 2;
  let y = 60;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Journal Conversation", margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    `Session: ${sessionId ?? "current"} — ${new Date().toLocaleDateString()}`,
    margin,
    (y += 16)
  );
  y += 20;

  doc.setTextColor(30);

  for (const msg of messages) {
    const label = msg.role === "user" ? "You" : "Anchor";
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(label, margin, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(msg.content, maxW);
    for (const line of lines) {
      if (y > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage();
        y = 60;
      }
      doc.text(line, margin, y);
      y += 14;
    }
    y += 10; // gap between messages
  }

  doc.save(`journal-${sessionId ?? "chat"}.pdf`);
}

/* ── Demo fallback (keep until backend is reliable) ── */
function demoFallbackResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("happy") || lower.includes("good"))
    return "The Hopeful One is present here — notice how it showed up even in the middle of everything else going on. What gave it room to breathe today?";
  if (lower.includes("sad") || lower.includes("down"))
    return "The Exhausted Soldier has been carrying something heavy. It hasn't stopped — but it's still here. What has it been protecting you from putting down?";
  if (lower.includes("anxious") || lower.includes("worried") || lower.includes("stress"))
    return "The Anxious Planner has taken the wheel. It's running every scenario it can find. Which one is it most afraid of, do you think?";
  if (lower.includes("angry") || lower.includes("frustrated"))
    return "The Rebel is speaking. Anger like this usually means something that matters to you is being crossed. What line is it standing at?";
  if (lower.includes("what should i do") || lower.includes("what do i do"))
    return "The Calm Decision Maker is here — quieter than the others right now, but present. If it stepped forward and took the wheel, what's the first thing it would say?";
  return "The Quiet Thinker is sitting with what you've shared. Something in this moment wanted to be spoken. What feels most unfinished in what you just wrote?";
}

export default function JournalChatBox({
  activeSessionId,
  messages,
  setMessages,
  onSessionCreated,
}: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  // Track the session id used for THIS chat window
  const sessionIdRef = useRef<string | null>(activeSessionId);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const historyJustLoadedRef = useRef(false);


  const didMountRef = useRef(false);

useEffect(() => {
  const container = bottomRef.current?.parentElement;
  if (!container) return;

  if (historyJustLoadedRef.current) {
    historyJustLoadedRef.current = false;
    container.scrollTop = 0;
    return;
  }

  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  /* When activeSessionId changes from the sidebar, load that session's messages */
  useEffect(() => {
    sessionIdRef.current = activeSessionId;

    if (!activeSessionId) {
      // New chat — messages already cleared by parent
      return;
    }

    let cancelled = false;

    async function loadHistory() {
      setLoadingHistory(true);
      try {
        const entries = await getSessionMessages(activeSessionId!);
        if (cancelled) return;

        // Each DB entry has one user message + one AI reflection
        const rebuilt: ChatMessage[] = [];
        for (const entry of entries) {
          rebuilt.push({ id: entry.id + "_u", role: "user", content: entry.content });
          if (entry.reflection) {
            rebuilt.push({ id: entry.id + "_ai", role: "ai", content: entry.reflection });
          }
        }
        historyJustLoadedRef.current = true;
        setMessages(rebuilt);
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoadingHistory(false);
      }
    }

    loadHistory();
    return () => { cancelled = true; };
  }, [activeSessionId, setMessages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const journal = await createJournal(
        userMessage.content,
        sessionIdRef.current ?? undefined
      );

      // If this was the first message of a new session, record the session
      if (!sessionIdRef.current && journal.session_id) {
          sessionIdRef.current = journal.session_id;
          onSessionCreated({
            session_id: journal.session_id,
            title: userMessage.content.slice(0, 40),
            created_at: journal.created_at,
         });
      }
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          content: journal.reflection,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          content: demoFallbackResponse(userMessage.content),
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border bg-white">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <span className="text-xs text-muted-foreground">
          {activeSessionId ? "Continuing session" : "New conversation"}
        </span>

        {/* PDF download — only shown when there are messages */}
        {messages.length > 0 && (
          <button
            onClick={() => downloadChatAsPdf(messages, sessionIdRef.current)}
            title="Download as PDF"
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
            Save PDF
          </button>
        )}
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {loadingHistory && (
          <p className="text-center text-sm text-muted-foreground py-8">
            Loading conversation…
          </p>
        )}

        {!loadingHistory && messages.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            Write what you're feeling to begin.
          </p>
        )}

        {!loadingHistory &&
          messages.map((m) => (
            <JournalChatMessage key={m.id} role={m.role} content={m.content} />
          ))}

        {loading && (
          <div className="mr-auto max-w-[75%] px-4 py-3 rounded-2xl bg-emerald-50 text-emerald-700 text-sm animate-pulse">
            Reflecting…
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div className="flex items-center gap-2 border-t px-4 py-3">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write what you're feeling…"
          disabled={loading || loadingHistory}
          className="flex-1 min-w-0 rounded-xl border px-4 py-2 text-sm focus:outline-none disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={loading || loadingHistory || !input.trim()}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-50 transition-opacity"
        >
          Send
        </button>
      </div>
    </div>
  );
}