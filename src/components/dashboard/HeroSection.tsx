import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { crisisTheme } from "@/styles/Theme";

export default function HeroSection() {
  return (
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-12 rounded-[32px]"
  style={{ background: crisisTheme.colors.primarySoft }}
>

      {/* Text */}
      <div className="flex flex-col justify-center max-w-xl mx-auto text-center md:text-left">
        <h1
          className="text-3xl mb-4 leading-snug"
          style={{ color: crisisTheme.colors.textPrimary }}
        >
          A steady place, no matter what you’re feeling
        </h1>

        <p
          className="text-base"
          style={{ color: crisisTheme.colors.textSecondary }}
        >
          Anchor supports your mental wellbeing with thoughtful guidance,
          reflective tools, and safe conversations—designed for real life,
          real emotions, and real growth.
        </p>

        <div className="mt-6 flex justify-center md:justify-start">
          <Link href="/journal">
<motion.button
  whileHover={{ y: -2, scale: 1.02 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="px-6 py-3 rounded-xl text-sm font-medium"
  style={{
    background: crisisTheme.colors.primary,
    color: crisisTheme.colors.surface,
  }}
>
  Go to Journal
</motion.button>

          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <Image
          src="/anchor.png"
          alt="Support illustration"
          width={320}
          height={320}
          priority
        />
      </div>
    </motion.div>
  );
}


