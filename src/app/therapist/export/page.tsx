"use client";

import { generateTherapyReport } from "@/lib/exportService";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAuth } from "firebase/auth";

export default function ExportPage() {
  const auth = getAuth();
const user = auth.currentUser;
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchEntries = async () => {
      const snap = await getDocs(
        collection(db, "users", user.uid, "journalEntries")
      );
      setEntries(snap.docs.map((doc) => doc.data()));
    };

    fetchEntries();
  }, [user]);

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={() => generateTherapyReport(entries)}
        className="px-6 py-3 rounded-full"
        style={{
          background: "#FF9F1C",
          color: "#fff",
        }}
      >
        Download Therapy Report
      </button>
    </div>
  );
}