"use client";

import { useState } from "react";
import { crisisTheme } from "@/styles/Theme";

export default function ConnectTherapistForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    console.log("CLICKED"); // DEBUG

    if (!email.trim()) return;

    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail("");
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2
        className="text-2xl font-semibold"
        style={{ color: crisisTheme.colors.textPrimary }}
      >
        Connect Your Therapist
      </h2>

      <input
        type="email"
        placeholder="Therapist Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-xl border"
      />

      <button
        onClick={handleConnect}
        disabled={loading}
        className="px-6 py-3 rounded-full"
        style={{
          background: crisisTheme.colors.primary,
          color: "#fff",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Connecting..." : "Connect"}
      </button>

      {success && (
        <p className="text-green-600 font-medium">
          ✅ Connection request sent successfully (Demo Mode)
        </p>
      )}
    </div>
  );
}