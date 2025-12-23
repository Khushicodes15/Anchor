"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import Card from "../ui/Card";

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
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const testimonials = [
  {
    name: "Sarah M.",
    role: "College Student",
    text: "Anchor helped me through my darkest moments. The crisis mode literally saved my life.",
    rating: 5,
  },
  {
    name: "James T.",
    role: "Software Engineer",
    text: "The Story Wrapped feature made me realize how far I've come. It's like Spotify Wrapped but for my mental health journey.",
    rating: 5,
  },
  {
    name: "Maya P.",
    role: "Teacher",
    text: "Finally, an app that understands that mental health isn't just about meditation. The narrative therapy approach changed everything.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#595E48] mb-4">
            Real stories, real impact
          </h2>
          <p className="text-xl text-[#919682] max-w-2xl mx-auto">
            Hear from people whose lives were changed by Anchor
          </p>
        </motion.div>

        {/* Testimonial Grid - FIXED HEIGHTS */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="h-full"
    >
      <Card className="h-full flex flex-col">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#C7A491] text-[#C7A491]" />
          ))}
        </div>

        {/* Quote - Takes up available space */}
        <p className="text-[#595E48] text-lg mb-6 italic leading-relaxed flex-grow">
          "{testimonial.text}"
        </p>

        {/* Author - Stays at bottom */}
        <div className="mt-auto">
          <p className="font-bold text-[#595E48]">{testimonial.name}</p>
          <p className="text-[#919682] text-sm">{testimonial.role}</p>
        </div>
      </Card>
    </motion.div>
  );
}