import { create } from "zustand";

interface ButtonTestStoreState {
  count: number;
  inc: () => void;
  reset: () => void;
}

export const useButtonTestStore = create<ButtonTestStoreState>((set) => ({
  count: 0,

  inc: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
