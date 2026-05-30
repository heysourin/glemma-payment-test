"use client";
import React, { useState } from "react";

const BelowHero = () => {
  return (
    <>
      {/* WHAT IS GLEMMA */}
      <section className="px-6 md:px-10 py-20  bg-[#f9f5f1]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#3B2E2A] mb-6">
            What is Glemma?
          </h2>

          <p className="text-[#6f6259] text-base md:text-lg leading-relaxed">
            Glemma is an AI skin analysis tool. Answer 7 questions about your
            skin, upload a selfie, and get a personalised skincare routine and
            product recommendations in under 30 seconds.
          </p>
        </div>
      </section>
      

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-10 py-20 bg-[#f5efe9]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-[#3B2E2A] mb-16">
            How Glemma Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((step, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full border border-[#B89C7D] text-[#B89C7D] flex items-center justify-center text-sm">
                  {step}
                </div>

                <h3 className="font-medium text-[#84534d] text-lg">
                  {step === 1 && "Upload a selfie"}
                  {step === 2 && "AI analyzes your skin"}
                  {step === 3 && "Get your routine"}
                </h3>

                <p className="text-[#6f6259] text-sm leading-relaxed">
                  {step === 1 &&
                    "Take a clear photo in natural light. No filters or heavy makeup."}
                  {step === 2 &&
                    "AI detects skin type, tone, and concerns instantly."}
                  {step === 3 &&
                    "Receive a personalized skincare routine tailored to you."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKIN TYPES */}
      <section className="px-6 md:px-10 py-20 bg-[#f9f5f1]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#3B2E2A] mb-4">
            Works for Every Skin Type
          </h2>

          <p className="text-[#6f6259] mb-12 max-w-2xl mx-auto">
            Trained across all skin types and tones — delivering accurate
            analysis every time.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Oily", "Dry", "Combination", "Normal", "Sensitive"].map(
              (type) => (
                <div
                  key={type}
                  className="bg-white/60 border border-[#e5ddd4] rounded-xl p-4 backdrop-blur-sm"
                >
                  <p className="font-medium text-[#3B2E2A] text-sm mb-1">
                    {type}
                  </p>
                  <p className="text-xs text-[#6f6259]">
                    Skin analysis supported
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BelowHero;