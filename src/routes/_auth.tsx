import { createFileRoute, redirect } from '@tanstack/react-router'
import AuthLayout from '@/components/layouts/auth-layout.tsx'
import { useAuthStore } from '@/stores/user.ts'
import { ROLE_REDIRECTS } from '@/@types/user.ts'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const { isAuthenticated, user, isTokenExpired } = useAuthStore.getState()

    if (!isAuthenticated || !user) return

    if (isTokenExpired()) {
      useAuthStore.getState().clearAuth()
      return
    }

    throw redirect({
      to: ROLE_REDIRECTS[user.role],
    })
  },
  component: AuthLayout,
})
