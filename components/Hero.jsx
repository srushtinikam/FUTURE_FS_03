// components/Hero.jsx

import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-[#F7EDE2] dark:bg-zinc-900 text-[#4A4E69] dark:text-white py-20 px-6 font-outfit">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Step into Style with{" "}
            <span className="text-[#F6BD60]">Nike’s Finest</span>
          </h1>
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
            Discover performance, comfort, and bold design in every step.
          </p>
          <Link href="#products">
            <button className="bg-[#F6BD60] hover:bg-[#f8c77a] text-[#4A4E69] font-semibold px-6 py-3 rounded shadow transition">
              🛍️ Shop Now
            </button>
          </Link>
        </div>

        {/* Right Section - Image */}
        <div className="flex-1">
          <img
            src="/Image_1.png"
            alt="Nike Banner"
            className="w-full max-w-md mx-auto drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
