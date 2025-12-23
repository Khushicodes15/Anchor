"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { headingFont } from "@/styles/fonts";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const router = useRouter();

  return (
    <section className="py-32 bg-gradient-to-br from-[#595E48] via-[#919682] to-[#C7CDBF] relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      />

      <div ref={ref} className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`${headingFont.className} text-5xl md:text-7xl text-white mb-6`}>
            Your story isn't over
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join thousands who are rewriting their narratives with AI-powered support
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button
            size="lg"
            onClick={() => router.push("/signup")}
            className="
                bg-[#595E48] 
                text-white 
                hover:bg-[#4a503d]
                text-xl 
                px-16 
                py-6 
                shadow-2xl
                border border-white/20
            "
            >
            Start Your Story Today
            </Button>

          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 text-white/70"
          >
            Your Story • Your Strength • Your Journey • Your Future • Your Anchor
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}