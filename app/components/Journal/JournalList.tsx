"use client";

import { useEffect, useState } from "react";
import JournalEntryItem from "./JournalEntryItem";
import { getJournals } from "../../(app)/journal/services/journalApi";

type JournalEntry = {
  id: string;
  content: string;
  created_at: string;
};

export default function JournalList() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getJournals();
        setEntries(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading entries…</p>;
  }

  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">No entries yet.</p>;
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <JournalEntryItem key={entry.id} entry={entry} />
      ))}
    </div>
  );
}


