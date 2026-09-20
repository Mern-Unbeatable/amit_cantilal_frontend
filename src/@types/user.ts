/* ===AUTH TYPES ===*/

export type UserRole = 'admin' | 'student'

export type UserStatus =
  | 'Student'
  | 'Graduate'
  | 'Employed'
  | 'Self-employed'
  | 'Other'

/* === User ===*/
export interface User {
  id: number
  uid: string
  name: string
  email: string
  phone: number | null
  location: number | null
  is_active: boolean
  last_login_at: string | null
  role: UserRole
  status: UserStatus
  roles: Array<UserRole>
  permissions: Array<string>
}

// -----------------------------------------------------------------------------
// Login
// -----------------------------------------------------------------------------
export interface LoginPayload {
  username: string // email or username
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: 'Bearer'
  expires_at: string // ISO 8601
  user: User
}

export interface ApplyPayload {
  name: string
  email: string
  phone: string
  location?: string
  password: string
  password_confirmation: string
  current_status:
    | 'Student'
    | 'Graduate'
    | 'Employed'
    | 'Self-employed'
    | 'Other'
  prior_experience: 'yes' | 'no'
  experience_description?: string
}

/* === Forgot Password — Step 1 ====*/
export interface ForgotPasswordPayload {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
}

// -----------------------------------------------------------------------------
// Verify OTP — Step 2
// -----------------------------------------------------------------------------
export interface VerifyOtpPayload {
  email: string
  otp: string
}

export interface VerifyOtpResponse {
  reset_token: string
}

// -----------------------------------------------------------------------------
// Reset Password — Step 3
// -----------------------------------------------------------------------------
export interface ResetPasswordPayload {
  email: string
  otp: string
  reset_token: string
  password: string
  password_confirmation: string
}

export interface ResetPasswordResponse {
  message: string
}

export interface ChangePasswordPayload {
  current_password: string
  new_password: string
  new_password_confirmation: string
}

export interface UpdateProfilePayload {
  name: string
  phone: string
  location?: string
  current_status?: string
}

export interface ChangePasswordResponse {
  message: string
}

// -----------------------------------------------------------------------------
// Role-based permission helpers
// -----------------------------------------------------------------------------
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 100,
  student: 50,
}

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  admin: '/admin/dashboard',
  student: '/student/dashboard',
}

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  student: 'Student',
}
