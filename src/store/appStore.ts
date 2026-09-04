import { create } from 'zustand'
import type { AppStore } from '@/types'

export const useAppStore = create<AppStore>((set) => ({
  isNavScrolled:    false,
  isMobileMenuOpen: false,
  setNavScrolled:   (v) => set({ isNavScrolled: v }),
  setMobileMenuOpen:(v) => set({ isMobileMenuOpen: v }),
  toggleMobileMenu: ()  => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
}))
