import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  AdminCreateUserPayload,
  AdminUpdateUserPayload,
} from '@/features/users/user.types.ts'
import { userService } from '@/features/users/user.service.ts'

export const userKeys = {
  all: () => ['users'] as const,
  lists: () => [...userKeys.all(), 'list'] as const,
  list: (page: number) => [...userKeys.lists(), { page }] as const,
  detail: (id: number) => [...userKeys.all(), 'detail', id] as const,
  paginatedList: (params: object) =>
    [...userKeys.all(), 'list', params] as const,
}

export function useAdminUsers(params: {
  page: number
  pageSize: number
  role?: string
  search?: string
}) {
  return useQuery({
    queryKey: userKeys.paginatedList(params),
    queryFn: () => userService.getPaginatedUsers(params),
  })
}

export function useAdminUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AdminCreateUserPayload) =>
      userService.createUser(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: userKeys.lists() }),
  })
}

export function useUpdateUser(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AdminUpdateUserPayload) =>
      userService.updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: userKeys.lists() }),
  })
}

export function useToggleUserStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => userService.toggleUserStatus(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: userKeys.lists() }),
  })
}
