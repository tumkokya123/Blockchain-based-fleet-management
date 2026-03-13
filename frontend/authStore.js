"use client";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  role: null,

  login: (userData) =>
    set({
      user: userData,
      role: userData.role,
    }),

  logout: () =>
    set({
      user: null,
      role: null,
    }),
}));