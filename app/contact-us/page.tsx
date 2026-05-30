import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Glemma | Get in Touch",
  description:
    "Contact the Glemma team for questions about AI skin analysis, product feedback, partnerships, or press inquiries.",
  alternates: {
    canonical: "https://theglemma.com/contact-us",
  },
  openGraph: {
    title: "Contact Glemma | Get in Touch",
    description: "Reach the Glemma team for support, feedback, or partnerships.",
    url: "https://theglemma.com/contact-us",
    siteName: "Glemma",
    images: [
      {
        url: "https://theglemma.com/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Contact Glemma",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Glemma | Get in Touch",
    description: "Reach the Glemma team for support, feedback, or partnerships.",
    images: ["https://theglemma.com/og-image.jpeg"],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#e5ddd4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,144,138,0.2),transparent_40%)]" />

        <div className="relative max-w-4xl mx-auto px-6 pt-10 pb-20">
          
          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
            Contact
          </p>

          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Get in touch
          </h1>

          <p className="text-lg text-[#6f6259] leading-relaxed max-w-2xl">
            We&apos;re a small team building Glemma. We read every message.
          </p>

        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">

          {[
            {
              title: "General & support",
              desc: "Questions about your skin analysis or how Glemma works.",
            },
            {
              title: "Partnerships & press",
              desc: "Interested in collaborations or media coverage.",
            },
            {
              title: "Privacy",
              desc: "Data deletion or privacy-related concerns.",
            },
            {
              title: "Feedback",
              desc: "Ideas, suggestions, or improvements.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#e5ddd4] bg-white/60 backdrop-blur-sm p-6"
            >
              <h2 className="text-lg font-medium mb-2">{item.title}</h2>

              <p className="text-[#6f6259] text-sm mb-4 leading-relaxed">
                {item.desc}
              </p>

              <a
                href="mailto:theglemma@gmail.com"
                className="text-[#bf908a] font-medium underline underline-offset-4"
              >
                theglemma@gmail.com
              </a>
            </div>
          ))}

        </div>
      </section>

      {/* RESPONSE TIME */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">

          <div className="rounded-[2rem] border border-[#e5ddd4] bg-white/60 p-8">
            
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-3 uppercase">
              Response time
            </p>

            <h2 className="font-serif text-2xl mb-3">
              We usually reply within 1–2 days.
            </h2>

            <p className="text-[#6f6259] leading-relaxed">
              For urgent matters like privacy or data deletion, we aim to
              respond within 24 hours.
            </p>

          </div>

        </div>
      </section>

    </main>
  );
}
