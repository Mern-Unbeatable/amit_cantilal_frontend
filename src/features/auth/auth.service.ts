import type {
  ApplyPayload,
  ChangePasswordPayload,
  ChangePasswordResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  UpdateProfilePayload,
  User,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from '@/@types/user.ts'
import { api, unwrap } from '@/services/api.ts'

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<{ data: LoginResponse }>(
      '/auth/login',
      payload,
    )
    return unwrap(response)
  },

  register: async (payload: ApplyPayload): Promise<LoginResponse> => {
    const response = await api.post<{ data: LoginResponse }>(
      '/auth/apply',
      payload,
    )
    return unwrap(response)
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  forgotPassword: async (
    payload: ForgotPasswordPayload,
  ): Promise<ForgotPasswordResponse> => {
    const response = await api.post<{ data: ForgotPasswordResponse }>(
      '/auth/password/forgot',
      payload,
    )
    return unwrap(response)
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    const response = await api.post<{ data: VerifyOtpResponse }>(
      '/auth/password/verify',
      payload,
    )
    return unwrap(response)
  },

  resetPassword: async (
    payload: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> => {
    const response = await api.post<{ data: ResetPasswordResponse }>(
      '/auth/password/reset',
      payload,
    )
    return unwrap(response)
  },

  changePassword: async (
    payload: ChangePasswordPayload,
  ): Promise<ChangePasswordResponse> => {
    const response = await api.put<{ data: ChangePasswordResponse }>(
      '/auth/change-password',
      payload,
    )
    return unwrap(response)
  },

  getProfile: () => api.get<{ data: User }>('/student/profile').then(unwrap),

  updateProfile: (payload: UpdateProfilePayload) =>
    api.put<{ data: User }>('/student/profile', payload).then(unwrap),
}
