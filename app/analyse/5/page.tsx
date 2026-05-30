"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAnalyseStore } from "@/store/useAnalyseStore";
import { toast } from "sonner";

const NONE_OPTION = "None that I know of";

const question = {
  id: 5,
  text: "Do you have any known skin allergies or sensitivities?",
  options: [
    "Fragrance",
    "Essential oils",
    "Alcohol",
    "Chemical sunscreens",
    "Retinoids",
    "AHAs/BHAs",
    NONE_OPTION,
    "Other (specify)",
  ],
};

export default function Question5Page() {
  const router = useRouter();
  const { setAnswer } = useAnalyseStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (opt: string) => {
    setSelected((prev) => {
      // if NONE selected → override everything
      if (opt === NONE_OPTION) {
        return [NONE_OPTION];
      }

      // if selecting something else → remove NONE
      const filtered = prev.filter((o) => o !== NONE_OPTION);

      if (filtered.includes(opt)) {
        return filtered.filter((o) => o !== opt);
      }

      return [...filtered, opt];
    });
  };

  const handleNext = () => {
    if (selected.length === 0)
      return toast(
        <div className="text-[#bf908a]">
          Please select at least one option.
        </div>
      );

    setAnswer(question.text, selected);
    router.push("/analyse/6");
  };

  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Progress */}
        <div className="mb-10">
          <div className="h-[4px] w-full bg-[#e5ddd4] rounded-full overflow-hidden">
            <div className="h-full w-[71%] bg-[#bf908a]" />
          </div>
          <p className="text-xs text-[#6f6259] mt-2 text-right">
            Step 5 of 7
          </p>
        </div>

        {/* Question */}
        <h1 className="font-serif text-3xl mb-6 leading-tight">
          {question.text}
        </h1>

        {/* Selected count */}
        <p className="text-xs text-[#6f6259] mb-4">
          {selected.length} selected
        </p>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-10">
          {question.options.map((opt) => {
            const active = selected.includes(opt);

            return (
              <button
                key={opt}
                onClick={() => toggleOption(opt)}
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