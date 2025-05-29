import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: any | null
  freeGenerationsLeft: number
  isPro: boolean
  setUser: (user: any | null) => void
  setFreeGenerationsLeft: (count: number) => void
  setIsPro: (isPro: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      freeGenerationsLeft: 3,
      isPro: false,
      setUser: (user) => set({ user }),
      setFreeGenerationsLeft: (count) => set({ freeGenerationsLeft: count }),
      setIsPro: (isPro) => set({ isPro })
    }),
    {
      name: 'auth-storage'
    }
  )
)