/* ======AUTH HOOKS =======*/
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {useNavigate} from '@tanstack/react-router'
import {toast} from "sonner";
import type { AxiosError } from 'axios'
import type {
  ApplyPayload,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
  UserRole,
  VerifyOtpPayload,
} from '@/@types/user.ts'
import type { ApiError } from '@/@types/api.ts'
import {useAuthStore} from '@/stores/user.ts'
import { authService } from '@/features/auth/auth.service.ts'

const ROLE_REDIRECTS: Record<UserRole, string> = {
  admin: '/admin/dashboard',
  student: '/student/dashboard',
}

// ─── Helper: extract server validation errors for react-hook-form ─────────────
export function extractApiErrors(
  error: AxiosError<ApiError>,
): Record<string, string> | null {
  const serverErrors = error.response?.data.errors
  if (!serverErrors) return null

  return Object.entries(serverErrors).reduce(
    (acc, [field, messages]) => {
      acc[field] = messages[0] // first message per field
      return acc
    },
    {} as Record<string, string>,
  )
}


// =============================================================================
// useLogin
// =============================================================================
export function useLogin() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),

    onSuccess: async (data) => {
      setAuth(data.user, data.access_token, data.expires_at)
      toast.success('Welcome back!')
      // Redirect based on primary role
      const role = data.user.role

      const search = new URLSearchParams(window.location.search)
      const redirectTo = search.get('redirect')

      if (redirectTo) {
        window.location.href = redirectTo // hard nav preserves the full path
        return
      }

      navigate({ to: ROLE_REDIRECTS[role] || '/admin/dashboard' })

    },
  })
}

// =============================================================================
// useLogin
// =============================================================================
export function useRegister() {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: (payload: ApplyPayload) => authService.register(payload),

    onSuccess: async (data) => {
      setAuth(data.user, data.access_token, data.expires_at)
      toast.success('Account created! Welcome to LearnifyDev 🎉')
      // Redirect based on primary role
      // const role = data.user.role

      const search = new URLSearchParams(window.location.search)
      const redirectTo = search.get('redirect')

      if (redirectTo) {
        window.location.href = redirectTo // hard nav preserves the full path
        return
      }


    },
  })
}

// =============================================================================
// useLogout
// =============================================================================
export function useLogout() {
  const { clearAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => authService.logout(),

    onSettled: () => {
      // Always clear regardless of API response
      clearAuth()
      navigate({ to: '/' })
    },
  })
}

// =============================================================================
// useForgotPassword  (Step 1)
// =============================================================================
export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authService.forgotPassword(payload),
  })
}

// =============================================================================
// useVerifyOtp  (Step 2)
// =============================================================================
export function useVerifyOtp() {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
  })
}

// =============================================================================
// useResetPassword  (Step 3)
// =============================================================================
export function useResetPassword() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authService.resetPassword(payload),

    onSuccess: () => {
      navigate({ to: '/' })
    },
  })
}

export function useChangePassword() {

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      authService.changePassword(payload),

    onSuccess: () => {
      toast.success("Password changed successfully")
    },
  })
}

export function useProfile() {
  return useQuery({
    queryKey: ['student', 'profile'],
    queryFn: authService.getProfile,
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student', 'profile'] })
      toast.success('Profile updated successfully')
    },
  })
}


