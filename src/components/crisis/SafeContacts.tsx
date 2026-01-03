"use client";

import { motion } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";

type SafeContact = {
  name: string;
  phone?: string;
};

type Props = {
  contacts: SafeContact[];
  onNext: () => void;
};

export default function SafeContacts({ contacts, onNext }: Props) {
  const call = (phone?: string) => {
    if (!phone) return;
    window.location.href = `tel:${phone}`;
  };

  const message = (phone?: string) => {
    if (!phone) return;
    window.location.href = `sms:${phone}`;
  };

  return (
    <section
      className="
        fixed left-0 right-0 bottom-0
        flex flex-col sm:flex-row
      "
      style={{
        top: "60px",
        background: "#FFFFB7",
      }}
    >
      {/* LEFT — VISUAL */}
      <div
        className="
          flex-1 flex items-center justify-center pointer-events-none
          py-10 sm:py-0
        "
      >
        <motion.svg
          viewBox="0 0 500 600"
          className="
            w-[260px] h-[300px]
            sm:w-[380px] sm:h-[440px]
          "
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <path id="topText" d="M 120 140 A 160 160 0 0 1 380 140" />
            <path id="bottomText" d="M 100 370 A 130 130 0 0 0 400 350" />
          </defs>

          <text fill="#3BA4F7" fontSize="45" fontWeight="800">
            <textPath href="#topText" startOffset="50%" textAnchor="middle">
              Call that
            </textPath>
          </text>

          <text fill="#3BA4F7" fontSize="45" fontWeight="800">
            <textPath href="#bottomText" startOffset="50%" textAnchor="middle">
              person.
            </textPath>
          </text>

          <circle cx="250" cy="280" r="180" fill="#FFD33D" />

          <g
            stroke="#5B4A2E"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          >
            <path d="M200 165 q20 14 40 0" />
            <path d="M265 165 q20 14 40 0" />
          </g>

          <path
            d="M205 215 q45 32 90 0"
            stroke="#5B4A2E"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />

          <path
            d="M250 335
              c -26 -26 -65 -8 -65 26
              c 0 36 65 66 65 66
              c 0 0 65 -30 65 -66
              c 0 -34 -39 -52 -65 -26"
            fill="#3BA4F7"
          />

          <path
            d="M160 340 q45 35 75 18"
            stroke="#FFFFFF"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M340 340 q-45 35 -75 18"
            stroke="#FFFFFF"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>

      {/* RIGHT — CONTACT ACTIONS */}
      <div
        className="
          flex-1 flex flex-col justify-center
          px-6 sm:px-0
          pb-12 sm:pb-0
          pr-0 sm:pr-[8vw]
        "
      >
        <h2
          className="text-2xl sm:text-3xl font-medium mb-8 sm:mb-10"
          style={{ color: crisisTheme.colors.textSecondary }}
        >
          You don’t have to do this alone
        </h2>

        <div className="flex flex-col gap-5 sm:gap-6">
          {contacts.map((contact) => (
            <div key={contact.name} className="flex items-center gap-4">
              <span
                className="text-base sm:text-lg w-32 sm:w-40"
                style={{ color: crisisTheme.colors.textSecondary }}
              >
                {contact.name}
              </span>

              {contact.phone && (
                <>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => call(contact.phone)}
                    className="px-5 py-3 rounded-full text-sm"
                    style={{
                      background: "#FF9F1C",
                      color: "#FFFFFF",
                    }}
                  >
                    Call
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => message(contact.phone)}
                    className="px-5 py-3 rounded-full text-sm"
                    style={{
                      background: "#4F8F6A",
                      color: "#FFFFFF",
                    }}
                  >
                    Message
                  </motion.button>
                </>
              )}
            </div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="
            mt-10 sm:mt-14
            w-fit px-12 sm:px-14
            py-4 rounded-full
            text-base sm:text-lg
          "
          style={{
            background: crisisTheme.colors.primary,
            color: "#FFFFFF",
          }}
        >
          Continue
        </motion.button>
      </div>
    </section>
  );
}
