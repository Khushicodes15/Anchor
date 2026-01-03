"use client";

import { useEffect, useState } from "react";
import {
  fetchNotifications,
  acknowledgeNotification,
} from "@/services/notificationsApi";
import { useAuth } from "@/hooks/useAuth";

export interface Notification {
  id: string;
  message: string;
  type: string;
  created_at: string;
  acknowledged: boolean;
}

export function useNotifications() {
  const { isAuthenticated } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchNotifications();
        if (mounted) setNotifications(data);
      } catch (err) {
        if (mounted) setError("Unable to load notifications");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  const acknowledge = async (id: string) => {
    // optimistic update
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, acknowledged: true } : n
      )
    );

    try {
      await acknowledgeNotification(id);
    } catch {
      // rollback on failure
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, acknowledged: false } : n
        )
      );
    }
  };

  return {
    notifications,
    loading,
    error,
    acknowledge,
  };
}
