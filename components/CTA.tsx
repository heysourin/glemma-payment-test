'use client';

import React from "react";
import { Button } from "./ui/button";
import { SprayCan, PlayCircle } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-20 px-6 md:px-10 bg-[#f5efe9]">
      
      <div className="max-w-[900px] mx-auto text-center">

        <div className="relative bg-[#3B2E2A] rounded-3xl px-8 md:px-16 py-16 overflow-hidden">
          
          {/* SOFT GLOW */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(184,156,125,0.25),transparent_60%)]" />

          {/* CONTENT */}
          <div className="relative z-10">
            
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Start Your Journey Today
            </h2>

            <p className="text-[#e7ddd2] text-base md:text-lg mb-10 max-w-xl mx-auto">
              Join thousands achieving healthier skin with personalized AI guidance.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

              {/* SECONDARY */}
              <Link href="/features">
                <Button className="w-56 flex items-center justify-center gap-2 bg-transparent border border-[#bf908a] text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#3B2E2A] transition text-sm">
                  <SprayCan className="w-4 h-4" />
                  Explore Features
                </Button>
              </Link>

              {/* PRIMARY */}
              <Link href="/analyse/1">
                <Button className="w-56 flex items-center justify-center gap-2 bg-[#bf908a] text-[#ffffff] px-6 py-3 rounded-full hover:opacity-90 transition text-sm shadow-md">
                  <PlayCircle className="w-4 h-4" />
                  Get Skin Analysis
                </Button>
              </Link>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CTA;