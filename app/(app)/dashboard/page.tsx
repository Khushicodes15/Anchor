"use client";

import DashboardHeader from "./components/DashboardHeader";
import HeroSection from "./components/HeroSection";
import MoodPrompt from "./components/MoodPrompt";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <DashboardHeader />

      <div className="mt-8">
        <HeroSection />
      </div>

      <div className="mt-10">
        <MoodPrompt />
      </div>
    </div>
  );
}

