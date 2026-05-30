"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative flex items-start pt-8 md:pt-6 pb-16 md:pb-24 overflow-hidden">
      {/* BACKGROUND DEPTH */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_55%,rgba(184,156,125,0.18),transparent_45%)]" />

      <div className="relative w-full max-w-[1450px] mx-auto px-6 md:px-1 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div className="ml-0 md:ml-16 space-y-5 md:space-y-6 z-10 animate-fadeUp text-center md:text-left md:pt-24">
          <h1 className="font-serif text-[36px] md:text-[72px] leading-[1.1] md:leading-[1.0] tracking-tight  max-w-[560px] mx-auto md:mx-0">
            Stop guessing what your skin needs.
          </h1>

          <p className="text-[15px] md:text-[17px] text-[#6f6259] max-w-[420px] mx-auto md:mx-0 leading-relaxed">
            Answer a few questions, upload a selfie. Get an AI-powered skin
            analysis and personalized routine in 30 seconds.
          </p>

          <Link
            className="bg-[#bf908a] text-white px-6 md:px-7 py-3 rounded-full text-sm tracking-wide shadow-md hover:opacity-90 transition"
            href="/analyse/1"
          >
            GET MY SKIN ANALYSIS
          </Link>
        </div>

        {/* RIGHT */}
        <div className="relative h-[400px] md:h-[620px] flex items-end justify-center md:justify-end md:bottom-[-40px] md:left-[-60px]">
          {/* AURA CORE */}
          <div className="absolute bottom-[60px] md:bottom-[120px] left-1/2 -translate-x-1/2 w-[200px] md:w-[420px] h-[200px] md:h-[420px] bg-[#bf908a]/40 md:bg-[#B89C7D]/25 blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />

          {/* AURA VERTICAL */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160px] md:w-[300px] h-[260px] md:h-[500px] bg-gradient-to-t from-[#bf908a]/40 via-[#bf908a]/20 to-transparent blur-[50px] md:blur-[100px] pointer-events-none" />

          {/* SIDE GLOW */}
          <div className="hidden md:block absolute bottom-[90px] left-[60%] w-[200px] h-[200px] bg-[#B89C7D]/20 blur-[80px] rounded-full pointer-events-none" />

          {/* IMAGE */}
          <div className="relative w-[320px] md:w-[580px] h-full transition-transform duration-500 hover:scale-[1.18] bottom-[7px] md:bottom-[-10px]">
            {" "}
            <Image
              src="/hero5.png"
              alt="model"
              fill
              className="object-contain object-bottom md:scale-[1.15] scale-[1.35]"
              priority
            />
          </div>

          {/* LIGHT GLOW */}
          <div className="hidden md:block absolute right-[100px] bottom-[80px] w-[320px] h-[320px] bg-[#B89C7D]/20 blur-[140px] rounded-full pointer-events-none" />

          {/* CARD */}

          <div className="absolute bottom-[-50px] md:bottom-[-10px] right-1/2 translate-x-1/2 md:translate-x-0 md:right-[-10px] bg-white/70 backdrop-blur-none p-3 md:p-8 rounded-xl shadow-2xl w-[170px] md:w-[350px] border border-white/40 pointer-events-none">
            <div className="flex items-center gap-3 md:gap-4 mb-3">
              <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-[#bf908a] text-xs md:text-base">
                92
              </div>
              <div>
                <p className="text-[10px] md:text-sm text-gray-500">
                  SKIN SCORE
                </p>
                <p className="text-sm md:text-lg font-medium">Excellent</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 text-[10px] md:text-sm">
              <span className="px-2 py-1 md:px-3 md:py-1.5 bg-[#f2ede7] rounded-full">
                Hydrated
              </span>
              <span className="px-2 py-1 md:px-3 md:py-1.5 bg-[#f2ede7] rounded-full">
                Low acne
              </span>
              <span className="px-2 py-1 md:px-3 md:py-1.5 bg-[#f2ede7] rounded-full">
                Even tone
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')]" /> */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.05))]" /> */}
    </section>
  );
};

export default Hero;
