import "./globals.css";
import { Playfair_Display, Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

//FAQs for metadata
const faqs = [
  {
    q: "What is Glemma?",
    a: "Glemma is an AI skin analysis tool. Answer 7 questions about your skin, upload a selfie, and get a personalised skincare routine and product recommendations in under 30 seconds.",
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

// Handling faq for metadata
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://theglemma.com/#faq",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export const metadata: Metadata = {
  metadataBase: new URL("https://theglemma.com"),

  title: {
    default:
      "Personalized Skincare Routine and product Recommendations Powered by AI | Glemma",
    template: "%s | Glemma",
  },

  description:
    "Analyze your skin with AI. Detect your skin concerns. Get a personalized skincare routine in seconds with Glemma. For acne, dryness, oiliness, and sensitive skin type.",

  alternates: {
    canonical: "https://theglemma.com",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      "Personalized Skincare Routine and product Recommendations Powered by AI | Glemma",
    description:
      "Answer 7 questions about your skin, upload a photo and get instant AI-powered skin analysis with a personalized skincare routine.",
    url: "https://theglemma.com",
    siteName: "Glemma",
    images: [
      {
        url: "https://theglemma.com/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Glemma | Personalized Skincare Routine and Product Recommendations Powered by AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Personalized Skincare Routine and product Recommendations Powered by AI | Glemma",
    description:
      "Answer 7 questions about your skin, upload a photo and get instant AI-powered skin analysis with a personalized skincare routine.",
    images: ["https://theglemma.com/og-image.jpeg"],
  },

  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://theglemma.com/#organization",
        name: "Glemma",
        url: "https://theglemma.com",
        logo: "https://theglemma.com/logo.svg",
        description:
          "Glemma is an AI-powered skin analysis tool that detects skin conditions, then generates personalized skincare routines and product recommendations.",
        sameAs: [
          "https://instagram.com/theglemma_official",
          "https://linkedin.com/company/theglemma",
          "https://pinterest.com/theglemma",
          "https://x.com/TheGlemma",
          "https://www.youtube.com/channel/UCTb6e0qqNOcgOgOJ9j9aD-Q",
          "https://www.facebook.com/p/Glemma-61581938774144",
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://theglemma.com/#app",
        name: "Glemma",
        url: "https://theglemma.com",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        description:
          "Glemma is an AI-powered skin analysis tool that detects skin conditions, then generates personalized skincare routines and product recommendations.",
        creator: {
          "@id": "https://theglemma.com/#organization",
        },
        publisher: {
          "@id": "https://theglemma.com/#organization",
        },
        featureList: [
          "AI skin analysis",
          "Personalized skincare routine",
          "Detect acne, dryness, oiliness",
          "Skin type classification",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },

      faqSchema,
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${geist.variable}`}>
      <body className="font-sans bg-[#F5EFE9] text-[#3B2E2A]">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <Navbar />
        <div className="pt-[70px]">
          {children}
          <Analytics />

        </div>
        <Footer />
      </body>
    </html>
  );
}
