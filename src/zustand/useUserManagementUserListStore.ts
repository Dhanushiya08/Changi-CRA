import { create } from "zustand";

export const useUserManagementUserListStore = create((set) => ({
  userListData: false,
  setUserListData: (data: any) => set(() => ({ userListData: data })),
}));
