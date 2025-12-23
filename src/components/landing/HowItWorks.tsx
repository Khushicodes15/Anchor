"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  {
    number: "01",
    title: "Build Your Safety Plan",
    description:
      "Our AI companion guides you through creating a personalized crisis plan. Add coping strategies, trusted contacts, and your reasons to stay—all in a safe, judgment-free space.",
    highlight: "5 minutes to complete",
    color: "#C7A491",
  },
  {
    number: "02",
    title: "Journal Your Story",
    description:
      "Write freely while AI helps you identify patterns, challenge negative narratives, and celebrate your strengths. Watch as your story transforms from problem-saturated to possibility-rich.",
    highlight: "Daily reflections",
    color: "#919682",
  },
  {
    number: "03",
    title: "Access Support Instantly",
    description:
      "In moments of crisis, one tap gives you voice support, your safety plan, and direct access to emergency resources. You're never alone.",
    highlight: "24/7 availability",
    color: "#595E48",
  },
  {
    number: "04",
    title: "Track Your Growth",
    description:
      "See your progress with beautiful Story Wrapped insights that celebrate how far you've come. Every step forward matters.",
    highlight: "Monthly insights",
    color: "#EECFCA",
  },
];

export default function HowItWorks() {
  const router = useRouter();
  return (
    <section
      id="how-it-works"
      className="relative py-32 bg-gradient-to-br from-[#F5E8E0] to-[#EECFCA] overflow-hidden"
    >
      {/* Ripped paper edge at top */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-1">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0,40 C120,35 240,45 360,38 C480,31 600,25 720,28 C840,31 960,37 1080,34 C1200,31 1320,25 1380,22 L1440,20 L1440,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#C7A491]/10 rounded-full mix-blend-multiply filter blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#919682]/10 rounded-full mix-blend-multiply filter blur-3xl" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C7A491] to-[#EECFCA] flex items-center justify-center shadow-xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <h2 className="text-6xl md:text-7xl font-serif text-[#595E48] mb-6">
            Your journey begins here
          </h2>
          <p className="text-2xl text-[#919682] max-w-3xl mx-auto font-light">
            Four simple steps to transform your mental wellness
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C7A491] via-[#919682] to-[#595E48] hidden md:block" />

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <TimelineStep key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <button 
          onClick={() => router.push("/signup")}
          className="group inline-flex items-center gap-3 px-10 py-5 bg-[#595E48] text-white rounded-full text-lg font-medium shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Ripped paper edge at bottom */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0,20 C120,25 240,15 360,22 C480,29 600,35 720,32 C840,29 960,23 1080,26 C1200,29 1320,35 1380,38 L1440,40 L1440,60 L0,60 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

function TimelineStep({
  step,
  index,
}: {
  step: {
    number: string;
    title: string;
    description: string;
    highlight: string;
    color: string;
  };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8`}
    >
      {/* Number Circle - Center on desktop */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-20">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center border-4"
          style={{ borderColor: step.color }}
        >
          <span className="text-2xl font-bold" style={{ color: step.color }}>
            {step.number}
          </span>
        </motion.div>
      </div>

      {/* Content Card */}
      <div className={`flex-1 ${isEven ? "md:pr-16" : "md:pl-16"}`}>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative"
        >
          {/* Mobile number badge */}
          <div className="md:hidden absolute -top-4 -left-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
              style={{ backgroundColor: step.color }}
            >
              {step.number}
            </div>
          </div>

          {/* Highlight pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#EECFCA]/30 to-[#C7A491]/30 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: step.color }} />
            <span className="text-sm font-medium text-[#595E48]">{step.highlight}</span>
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold text-[#595E48] mb-4">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-lg text-[#919682] leading-relaxed">
            {step.description}
          </p>

          {/* Decorative corner accent */}
          <div
            className="absolute bottom-4 right-4 w-16 h-16 rounded-full opacity-10"
            style={{ backgroundColor: step.color }}
          />
        </motion.div>
      </div>

      {/* Spacer for alignment */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}