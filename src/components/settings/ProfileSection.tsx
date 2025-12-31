"use client";

import SettingsSection from "./SettingsSection";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";
import { crisisTheme } from "@/styles/Theme";

export default function ProfileSection() {
  const { user } = useAuth();

  return (
    <SettingsSection
      title="Profile"
      description="Your account information"
      icon={<User size={30} />}
    >
      <div className="space-y-2 text-sm">
        <ProfileRow label="Name" value={user?.displayName || "—"} />
        <ProfileRow label="Email" value={user?.email || "—"} />
        <ProfileRow label="Phone" value={user?.phoneNumber || "—"} />
        <ProfileRow
          label="Provider"
          value={user?.providerData?.[0]?.providerId || "—"}
        />

        
      </div>
    </SettingsSection>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-medium text-sm">{label}</span>
      <span className="text-sm opacity-80">{value}</span>
    </div>
  );
}
