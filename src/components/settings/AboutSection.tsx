"use client";

import SettingsSection from "./SettingsSection";
import { Info } from "lucide-react";

export default function AboutSection() {
  return (
    <SettingsSection
      title="About"
      description="App information"
      icon={<Info size={30} />}
    >
      <div className="space-y-2 text-sm">
        <p>Anchor — Mental Wellness</p>
        <p>Version 0.1.0</p>
        <p className="underline cursor-pointer">Privacy Policy</p>
        <p className="underline cursor-pointer">Terms & Conditions</p>
      </div>
    </SettingsSection>
  );
}
