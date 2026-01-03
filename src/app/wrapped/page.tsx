"use client";

import { useState } from "react";
import { useWrapped } from "@/hooks/useWrapped";
import SceneTransition from "@/components/wrapped/SceneTransition";
import WrappedProgress from "@/components/wrapped/WrappedProgress";
import TapHint from "@/components/wrapped/TapHint";
import NotAvailable from "./not-available";
import { useRouter } from "next/navigation";

// Scenes
import IntroScene from "@/app/scenes/IntroScene";
import CheckInsScene from "@/app/scenes/CheckInsScene";
import StreakScene from "@/app/scenes/StreakScene";
import TimelineScene from "@/app/scenes/TimelineScene";
import CharactersScene from "@/app/scenes/CharactersScene";
import WeatherScene from "@/app/scenes/WeatherScene";
import GrowthScene from "@/app/scenes/GrowthScene";
import HighlightScene from "@/app/scenes/HighlightScene";
import FutureLetterScene from "@/app/scenes/FutureLetterScene";

const SCENES = [
  "intro",
  "checkins",
  "streak",
  "timeline",
  "characters",
  "weather",
  "growth",
  "highlight",
  "future",
] as const;

type SceneKey = typeof SCENES[number];

export default function WrappedPage() {
  const { status, data } = useWrapped();
  const [sceneIndex, setSceneIndex] = useState(0);
  const router = useRouter();

  if (status === "loading") return null;
  if (!data || !data.available) return <NotAvailable />;
  if (status === "error") return <div className="p-10">Failed to load Wrapped</div>;

  const scene: SceneKey = SCENES[sceneIndex];
  const isLastScene = scene === "future";

  /** Controlled advance */
  const nextScene = () => {
    setSceneIndex((prev) => Math.min(prev + 1, SCENES.length - 1));
  };

  /** Only passive scenes respond to global tap */
  const handleGlobalTap = () => {
    if (scene === "characters") return; // ⛔ handoff to CharactersScene
    if (isLastScene) return;
    nextScene();
  };

  const replayWrapped = () => setSceneIndex(0);
  const goToDashboard = () => router.push("/dashboard");

  return (
    <div
      onClick={handleGlobalTap}
      className="w-screen h-screen overflow-hidden"
    >
      <WrappedProgress current={sceneIndex + 1} total={SCENES.length} />

      <SceneTransition sceneKey={scene}>
        {scene === "intro" && <IntroScene monthLabel={data.month} />}

        {scene === "checkins" && (
          <CheckInsScene checkIns={data.stats.check_ins} />
        )}

        {scene === "streak" && (
          <StreakScene longestStreak={data.stats.longest_streak} />
        )}

        {scene === "timeline" && (
          <TimelineScene timeline={data.emotional_timeline} />
        )}

        {scene === "characters" && (
          <CharactersScene
            characters={data.top_characters}
            onComplete={nextScene}
          />
        )}

        {scene === "weather" && (
          <WeatherScene weather={data.emotional_weather} />
        )}

        {scene === "growth" && (
          <GrowthScene growthMoments={data.growth_moments} />
        )}

        {scene === "highlight" && (
          <HighlightScene highlight={data.highlight} />
        )}

        {scene === "future" && (
          <FutureLetterScene
            letter={data.future_letter}
            onReplay={replayWrapped}
            onExit={goToDashboard}
          />
        )}
      </SceneTransition>

      {!isLastScene && scene !== "characters" && <TapHint />}
    </div>
  );
}