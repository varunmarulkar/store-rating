// store/userStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  users: [],
  stores: [],
  filters: { name: "", email: "", address: "", role: "" },

  setUsers: (users) => set({ users }),
  setStores: (stores) => set({ stores }),
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  clearFilters: () => set({ filters: { name: "", email: "", address: "", role: "" } })
}));
