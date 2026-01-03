"use client";

import { auth } from "@/lib/firebase";
import type { SettingsResponse } from "@/types/settings";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Helper: get Firebase ID token
 */
async function getAuthToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  return await user.getIdToken();
}

/**
 * ============================
 * GET /settings
 * ============================
 * Fetch user settings
 */
export async function getSettings(): Promise<SettingsResponse> {
  const token = await getAuthToken();

  const res = await fetch(`${BASE_URL}/settings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  return res.json();
}

/**
 * ============================
 * POST /settings
 * ============================
 * Create or update user settings
 */
export async function saveSettings(
  settings: SettingsResponse
): Promise<void> {
  const token = await getAuthToken();

  const res = await fetch(`${BASE_URL}/settings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(settings),
  });

  if (!res.ok) {
    throw new Error("Failed to save settings");
  }
}