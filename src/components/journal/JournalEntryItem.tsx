"use client";

type JournalEntry = {
  id: string;
  content: string;
  created_at: string;
};

export default function JournalEntryItem({
  entry,
}: {
  entry: JournalEntry;
}) {
  return (
    <article className="rounded-xl border border-border bg-background p-4 space-y-2">
      <time className="text-xs text-muted-foreground">
        {entry.created_at}
      </time>
      <p className="text-sm leading-relaxed">
        {entry.content}
      </p>
    </article>
  );
}

