"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Heart, Shield, Sparkles, Brain, Users, TrendingUp } from "lucide-react";
import { crisisTheme } from "@/styles/Theme";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const features = [
  {
    icon: Heart,
    title: "Crisis Ready",
    description: "Instant access to your personalized safety plan when you need it most",
    color: crisisTheme.colors.primary,
  },
  {
    icon: Brain,
    title: "Narrative Therapy",
    description: "AI-powered journaling that helps you rewrite your story",
    color: crisisTheme.colors.secondary,
  },
  {
    icon: Sparkles,
    title: "AI Companion",
    description: "24/7 intelligent support powered by Azure OpenAI",
    color: crisisTheme.colors.textPrimary,
  },
  {
    icon: Shield,
    title: "Voice Mode",
    description: "Talk through difficult moments with empathetic AI voice support",
    color: crisisTheme.colors.secondarySoft,
  },
  {
    icon: TrendingUp,
    title: "Story Wrapped",
    description: "Beautiful insights into your emotional journey and growth",
    color: crisisTheme.colors.primarySoft,
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Share your journey anonymously and find hope in others' stories",
    color: crisisTheme.colors.secondary,
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      className="relative py-32 overflow-hidden"
      style={{ background: crisisTheme.colors.surface }}
    >
      {/* Top paper edge */}
      <svg viewBox="0 0 1440 60" className="absolute top-0 w-full">
        <path
          d="M0,20 C120,25 240,15 360,22 C480,29 600,35 720,32 C840,29 960,23 1080,26 C1200,29 1320,35 1440,38 L1440,0 L0,0 Z"
          fill={crisisTheme.colors.background}
        />
      </svg>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2
            className="text-6xl md:text-7xl font-serif mb-6"
            style={{ color: crisisTheme.colors.textPrimary }}
          >
            Everything you need
          </h2>
          <p
            className="text-2xl max-w-3xl mx-auto font-light"
            style={{ color: crisisTheme.colors.textSecondary }}
          >
            A comprehensive mental wellness platform designed for real life
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      whileHover={{ y: -8 }}
    >
      <div
        className="h-full rounded-3xl p-8 shadow-lg transition-all duration-300 border"
        style={{
          background: `linear-gradient(135deg, ${crisisTheme.colors.surface}, ${crisisTheme.colors.background})`,
          borderColor: crisisTheme.colors.border,
        }}
      >
        <div
          className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center shadow-md"
          style={{ backgroundColor: `${feature.color}20` }}
        >
          <feature.icon className="w-10 h-10" style={{ color: feature.color }} />
        </div>

        <h3
          className="text-2xl font-bold mb-4"
          style={{ color: crisisTheme.colors.textPrimary }}
        >
          {feature.title}
        </h3>
        <p
          className="text-lg leading-relaxed"
          style={{ color: crisisTheme.colors.textSecondary }}
        >
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
