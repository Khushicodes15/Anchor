"use client";

import { useEffect, useRef, useState } from "react";
import JournalChatMessage from "./JournalChatMessage";
import { createJournal } from "@/services/journalApi";

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
};

type Props = {
  activeSessionId: string | null;
  onCreateSession: (session: { id: string; title: string }) => void;
};

/* ✅ DEMO FALLBACK (LOCAL, SAFE, REMOVE AFTER DEMO) */
function demoFallbackResponse(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes("happy") || lower.includes("good")) {
    return "It sounds like there’s a sense of lightness in what you’re feeling. Try to notice what’s contributing to that moment.";
  }

  if (lower.includes("sad") || lower.includes("down")) {
    return "I hear sadness in your words. It’s okay to feel this way—nothing about this feeling means you’re failing.";
  }

  if (
    lower.includes("anxious") ||
    lower.includes("worried") ||
    lower.includes("stress")
  ) {
    return "It seems like your mind is carrying a lot right now. You don’t need to solve everything at once.";
  }

  if (lower.includes("angry") || lower.includes("frustrated")) {
    return "That frustration feels important. Anger often points to something that matters deeply to you.";
  }

  return "Thank you for sharing this. Writing it out is already a meaningful step.";
}

export default function JournalChatBox({
  activeSessionId,
  onCreateSession,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (!activeSessionId) {
      onCreateSession({
        id: crypto.randomUUID(),
        title: input.slice(0, 40),
      });
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const journal = await createJournal(userMessage.content);

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "ai",
        content: journal.reflection,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      const fallback = demoFallbackResponse(userMessage.content);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          content: fallback,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border bg-white p-4">
      {/* CHAT SCROLL AREA */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((m) => (
          <JournalChatMessage
            key={m.id}
            role={m.role}
            content={m.content}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="mt-4 flex items-center gap-2 border-t pt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Write what you’re feeling…"
          className="flex-1 rounded-xl border px-4 py-2 text-sm focus:outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}