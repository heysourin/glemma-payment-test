import { create } from "zustand";

interface AnalyseState {
  // answers: Record<number, string[]>; // e.g., { 1: ["A", "C"], 2: ["B"] }
  answers: Record<string, string[]>; 
  setAnswer: (question: string, selected: string[]) => void;
  clear: () => void;
}

export const useAnalyseStore = create<AnalyseState>((set) => ({
  answers: {},
  setAnswer: (question, selected) =>
    set((state) => ({
      answers: { ...state.answers, [question]: selected },
    })),
  clear: () => set({ answers: {} }),
}));
