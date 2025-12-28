import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface SignInFormProps {
  buttonClasses: string;
  buttonForGFT: string;
}

const SignInForm = ({
  buttonClasses,
  buttonForGFT,
}: SignInFormProps) => {

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredential.user.getIdToken();

      // Save token
      localStorage.setItem("anchor_token", idToken);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error: any) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-6 space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-backgroundColor md:text-2xl text-center">
          Welcome Back
          <p className="text-sm font-normal text-gray-500 mt-1">
            Sign in to your account
          </p>
        </h1>

        <form
          className="space-y-5 md:space-y-6"
          onSubmit={handleLogin}
        >
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              className="bg-[#C7CDBF] border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full pl-10 p-3 shadow-sm"
              placeholder="Email address"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              className="bg-[#C7CDBF] border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full pl-10 p-3 shadow-sm"
              placeholder="Password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <label className="ml-3 text-sm text-gray-500">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-brightColor hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button type="submit" className={buttonClasses}>
            Sign in
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className={buttonForGFT}>G</button>
          <button className={buttonForGFT}>f</button>
          <button className={buttonForGFT}>X</button>
        </div>

        <p className="text-sm text-center text-gray-600 pt-4 border-t">
          If you don&apos;t have an account, Do Sign Up
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
