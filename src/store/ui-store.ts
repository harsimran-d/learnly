import { create } from "zustand";

export const useUIStore = create<{
  isSheetOpen: boolean;
  openSheet: VoidFunction;
  closeSheet: VoidFunction;
}>((set) => ({
  isSheetOpen: false,
  openSheet: () => set({ isSheetOpen: true }),
  closeSheet: () => set({ isSheetOpen: false }),
}));
