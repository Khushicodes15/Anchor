"use client";

import SettingsSection from "./SettingsSection";
import { Sliders } from "lucide-react";

interface PreferencesProps {
  preferences: {
    language: string;
    dark_mode: boolean;
    notifications_enabled: boolean;
  };
}

export default function PreferencesSection({ preferences }: PreferencesProps) {
  return (
    <SettingsSection
      title="Preferences"
      description="Customize your experience"
      icon={<Sliders size={30} />}
    >
      <div className="space-y-3 text-sm">
        <Row label="Language" value={preferences.language} />
        <Row
          label="Theme"
          value={preferences.dark_mode ? "Dark" : "Light"}
        />
        <Row
          label="Notifications"
          value={preferences.notifications_enabled ? "On" : "Off"}
        />
      </div>
    </SettingsSection>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}</span>
      <span className="opacity-80">{value}</span>
    </div>
  );
}