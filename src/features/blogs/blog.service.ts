import type { AdminCreatePostPayload, AdminPost } from '@/features/blogs/blog.types.ts'
import { api, unwrap } from '@/services/api.ts'

export const blogService = {
  getPosts: async (): Promise<Array<AdminPost>> => {
    const response = await api.get<{ data: Array<AdminPost> | { data: Array<AdminPost> } }>('/admin/posts')
    const payload = response.data.data

    if (Array.isArray(payload)) {
      return payload
    }

    if (Array.isArray(payload?.data)) {
      return payload.data
    }

    return []
  },

  createPost: async (payload: AdminCreatePostPayload): Promise<AdminPost> => {
    const response = await api.post<{ data: AdminPost }>('/admin/posts', payload)
    return unwrap(response)
  },
}
