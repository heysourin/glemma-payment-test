import type { Metadata } from "next";
import Link from "next/link";
import {
  Camera,
  ClipboardPlus,
  FlaskConical,
  ScanFace,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features | Glemma AI Skin Analysis",
  description:
    "Explore Glemma's AI-powered skincare features: instant skin analysis, personalized routines, product recommendations, and progress tracking.",
  alternates: {
    canonical: "https://theglemma.com/features",
  },
  openGraph: {
    title: "Features | Glemma AI Skin Analysis",
    description:
      "Explore Glemma's AI-powered skincare features: instant skin analysis, personalized routines, product recommendations, and progress tracking.",
    url: "https://theglemma.com/features",
    siteName: "Glemma",
    images: [
      {
        url: "https://theglemma.com/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Glemma Features | AI Skin Analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Features | Glemma AI Skin Analysis",
    description:
      "Explore Glemma's AI-powered skincare features: instant skin analysis, personalized routines, product recommendations, and progress tracking.",
    images: ["https://theglemma.com/og-image.jpeg"],
  },
};

const primaryFeatures = [
  {
    title: "AI Skin Analysis",
    status: "Live / Beta",
    icon: Camera,
    iconWrap: "bg-green-500/10",
    iconColor: "text-green-500",
    description:
      "Upload a clear selfie and get a fast, AI-powered skin assessment designed to identify visible concerns and help you understand your skin better.",
    bullets: [
      "Photo-based skin analysis in seconds",
      "Concern-focused insights from one selfie",
      "A simple starting point for better routines",
    ],
    cta: "/analyse/upload",
    ctaLabel: "Try skin analysis",
  },
  {
    title: "AI Skin Expert",
    status: "Upcoming Feature",
    icon: ClipboardPlus,
    iconWrap: "bg-purple-500/10",
    iconColor: "text-purple-500",
    description:
      "A conversational skin guidance experience designed to help users ask questions, understand routines, and make more informed skincare decisions.",
    bullets: [
      "Ask skincare questions in plain language",
      "Get routine guidance based on your concerns",
      "Receive more contextual product education",
    ],
    cta: "#",
    ctaLabel: "Coming soon",
  },
  {
    title: "Skincare Products",
    status: "Upcoming Feature",
    icon: FlaskConical,
    iconWrap: "bg-pink-500/10",
    iconColor: "text-pink-500",
    description:
      "We plan to introduce skincare and cosmetic products that align more closely with individual skin needs, routines, and concern areas.",
    bullets: [
      "More personalized product matching",
      "Products aligned with routine goals",
      "A clearer bridge from analysis to action",
    ],
    cta: "#",
    ctaLabel: "Coming soon",
  },
];

const supportingFeatures = [
  {
    title: "Fast analysis flow",
    description:
      "The experience is designed to be simple from the first click, so users can move from upload to insights without friction.",
    icon: ScanFace,
  },
  {
    title: "Practical recommendations",
    description:
      "We focus on guidance that helps people take the next useful step instead of overwhelming them with too much information.",
    icon: Sparkles,
  },
  {
    title: "Trust-first product thinking",
    description:
      "Glemma is built as a support tool, not a replacement for professional medical care, with clear limits and user-first communication.",
    icon: ShieldCheck,
  },
];

const steps = [
  {
    number: "01",
    title: "Upload a selfie",
    description:
      "Use a clear front-facing image so the system can analyze visible skin patterns more effectively.",
  },
  {
    number: "02",
    title: "Get skin insights",
    description:
      "Receive a quick breakdown of visible concerns and a more personalized understanding of your skin.",
  },
  {
    number: "03",
    title: "Take the next step",
    description:
      "Use those insights to build a more informed routine and make better product decisions over time.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#e5ddd4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,144,138,0.2),transparent_40%)]" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20">
          <div className="max-w-3xl">

            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
              Features
            </p>

            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              AI skincare tools built to feel clear, personal, and useful.
            </h1>

            <p className="text-lg text-[#6f6259] leading-relaxed mb-2">
              A system designed to help you understand your skin better.
            </p>
            <p className="md:text-sm text-xs  text-[#9a8d84] leading-relaxed mb-10 max-w-xl">
              (Glemma offers non-medicated wellness insights and skincare
              recommendations only. Not medical advice. Consult a dermatologist
              for medical concerns.)
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/analyse/upload"
                className="rounded-full bg-[#bf908a] text-white px-6 py-3 text-sm hover:opacity-90"
              >
                Try the live feature
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-[#bf908a] px-6 py-3 text-sm hover:bg-[#efe3e1]"
              >
                Learn about Glemma
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto">

          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
            Core features
          </p>

          <h2 className="font-serif text-3xl md:text-4xl mb-10">
            What exists now, and what comes next.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {primaryFeatures.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-[2rem] border border-[#e5ddd4] bg-white/60 p-8"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#f2e7e5] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#bf908a]" />
                  </div>

                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h3 className="text-xl font-medium">{feature.title}</h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#bf908a] bg-[#f2e7e5] px-3 py-1 rounded-full">
                      {feature.status}
                    </span>
                  </div>

                  <p className="text-[#6f6259] mb-6">
                    {feature.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {feature.bullets.map((b) => (
                      <div
                        key={b}
                        className="rounded-xl border border-[#e5ddd4] bg-[#f9f4f2] px-4 py-3 text-sm"
                      >
                        {b}
                      </div>
                    ))}
                  </div>

                  {feature.cta === "#" ? (
                    <span className="rounded-full border border-[#e5ddd4] px-5 py-3 text-sm text-[#6f6259]">
                      {feature.ctaLabel}
                    </span>
                  ) : (
                    <Link
                      href={feature.cta}
                      className="rounded-full bg-[#bf908a] text-white px-5 py-3 text-sm"
                    >
                      {feature.ctaLabel}
                    </Link>
                  )}
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-10 py-20 bg-[#f9f4f2] border-y border-[#e5ddd4]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
              How it works
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Simple, fast, and clear.
            </h2>

            <p className="text-[#6f6259]">
              Move from uncertainty to clarity in seconds.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="rounded-3xl border border-[#e5ddd4] bg-white/60 p-6"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f2e7e5] text-[#bf908a] flex items-center justify-center text-sm">
                    {i + 1}
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">{step.title}</h3>
                    <p className="text-[#6f6259] text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto">

          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
            Why it matters
          </p>

          <h2 className="font-serif text-3xl md:text-4xl mb-10">
            Built for clarity, not noise.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {supportingFeatures.map((f) => {
              const Icon = f.icon;

              return (
                <article
                  key={f.title}
                  className="rounded-3xl border border-[#e5ddd4] bg-white/60 p-8"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f2e7e5] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#bf908a]" />
                  </div>

                  <h3 className="text-lg font-medium mb-2">
                    {f.title}
                  </h3>

                  <p className="text-[#6f6259] text-sm">
                    {f.description}
                  </p>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-[#3B2E2A] text-white px-10 py-14 relative overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(191,144,138,0.25),transparent_60%)]" />

          <div className="relative z-10">

            <p className="text-[10px] tracking-[0.3em] text-white/70 mb-4 uppercase">
              Start here
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Try your first skin analysis.
            </h2>

            <p className="text-white/80 mb-8">
              See what your skin actually needs.
            </p>

            <Link
              href="/analyse/upload"
              className="rounded-full bg-[#bf908a] text-white px-6 py-3 text-sm"
            >
              Get your skin analysis
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}
