// src/types/wrapped.ts

export interface EmotionalTimelinePoint {
  date: string;
  value: number;
}

/* ---------- AVAILABLE WRAPPED ---------- */
export interface WrappedAvailable {
  available: true;
  month: string;

  stats: {
    check_ins: number;
    longest_streak: number;
  };

  emotional_timeline: EmotionalTimelinePoint[];
  top_characters: string[];
  emotional_weather: string;
  growth_moments: number;
  highlight: string;
  future_letter: string;
}

/* ---------- UNAVAILABLE WRAPPED ---------- */
export interface WrappedUnavailable {
  available: false;
  month: string;
  reason: string;
}

/* ---------- UNION ---------- */
export type WrappedResponse = WrappedAvailable | WrappedUnavailable;
