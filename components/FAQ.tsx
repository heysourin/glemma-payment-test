"use client";
import {useState} from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Glemma?",
    a: " Glemma is an AI skin analysis tool. Answer 7 questions about your skin, upload a selfie, and get a personalised skincare routine and product recommendations in under 30 seconds.",
  },
  {
    q: "How does Glemma's AI skin analysis work?",
    a: "Glemma uses computer vision and machine learning to analyze your skin from a selfie. The AI scans your photo for skin type, texture, tone, and visible concerns, then generates a personalized skincare routine in under 30 seconds. No dermatologist visit required.",
  },
  {
    q: "What skin concerns can Glemma detect?",
    a: "Glemma detects 10+ skin concerns including acne, oiliness, dryness, hyperpigmentation, dark spots, uneven skin texture, enlarged pores, and sensitivity. Each concern is flagged individually so your routine addresses your specific needs.",
  },
  {
    q: "Is my photo stored after the analysis?",
    a: "Your privacy is important to us. Photos uploaded for analysis are used solely to generate your skin report and are not stored permanently or shared with third parties.",
  },
  {
    q: "How is Glemma different from a dermatologist?",
    a: "A dermatologist provides in-person clinical diagnosis. Glemma is an AI-powered tool designed for everyday skincare guidance, instant, accessible, and free. Think of it as your first step before seeing a specialist. It is not a replacement for professional medical advice, but a convenient way to get personalized skincare insights at home.",
  },
  {
    q: "What skin types does Glemma support?",
    a: "Glemma supports all five skin types — oily, dry, combination, normal, and sensitive — across all skin tones. The AI is trained to perform consistently regardless of lighting conditions or skin tone.",
  },
  {
    q: "Is Glemma free to use?",
    a: "Yes. Glemma's AI skin analysis is currently free to use. Simply answer a few questions about your skin, upload a selfie, and receive your personalized skincare report instantly.",
  },
  {
    q: "How long does the skin analysis take?",
    a: "The full analysis takes under 30 seconds. Upload your photo, answer a few quick questions about your skin, and receive a detailed personalized report.",
  },
  {
    q: "What makes a good photo for analysis?",
    a: "For best results, use a clear front-facing photo taken in natural daylight. Avoid heavy makeup, filters, or harsh shadows. A plain background helps the AI focus on your skin.",
  },
  {
    q: "Can Glemma recommend products for sensitive skin?",
    a: "Yes. Glemma specifically identifies sensitivity as a skin concern and tailors product recommendations accordingly, flagging ingredients to avoid and suggesting gentle, fragrance-free alternatives.",
  },
];

// FAQ ITEM
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#e5ddd4] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-medium text-[#3B2E2A] text-base md:text-lg">
          {q}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-[#8b7a6a] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <p className="pb-5 text-[#6f6259] text-sm md:text-base leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}
const FAQ = () => {
  return (
      <section className="px-6 md:px-10 py-20 bg-[#f9f5f1]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-[#3B2E2A] mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-center text-[#6f6259] mb-12">
            Everything you need to know about Glemma.
          </p>

          <div className="border border-[#e5ddd4] rounded-2xl px-6">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
  );
};

export default FAQ;
