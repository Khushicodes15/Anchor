"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SettingsSection from "./SettingsSection";
import NotificationItem from "./NotificationItem";
import { Bell, ChevronLeft } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { crisisTheme } from "@/styles/Theme";

export default function NotificationsSection() {
  const { notifications, loading, acknowledge } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={anchorRef} className="relative">
      {/* SETTINGS CARD — unchanged */}
      <SettingsSection
        title="Notifications & Alerts"
        description="Recent updates and check-ins"
        icon={<Bell size={30} />}
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 text-sm"
          style={{ color: crisisTheme.colors.textSecondary }}
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronLeft size={16} />
          </motion.span>

          {isOpen ? "Hide notifications" : "View notifications"}
        </button>
      </SettingsSection>

      {/* ================= MOBILE INLINE PANEL ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden mt-4 overflow-hidden"
          >
            <div
              className="rounded-3xl p-4 space-y-3 shadow-sm"
              style={{
                background: crisisTheme.colors.secondary,
                border: `1px solid ${crisisTheme.colors.border}`,
              }}
            >
              {loading && (
                <p
                  className="text-md"
                  style={{ color: crisisTheme.colors.textTertiary }}
                >
                  Loading notifications…
                </p>
              )}

              {!loading && notifications.length === 0 && (
                <p
                  className="text-sm"
                  style={{ color: crisisTheme.colors.surface }}
                >
                  You’re all caught up.
                </p>
              )}

              {!loading &&
                notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    message={n.message}
                    acknowledged={n.acknowledged}
                    onClick={() => acknowledge(n.id)}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= DESKTOP FLOATING PANEL (UNCHANGED) ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="hidden md:block absolute top-0 right-full mr-6 w-[360px] z-10"
          >
            <div
              className="rounded-3xl p-5 space-y-3 shadow-md"
              style={{
                background: crisisTheme.colors.secondary,
                border: `1px solid ${crisisTheme.colors.border}`,
              }}
            >
              {loading && (
                <p
                  className="text-md"
                  style={{ color: crisisTheme.colors.textTertiary }}
                >
                  Loading notifications…
                </p>
              )}

              {!loading && notifications.length === 0 && (
                <p
                  className="text-sm"
                  style={{ color: crisisTheme.colors.surface }}
                >
                  You’re all caught up.
                </p>
              )}

              {!loading &&
                notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    message={n.message}
                    acknowledged={n.acknowledged}
                    onClick={() => acknowledge(n.id)}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
