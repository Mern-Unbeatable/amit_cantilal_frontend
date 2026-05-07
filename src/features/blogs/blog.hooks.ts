import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { blogService } from '@/features/blogs/blog.service.ts'

export const ADMIN_POSTS_QUERY_KEY = ['admin', 'posts'] as const

export function useAdminPosts() {
  return useQuery({
    queryKey: ADMIN_POSTS_QUERY_KEY,
    queryFn: blogService.getPosts,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogService.createPost,
    onSuccess: () => {
      toast.success('Post created successfully')
      queryClient.invalidateQueries({ queryKey: ADMIN_POSTS_QUERY_KEY })
    },
  })
}
