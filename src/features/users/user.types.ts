// src/features/users/user.types.ts

import type { UserRole, UserStatus } from '@/@types/user'

export interface AdminUser {
  id: number
  uid: string
  name: string
  email: string
  phone: string | null
  location: string | null
  is_active: boolean
  last_login_at: string | null
  role: UserRole
  status: UserStatus
  created_at: string
  updated_at: string
}

export interface AdminCreateUserPayload {
  name: string
  email: string
  phone?: string
  location?: string
  password: string
  password_confirmation: string
  role: UserRole
  status: UserStatus
}

export interface AdminUpdateUserPayload extends Partial<AdminCreateUserPayload> {}

export interface PaginatedUsers {
  data: Array<AdminUser>
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

