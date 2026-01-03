// src/types/notifications.ts

export type NotificationType =
  | "check_in"
  | "crisis"
  | "journal"
  | "system"
  | string; // allow backend expansion without breaking UI

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  created_at: string; // ISO string from backend
  acknowledged: boolean;
}
