"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAnalyseStore } from "@/store/useAnalyseStore";
import { toast } from "sonner";

const question = {
  id: 6,
  text: "What's your skin tone?",
  options: [
    "Very Fair (Type I - always burns)",
    "Fair (Type II - usually burns)",
    "Light to Medium (Type III)",
    "Medium (Type IV)",
    "Medium to Dark (Type V)",
    "Dark (Type VI)",
  ],
};

export default function Question6Page() {
  const router = useRouter();
  const { setAnswer } = useAnalyseStore();

  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (!selected)
      return toast(
        <div className="text-[#bf908a]">
          Please select one option.
        </div>
      );

    setAnswer(question.text, [selected]);
    router.push("/analyse/7");
  };

  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Progress */}
        <div className="mb-10">
          <div className="h-[4px] w-full bg-[#e5ddd4] rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-[#bf908a]" />
          </div>
          <p className="text-xs text-[#6f6259] mt-2 text-right">
            Step 6 of 7
          </p>
        </div>

        {/* Question */}
        <h1 className="font-serif text-3xl mb-6 leading-tight">
          {question.text}
        </h1>

        {/* Helper text */}
        <p className="text-xs text-[#6f6259] mb-6">
          Based on how your skin reacts to sun exposure.
        </p>

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