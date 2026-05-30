import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Glemma | AI-Powered Skin Analysis",
  description:
    "Learn about Glemma's approach to AI-powered skincare guidance, including our commitment to experience, expertise, authority, and trust.",
  alternates: {
    canonical: "https://theglemma.com/about",
  },
  openGraph: {
    title: "About Glemma | AI-Powered Skin Analysis",
    description:
      "Learn about Glemma's approach to AI-powered skincare guidance, including our commitment to experience, expertise, authority, and trust.",
    url: "https://theglemma.com/about",
    siteName: "Glemma",
    images: [
      {
        url: "https://theglemma.com/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "About Glemma | AI Skin Analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Glemma | AI-Powered Skin Analysis",
    description:
      "Learn about Glemma's approach to AI-powered skincare guidance, including our commitment to experience, expertise, authority, and trust.",
    images: ["https://theglemma.com/og-image.jpeg"],
  },
};

const eeatPillars = [
  {
    title: "Experience",
    description:
      "Glemma is designed around real questions people ask when trying to understand their skin.",
  },
  {
    title: "Expertise",
    description:
      "Our recommendations are shaped by structured skincare logic and concern-based analysis.",
  },
  {
    title: "Authoritativeness",
    description:
      "We present clear reasoning, transparent limits, and educational content users can trust.",
  },
  {
    title: "Trust",
    description:
      "We emphasize privacy, clarity, and honest guidance that is not a medical diagnosis.",
  },
];

const principles = [
  "Personalized guidance should be easier to access.",
  "Skincare advice should be clear, not overwhelming.",
  "AI should support informed decisions, not replace medical care.",
  "Users deserve transparency.",
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Glemma",
  url: "https://theglemma.com",
  description:
    "Glemma is an AI-powered skin analysis platform focused on personalized skincare guidance.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#e5ddd4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(184,156,125,0.2),transparent_50%)]" />

        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-12 pb-24">
          <p className="text-[10px] tracking-[0.3em] text-[#B89C7D] mb-4 uppercase">
            About Glemma
          </p>

          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6 max-w-3xl">
            Built to make skincare guidance feel more personal, practical, and
            trustworthy.
          </h1>

          <p className="text-[#6f6259] text-base md:text-lg leading-relaxed max-w-2xl">
            Glemma helps people understand their skin through AI-powered
            analysis and personalized skincare guidance.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/analyse/upload"
              className="rounded-full bg-[#3B2E2A] text-white px-6 py-3 text-sm hover:opacity-90 transition"
            >
              Get your skin analysis
            </Link>

            <Link
              href="/"
              className="rounded-full border border-[#e5ddd4] px-6 py-3 text-sm hover:bg-[#ebe3da] transition"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#B89C7D] mb-4 uppercase">
              Our mission
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Better skincare starts with better understanding.
            </h2>

            <div className="space-y-5 text-[#6f6259] leading-relaxed">
              <p>
                Many people are stuck between guesswork and overwhelming product
                choices.
              </p>
              <p>
                Glemma simplifies that first step with clear, personalized
                guidance.
              </p>
              <p>
                We are not a replacement for dermatologists, but a smarter
                starting point.
              </p>
            </div>
          </div>

          {/* BELIEFS CARD */}
          <div className="rounded-3xl border border-[#e5ddd4] bg-white/60 backdrop-blur-sm p-8">
            <p className="text-[10px] tracking-[0.3em] text-[#B89C7D] mb-6 uppercase">
              What we believe
            </p>

            <div className="space-y-4">
              {principles.map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-[#f9f5f1] border border-[#e5ddd4] px-4 py-4"
                >
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EEAT */}
      <section className="px-6 md:px-10 py-20 bg-[#f9f5f1] border-y border-[#e5ddd4]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-12">
            How Glemma earns trust
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {eeatPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-3xl border border-[#e5ddd4] bg-white/60 p-8"
              >
                <p className="text-[10px] tracking-[0.3em] text-[#B89C7D] mb-3 uppercase">
                  {pillar.title}
                </p>

                <h3 className="text-xl font-medium mb-2">{pillar.title}</h3>

                <p className="text-[#6f6259] text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#B89C7D] mb-4 uppercase">
              Trust signals
            </p>

            <h2 className="font-serif text-3xl md:text-4xl">
              What users should expect
            </h2>
          </div>

          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            {[
              "Clear limitations",
              "Privacy-first mindset",
              "Practical guidance",
              "Continuous improvement",
            ].map((title) => (
              <div
                key={title}
                className="rounded-3xl border border-[#e5ddd4] bg-white/60 p-6"
              >
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                <p className="text-[#6f6259] text-sm">
                  Clear, transparent and practical guidance for users.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-[900px] mx-auto rounded-[2rem] bg-[#3B2E2A] text-white px-8 py-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(184,156,125,0.25),transparent_60%)]" />

          <div className="relative z-10">
            <p className="text-[10px] tracking-[0.3em] text-white/70 mb-4 uppercase">
              Start here
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Try Glemma and see your future skincare routine.
            </h2>

            <p className="text-white/80 mb-8">
              Upload a selfie and get personalized guidance instantly.
            </p>

            <Link
              href="/analyse/upload"
              className="rounded-full bg-white text-[#3B2E2A] px-6 py-3 text-sm hover:opacity-90 transition"
            >
              Get your skin analysis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
