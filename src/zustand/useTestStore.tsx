import { create } from "zustand";

export const useTestStore = create((set) => ({
  refetchTrigger: "null",
  increasePopulation: () => set(() => ({ refetchTrigger: Math.random() })),
  removeAllBears: () => set({ bears: 0 }),
}));
