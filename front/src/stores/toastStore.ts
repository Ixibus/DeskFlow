import { create } from "zustand";

export type ToastType = "success" | "error";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastStoreState {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: number) => void;
}

let nextId = 0;

export const useToastStore = create<ToastStoreState>((set, get) => ({
  toasts: [],

  showToast: (message, type = "success") => {
    const id = nextId++;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => get().dismissToast(id), 4000);
  },

  dismissToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
  },
}));
