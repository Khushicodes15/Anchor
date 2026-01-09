type Props = {
  sessions: { id: string; title: string }[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
};

export default function JournalChatHistory({
  sessions,
  activeSessionId,
  onSelectSession,
}: Props) {
  return (
    <aside className="h-full p-4 overflow-y-auto bg-[var(--color-history-bg)]">
      <h3 className="text-sm font-semibold mb-4 text-[var(--color-text-primary)]">
        Chat history
      </h3>

      {sessions.length === 0 && (
        <p className="text-sm text-[var(--color-text-secondary)]">
          No journal entries yet.
        </p>
      )}

      <div className="space-y-2">
        {sessions.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelectSession(s.id)}
            className={`
              rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors
              ${
                s.id === activeSessionId
                  ? "bg-[var(--color-primary-soft)] font-medium"
                  : "hover:bg-[var(--color-history-hover)]"
              }
            `}
          >
            {s.title}
          </div>
        ))}
      </div>
    </aside>
  );
}

