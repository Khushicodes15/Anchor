import { getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Helper to get auth headers
 */
async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await getIdToken(user);
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

/**
 * GET /notifications
 */
export async function fetchNotifications() {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_BASE_URL}/notifications/`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data = await res.json();
  return data.notifications;
}

/**
 * POST /notifications/acknowledge
 */
export async function acknowledgeNotification(notificationId: string) {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${API_BASE_URL}/notifications/acknowledge?notification_id=${notificationId}`,
    {
      method: "POST",
      headers,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to acknowledge notification");
  }

  return res.json();
}
