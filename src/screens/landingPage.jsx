import { Link } from "react-router-dom";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] textFont">
      <div className="relative flex flex-col items-center">
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[6vw] md:text-[2vw]"
              : "text-[40px]"
          } font-semibold`}
        >
          Numerical Method Generator
        </h1>
        <p
          className={`${
            window.innerWidth < 1780
              ? "text-[4vw] md:text-[1.5vw]"
              : "text-[30px]"
          } px-[16px] mt-[16px]`}
        >
          The Numerical Method Generator is a powerful tool designed for
          students, engineers, and professionals working with complex numerical
          methods. With this app, you can easily generate numerical methods by
          inputting interpolation points. Whether you're solving problems in
          calculus, data fitting, or scientific computing, this app helps you
          create accurate methods for interpolation, extrapolation, and more.
        </p>

        <div className="flex flex-row gap-x-5 mt-[24px]">
          <Link
            to="/SignUp"
            className={`${
              window.innerWidth < 1780 ? "w-[33vw] md:w-[13vw]" : "w-[200px]"
            } border border-[#019a13] text-[#019a13] rounded-[20px] py-[8px] flex flex-col items-center justify-center`}
          >
            Sign Up
          </Link>
          <Link
            to="/Login"
            className={`${
              window.innerWidth < 1780 ? "w-[33vw] md:w-[13vw]" : "w-[200px]"
            } bg-[#013a19] text-white rounded-[20px] py-[8px] flex flex-col items-center justify-center`}
          >
            Log In
          </Link>
        </div>
        <Link
          to="/GenerateMethod"
          className={`${
            window.innerWidth < 1780 ? "w-[40vw] md:w-[13vw]" : "w-[200px]"
          } bg-[#013a19] mt-[16px] text-white rounded-[20px] py-[8px] flex flex-col items-center justify-center`}
        >
          Generate Method
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
