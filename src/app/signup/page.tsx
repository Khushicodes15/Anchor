"use client";

import { useState } from "react";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

const SlidingLoginSignup = () => {
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);

  const toggleSignUpMode = (): void => setIsSignUpMode((prev) => !prev);

  const buttonClasses =
    "w-full text-[#2F3326] bg-[#FF9F1C] hover:bg-[#e8890a] focus:ring-4 focus:outline-none focus:ring-[#FFE27A] font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md";

  const buttonForGFT =
    "inline-flex w-full justify-center items-center rounded-lg border border-[rgba(0,0,0,0.08)] bg-[#FFF7E6] py-2.5 px-4 text-sm font-medium text-[#5E6453] hover:bg-[#FFE27A]/30 shadow-sm transition-all duration-200 hover:border-[#FF9F1C]/40";

  return (
    <div className="min-h-screen w-full bg-[#FFF7E6] overflow-hidden">

      {/* ================================================================
          MOBILE & TABLET LAYOUT  (hidden on lg+)
          Simple vertical stack — no absolute overlap possible:
            [colored header with tagline + toggle button]
            [form card]
          The header bg slides up/down via height transition.
      ================================================================ */}
      <div className="flex flex-col min-h-screen lg:hidden">

        {/* Colored top banner */}
        <div className="relative bg-[#FF9F1C] flex flex-col items-center justify-end pb-8 pt-12 px-6 text-center overflow-hidden"
          style={{ minHeight: "220px" }}
        >
          {/* Decorative circles for depth */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#FFE27A]/30 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#e8890a]/30 pointer-events-none" />

          <div
            className={`transition-all duration-500 ease-in-out relative z-10 ${
              isSignUpMode ? "opacity-0 -translate-y-4 absolute" : "opacity-100 translate-y-0"
            }`}
          >
            <h2 className="font-heading text-[#2F3326] text-2xl font-semibold">New to Anchor?</h2>
            <p className="text-[#2F3326]/70 text-sm mt-1 mb-4 max-w-xs">
              Create a space to reflect, heal, and reconnect with yourself.
            </p>
            <button
              onClick={toggleSignUpMode}
              className="px-6 py-2 rounded-full bg-[#FFE27A] text-[#2F3326] text-sm font-semibold
                border-2 border-[#2F3326]/20 hover:bg-[#FFDD3C] transition-all duration-300 hover:shadow-md"
            >
              Sign up
            </button>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out relative z-10 ${
              isSignUpMode ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute"
            }`}
          >
            <h2 className="font-heading text-[#2F3326] text-2xl font-semibold">One of us?</h2>
            <p className="text-[#2F3326]/70 text-sm mt-1 mb-4 max-w-xs">
              Sign in to continue your journey with Anchor
            </p>
            <button
              onClick={toggleSignUpMode}
              className="px-6 py-2 rounded-full bg-[#FFE27A] text-[#2F3326] text-sm font-semibold
                border-2 border-[#2F3326]/20 hover:bg-[#FFDD3C] transition-all duration-300 hover:shadow-md"
            >
              Sign in
            </button>
          </div>
        </div>

        {/* Form card — sits below header, never overlaps */}
        <div className="flex-1 flex items-start justify-center px-4 py-8 bg-[#FFF7E6]">
          <div className="w-full max-w-[420px]">
            <div className="relative">
              {/* Sign In */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isSignUpMode ? "opacity-0 pointer-events-none absolute inset-0" : "opacity-100"
                }`}
              >
                <SignInForm buttonClasses={buttonClasses} buttonForGFT={buttonForGFT} />
              </div>
              {/* Sign Up */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isSignUpMode ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
                }`}
              >
                <SignUpForm buttonClasses={buttonClasses} buttonForGFT={buttonForGFT} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          DESKTOP LAYOUT  (hidden below lg)
          Original horizontal sliding circle animation, fully intact.
      ================================================================ */}
      <div
        className={`hidden lg:block relative w-full min-h-screen overflow-hidden
          before:content-[''] before:absolute
          before:w-[2000px] before:h-[2000px]
          before:top-[-10%] before:right-[48%]
          before:z-[6] before:rounded-[50%]
          before:-translate-y-1/2
          before:bg-[#FF9F1C]
          before:transition-all before:duration-[1600ms] before:ease-in-out
          ${isSignUpMode ? "before:translate-x-full before:right-[52%]" : ""}`}
      >
        {/* Forms panel */}
        <div className="absolute w-full h-full top-0 left-0">
          <div
            className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2
              grid grid-cols-1 w-1/2 z-[5]
              transition-all duration-[1600ms] ease-in-out
              ${isSignUpMode ? "lg:left-[26%]" : "lg:left-[74%]"}`}
          >
            {/* Sign In */}
            <div
              className={`col-start-1 col-end-2 row-start-1 row-end-2
                flex items-center justify-center px-10
                transition-opacity duration-[250ms] ease-in-out
                ${isSignUpMode
                  ? "opacity-0 pointer-events-none delay-0"
                  : "opacity-100 pointer-events-auto delay-[1100ms]"}`}
            >
              <SignInForm buttonClasses={buttonClasses} buttonForGFT={buttonForGFT} />
            </div>

            {/* Sign Up */}
            <div
              className={`col-start-1 col-end-2 row-start-1 row-end-2
                flex items-center justify-center px-10
                transition-opacity duration-[250ms] ease-in-out
                ${isSignUpMode
                  ? "opacity-100 pointer-events-auto delay-[1100ms]"
                  : "opacity-0 pointer-events-none delay-0"}`}
            >
              <SignUpForm buttonClasses={buttonClasses} buttonForGFT={buttonForGFT} />
            </div>
          </div>
        </div>

        {/* Overlay text + toggle buttons */}
        <div className="absolute h-full w-full top-0 left-0 grid lg:grid-cols-2">
          {/* LEFT — "New to Anchor?" */}
          <div
            className={`flex flex-col items-end justify-center text-center z-[6]
              pl-[12%] pr-[17%] pt-12 pb-8
              ${isSignUpMode ? "pointer-events-none" : "pointer-events-auto"}`}
          >
            <div
              className={`transition-transform duration-[1000ms] ease-in-out delay-[200ms]
                ${isSignUpMode ? "-translate-x-[800px]" : "translate-x-0"}`}
            >
              <h3 className="font-heading text-[#2F3326] text-[1.2rem] lg:text-[1.5rem]">
                New to Anchor?
              </h3>
              <p className="text-[#5E6453] text-[0.95rem] py-2">
                Create a space to reflect, heal, and reconnect with yourself.
              </p>
              <button
                onClick={toggleSignUpMode}
                className="w-[130px] h-[41px] text-[#2F3326] text-[0.8rem] font-semibold
                  border-2 border-[#2F3326]/25 rounded-full bg-[#FFE27A]
                  transition-all duration-300 hover:bg-[#FFDD3C] hover:shadow-md"
              >
                Sign up
              </button>
            </div>
          </div>

          {/* RIGHT — "One of us?" */}
          <div
            className={`flex flex-col items-start justify-center text-center z-[6]
              pl-[17%] pr-[12%] pt-12 pb-8
              ${isSignUpMode ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            <div
              className={`transition-transform duration-[1000ms] ease-in-out delay-[200ms]
                ${isSignUpMode ? "translate-x-0" : "translate-x-[800px]"}`}
            >
              <h3 className="font-heading text-[#2F3326] text-[1.75rem]">
                One of us?
              </h3>
              <p className="py-3 text-[#5E6453] text-[1.05rem] max-w-[320px]">
                Sign in to continue your journey with Anchor
              </p>
              <button
                onClick={toggleSignUpMode}
                className="w-[130px] h-[41px] text-[#2F3326] text-[0.8rem] font-semibold
                  border-2 border-[#2F3326]/25 rounded-full bg-[#FFE27A]
                  transition-all duration-300 hover:bg-[#FFDD3C] hover:shadow-md"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SlidingLoginSignup;