"use client";

import SettingsSection from "./SettingsSection";
import { Globe } from "lucide-react";

export default function LanguageSection() {
  return (
    <SettingsSection
      title="Language"
      description="App language"
      icon={<Globe size={30} />}
    >
      <p className="text-sm">English</p>
    </SettingsSection>
  );
}
