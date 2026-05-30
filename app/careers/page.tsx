import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers at Glemma | Build With Us",
  description:
    "Learn about careers at Glemma. Join us in building AI-powered skincare guidance that feels personal, practical, and trustworthy.",
  alternates: {
    canonical: "https://theglemma.com/careers",
  },
  openGraph: {
    title: "Careers at Glemma | Build With Us",
    description:
      "Learn about careers at Glemma. Join us in building AI-powered skincare guidance that feels personal, practical, and trustworthy.",
    url: "https://theglemma.com/careers",
    siteName: "Glemma",
    images: [
      {
        url: "https://theglemma.com/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Careers at Glemma",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Glemma | Build With Us",
    description:
      "Learn about careers at Glemma. Join us in building AI-powered skincare guidance that feels personal, practical, and trustworthy.",
    images: ["https://theglemma.com/og-image.jpeg"],
  },
};

const values = [
  {
    title: "Build with clarity",
    description:
      "We care about products that feel simple, useful, and honest. Great design, strong writing, and careful execution all matter here.",
  },
  {
    title: "Earn trust",
    description:
      "Skincare is personal, so trust is not optional. We want to build experiences that are transparent, respectful, and genuinely helpful.",
  },
  {
    title: "Move thoughtfully",
    description:
      "We value speed, but not chaos. We want to ship fast, learn fast, and still maintain a high bar for quality.",
  },
  {
    title: "Stay user-first",
    description:
      "Every decision should help people better understand their skin and make more confident skincare choices.",
  },
];

const benefits = [
  "Early-stage ownership with meaningful product impact",
  "A chance to shape a product where design, trust, and AI all matter",
  "Remote-friendly collaboration with a focused team mindset",
  "Work that sits at the intersection of skincare, education, and technology",
];

const hiringSteps = [
  "Send us your CV, portfolio, or a short introduction by email.",
  "If there is a future fit, we will reach out for an initial conversation.",
  "Selected candidates may be invited for a deeper role or project discussion.",
  "When the timing is right, we will reconnect for relevant opportunities.",
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-[#e5ddd4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,144,138,0.2),transparent_40%)]" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20">
          <div className="max-w-3xl">

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#bf908a] mb-4">
              Careers at Glemma
            </p>

            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              We are building a more thoughtful future for skincare.
            </h1>

            <p className="text-lg text-[#6f6259] leading-relaxed max-w-2xl">
              Glemma is creating AI-powered skincare guidance that feels more
              personal, practical, and trustworthy.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:theglemma@gmail.com"
                className="rounded-full bg-[#bf908a] text-white px-6 py-3 text-sm hover:opacity-90 transition"
              >
                Send your CV
              </a>

              <Link
                href="/about"
                className="rounded-full border border-[#e5ddd4] px-6 py-3 text-sm hover:bg-[#efe3e1] transition"
              >
                Learn about Glemma
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
              Why Glemma
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Small team mindset, meaningful ambition.
            </h2>

            <div className="space-y-5 text-[#6f6259]">
              <p>
                We are building in a space where trust and clarity matter.
              </p>
              <p>
                If you care about useful products and calm experiences,
                Glemma may be a strong fit.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e5ddd4] bg-white/60 backdrop-blur-sm p-8">
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-6 uppercase">
              What stands out
            </p>

            <div className="space-y-4">
              {[
                "Early-stage ownership",
                "Strong product thinking",
                "Remote-friendly work",
                "Skincare + AI intersection",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-[#f9f4f2] border border-[#e5ddd4] px-4 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="px-6 md:px-10 py-20 bg-[#f9f4f2] border-y border-[#e5ddd4]">
        <div className="max-w-6xl mx-auto">

          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
            Our values
          </p>

          <h2 className="font-serif text-3xl md:text-4xl mb-10">
            The kind of work we want to be known for.
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Build with clarity",
              "Earn trust",
              "Move thoughtfully",
              "Stay user-first",
            ].map((title) => (
              <div
                key={title}
                className="rounded-3xl border border-[#e5ddd4] bg-white/60 p-8"
              >
                <h3 className="text-xl font-medium mb-2">{title}</h3>
                <p className="text-[#6f6259] text-sm">
                  Thoughtful execution and user-first thinking.
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* APPLY */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
              Open applications
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              We are not hiring right now.
            </h2>

            <p className="text-[#6f6259]">
              But we’re always open to strong people.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#e5ddd4] bg-white/60 p-8">

            <h3 className="text-2xl mb-4">Introduce yourself</h3>

            <p className="text-[#6f6259] mb-6">
              Send your CV or a short note.
            </p>

            <a
              href="mailto:theglemma@gmail.com"
              className="rounded-full bg-[#bf908a] text-white px-6 py-3 text-sm"
            >
              Email your CV
            </a>

          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto">

          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
            What happens next
          </p>

          <h2 className="font-serif text-3xl md:text-4xl mb-10">
            A simple process.
          </h2>

          <div className="grid gap-4">
            {[
              "Send your CV",
              "We review",
              "We connect",
              "Future opportunities",
            ].map((step, i) => (
              <div
                key={step}
                className="rounded-3xl border border-[#e5ddd4] bg-white/60 p-6"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#f2e7e5] text-[#bf908a] flex items-center justify-center text-sm">
                    {i + 1}
                  </div>
                  <p className="text-[#6f6259]">{step}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
