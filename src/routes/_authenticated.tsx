import { createFileRoute, redirect } from '@tanstack/react-router'
import MainLayout from '@/components/layouts/main-layout'
import { useAuthStore } from '@/stores/user'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const { isAuthenticated, user, isTokenExpired, clearAuth } =
      useAuthStore.getState()

    // Not logged in → redirect to log in with ?redirect= so we can return after
    if (!isAuthenticated || !user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }

    // Token expired → clear store and redirect
    if (isTokenExpired()) {
      clearAuth()
      throw redirect({
        to: '/',
        search: { redirect: location.href },
      })
    }
  },
  component: MainLayout,
})
