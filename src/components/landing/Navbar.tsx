"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(199, 205, 191, 0)", "rgba(199, 205, 191, 0.95)"]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4 backdrop-blur-lg shadow-lg" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          {/* Logo image (add later) */}
          <Image
            src="/logo.png"          // add this file later
            alt="Anchor logo"
            width={32}
            height={32}
            className="hidden"       // hide until logo exists
          />

          {/* Text fallback */}
          <span className="text-3xl font-bold text-[#595E48]">
            Anchor
          </span>
        </motion.div>

        {/* Nav Links */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex gap-10"
        >
          {[
            { label: "Features", id: "features" },
            { label: "How it Works", id: "how-it-works" },
            { label: "Testimonials", id: "testimonials" },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.2 }}
              className="text-lg text-[#595E48] hover:text-[#919682] transition-colors font-medium"
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 1, x: 20 }}
          animate={{ opacity: 2, x: 0 }}
        >
          <Button 
          onClick={() => router.push("/signup")}
          size="md">Get Started</Button>
        </motion.div>
      </div>
    </motion.nav>
  );
}
