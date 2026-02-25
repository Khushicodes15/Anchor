import type { SessionSummary } from "@/services/journalApi";

type Props = {
  sessions: SessionSummary[];
  activeSessionId: string | null;
  loading: boolean;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
};

export default function JournalChatHistory({
  sessions,
  activeSessionId,
  loading,
  onSelectSession,
  onNewChat,
}: Props) {
  return (
    <aside className="h-full flex flex-col p-4 overflow-hidden bg-[var(--color-history-bg)]">

      {/* ── New chat button ── */}
      <button
        onClick={onNewChat}
        className="mb-4 w-full rounded-xl border border-dashed px-3 py-2 text-xs font-medium
          text-[var(--color-text-secondary)] hover:bg-[var(--color-history-hover)]
          transition-colors text-left flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        New conversation
      </button>

      <h3 className="text-xs font-semibold mb-3 text-[var(--color-text-primary)] uppercase tracking-wide">
        History
      </h3>

      {/* ── Session list ── */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {loading && (
          <p className="text-xs text-[var(--color-text-secondary)] px-1">
            Loading…
          </p>
        )}

        {!loading && sessions.length === 0 && (
          <p className="text-xs text-[var(--color-text-secondary)] px-1">
            No conversations yet.
          </p>
        )}

        {!loading &&
          sessions.map((s) => (
            <SessionItem
              key={s.session_id}
              session={s}
              isActive={s.session_id === activeSessionId}
              onSelect={() => onSelectSession(s.session_id)}
            />
          ))}
      </div>
    </aside>
  );
}

/* ── Individual session row ── */
function SessionItem({
  session,
  isActive,
  onSelect,
}: {
  session: SessionSummary;
  isActive: boolean;
  onSelect: () => void;
}) {
  const formattedDate = session.created_at
    ? new Date(session.created_at).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div
      onClick={onSelect}
      className={`
        group rounded-lg px-3 py-2 text-xs cursor-pointer transition-colors
        flex items-start justify-between gap-2
        ${
          isActive
            ? "bg-[var(--color-primary-soft)] font-medium"
            : "hover:bg-[var(--color-history-hover)]"
        }
      `}
    >
      <div className="flex flex-col gap-0.5 min-w-0">
        <span
          className="truncate text-[var(--color-text-primary)] leading-snug"
          title={session.title}
        >
          {session.title || "Untitled"}
        </span>
        {formattedDate && (
          <span className="text-[10px] text-[var(--color-text-secondary)]">
            {formattedDate}
          </span>
        )}
      </div>
    </div>
  );
}