import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  login: string | null;
  setLogin: (login: string) => void;
  clearLogin: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      login: null,
      setLogin: (login) => set({ login }),
      clearLogin: () => set({ login: null }),
    }),
    { name: "auth-store" }
  )
);