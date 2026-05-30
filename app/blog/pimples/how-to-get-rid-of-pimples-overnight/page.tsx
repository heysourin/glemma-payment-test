import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Get Rid of Pimples Overnight (What Actually Works)",
  description:
    "Most pimples cannot fully disappear overnight, but you can reduce redness, swelling, and size within 12–24 hours. Here’s what actually works and what doesn’t.",
  alternates: {
    canonical: "https://theglemma.com/blog/pimples/how-to-get-rid-of-pimples-overnight",
  },
  openGraph: {
    title: "How to Get Rid of Pimples Overnight (What Actually Works)",
    description:
      "Reduce pimple size, redness, and swelling overnight with proven methods like ice, benzoyl peroxide, and hydrocolloid patches.",
    url: "https://theglemma.com/blog/how-to-get-rid-of-pimples-overnight",
    siteName: "Glemma",
    images: [
      {
        url: "https://theglemma.com/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "How to Get Rid of Pimples Overnight",
      },
    ],
    locale: "en_US",
    type: "article",
  },
};

const tableData = [
  {
    method: "Ice (cold compress)",
    what: "Reduces swelling and redness",
    speed: "Fast (hours)",
    best: "Inflamed red pimples",
    risk: "Very low",
  },
  {
    method: "Benzoyl peroxide",
    what: "Kills acne-causing bacteria",
    speed: "Moderate",
    best: "Active acne",
    risk: "Low",
  },
  {
    method: "Salicylic acid",
    what: "Unclogs pores and reduces oil",
    speed: "Moderate",
    best: "Whiteheads, clogged pores",
    risk: "Low",
  },
  {
    method: "Hydrocolloid patch",
    what: "Absorbs fluid and protects skin",
    speed: "Fast",
    best: "Whiteheads/pus pimples",
    risk: "Very low",
  },
  {
    method: "Tea tree oil",
    what: "Mild antibacterial effect",
    speed: "Slow to moderate",
    best: "Small pimples",
    risk: "Medium",
  },
  {
    method: "Toothpaste (myth)",
    what: "Dries skin but irritates",
    speed: "Unreliable",
    best: "Not recommended",
    risk: "High",
  },
];

