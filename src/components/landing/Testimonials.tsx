"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import Card from "../ui/Card";
import { crisisTheme } from "@/styles/Theme";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const testimonials = [
  {
    name: "Sarah M.",
    role: "College Student",
    text: "Anchor helped me through my darkest moments.",
    rating: 5,
  },
  {
    name: "James T.",
    role: "Software Engineer",
    text: "Story Wrapped showed how far I’ve come.",
    rating: 5,
  },
  {
    name: "Maya P.",
    role: "Teacher",
    text: "Narrative therapy changed everything.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24"
      style={{ background: crisisTheme.colors.surface }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: crisisTheme.colors.textPrimary }}
          >
            Real stories, real impact
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: crisisTheme.colors.textSecondary }}
          >
            Hear from people whose lives were changed by Anchor
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i}>
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    fill={crisisTheme.colors.primary}
                    color={crisisTheme.colors.primary}
                  />
                ))}
              </div>

              <p
                className="italic text-lg mb-6"
                style={{ color: crisisTheme.colors.textPrimary }}
              >
                “{t.text}”
              </p>

              <p style={{ color: crisisTheme.colors.textPrimary }} className="font-bold">
                {t.name}
              </p>
              <p style={{ color: crisisTheme.colors.textSecondary }} className="text-sm">
                {t.role}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
