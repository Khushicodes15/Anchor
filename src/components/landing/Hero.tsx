"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EECFCA] via-[#F5E8E0] to-[#E8D5C4] -mt-20">

      {/* Background blobs */}
      <div className="absolute top-24 right-16 w-96 h-96 bg-[#C7A491]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-24 left-16 w-96 h-96 bg-[#919682]/20 rounded-full blur-3xl" />

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
              <h1 className="text-6xl md:text-8xl font-serif text-[#595E48] leading-tight">
                Your
              </h1>

              <div className="relative min-h-[110px]">
                <motion.h1
                  key={words[wordIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl md:text-8xl font-serif text-[#919682]"
                  style={{
                    lineHeight: "1.15",
                    paddingBottom: "0.15em",
                  }}
                >
                  {words[wordIndex]}
                </motion.h1>
              </div>
            </div>

            {/* SUBTITLE — BELOW THREAD */}
            <p className="mt-16 text-xl md:text-2xl text-[#595E48]/90 max-w-3xl">
              AI-powered wellness for your darkest and brightest days
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 pointer-events-auto">
              <button 
              onClick={() => router.push("/signup")}
              className="px-10 py-4 bg-[#595E48] text-white rounded-full text-lg shadow-xl hover:bg-[#4a503d] transition"
              >
                
                Start Your Journey
              </button>
              <button className="px-10 py-4 bg-white/90 text-[#595E48] rounded-full text-lg shadow-xl hover:bg-[#c7cdbf] transition">
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
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
