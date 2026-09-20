import type {
  AdminCreateUserPayload,
  AdminUpdateUserPayload,
  AdminUser,
  PaginatedUsers,
} from '@/features/users/user.types.ts'
import { api, unwrap } from '@/services/api.ts'

export const userService = {
  getPaginatedUsers: async (params: {
    page: number
    pageSize: number
    role?: string
    search?: string
  }) => {
    const response = await api.get<{ data: PaginatedUsers }>('/admin/users', {
      params: {
        page: params.page,
        per_page: params.pageSize,
        role: params.role,
        search: params.search,
      },
    })
    return unwrap(response)
  },

  getUserById: async (id: number): Promise<AdminUser> => {
    const response = await api.get<{ data: AdminUser }>(`/admin/users/${id}`)
    return unwrap(response)
  },

  createUser: async (payload: AdminCreateUserPayload): Promise<AdminUser> => {
    const response = await api.post<{ data: AdminUser }>(
      '/admin/users',
      payload,
    )
    return unwrap(response)
  },

  updateUser: async (
    id: number,
    payload: AdminUpdateUserPayload,
  ): Promise<AdminUser> => {
    const response = await api.put<{ data: AdminUser }>(
      `/admin/users/${id}`,
      payload,
    )
    return unwrap(response)
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/admin/users/${id}`)
  },

  toggleUserStatus: async (id: number): Promise<AdminUser> => {
    const response = await api.post<{ data: AdminUser }>(
      `/admin/users/${id}/toggle-status`,
    )
    return unwrap(response)
  },
}
