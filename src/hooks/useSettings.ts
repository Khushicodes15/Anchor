"use client";

import { useEffect, useState } from "react";
import type { SettingsData } from "@/types/settings";
// import { getIdToken } from "firebase/auth";
// import { auth } from "@/lib/firebase";
import { getSettings, saveSettings } from "@/services/settingsApi";

/**
 * ======================================================
 * 🚧 DEVELOPMENT MODE
 * Toggle mock data while auth is not ready
 * SET TO false OR DELETE WHEN AUTH IS LIVE
 * ======================================================
 */
const USE_MOCK_DATA = true; // ❌ turn false when auth works

/**
 * ======================================================
 * 🧪 MOCK SETTINGS DATA
 * MUST MATCH BACKEND SCHEMA EXACTLY
 * DELETE WHEN BACKEND + AUTH IS LIVE
 * ======================================================
 */
const MOCK_SETTINGS: SettingsData = {
  profile: {
    name: "Demo User",
    phone: "—",
    email: "demo@anchor.app",
  },
  preferences: {
    language: "en",
    dark_mode: false,
    notifications_enabled: true,
  },
  security: {
    logout_all_devices: false,
  },
};

type Status = "loading" | "success" | "error";

export function useSettings() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  /**
   * --------------------------------------
   * LOAD SETTINGS
   * --------------------------------------
   */
  const loadSettings = async () => {
    setStatus("loading");
    setError(null);

    /**
     * ==========================
     * MOCK MODE
     * ==========================
     */
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        setSettings(MOCK_SETTINGS);
        setStatus("success");
      }, 400);
      return;
    }

    /**
     * ==========================
     * REAL BACKEND MODE
     * ==========================
     */
    try {
      // const user = auth.currentUser;
      // if (!user) throw new Error("Not authenticated");

      // const token = await getIdToken(user);
      const data = await getSettings(/* token */);

      setSettings(data);
      setStatus("success");
    } catch (err) {
      console.error("Failed to load settings:", err);
      setError("Failed to load settings");
      setStatus("error");
    }
  };

  /**
   * --------------------------------------
   * SAVE SETTINGS
   * --------------------------------------
   */
  const updateSettings = async (updated: SettingsData) => {
    setSettings(updated);

    /**
     * MOCK MODE → no backend call
     */
    if (USE_MOCK_DATA) return;

    try {
      // const user = auth.currentUser;
      // if (!user) throw new Error("Not authenticated");

      // const token = await getIdToken(user);
      await saveSettings(updated /*, token */);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setError("Failed to save settings");
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    status,
    error,
    refresh: loadSettings,
    updateSettings,
  };
}