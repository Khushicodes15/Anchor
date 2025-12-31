"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { crisisTheme } from "@/styles/Theme";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(255, 247, 230, 0)", // warm cream (top)
      crisisTheme.colors.surface, // clean white on scroll
    ]
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
        isScrolled
          ? "py-4 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="Anchor logo"
            width={32}
            height={32}
            className="hidden"
          />

          <span
            className="text-3xl font-bold"
            style={{ color: crisisTheme.colors.textPrimary }}
          >
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
              whileHover={{ scale: 1.15 }}
              className="text-lg transition-colors font-medium"
              style={{
                color: crisisTheme.colors.textPrimary,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color =
                  crisisTheme.colors.secondary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  crisisTheme.colors.textPrimary)
              }
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button onClick={() => router.push("/signup")} size="md">
            Get Started
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  );
}
