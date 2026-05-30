"use client";
import React from "react";
import { ChevronRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Upload a selfie",
      desc: "Upload a clear, front-facing photo of your face for instant analysis.",
    },
    {
      num: "02",
      title: "Get personalized insights",
      desc: "Receive a detailed report on your skin health and tailored skincare recommendations.",
    },
  ];

  return (
    <section id="how" className="py-20 px-6 md:px-10 bg-[#f5efe9]">
      <div className="max-w-[1000px] mx-auto text-center">
        
        {/* HEADER */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl md:text-4xl text-[#3B2E2A] mb-4">
            Simple. Smart. Accurate.
          </h2>

          <p className="text-[#6f6259] text-base md:text-lg max-w-xl mx-auto">
            Your skincare journey in just two effortless steps.
          </p>
        </div>

        {/* STEPS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 relative">

          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center max-w-sm relative"
            >
              
              {/* STEP NUMBER (refined) */}
              <div className="w-12 h-12 rounded-full border border-[#bf908a] text-[#B89C7D] flex items-center justify-center text-sm mb-6">
                {step.num}
              </div>

              {/* TITLE */}
              <h3 className="text-lg md:text-xl font-medium text-[#3B2E2A] mb-2">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[#6f6259] text-sm md:text-base leading-relaxed">
                {step.desc}
              </p>

              {/* CONNECTOR */}
              {i < steps.length - 1 && (
                <ChevronRight className="hidden md:block absolute top-6 -right-12 w-6 h-6 text-[#B89C7D]/70" />
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;