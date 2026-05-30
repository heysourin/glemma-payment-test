import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Glemma Blog | Skincare, AI, and Routine Guides",
  description:
    "Read skincare guides, ingredient explainers, and AI-powered skincare insights from Glemma.",
  alternates: {
    canonical: "https://theglemma.com/blog",
  },
  openGraph: {
    title: "Glemma Blog | Skincare, AI, and Routine Guides",
    description:
      "Read skincare guides, ingredient explainers, and AI-powered skincare insights from Glemma.",
    url: "https://theglemma.com/blog",
    siteName: "Glemma",
    images: [
      {
        url: "https://theglemma.com/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Glemma Blog | Skincare Guides",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glemma Blog | Skincare, AI, and Routine Guides",
    description:
      "Read skincare guides, ingredient explainers, and AI-powered skincare insights from Glemma.",
    images: ["https://theglemma.com/og-image.jpeg"],
  },
};

const featuredPost = {
  title: "Cureskin vs Free Alternatives: Is the Subscription Really Worth It?",
  excerpt:
    "An honest breakdown of what Cureskin actually costs, what you get for the money, and when a free alternative makes more sense.",
  category: "Skincare Comparison",
  readTime: "7 min read",
  href: "/blog/cureskin-alternative",
};

const posts = [
  {
    title:
      "Pimples on the Nose: Why It Keeps Happening (And What Actually Works)",
    excerpt:
      "Nose pimples can be stubborn. Here’s a practical look at why they happen and how to treat them without overdoing it.",
    category: "Pimples",
    readTime: "4 min read",
    href: "/blog/pimples/pimples-on-the-nose",
  },
  {
    title: "How to get rid of pimples overnight",
    excerpt:
      "While you can’t truly get rid of pimples overnight, there are some things you can do to reduce inflammation and make them less noticeable by morning.",
    category: "Pimples",
    readTime: "5 min read",
    href: "/blog/pimples/how-to-get-rid-of-pimples-overnight",
  },
  {
    title: "How to Introduce Active Ingredients Without Irritating Your Skin",
    excerpt:
      "A beginner-friendly approach to using acids, retinoids, and treatment products more carefully.",
    category: "Ingredients",
    readTime: "7 min read",
    href: "/blog/cureskin-alternative",
  },
  {
    title: "Why Your Routine Might Not Be Working Yet",
    excerpt:
      "Sometimes the issue is not the product itself, but layering, timing, consistency, or expectation.",
    category: "Routine Guide",
    readTime: "5 min read",
    href: "/blog/cureskin-alternative",
  },
  {
    title: "The Difference Between Hydration and Moisture",
    excerpt:
      "These terms are often used like they mean the same thing, but they solve different skin problems.",
    category: "Skin Basics",
    readTime: "3 min read",
    href: "/blog/cureskin-alternative",
  },
  {
    title: "How to Take a Better Selfie for Skin Analysis",
    excerpt:
      "Lighting, angles, and simple prep tips that help AI analysis tools produce more useful results.",
    category: "AI & Skincare",
    readTime: "4 min read",
    href: "/blog/cureskin-alternative",
  },
];

const categories = [
  "Routine Guide",
  "Skin Basics",
  "Ingredients",
  "AI & Skincare",
  "Product Education",
  "Sensitive Skin",
];

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Glemma Blog",
  description:
    "Skincare guides, ingredient explainers, and AI-powered skincare insights from Glemma.",
  url: "https://theglemma.com/blog",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <section className="relative overflow-hidden border-b border-[#e5ddd4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,144,138,0.2),transparent_40%)]" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
              Glemma Blog
            </p>

            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              Skincare guidance, ingredient education, and smarter routines.
            </h1>

            <p className="text-[#6f6259] text-lg leading-relaxed max-w-2xl">
              Explore practical articles designed to help people understand
              their skin and build better routines.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] border border-[#e5ddd4] bg-white/60 p-10 backdrop-blur-sm">
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
              Featured Post
            </p>

            <div className="flex flex-wrap gap-3 mb-5 text-sm text-[#6f6259]">
              <span className="rounded-full bg-[#f2e7e5] px-3 py-1">
                {featuredPost.category}
              </span>
              <span>{featuredPost.readTime}</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              {featuredPost.title}
            </h2>

            <p className="text-[#6f6259] mb-8 max-w-2xl">
              {featuredPost.excerpt}
            </p>

            <Link
              href={featuredPost.href}
              className="inline-flex rounded-full bg-[#bf908a] text-white px-6 py-3 text-sm hover:opacity-90 transition"
            >
              Read article
            </Link>
          </article>

          {/* SIDEBAR */}
          <aside className="rounded-[2rem] border border-[#e5ddd4] bg-white/60 p-8">
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
              Categories
            </p>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-[#e5ddd4] px-4 py-2 text-sm hover:bg-[#f2e7e5] transition"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#e5ddd4]">
              <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
                Why this blog exists
              </p>

              <p className="text-[#6f6259]">
                We want skincare content to feel useful, clear, and honest.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* POSTS */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
              Recent Articles
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Start with what matters most.
            </h2>

            <p className="text-[#6f6259]">
              Practical skincare knowledge you can actually apply.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-3xl border border-[#e5ddd4] bg-white/60 p-6 hover:-translate-y-1 transition"
              >
                <div className="flex flex-wrap gap-3 mb-4 text-sm text-[#6f6259]">
                  <span className="rounded-full bg-[#f2e7e5] px-3 py-1">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-medium mb-3">{post.title}</h3>

                <p className="text-[#6f6259] mb-6">{post.excerpt}</p>

                <Link
                  href={post.href}
                  className="text-sm text-[#bf908a] font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-[#3B2E2A] text-white px-10 py-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(191,144,138,0.25),transparent_60%)]" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-[10px] tracking-[0.3em] text-white/70 mb-4 uppercase">
              Explore Glemma
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Learn, then try your own skin analysis.
            </h2>

            <p className="text-white/80 mb-8">
              Read the insights, then apply them to your own skin.
            </p>

            <Link
              href="/analyse/upload"
              className="rounded-full bg-[#bf908a] text-white px-6 py-3 text-sm hover:opacity-90 transition"
            >
              Get your skin analysis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
