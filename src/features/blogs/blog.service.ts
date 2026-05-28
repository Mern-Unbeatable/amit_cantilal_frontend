import { format } from 'date-fns'
import type {
  AdminCreatePostPayload,
  AdminPost,
  AdminUpdatePostPayload,
  BlogPost,
  PaginatedPosts,
} from '@/features/blogs/blog.types.ts'
import { api, unwrap } from '@/services/api.ts'

export function mapToPublicPost(post: AdminPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    date: post.published_at
      ? format(new Date(post.published_at), 'dd MMM yyyy')
      : '—',
    coverImage: post.cover_image ?? '',
    excerpt: post.excerpt ?? undefined,
    content: post.content,
    author: post.author ?? undefined,
  }
}

function toFormData(
  payload: AdminCreatePostPayload | AdminUpdatePostPayload,
): FormData {
  const form = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined) return
    if (value === null) form.append(key, '')
    else form.append(key, value as string | Blob)
  })

  return form
}

export const blogService = {
  getPaginatedPost: async (params: {
    page: number
    pageSize: number
    date_from?: string
    date_to?: string
  }) => {
    const response = await api.get<{ data: PaginatedPosts }>('/admin/posts', {
      params: {
        page: params.page,
        per_page: params.pageSize,
        date_from: params.date_from,
        date_to: params.date_to,
        all: true,
      },
    })
    return unwrap(response)
  },

  getPostBySlug: async (slug: string): Promise<AdminPost> => {
    const response = await api.get<{ data: AdminPost }>(`/admin/posts/${slug}`)
    return unwrap(response)
  },

  createPost: async (payload: AdminCreatePostPayload): Promise<AdminPost> => {
    const response = await api.post<{ data: AdminPost }>(
      '/admin/posts',
      toFormData(payload),
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return unwrap(response)
  },

  updatePost: async (
    slug: string,
    payload: AdminUpdatePostPayload,
  ): Promise<AdminPost> => {
    const form = toFormData(payload)
    form.append('_method', 'PUT')
    const response = await api.post<{ data: AdminPost }>(
      `/admin/posts/${slug}`,
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return unwrap(response)
  },

  deletePost: async (slug: string): Promise<void> => {
    await api.delete(`/admin/posts/${slug}`)
  },

  // public
  getPublicPosts: async (page = 1, perPage = 10): Promise<PaginatedPosts> => {
    const response = await api.get<{ data: PaginatedPosts }>('/public/posts', {
      params: { page, per_page: perPage },
    })
    return unwrap(response)
  },

  getPublicPostBySlug: async (slug: string): Promise<AdminPost> => {
    const response = await api.get<{ data: AdminPost }>(`/public/posts/${slug}`)
    return unwrap(response)
  },
}
