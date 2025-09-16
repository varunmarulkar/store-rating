// store/authStore.js
import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  login: async (email, password) => {
    try {
      const res = await axios.post("/signin", { email, password }, { withCredentials: true });
      set({ user: res.data.user, token: res.data.token });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  },

  signup: async (name, email, password, address) => {
    try {
      const res = await axios.post("/signup", { name, email, password, address }, { withCredentials: true });
      set({ user: res.data.user, token: res.data.token });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  },

  logout: async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      set({ user: null, token: null });
    } catch (err) {
      console.error(err);
    }
  }
}));
