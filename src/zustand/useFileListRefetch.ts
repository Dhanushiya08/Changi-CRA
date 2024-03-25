import { create } from "zustand";

export const useFileListRefetch = create((set) => ({
  fileListDataRefetch: null,
  setFileListDataRefetch: () =>
    set(() => ({ fileListDataRefetch: Math.random() })),
}));
