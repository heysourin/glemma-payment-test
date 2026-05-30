import React from "react";

const Disclaimer = () => {
  return (
    <section className=" py-6 md:py-2 overflow-hidden bg-white">
      <div className="relative w-full max-w-max mx-auto px-6 md:px-8">
        <div className="relative border border-[#b4650b] rounded-xl bg-[#faf8f5]/80 backdrop-blur-sm px-6 py-5 md:px-8 md:py-6">
          {/* Subtle accent bar */}
          <div className="absolute top-0 left-6 right-6 md:left-8 md:right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#bf908a]/40 to-transparent" />

          <p className="text-[12px] md:text-[13px] leading-[1.7] text-[#8a7d72] text-justify">
            <span className="font-medium text-[#6f6259]">Glemma</span> provides
            general wellness insights and personalized skincare routines and
            product recommendations only. It is not intended to diagnose, treat,
            cure, mitigate, or prevent any skin condition or disease. This
            service offers non-medicated, non-clinical advice only and is not a
            substitute for professional medical or dermatological advice. Always
            consult a licensed dermatologist or healthcare provider for any
            medical concerns or skin conditions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Disclaimer;
