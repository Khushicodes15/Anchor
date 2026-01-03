"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SeeThreeThings({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [items, setItems] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [droppingIndex, setDroppingIndex] = useState<number | null>(null);
  const [settledCount, setSettledCount] = useState(0);

  const addItem = () => {
    if (!value.trim() || items.length >= 3 || droppingIndex !== null) return;

    setItems((prev) => {
      const next = [...prev, value.trim()];
      setDroppingIndex(next.length - 1);
      return next;
    });

    setValue("");
  };

  return (
    <section
      className="fixed inset-0 flex flex-col items-center"
      style={{
        top: "60px",                 // navbar height
        background: "#EEE4BB",        
      }}
    >
      {/* Prompt */}
      <div className="mt-24 text-center z-20">
        <h1
          className="text-3xl font-medium"
          style={{ color: "#2F3326" }}
        >
          Name 3 things you can see.
        </h1>
      </div>

      {/* Input */}
      {items.length < 3 && (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          className="mt-12 px-6 py-4 rounded-full text-lg outline-none shadow-sm"
          style={{
            background: "#FFFFFF",
            color: "#2F3326",
          }}
          placeholder="Type one thing…"
        />
      )}

      {/* DROP AREA (STRICTLY CLIPPED) */}
      <div className="relative flex-1 w-full flex justify-center">
        {/* CLIP CONTAINER — defines where items are allowed to exist */}
        <div
          className="relative w-full"
          style={{
            height: "58vh",          // aligns with cup mouth
            overflow: "hidden",      // 🔑 hard clip
          }}
        >
          {items.slice(settledCount).map((item, i) => {
            const realIndex = i + settledCount;

            return (
              <motion.div
                key={`${item}-${realIndex}`}
                initial={{ y: 0, opacity: 1 }}
                animate={
                  realIndex === droppingIndex
                    ? { y: "45vh", opacity: 0 } // 🔑 stops inside cup
                    : {}
                }
                transition={{ duration: 0.9, ease: "easeIn" }}
                onAnimationComplete={() => {
                  if (realIndex === droppingIndex) {
                    setDroppingIndex(null);
                    setSettledCount((c) => c + 1);

                    if (realIndex === 2) {
                      onComplete();
                    }
                  }
                }}
                className="absolute left-1/2 -translate-x-1/2 top-[20%] px-5 py-2 rounded-full shadow-md"
                style={{
                  background: "#FF9F1C", // soft orange pill
                  color: "#2F3326",
                }}
              >
                {item}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CUP (visual only, above clip) */}
      <div className="absolute bottom-0 z-30 pointer-events-none">
        <img
          src="/cup.png"
          alt=""
          className="w-[550px] select-none"
        />
      </div>
    </section>
  );
}
