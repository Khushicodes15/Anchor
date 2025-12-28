import React from "react";

interface SignUpFormProps {
  buttonClasses: string;
  buttonForGFT: string;
}

const SignUpForm = ({
  buttonClasses,
  buttonForGFT,
}: SignUpFormProps) => {

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch(
        "https://anchor-backend-1.onrender.com/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Account created successfully! Please sign in.");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-6 space-y-6 sm:p-8">
        {/* Heading */}
        <h1 className="font-heading text-xl md:text-2xl font-normal leading-tight tracking-tight text-backgroundColor text-center">
          Create Account
        </h1>

        {/* Subheading */}
        <p className="font-body text-sm text-gray-500 text-center -mt-3">
          Sign up to get started
        </p>

        <form
          className="space-y-5 md:space-y-6"
          onSubmit={handleSignup}
        >
          <div className="grid grid-cols-1 gap-5 md:gap-6">
            {/* Full Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="fullName"
                className="font-body bg-[#C7CDBF] border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full pl-10 p-3 shadow-sm"
                placeholder="Full name"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                className="font-body bg-[#C7CDBF] border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full pl-10 p-3 shadow-sm"
                placeholder="Email address"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
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
                className="font-body bg-[#C7CDBF] border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full pl-10 p-3 shadow-sm"
                placeholder="Password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="password"
                name="confirmPassword"
                className="font-body bg-[#C7CDBF] border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full pl-10 p-3 shadow-sm"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <div className="flex items-start">
            <input type="checkbox" className="w-4 h-4 rounded" required />
            <p className="font-body ml-3 text-sm text-gray-500">
              I agree to the{" "}
              <span className="text-brightColor font-medium">Terms of Service</span>{" "}
              and{" "}
              <span className="text-brightColor font-medium">Privacy Policy</span>
            </p>
          </div>

          <button type="submit" className={buttonClasses}>
            Create Account
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="font-body px-2 bg-white text-gray-500">
              Or sign up with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className={buttonForGFT}>G</button>
          <button className={buttonForGFT}>f</button>
          <button className={buttonForGFT}>X</button>
        </div>

        <p className="font-body text-sm text-center text-gray-600 pt-4 border-t">
          Already have an account? Sign in
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
