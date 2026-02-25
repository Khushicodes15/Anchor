"use client";

import React, { useState } from "react";

interface SignUpFormProps {
  buttonClasses: string;
  buttonForGFT: string;
}

const InputWithIcon = ({
  type = "text",
  name,
  placeholder,
  icon,
  disabled,
}: {
  type?: string;
  name: string;
  placeholder: string;
  icon: "user" | "mail" | "lock";
  disabled?: boolean;
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#5E6453]">
      {icon === "user" && (
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )}
      {icon === "mail" && (
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )}
      {icon === "lock" && (
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <input
      type={type}
      name={name}
      required
      disabled={disabled}
      placeholder={placeholder}
      className="font-body bg-[#FFF7E6] border border-[rgba(0,0,0,0.08)] text-[#2F3326] text-sm rounded-lg block w-full pl-9 p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]/50 placeholder:text-[#5E6453]/60 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

const SignUpForm = ({ buttonClasses, buttonForGFT }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setStatusMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    // AbortController gives us a 20s timeout
    // Render free tier can take up to ~15s to cold start
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch("https://anchor-backend-fwby.onrender.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (!res.ok) {
        setStatusMessage({ type: "error", text: data.error || "Signup failed. Please try again." });
        return;
      }

      setStatusMessage({ type: "success", text: "Account created! Please sign in." });

    } catch (err: any) {
      clearTimeout(timeoutId);

      if (err.name === "AbortError") {
        // Render cold start took too long
        setStatusMessage({
          type: "error",
          text: "Server is waking up — this can take ~15 seconds on first load. Please try again.",
        });
      } else {
        setStatusMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg border border-[rgba(0,0,0,0.08)]">
      <div className="p-6 sm:p-7 space-y-5">

        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-heading leading-tight tracking-tight text-[#2F3326]">
            Create Account
          </h1>
          <p className="text-sm font-body text-[#5E6453] mt-1">
            Sign up to get started
          </p>
        </div>

        {/* Status message banner — success or error */}
        {statusMessage && (
          <div
            className={`rounded-lg px-4 py-3 text-sm font-medium text-center ${
              statusMessage.type === "success"
                ? "bg-[#E6F3EC] text-[#2F3326] border border-[#4E8D6A]/30"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="grid grid-cols-2 gap-3">
            <InputWithIcon name="fullName" placeholder="Full name" icon="user" disabled={isLoading} />
            <InputWithIcon type="email" name="email" placeholder="Email" icon="mail" disabled={isLoading} />
            <InputWithIcon type="password" name="password" placeholder="Password" icon="lock" disabled={isLoading} />
            <InputWithIcon type="password" name="confirmPassword" placeholder="Confirm" icon="lock" disabled={isLoading} />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              required
              disabled={isLoading}
              className="w-4 h-4 rounded mt-0.5 accent-[#FF9F1C] disabled:opacity-50"
            />
            <p className="font-body text-xs text-[#5E6453] leading-snug">
              I agree to the{" "}
              <span className="text-[#FF9F1C] font-medium cursor-pointer hover:underline">Terms</span>{" "}
              and{" "}
              <span className="text-[#FF9F1C] font-medium cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </div>

          {/* Button shows spinner + "Creating..." while loading, disabled to prevent re-clicks */}
          <button
            type="submit"
            disabled={isLoading}
            className={`${buttonClasses} disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-[#2F3326]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Creating account…
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[rgba(0,0,0,0.08)]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="font-body px-2 bg-white text-[#5E6453]">Or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button type="button" disabled={isLoading} className={buttonForGFT}>G</button>
          <button type="button" disabled={isLoading} className={buttonForGFT}>f</button>
          <button type="button" disabled={isLoading} className={buttonForGFT}>X</button>
        </div>

        <p className="font-body text-xs text-center text-[#5E6453] pt-4 border-t border-[rgba(0,0,0,0.08)]">
          Already have an account? Sign in
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;