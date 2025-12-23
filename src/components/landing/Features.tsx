"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Heart, Shield, Sparkles, Brain, Users, TrendingUp } from "lucide-react";

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
    color: "#C7A491",
  },
  {
    icon: Brain,
    title: "Narrative Therapy",
    description: "AI-powered journaling that helps you rewrite your story",
    color: "#919682",
  },
  {
    icon: Sparkles,
    title: "AI Companion",
    description: "24/7 intelligent support powered by Azure OpenAI",
    color: "#595E48",
  },
  {
    icon: Shield,
    title: "Voice Mode",
    description: "Talk through difficult moments with empathetic AI voice support",
    color: "#C7CDBF",
  },
  {
    icon: TrendingUp,
    title: "Story Wrapped",
    description: "Beautiful insights into your emotional journey and growth",
    color: "#EECFCA",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Share your journey anonymously and find hope in others' stories",
    color: "#919682",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-32 bg-white overflow-hidden">
      {/* Ripped paper edge at top */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-1">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0,20 C120,25 240,15 360,22 C480,29 600,35 720,32 C840,29 960,23 1080,26 C1200,29 1320,35 1380,38 L1440,40 L1440,0 L0,0 Z"
            fill="#EECFCA"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-serif text-[#595E48] mb-6">
            Everything you need
          </h2>
          <p className="text-2xl text-[#919682] max-w-3xl mx-auto font-light">
            A comprehensive mental wellness platform designed for real life
          </p>
        </motion.div>

        {/* Grid */}
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

      {/* Ripped paper edge at bottom */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0,40 C120,35 240,45 360,38 C480,31 600,25 720,28 C840,31 960,37 1080,34 C1200,31 1320,25 1380,22 L1440,20 L1440,60 L0,60 Z"
            fill="#F5E8E0"
          />
        </svg>
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
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="h-full bg-gradient-to-br from-white to-[#F5E8E0]/30 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#EECFCA]/30">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center shadow-md"
          style={{ backgroundColor: `${feature.color}20` }}
        >
          <feature.icon
            className="w-10 h-10"
            style={{ color: feature.color }}
            strokeWidth={2}
          />
        </motion.div>

        {/* Text */}
        <h3 className="text-2xl font-bold text-[#595E48] mb-4">
          {feature.title}
        </h3>
        <p className="text-[#919682] leading-relaxed text-lg">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}