import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { User, UserRole } from '@/@types/user.ts'

// ─── State Shape ───────
interface AuthState {
  user: User | null
  accessToken: string | null
  expiresAt: string | null
  isAuthenticated: boolean
  // Actions
  setAuth: (user: User, token: string, expiresAt: string) => void
  clearAuth: () => void
  updateUser: (partial: Partial<User>) => void
  // Selectors (derived — computed from state)
  hasRole: (role: UserRole) => boolean
  hasAnyRole: (roles: Array<UserRole>) => boolean
  hasPermission: (permission: string) => boolean
  isTokenExpired: () => boolean
}

// ─── Store ───────────────────────────────────────────────────────────────────
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      expiresAt: null,
      isAuthenticated: false,
      company: null,
      // ── Actions ────────────────────────────────────────────────────────────
      setAuth: (user, accessToken, expiresAt) => {
        // Also sync token to sessionStorage so axios interceptor can read it
        sessionStorage.setItem('access_token', accessToken)

        set({
          user,
          accessToken,
          expiresAt,
          isAuthenticated: true,
        })
      },

      clearAuth: () => {
        sessionStorage.removeItem('access_token')

        set({
          user: null,
          accessToken: null,
          expiresAt: null,
          isAuthenticated: false,
        })
      },

      updateUser: (partial) => {
        const current = get().user
        if (!current) return
        set({ user: { ...current, ...partial } })
      },

      // ── Derived Selectors ──────────────────────────────────────────────────
      hasRole: (role) => {
        const { user } = get()
        return user?.roles.includes(role) ?? false
      },

      hasAnyRole: (roles) => {
        const { user } = get()
        if (!user) return false
        return roles.some((r) => user.roles.includes(r))
      },

      hasPermission: (permission) => {
        const { user } = get()
        return user?.permissions.includes(permission) ?? false
      },

      isTokenExpired: () => {
        const { expiresAt } = get()
        if (!expiresAt) return true
        return new Date() > new Date(expiresAt)
      },
    }),
    {
      name: 'auth-storage-dev', // sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        // only persist these fields
        user: state.user,
        accessToken: state.accessToken,
        expiresAt: state.expiresAt,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

// ─── Convenience selectors (use outside components too) ───────────────────────
export const getUser = () => useAuthStore.getState().user
export const getToken = () => useAuthStore.getState().accessToken
export const isAuthenticated = () => useAuthStore.getState().isAuthenticated
