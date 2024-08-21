import { create } from "zustand";

export const uiStore = create((set) => ({
  show: false,
  toggleShow: () => set((state) => ({ show: !state.show })),
}))