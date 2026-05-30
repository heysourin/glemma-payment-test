"use client";
import React from "react";
import { Camera, ClipboardPlus, FlaskConical } from "lucide-react";
import Link from "next/link";

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="py-20 px-6 md:px-10 bg-[#f5efe9]"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl text-[#3B2E2A] mb-4">
            Features
          </h2>

          <p className="text-[#6f6259] text-base md:text-lg max-w-xl mx-auto">
            A complete skincare intelligence system powered by AI
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* FEATURE 1 */}
          <Link href="/analyse/1">
            <div className="group bg-white/60 border border-[#bf908a] rounded-2xl p-8 backdrop-blur-sm transition hover:shadow-xl hover:-translate-y-1">

              <div className="w-12 h-12 rounded-full border border-[#bf908a] flex items-center justify-center mb-6">
                <Camera className="w-5 h-5 text-[#bf908a]" />
              </div>

              <h3 className="text-lg font-medium text-[#3B2E2A] mb-1">
                Skin Analysis
              </h3>

              <p className="text-xs text-[#B89C7D] mb-3">
                Live / Beta
              </p>

              <p className="text-[#6f6259] text-sm leading-relaxed">
                Upload a selfie and get an AI-powered skin diagnosis with
                personalized insights on your skin condition.
              </p>
            </div>
          </Link>

          {/* FEATURE 2 */}
          <div className="bg-white/60 border border-[#bf908a] rounded-2xl p-8 backdrop-blur-sm transition hover:shadow-xl hover:-translate-y-1">

            <div className="w-12 h-12 rounded-full border border-[#bf908a] flex items-center justify-center mb-6">
              <ClipboardPlus className="w-5 h-5 text-[#bf908a]" />
            </div>

            <h3 className="text-lg font-medium text-[#3B2E2A] mb-1">
              AI Dermatologist
            </h3>

            <p className="text-xs text-[#B89C7D] mb-3">
              Upcoming
            </p>

            <p className="text-[#6f6259] text-sm leading-relaxed">
              Your virtual skin expert available anytime, offering guidance
              based on dermatology-backed intelligence.
            </p>
          </div>

          {/* FEATURE 3 */}
          <div className="bg-white/60 border border-[#bf908a] rounded-2xl p-8 backdrop-blur-sm transition hover:shadow-xl hover:-translate-y-1">

            <div className="w-12 h-12 rounded-full border border-[#bf908a] flex items-center justify-center mb-6">
              <FlaskConical className="w-5 h-5 text-[#bf908a]" />
            </div>

            <h3 className="text-lg font-medium text-[#3B2E2A] mb-1">
              Skincare Products
            </h3>

            <p className="text-xs text-[#B89C7D] mb-3">
              Upcoming
            </p>

            <p className="text-[#6f6259] text-sm leading-relaxed">
              Premium skincare and cosmetic products tailored specifically
              to your skin type and concerns.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureSection;