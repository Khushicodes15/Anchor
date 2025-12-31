import { useEffect, useRef, useState } from "react";

type Phase = "inhale" | "hold" | "exhale";

export function useBreathing(type: "box" | "478" | "deep" = "box") {
  const patterns = {
    box: { inhale: 4, hold: 4, exhale: 4 },
    "478": { inhale: 4, hold: 7, exhale: 8 },
    deep: { inhale: 5, hold: 2, exhale: 6 },
  };

  const [phase, setPhase] = useState<Phase>("inhale");
  const [count, setCount] = useState(patterns[type].inhale);
  const [completedCycles, setCompletedCycles] = useState(0);

  const lastPhase = useRef<Phase>("inhale");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count > 1) {
        setCount(c => c - 1);
        return;
      }

      if (phase === "inhale") {
        setPhase("hold");
        setCount(patterns[type].hold);
      } else if (phase === "hold") {
        setPhase("exhale");
        setCount(patterns[type].exhale);
      } else {
        setPhase("inhale");
        setCount(patterns[type].inhale);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, phase, type]);

  // count full cycle ONLY when exhale → inhale
  useEffect(() => {
    if (lastPhase.current === "exhale" && phase === "inhale") {
      setCompletedCycles(c => c + 1);
    }
    lastPhase.current = phase;
  }, [phase]);

  return { phase, completedCycles };
}
