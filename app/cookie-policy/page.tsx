"use client";

import { useEffect, useState } from "react";

export default function CookiePolicy() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/cookie-policy.html")
      .then((res) => res.text())
      .then((data) => setHtml(data));
  }, []);

  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A]">
      
      {/* HERO */}
      <section className="relative border-b border-[#e5ddd4] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,144,138,0.2),transparent_40%)]" />

        <div className="relative max-w-4xl mx-auto px-6 pt-10 pb-16">
          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-4 uppercase">
            Legal
          </p>

          <h1 className="font-serif text-4xl md:text-5xl">
            Cookie Policy
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          
          <div
            className="
              prose 
              max-w-none
              text-[#6f6259]

              /* headings */
              prose-h1:font-serif
              prose-h2:font-serif
              prose-h3:font-serif
              prose-h1:text-[#3B2E2A]
              prose-h2:text-[#3B2E2A]
              prose-h3:text-[#3B2E2A]

              /* links */
              prose-a:text-[#bf908a]
              prose-a:underline

              /* strong */
              prose-strong:text-[#3B2E2A]

              /* lists */
              prose-li:marker:text-[#bf908a]
            "
            dangerouslySetInnerHTML={{ __html: html }}
          />

        </div>
      </section>

    </main>
  );
}
