"use client";

import SettingsSection from "./SettingsSection";
import { User } from "lucide-react";

interface ProfileProps {
  profile: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function ProfileSection({ profile }: ProfileProps) {
  return (
    <SettingsSection
      title="Profile"
      description="Your account information"
      icon={<User size={30} />}
    >
      <div className="space-y-2 text-sm">
        <ProfileRow label="Name" value={profile.name || "—"} />
        <ProfileRow label="Email" value={profile.email || "—"} />
        <ProfileRow label="Phone" value={profile.phone || "—"} />
      </div>
    </SettingsSection>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}</span>
      <span className="opacity-80">{value}</span>
    </div>
  );
}