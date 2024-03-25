import { create } from "zustand";

// Create Zustand store
export const useProfileStore = create((set) => ({
  userProfileData: false,
  setProfileData: (value: any) => set({ userProfileData: value }),
}));
