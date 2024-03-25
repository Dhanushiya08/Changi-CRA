import { create } from "zustand";

// Create Zustand store
export const useTextStore = create((set) => ({
  displaySyncText: false,
  setDisplaySync: (value: any) => set({ displaySyncText: value }),
}));
