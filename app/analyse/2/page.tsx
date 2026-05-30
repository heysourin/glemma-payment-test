"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAnalyseStore } from "@/store/useAnalyseStore";
import { toast } from "sonner";

const question = {
  id: 2,
  text: "How would you describe your skin?",
  options: [
    "Oily (Shiny, large pores)",
    "Dry (Flaky, rough texture)",
    "Combination (Oily T-zone, dry cheeks)",
    "Normal (Balanced, few issues)",
    "Sensitive",
  ],
};

export default function Question2Page() {
  const router = useRouter();
  const { setAnswer } = useAnalyseStore();

  // ✅ single select
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (!selected)
      return toast(
        <div className="text-[#bf908a]">
          Please select one option.
        </div>
      );

    setAnswer(question.text, [selected]);
    router.push("/analyse/3");
  };

  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Progress */}
        <div className="mb-10">
          <div className="h-[4px] w-full bg-[#e5ddd4] rounded-full overflow-hidden">
            <div className="h-full w-[28%] bg-[#bf908a]" />
          </div>
          <p className="text-xs text-[#6f6259] mt-2 text-right">
            Step 2 of 7
          </p>
        </div>

        {/* Question */}
        <h1 className="font-serif text-3xl mb-8 leading-tight">
          {question.text}
        </h1>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-10">
          {question.options.map((opt) => {
            const active = selected === opt;

            return (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`
                  w-full text-left px-5 py-4 rounded-xl border transition

                  ${
                    active
                      ? "bg-[#f2e7e5] border-[#bf908a]"
                      : "bg-white/60 border-[#e5ddd4] hover:bg-[#f9f4f2]"
                  }
                `}
              >
                <span className="text-sm">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          onClick={handleNext}
          className="w-full rounded-full bg-[#bf908a] text-white py-3 text-sm hover:opacity-90 transition"
        >
          Continue
        </button>

      </div>
    </main>
  );
}