export default function PimpleOvernightPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "How to Get Rid of Pimples Overnight (What Actually Works)",
            description:
              "Reduce pimple size, redness, and swelling within 12–24 hours using proven methods.",
            url: "https://theglemma.com/blog/pimples/how-to-get-rid-of-pimples-overnight",
            datePublished: "2026-04-16",
            author: {
              "@type": "Organization",
              name: "Glemma",
            },
          }),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#e5ddd4]">
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-16">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="text-sm text-[#bf908a] mb-6 inline-block"
            >
              ← All posts
            </Link>
            <p className="text-sm text-[#524a4a] mb-6 inline-block px-2">
               16 Apr 2026
            </p>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              How to Get Rid of Pimples Overnight (What Actually Works)
            </h1>

            <div className="rounded-[2rem] overflow-hidden border border-[#e5ddd4]">
              <Image
                src="/images/blog/pimples/how-to-get-rid-of-pimples-overnight.webp"
                alt="pimple overnight"
                width={1008}
                height={567}
                className="w-full"
              />
            </div>

            <p className="mt-4 text-sm text-[#6f6259]">
              Author: <span className="text-[#3B2E2A]">Glemma Editorial</span>
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-3xl mx-auto space-y-10 text-[#6f6259] leading-relaxed">
          {/* WHY THIS MATTERS */}
          <section>
            <h2 className="font-serif text-3xl mb-4 text-[#3B2E2A]">
              Why This Matters
            </h2>
            <p>
              A pimple appearing right before an important event is a common
              problem. Many people expect a complete cure overnight. In reality,
              pimples rarely disappear fully in a few hours, but their size,
              redness, and pain can be significantly reduced within 12–24 hours.
            </p>
            <p>
              A pimple forms when pores get clogged with oil, dead skin cells,
              and bacteria, leading to inflammation.
            </p>

            <div className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-6 mt-6">
              <p className="text-sm text-[#3B2E2A]">
                What you actually want overnight:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Less visible redness</li>
                <li>Reduced swelling</li>
                <li>Faster healing start</li>
              </ul>
            </div>
          </section>

          {/* WHAT IS HAPPENING */}
          <section>
            <h2 className="font-serif text-3xl mb-4 text-[#3B2E2A]">
              What Is Happening
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Excess oil blocks pores</li>
              <li>Dead skin cells accumulate</li>
              <li>Bacteria grows inside the pore</li>
              <li>Inflammation causes redness and swelling</li>
            </ul>
            <p className="mt-4">
              Overnight treatments work by reducing inflammation, drying excess
              oil, or killing bacteria.
            </p>
          </section>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-2xl border border-[#e5ddd4] bg-white/60">
            <table className="w-full text-sm">
              <thead className="bg-[#f2e7e5] text-[#3B2E2A]">
                <tr>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">What It Does</th>
                  <th className="px-4 py-3">Speed</th>
                  <th className="px-4 py-3">Best For</th>
                  <th className="px-4 py-3">Risk</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.method} className="border-t border-[#e5ddd4]">
                    <td className="px-4 py-4 font-medium text-[#3B2E2A]">
                      {row.method}
                    </td>
                    <td className="px-4 py-4">{row.what}</td>
                    <td className="px-4 py-4">{row.speed}</td>
                    <td className="px-4 py-4">{row.best}</td>
                    <td className="px-4 py-4">{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FAQ */}
          <section>
            <h2 className="font-serif text-3xl mb-4 text-[#3B2E2A]">FAQ</h2>
            <div className="space-y-5">
              <p>
                <strong>Can a pimple disappear overnight?</strong>
                <br />
                No. You can reduce it, but full healing takes days.
              </p>
              <p>
                <strong>What works fastest?</strong>
                <br />
                Ice and hydrocolloid patches.
              </p>
              <p>
                <strong>Should I pop it?</strong>
                <br />
                No. It increases inflammation and scarring risk.
              </p>
              <p>
                <strong>Most effective ingredient?</strong>
                <br />
                Benzoyl peroxide.
              </p>
              <p>
                <strong>Are natural remedies effective?</strong>
                <br />
                Generally slower and less effective.
              </p>
            </div>
          </section>

          {/* USE CASE */}
          <section>
            <h2 className="font-serif text-3xl mb-4 text-[#3B2E2A]">
              Use the Right Method
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Red swollen pimple:</strong> Ice + benzoyl peroxide
              </li>
              <li>
                <strong>Whitehead:</strong> Hydrocolloid patch
              </li>
              <li>
                <strong>Clogged pore:</strong> Salicylic acid
              </li>
              <li>
                <strong>Sensitive skin:</strong> Diluted tea tree oil
              </li>
            </ul>
          </section>

          {/* SOLUTIONS */}
          <section>
            <h2 className="font-serif text-3xl mb-4 text-[#3B2E2A]">
              Solutions That Work
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Ice + benzoyl peroxide for fastest visible reduction</li>
              <li>Hydrocolloid patch for overnight flattening</li>
              <li>Salicylic acid for early-stage pimples</li>
            </ul>
          </section>

          {/* ACTION STEPS */}
          <section>
            <h2 className="font-serif text-3xl mb-4 text-[#3B2E2A]">
              Exact Routine
            </h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Wash your face gently</li>
              <li>Identify pimple type</li>
              <li>Apply ice (5–10 min if swollen)</li>
              <li>Use ONE treatment</li>
              <li>Do not touch or pick</li>
              <li>Leave overnight</li>
              <li>Wash and moisturize in morning</li>
            </ol>
          </section>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-[#3B2E2A] text-white px-10 py-14">
          <h2 className="font-serif text-3xl mb-4">
            See What Your Skin Actually Needs
          </h2>
          <p className="mb-6">Get a personalized routine in seconds.</p>
          <Link
            href="/analyse/upload"
            className="rounded-full bg-[#bf908a] px-6 py-3 text-sm"
          >
            Get My Skin Analysis
          </Link>
        </div>
      </section>
    </main>
  );
}
