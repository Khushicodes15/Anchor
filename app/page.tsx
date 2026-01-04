"use client";

import { useState } from "react";
import Image from "next/image";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

const SlidingLoginSignup = () => {
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);

  const toggleSignUpMode = (): void => {
    setIsSignUpMode((prev) => !prev);
  };

  // Common button styles
  const buttonClasses: string =
    "w-full text-white bg-backgroundColor hover:bg-brightColor focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md";

  const buttonForGFT: string =
    "inline-flex w-full justify-center items-center rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm font-medium text-gray-500 hover:bg-gray-50 shadow-sm transition-all duration-200 hover:shadow hover:border-gray-400";

  return (
    <div
      className={`relative w-full bg-white min-h-screen overflow-hidden
        before:content-[''] before:absolute before:w-[1500px] before:h-[1500px]
        lg:before:h-[2000px] lg:before:w-[2000px] lg:before:top-[-10%]
        before:top-[initial] lg:before:right-[48%] before:right-[initial]
        max-lg:before:left-[30%] max-sm:bottom-[72%] max-md:before:left-1/2
        max-lg:before:bottom-[75%] before:z-[6] before:rounded-[50%]
        max-md:p-6 lg:before:-translate-y-1/2 max-lg:before:-translate-x-1/2
        before:bg-backgroundColor before:transition-all before:duration-[2s]
        lg:before:duration-[1.8s]
        ${
          isSignUpMode
            ? `lg:before:translate-x-full before:-translate-x-1/2
               before:translate-y-full lg:before:right-[52%]
               before:right-[initial] sm:max-lg:before:bottom-[22%]
               max-sm:before:bottom-[20%] max-md:before:left-1/2`
            : ""
        }`}
    >
      <div className="absolute w-full h-full top-0 left-0">
<div
  className={`absolute top-[58%] left-1/2 grid grid-cols-1 z-[5]
    -translate-x-1/2 -translate-y-1/2
    lg:w-1/2 w-full
    transition-all duration-700 ease-in-out
    ${isSignUpMode ? "lg:left-[26%]" : "lg:left-[74%]"}`}
>


          <div
            className={`flex items-center justify-center flex-col transition-all duration-[0.2s]
              delay-[0.7s] overflow-hidden col-start-1 col-end-2 row-start-1 row-end-2
              px-20 max-lg:mt-60 z-20 max-md:px-6
              ${isSignUpMode ? "opacity-0 z-10" : ""}`}
          >
            <SignInForm
              buttonClasses={buttonClasses}
              buttonForGFT={buttonForGFT}
            />
          </div>

          <div
            className={`flex items-center justify-center flex-col px-20 transition-all ease-in-out
              duration-[0.2s] delay-[0.7s] overflow-hidden col-start-1 col-end-2
              row-start-1 row-end-2 z-10 max-md:px-6 opacity-0
              ${isSignUpMode ? "opacity-100 z-20" : ""}`}
          >
            <SignUpForm
              buttonClasses={buttonClasses}
              buttonForGFT={buttonForGFT}
            />
          </div>
        </div>
      </div>

      <div className="absolute h-full w-full top-0 left-0 grid grid-cols-1 max-lg:grid-rows-[1fr_2fr_1fr] lg:grid-cols-2">
        <div
          className={`flex flex-row justify-around lg:flex-col items-center max-lg:px-[8%]
            max-lg:py-10 lg:items-end text-center z-[6]
            pl-[12%] pr-[17%] pt-12 pb-8
            ${isSignUpMode ? "pointer-events-none" : "pointer-events-auto"}`}
        >
          <div
            className={`text-white transition-transform duration-[0.9s] lg:duration-[1.1s]
              ease-in-out delay-[0.8s] lg:delay-[0.4s]
              ${
                isSignUpMode
                  ? "lg:translate-x-[-800px] max-lg:translate-y-[-300px]"
                  : ""
              }`}
          >
            <h3 className="font-heading text-white text-[1.2rem] lg:text-[1.5rem]">
              New to Anchor?
            </h3>
            <p className="text-[0.7rem] lg:text-[0.95rem] py-2">
              Create a space to reflect, heal, and reconnect with yourself.
            </p>
<button
  onClick={toggleSignUpMode}
  className="w-[110px] h-[35px] text-gray-800 text-[0.7rem]
    lg:w-[130px] lg:h-[41px] lg:text-[0.8rem] font-semibold
    border-2 border-white rounded-full
    bg-[#C7CDBF]
    transition-colors duration-300
    hover:bg-white hover:text-gray-700"
>
  Sign up
</button>
          </div>
        </div>

        <div
          className={`flex flex-row lg:flex-col items-center lg:items-end justify-around
            text-center z-[6] pl-[17%] pr-[12%] pt-12 pb-8
            ${isSignUpMode ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div
            className={`transition-transform duration-[0.9s] lg:duration-[1.1s]
              ease-in-out delay-[0.8s]
              ${
                isSignUpMode
                  ? ""
                  : "lg:translate-x-[800px] max-lg:translate-y-[300px]"
              }`}
          >
<h3 className="font-heading text-white text-[1.4rem] lg:text-[1.75rem]">
  One of us?
</h3>

<p className="py-3 text-white/90 text-[0.9rem] lg:text-[1.05rem] max-w-[320px]">
  Sign in to continue your journey with Anchor
</p>

<button
  onClick={toggleSignUpMode}
  className="w-[110px] h-[35px] text-gray-700 text-[0.7rem]
    lg:w-[130px] lg:h-[41px] lg:text-[0.8rem] font-semibold
    border-2 border-white rounded-full
    bg-[#C7CDBF]
    transition-colors duration-300
    hover:bg-white hover:text-gray-700"
>
  Sign in
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingLoginSignup;
