import React from "react";

interface SignUpFormProps {
  buttonClasses: string;
  buttonForGFT: string;
}

const SignUpForm = ({ buttonClasses, buttonForGFT }: SignUpFormProps) => {
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg border border-gray-100 max-h-[88vh] overflow-y-auto">
      {/* reduced padding + spacing */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* Heading */}
        <h1 className="font-heading text-lg md:text-xl font-normal text-backgroundColor text-center">
          Create Account
        </h1>

        {/* Subheading */}
        <p className="font-body text-sm text-gray-500 text-center -mt-1">
          Sign up to get started
        </p>

        <form className="space-y-3" onSubmit={handleSignup}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputWithIcon name="fullName" placeholder="Full name" icon="user" />
            <InputWithIcon type="email" name="email" placeholder="Email address" icon="mail" />
            <InputWithIcon type="password" name="password" placeholder="Password" icon="lock" />
            <InputWithIcon
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              icon="lock"
            />
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" className="w-4 h-4 rounded mt-1" required />
            <p className="font-body text-xs text-gray-500 leading-snug">
              I agree to the{" "}
              <span className="text-brightColor font-medium">Terms</span> and{" "}
              <span className="text-brightColor font-medium">Privacy Policy</span>
            </p>
          </div>

          <button type="submit" className={buttonClasses}>
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="font-body px-2 bg-white text-gray-500">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button className={buttonForGFT}>G</button>
          <button className={buttonForGFT}>f</button>
          <button className={buttonForGFT}>X</button>
        </div>

        <p className="font-body text-xs text-center text-gray-600 pt-2 border-t">
          Already have an account? Sign in
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

/* --- helper input --- */
const InputWithIcon = ({
  type = "text",
  name,
  placeholder,
  icon,
}: {
  type?: string;
  name: string;
  placeholder: string;
  icon: "user" | "mail" | "lock";
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
      {icon === "user" && (
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
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
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
    <input
      type={type}
      name={name}
      required
      className="font-body bg-[#C7CDBF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2 shadow-sm"
      placeholder={placeholder}
    />
  </div>
);
