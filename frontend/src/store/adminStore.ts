"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AdminState {
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: (password) => {
        // Basic hardcoded password for this phase
        if (password === "admin123") {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: "admin-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
