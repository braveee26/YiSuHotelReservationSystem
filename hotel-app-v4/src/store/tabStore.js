import { create } from 'zustand'

export const useTabStore = create((set) => ({
  activeTab: 0,
  setActiveTab: (index) => set({ activeTab: index }),
}))
