import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  AdminCreatePostPayload,
  AdminUpdatePostPayload,
} from '@/features/blogs/blog.types.ts'
import { blogService, mapToPublicPost } from '@/features/blogs/blog.service.ts'

export const blogKeys = {
  all: () => ['posts'] as const,
  lists: () => [...blogKeys.all(), 'list'] as const,
  list: (page: number) => [...blogKeys.lists(), { page }] as const,
  detail: (slug: string) => [...blogKeys.all(), 'detail', slug] as const,
  paginatedList: (params: object) => [...blogKeys.all(), 'list', params] as const,
}

export function useAdminPosts(params: {
  page: number
  pageSize: number
  date_from?: string
  date_to?: string
}) {
  return useQuery({
    queryKey: blogKeys.paginatedList(params),
    queryFn: () => blogService.getPaginatedPost(params),
  })
}

export function useAdminPost(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => blogService.getPostBySlug(slug),
    enabled: !!slug,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AdminCreatePostPayload) =>
      blogService.createPost(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() }),
  })
}

export function useUpdatePost(slug: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AdminUpdatePostPayload) =>
      blogService.updatePost(slug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() })
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(slug) })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) => blogService.deletePost(slug),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() }),
  })
}

export function usePosts(page = 1) {
  return useQuery({
    queryKey: [...blogKeys.lists(), 'public', { page }],
    queryFn: async () => {
      const res = await blogService.getPublicPosts(page)
      return {
        posts: res.data.map(mapToPublicPost),
        pagination: res.pagination,
      }
    },
  })
}

export function usePublicPost(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: async () => {
      const res = await blogService.getPublicPostBySlug(slug)
      return mapToPublicPost(res)
    },
    enabled: !!slug,
  })
}
