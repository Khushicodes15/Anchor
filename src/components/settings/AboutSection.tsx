"use client";

import SettingsSection from "./SettingsSection";
import { Info } from "lucide-react";
import { crisisTheme } from "@/styles/Theme";

export default function AboutSection() {
  return (
    <SettingsSection
      title="About Anchor"
      description="What this space is — and what it isn’t"
      icon={<Info size={30} />}
    >
      <div
        className="space-y-4 text-sm leading-relaxed"
        style={{ color: crisisTheme.colors.textSecondary }}
      >
        <p>
          <strong>Anchor</strong> is a mental wellness companion designed to help
          you reflect, build awareness, and feel less alone during difficult
          moments.
        </p>

        <p>
          It offers gentle tools for self-reflection, emotional tracking, and
          grounding — not advice, diagnosis, or treatment.
        </p>

        <p>
          Anchor is <strong>not a replacement</strong> for professional mental
          health care. If you’re struggling or in crisis, reaching out to a
          qualified mental health professional or a trusted support system is
          always the right step.
        </p>

        <div className="pt-2 space-y-1">
          <p className="opacity-80">Version 0.1.0</p>

          <div className="flex gap-4">
            <span className="underline cursor-pointer opacity-80">
              Privacy Policy
            </span>
            <span className="underline cursor-pointer opacity-80">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}