"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { crisisTheme } from "@/styles/Theme";
import { headingFont } from "@/styles/fonts";

export default function CTA() {
  const router = useRouter();

  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{
        background: `linear-gradient(
          135deg,
          ${crisisTheme.colors.primary},
          ${crisisTheme.colors.secondary}
        )`,
      }}
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2
          className={`${headingFont.className} text-5xl md:text-7xl mb-6`}
          style={{ color: crisisTheme.colors.surface }}
        >
          Your story isn’t over
        </h2>

        <p className="text-2xl mb-12 max-w-3xl mx-auto text-white/90">
          Join thousands rewriting their narratives with AI-powered support
        </p>

        <Button
          size="lg"
          onClick={() => router.push("/signup")}
          className="text-xl px-16 py-6 shadow-2xl"
          style={{
            background: crisisTheme.colors.surface,
            color: crisisTheme.colors.textTertiary,
          }}
        >
          Start Your Story Today
        </Button>

        <p className="mt-8 text-white/70">
          Your Story • Your Strength • Your Journey • Your Future • Your Anchor
        </p>
      </div>
    </section>
  );
}
