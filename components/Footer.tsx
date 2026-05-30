import React from "react";
// import { Instagram, Youtube, x, Linkedin } from "lucide-react";
import { SiX, SiPinterest, SiFacebook, SiInstagram, SiYoutube, SiMedium } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-16 px-6 md:px-10 bg-[#f5efe9] border-t border-[#e5ddd4]">
      
      <div className="max-w-[1200px] mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">
          
          {/* BRAND */}
          <div>
            <div className="mb-4 leading-tight">
              <h3 className="font-serif text-lg tracking-[0.2em] text-[#3B2E2A]">
                GLEMMA
              </h3>
              <p className="text-[10px] tracking-[0.35em] text-[#B89C7D]">
                INTELLIGENT SKINCARE
              </p>
            </div>

            <p className="text-sm text-[#6f6259] leading-relaxed">
              A complete skincare intelligence system powered by AI.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="text-sm font-medium text-[#3B2E2A] mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-[#6f6259]">
              <li>
                <Link href="/features" className="hover:text-[#3B2E2A] transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#3B2E2A] transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-[#3B2E2A] transition">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-medium text-[#3B2E2A] mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-[#6f6259]">
              <li>
                <Link href="/about" className="hover:text-[#3B2E2A] transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#3B2E2A] transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#3B2E2A] transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-medium text-[#3B2E2A] mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-[#6f6259]">
              <li>
                <Link href="/cookie-policy" className="hover:text-[#3B2E2A] transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#3B2E2A] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#3B2E2A] transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-sm font-medium text-[#3B2E2A] mb-4">
              Follow Us
            </h4>

            <div className="flex flex-wrap gap-3">

              {[ 
                { href: "https://instagram.com/theglemma_official", icon: <SiInstagram /> },
                { href: "https://linkedin.com/company/theglemma", icon: <FaLinkedin /> },
                { href: "https://medium.com/@theglemma", icon: <SiMedium /> },
                { href: "https://pinterest.com/theglemma", icon: <SiPinterest /> },
                { href: "https://x.com/TheGlemma", icon: <SiX /> },
                { href: "https://www.youtube.com/channel/UCTb6e0qqNOcgOgOJ9j9aD-Q", icon: <SiYoutube /> },
                { href: "https://www.facebook.com/p/Glemma-61581938774144", icon: <SiFacebook /> },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#e5ddd4] flex items-center justify-center text-[#6f6259] hover:text-[#3B2E2A] hover:border-[#B89C7D] transition"
                >
                  <span className="w-4 h-4">{item.icon}</span>
                </a>
              ))}

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-6 border-t border-[#e5ddd4] text-center text-xs text-[#8a7f75] space-y-3">
          <p className="text-[#9a8d84] leading-relaxed mx-auto">
            Glemma offers non-medicated wellness insights and skincare
            recommendations only. Consult a dermatologist
            for medical concerns.
          </p>
          <p>© 2026 Glemma by Solubelle Healthcare Private Limited. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
