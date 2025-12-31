"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { crisisTheme } from "@/styles/Theme";

const words = ["story", "strength", "journey", "future", "anchor"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative overflow-hidden -mt-20"
      style={{
        background: `linear-gradient(
          135deg,
          #FFF7E6 0%,
          #FFF1D6 50%,
          #FFEBC2 100%
        )`,
      }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-24 right-16 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: crisisTheme.colors.primarySoft,
          opacity: 0.35,
        }}
      />
      <div
        className="absolute bottom-24 left-16 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: crisisTheme.colors.secondarySoft,
          opacity: 0.35,
        }}
      />

      {/* HERO CONTENT */}
      <div className="relative z-10 w-full max-w-none mx-auto px-6">
        <div className="relative flex justify-center">
          {/* Illustration */}
          <Image
            src="/huh.png"
            alt="Mental wellness illustration"
            width={1600}
            height={600}
            priority
            className="hidden md:block w-[1000px] md:w-[1200px] lg:w-[1400px] max-w-none h-auto"
          />

          {/* TEXT OVERLAY */}
          <div
            className="
              md:absolute md:inset-0
              flex flex-col items-center text-center
              pt-40 md:pt-70
              pointer-events-none
            "
          >
            {/* Headline */}
            <div className="mb-4">
              <h1
                className="text-6xl md:text-8xl font-serif leading-tight"
                style={{ color: crisisTheme.colors.textPrimary }}
              >
                Your
              </h1>

              <div className="relative min-h-[110px]">
                <motion.h1
                  key={words[wordIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl md:text-8xl font-serif"
                  style={{
                    color: crisisTheme.colors.secondary,
                    lineHeight: "1.15",
                    paddingBottom: "0.15em",
                  }}
                >
                  {words[wordIndex]}
                </motion.h1>
              </div>
            </div>

            {/* Subtitle */}
            <p
              className="mt-16 text-xl md:text-2xl max-w-3xl"
              style={{ color: crisisTheme.colors.textSecondary }}
            >
              AI-powered wellness for your darkest and brightest days
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 pointer-events-auto">
              <button
                onClick={() => router.push("/signup")}
                className="px-10 py-4 rounded-full text-lg shadow-xl transition"
                style={{
                  background: crisisTheme.colors.primary,
                  color: crisisTheme.colors.surface,
                }}
              >
                Start Your Journey
              </button>

              <button
                className="px-10 py-4 rounded-full text-lg shadow-xl transition"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  color: crisisTheme.colors.textPrimary,
                  border: `1px solid ${crisisTheme.colors.border}`,
                }}
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Paper edge */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-auto">
          <path
            d="M0,40 C120,20 240,30 360,25 C480,20 600,35 720,30 C840,25 960,20 1080,30 C1200,40 1320,45 1440,50 L1440,120 L0,120 Z"
            fill={crisisTheme.colors.surface}
          />
        </svg>
      </div>
    </section>
  );
}
