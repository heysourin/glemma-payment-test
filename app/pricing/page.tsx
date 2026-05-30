import type { Metadata } from "next";
import Link from "next/link";
import DodoCheckoutButton from "./_components/dodo-checkout-button";
// import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Glemma Pricing | Free AI Skin Analysis & Pro Plans",
  description:
    "Start free with one AI skin analysis per week. Upgrade to Glow or Glow Pro for unlimited analysis, personalized product recommendations, progress tracking, and AI-generated weekly routines.",
  alternates: {
    canonical: "https://theglemma.com/pricing",
  },
  openGraph: {
    title: "Glemma Pricing | Free AI Skin Analysis & Pro Plans",
    description:
      "Free, Glow $9.79/mo, and Glow Pro $19.99/mo. Start free, upgrade when your skin starts to change.",
    url: "https://theglemma.com/pricing",
    siteName: "Glemma",
    images: [
      {
        url: "https://theglemma.com/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Glemma Pricing Plans",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glemma Pricing | Free AI Skin Analysis & Pro Plans",
    description:
      "Free, Glow $9.79/mo, and Glow Pro $14.79/mo. Start free, upgrade when your skin starts to change.",
    images: ["https://theglemma.com/og-image.jpeg"],
  },
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Glemma Pricing",
  description: "Pricing plans for Glemma's AI-powered skin analysis platform.",
  url: "https://theglemma.com/pricing",
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "1 skin analysis per week with generic product suggestions.",
    },
    {
      "@type": "Offer",
      name: "Glow",
      price: "9.79",
      priceCurrency: "USD",
      description:
        "Unlimited skin analysis, personalized product suggestions, and progress tracking.",
    },
    {
      "@type": "Offer",
      name: "Glow Pro",
      price: "19.99",
      priceCurrency: "USD",
      description:
        "Everything in Glow plus AI-generated weekly routines and priority feature access.",
    },
  ],
};

