"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface SignInFormProps {
  buttonClasses: string;
  buttonForGFT: string;
}

const SignInForm = ({ buttonClasses, buttonForGFT }: SignInFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("anchor_token", idToken);
      window.location.href = "/dashboard";
    } catch (error: any) {
      // Map Firebase error codes to human-readable messages
      const code = error?.code || "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setErrorMessage("Incorrect email or password.");
      } else if (code === "auth/too-many-requests") {
        setErrorMessage("Too many attempts. Please wait a moment and try again.");
      } else if (code === "auth/network-request-failed") {
        setErrorMessage("Network error. Please check your connection and try again.");
      } else {
        setErrorMessage(error.message || "Login failed. Please try again.");
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
            Welcome Back
          </h1>
          <p className="text-sm font-body text-[#5E6453] mt-1">
            Sign in to your account
          </p>
        </div>

        {/* Error banner */}
        {errorMessage && (
          <div className="rounded-lg px-4 py-3 text-sm font-medium text-center bg-red-50 text-red-700 border border-red-200">
            {errorMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-[#5E6453]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              required
              disabled={isLoading}
              placeholder="Email address"
              className="bg-[#FFF7E6] border border-[rgba(0,0,0,0.08)] text-[#2F3326] sm:text-sm rounded-lg block w-full pl-10 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]/50 placeholder:text-[#5E6453]/60 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-[#5E6453]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              required
              disabled={isLoading}
              placeholder="Password"
              className="bg-[#FFF7E6] border border-[rgba(0,0,0,0.08)] text-[#2F3326] sm:text-sm rounded-lg block w-full pl-10 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]/50 placeholder:text-[#5E6453]/60 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" disabled={isLoading} className="w-4 h-4 rounded accent-[#FF9F1C] disabled:opacity-50" />
              <label className="text-sm text-[#5E6453]">Remember me</label>
            </div>
            <a href="#" className="text-sm font-medium text-[#FF9F1C] hover:text-[#e8890a] hover:underline transition-colors">
              Forgot password?
            </a>
          </div>

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
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[rgba(0,0,0,0.08)]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#5E6453]">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button type="button" disabled={isLoading} className={buttonForGFT}>G</button>
          <button type="button" disabled={isLoading} className={buttonForGFT}>f</button>
          <button type="button" disabled={isLoading} className={buttonForGFT}>X</button>
        </div>

        <p className="text-sm text-center text-[#5E6453] pt-4 border-t border-[rgba(0,0,0,0.08)]">
          Don&apos;t have an account? Sign up
        </p>
      </div>
    </div>
  );
};

export default SignInForm;