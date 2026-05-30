import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Download Glemma App | AI Skincare App for Android & iOS",
  description:
    "The Glemma app is coming to Android and iOS. Get AI skin analysis, personalized product suggestions, and custom skincare routines on your phone. Join the waitlist.",
  alternates: {
    canonical: "https://theglemma.com/download",
  },
  openGraph: {
    title: "Download Glemma App | AI Skincare App for Android & iOS",
    description:
      "AI skin analysis, personalized routines, and product recommendations: in your pocket. Coming soon to Android and iOS.",
    url: "https://theglemma.com/download",
    siteName: "Glemma",
    images: [
      {
        url: "https://theglemma.com/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Download Glemma App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Glemma App | AI Skincare App for Android & iOS",
    description:
      "AI skin analysis, personalized routines, and product recommendations: in your pocket. Coming soon to Android and iOS.",
    images: ["https://theglemma.com/og-image.jpeg"],
  },
};

const downloadSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Glemma",
  description:
    "AI-powered skin analysis and personalized skincare routine app for Android and iOS.",
  applicationCategory: "SkincarebeautyApplication",
  operatingSystem: "Android, iOS",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: "https://theglemma.com/download",
};

const liveFeatures = [
  {
    title: "AI skin analysis",
    description:
      "Upload a selfie. Get a detailed breakdown of your skin type, texture, tone, and 10+ concerns — acne, hyperpigmentation, dryness, oiliness — in under 30 seconds.",
  },
  {
    title: "Personalized skincare routine & product suggestions",
    description:
      "Based on your skin analysis, we generate a custom skincare routine tailored to your unique skin profile. We also recommend products that fit your skin type and concerns, with links to buy if you want.",
  },
  {
    title: "Daily progess tracking",
    description:
      "You upload your picture every day, we track changes in your skin over time. See how your acne is improving, if your skin is getting more even, and how your overall skin health is evolving.",
  },
];

const upcomingFeatures = [
  {
    title: "AI doctor",
    description:
      "A 24/7 AI skin expert trained on dermatology knowledge. Ask about ingredients, interactions, concerns, and treatment approaches — no appointment needed.",
  },
  {
    title: "Human dermatologist access",
    description:
      "Connect with a licensed dermatologist directly through the app for cases that need a real clinical eye. Powered by your existing Glemma skin history.",
  },
  {
    title: "Glemma skincare products",
    description:
      "Our own line of skincare formulated around the same data that powers the analysis engine. Products built for real skin types, not marketing categories.",
  },
];

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#e5ddd4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,144,138,0.2),transparent_40%)]" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20">
          <div className="max-w-3xl">

            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
              Mobile app
            </p>

            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              Glemma for Android and iOS. Coming soon.
            </h1>

            <p className="text-lg text-[#6f6259] leading-relaxed mb-10">
              The full Glemma experience — in your pocket.
            </p>

            {/* WAITLIST */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-[#e5ddd4] bg-white px-4 py-3 text-sm placeholder:text-[#9b8f86] focus:outline-none"
              />
              <button
                type="button"
                className="rounded-full bg-[#bf908a] text-white px-6 py-3 text-sm hover:opacity-90 transition"
              >
                Notify me
              </button>
            </div>

            <p className="text-xs text-[#8a7f75] mt-3">
              No spam. One email when it launches.
            </p>

          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="px-6 md:px-10 py-12 border-b border-[#e5ddd4]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4">

          {[ "App Store", "Google Play" ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 rounded-2xl border border-[#e5ddd4] bg-white/60 px-6 py-4 opacity-60"
            >
              <div>
                <p className="text-xs text-[#6f6259]">Coming soon</p>
                <p className="font-medium text-sm">{item}</p>
              </div>
            </div>
          ))}

          <div className="flex items-center px-2">
            <p className="text-sm text-[#6f6259]">
              Use Glemma on web at{" "}
              <Link
                href="/analyse/1"
                className="text-[#bf908a] font-medium underline underline-offset-4"
              >
                theglemma.com
              </Link>
            </p>
          </div>

        </div>
      </section>

      {/* LIVE FEATURES */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto">

          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
            In the app
          </p>

          <h2 className="font-serif text-3xl md:text-4xl mb-10">
            Everything you need to understand your skin.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {liveFeatures.map((feature, i) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-[#e5ddd4] bg-white/60 p-6"
              >
                <div className="flex items-center gap-3 mb-4">

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#bf908a] bg-[#f2e7e5] px-3 py-1 rounded-full">
                    Live
                  </span>

                  <span className="text-xs text-[#6f6259]">
                    0{i + 1}
                  </span>

                </div>

                <h3 className="text-lg font-medium mb-3">
                  {feature.title}
                </h3>

                <p className="text-[#6f6259] text-sm">
                  {feature.description}
                </p>

              </article>
            ))}
          </div>

        </div>
      </section>

      {/* UPCOMING */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto">

          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
            Coming next
          </p>

          <h2 className="font-serif text-3xl md:text-4xl mb-10">
            Where Glemma is going.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingFeatures.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-dashed border-[#e5ddd4] bg-white/50 p-6"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#bf908a] bg-[#f2e7e5] px-3 py-1 rounded-full">
                  Upcoming
                </span>

                <h3 className="text-lg font-medium mt-4 mb-3">
                  {feature.title}
                </h3>

                <p className="text-[#6f6259] text-sm">
                  {feature.description}
                </p>

              </article>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-[#3B2E2A] text-white px-10 py-14 relative overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(191,144,138,0.25),transparent_60%)]" />

          <div className="relative z-10">

            <p className="text-[10px] tracking-[0.3em] text-white/70 mb-4 uppercase">
              While you wait
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              The web version is live.
            </h2>

            <p className="text-white/80 mb-8">
              Start your skin analysis today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">

              <Link
                href="/analyse/1"
                className="rounded-full bg-[#bf908a] text-white px-6 py-3 text-sm hover:opacity-90"
              >
                Try on web
              </Link>

              <Link
                href="/features"
                className="rounded-full border border-white/30 px-6 py-3 text-sm hover:bg-white/10"
              >
                See features
              </Link>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