type Feature = {
  text: string;
  included: boolean;
  highlighted?: boolean;
};

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  ctaHref: string;
  featured: boolean;
  badge: string | null;
  features: Feature[];
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description:
      "One analysis a month. Enough to understand your skin type and start paying attention.",
    cta: "Start free",
    ctaHref: "/analyse/1",
    featured: false,
    badge: null,
    features: [
      { text: "1 skin analysis per month", included: true },
      { text: "Skin type detection", included: true },
      { text: "Basic concern identification", included: true },
      { text: "Generic product suggestions", included: true },
      { text: "Personalized recommendations", included: false },
      { text: "Progress photo tracking", included: false },
      { text: "AI-generated weekly routine", included: false },
      { text: "Priority feature access", included: false },
    ],
  },
  {
    name: "Glow",
    price: "$14.99",
    period: "per month",
    description: "See visible improvement in 2–4 weeks with guided routines.",
    cta: "Get Glow",
    ctaHref: "/analyse/1",
    featured: false,
    badge: null,
    features: [
      { text: "3x skin analysis per week", included: true },
      {
        text: "Full concern detection (acne, pigmentation, texture, etc.)",
        included: true,
      },
      { text: "Severity scoring (quantified tracking)", included: true },
      { text: "Real product recommendations (not generic)", included: true },
      {
        text: "Weekly progress tracking (photo + AI comparison)",
        included: true,
      },
      { text: "Guided weekly routine (AI-assisted)", included: true },
      { text: "Basic lifestyle suggestions", included: true },
      { text: "Routine compliance tracking", included: false },
      { text: "Audit of your current products", included: false },
      {
        text: "Pre-access to our latest features & skincare products",
        included: false,
        highlighted: true,
      },
    ],
  },
  {
    name: "Glow Pro",
    price: "$19.99",
    period: "per month",
    description:
      "Get faster, predictable skin improvement with a system that adapts to you daily.",
    cta: "Get Glow Pro",
    ctaHref: "/analyse/1",
    featured: true,
    badge: "Most complete",
    features: [
      { text: "Unlimited skin analysis", included: true },
      { text: "Full concern + severity tracking", included: true },
      { text: "Real product recommendations", included: true },
      { text: "Daily adaptive routine (not weekly)", included: true },
      {
        text: "Lifestyle engine (Sleep, diet, stress correlations to skin)",
        included: true,
      },
      {
        text: "Product stack optimization (Detect conflicts between products)",
        included: true,
      },
      {
        text: "Skin pattern intelligence (Predict breakouts before they happen)",
        included: true,
      },
      { text: "Audit of current products", included: true },
      { text: "Predict breakouts before they happen", included: true },
      {
        text: "Pre-access to our skincare products & latest features  ",
        included: true,
        highlighted: true,
      },
    ],
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no cancellation fees. Cancel from your account settings and you keep access until the end of your billing period.",
  },
  {
    q: "What counts as a skin analysis?",
    a: "Each photo upload and AI report generation counts as one analysis. Free users get one per week. Paid users get unlimited.",
  },
  {
    q: "How is the weekly routine different from product suggestions?",
    a: "Product suggestions tell you what to buy. The weekly routine tells you what to do — morning steps, evening steps, frequency, and adjustments based on your tracked progress over time.",
  },
  {
    q: "Is my photo stored after analysis?",
    a: "No. Your photo is processed and immediately discarded. Progress tracking stores the analysis results, not the image itself.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards via Stripe. Secure, encrypted, and never stored on our servers.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#e5ddd4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,144,138,0.2),transparent_40%)]" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
              Pricing
            </p>

            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              Start free. Upgrade when your skin evolves.
            </h1>

            <p className="text-lg text-[#6f6259] leading-relaxed">
              Try Glemma without friction. Upgrade when you want deeper insight.
            </p>

            <p className="md:text-sm text-xs text-[#9a8d84] leading-relaxed mt-4 max-w-xl">
              (Glemma offers non-medicated wellness insights and skincare
              recommendations only. Not medical advice. Consult a dermatologist
              for medical concerns.)
            </p>
          </div>
        </div>
      </section>
      {/* <Disclaimer /> */}

      {/* PRICING */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[2rem] border p-8 flex flex-col ${
                plan.featured
                  ? "border-[#bf908a] bg-white/70 shadow-md"
                  : "border-[#e5ddd4] bg-white/60"
              }`}
            >
              {/* Badge */}
              <div className="mb-5 min-h-[28px]">
                {plan.badge && (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#bf908a] bg-[#f2e7e5] px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
              </div>

              {/* Name */}
              <p className="text-[10px] tracking-[0.3em] text-[#6f6259] mb-2 uppercase">
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-2 mb-4">
                <span className="font-serif text-5xl">{plan.price}</span>
                <span className="text-sm text-[#6f6259]">{plan.period}</span>
              </div>

              <p className="text-[#6f6259] text-sm mb-8">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex items-start gap-3 text-sm ${
                      !f.included ? "opacity-40" : ""
                    }`}
                  >
                    <span
                      className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center ${
                        f.included ? "bg-[#bf908a]" : "border border-[#cbb7b4]"
                      }`}
                    >
                      {f.included && (
                        <svg width="8" height="8">
                          <path
                            d="M1 4L3 6L7 2"
                            stroke="white"
                            strokeWidth="1.2"
                            fill="none"
                          />
                        </svg>
                      )}
                    </span>

                    <span
                      className={
                        f.highlighted
                          ? "text-[#3B2E2A] font-medium"
                          : "text-[#6f6259]"
                      }
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {/* <Link
                href={plan.ctaHref}
                className={`rounded-full px-6 py-3 text-sm text-center ${
                  plan.featured
                    ? "bg-[#bf908a] text-white"
                    : "border border-[#e5ddd4] hover:bg-[#efe3e1]"
                }`}
              >
                {plan.cta}
              </Link> */}

              {/* Implement DodoCheckoutButton */}
              {plan.name === "Free" ? (
                <Link
                  href={plan.ctaHref}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm text-center border border-[#e5ddd4] hover:bg-[#efe3e1] text-[#3B2E2A]"
                >
                  {plan.cta}
                </Link>
              ) : (
                <DodoCheckoutButton
                  slug={plan.name === "Glow" ? "glow" : "glow-pro"}
                  label={plan.cta}
                  featured={plan.featured}
                />
              )}
            </div>
          ))}
        </div>
      </section>
      {/* VALUE */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              title: "No dermatologist required",
              text: "Skip expensive visits. Start with fast, accessible insights.",
            },
            {
              title: "Built around your skin",
              text: "Your routine evolves based on your real skin changes.",
            },
            {
              title: "Cancel anytime",
              text: "No lock-in. Stay only if it works for you.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-[#e5ddd4] bg-white/60 p-6"
            >
              <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-3 uppercase">
                {item.title}
              </p>

              <p className="text-[#6f6259] text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
            FAQ
          </p>

          <h2 className="font-serif text-3xl md:text-4xl mb-10">
            Questions before you commit.
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-3xl border border-[#e5ddd4] bg-white/60 p-6"
              >
                <p className="font-medium mb-2">{faq.q}</p>
                <p className="text-[#6f6259] text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-[#3B2E2A] text-white px-10 py-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(191,144,138,0.25),transparent_60%)]" />

          <div className="relative">
            <p className="text-[10px] tracking-[0.3em] text-white/70 mb-4 uppercase">
              Start free
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Your first analysis is free.
            </h2>

            <p className="text-white/80 mb-8">No card required. Just try it.</p>

            <Link
              href="/analyse/1"
              className="rounded-full bg-[#bf908a] text-white px-6 py-3 text-sm"
            >
              Start your analysis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
